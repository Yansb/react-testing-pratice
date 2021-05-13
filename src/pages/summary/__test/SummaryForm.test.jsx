import { render, screen, fireEvent } from "@testing-library/react";
import {SummaryForm} from "../SummaryForm";

describe("Summary Form tests", () => {
  it("should render an unchecked checkbox", () => {
    render(<SummaryForm />);
    const button = screen.getByRole("button");
  
    const checkbox = screen.getByRole("checkbox", {
      name: /terms and conditions/i
    });

    expect(checkbox).not.toBeChecked();

    expect(button).toBeDisabled();

  });

  it("should disable button on click to checkbox", () => {
    render(<SummaryForm />);
    const checkbox = screen.getByRole("checkbox", {
      name: /terms and conditions/i
    });
    const button = screen.getByRole("button");

    fireEvent.click(checkbox);
    expect(button).toBeEnabled();
    
    fireEvent.click(checkbox);
    expect(button).toBeDisabled();
  })
})