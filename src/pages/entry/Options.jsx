import axios from 'axios';
import {useEffect, useState} from 'react';
import { Row } from 'react-bootstrap';
import ScoopOption from './ScoopOptions';
import { ToopingOptions } from './ToopingsOptions';

export default function Options({optionType}){
  const [items, setItems] = useState([]);
  // optionType is 'scoops' or 'toppings'
  useEffect(() => {
    axios.get(`http://localhost:3030/${optionType}`).then(response => setItems(response.data))
  }, [optionType]);

  const ItemComponent = optionType === 'scoops' ? ScoopOption : ToopingOptions;

  const optionItems = items.map(item => (
    <ItemComponent key={item.name} name={item.name} imagePath={item.imagePath} />
  ))

  return <Row>{optionItems}</Row>
}