import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { pricePerItem } from '../constants';
import { formatCurrency } from '../utilities';

const OrderDetails = createContext({});

export function useOrderDetails() {
  const context = useContext(OrderDetails);

  if (!context) {
    throw new Error(
      'useOrderDetails must be used within an OrderDetailsProvider',
    );
  }

  return context;
}

function calculateSubtotal(optionType, optionCounts) {
  let optionCount = 0;
  // eslint-disable-next-line no-restricted-syntax
  for (const count of optionCounts[optionType].values()) {
    optionCount += count;
  }

  return optionCount * pricePerItem[optionType];
}
export function OrderDetailsProvider(props) {
  const [optionCounts, setOptionsCount] = useState({
    scoops: new Map(),
    toppings: new Map(),
  });

  const zeroCurrency = formatCurrency(0);

  const [totals, setTotals] = useState({
    scoops: zeroCurrency,
    toppings: zeroCurrency,
    grandTotal: zeroCurrency,
  });

  useEffect(() => {
    const scoopsSubtotal = calculateSubtotal('scoops', optionCounts);
    const toppingsSubtotal = calculateSubtotal('toppings', optionCounts);
    const grandTotal = scoopsSubtotal + toppingsSubtotal;

    setTotals({
      grandTotal: formatCurrency(grandTotal),
      scoops: formatCurrency(scoopsSubtotal),
      toppings: formatCurrency(toppingsSubtotal),
    });
  }, [optionCounts]);

  const value = useMemo(() => {
    function updateItemCount(itemName, newItemCount, optionType) {
      const newOptionsCount = { ...optionCounts };

      const optionCountsMap = optionCounts[optionType];
      // eslint-disable-next-line radix
      optionCountsMap.set(itemName, parseInt(newItemCount));

      setOptionsCount(newOptionsCount);
    }

    function resetOrder() {
      setOptionsCount({
        scoops: new Map(),
        toppings: new Map(),
      });
    }

    return [{ ...optionCounts, totals }, updateItemCount, resetOrder];
  }, [optionCounts, totals]);

  return <OrderDetails.Provider value={value} {...props} />;
}
