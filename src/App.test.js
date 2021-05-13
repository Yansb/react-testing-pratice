import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';
import {replaceCamelWithSpaces} from "./App";

test('button has correct initial color', () => {
  render(<App />)

  const colorButton = screen.getByRole("button", {name: /change to midnight blue/i});

  expect(colorButton).toHaveStyle({backgroundColor: "MediumVioletRed"})
  
  fireEvent.click(colorButton);

  expect(colorButton).toHaveStyle({backgroundColor: "MidnightBlue"});

  expect(colorButton.textContent).toBe("Change to Medium Violet Red")
});

test('initial conditions', () => {
  render(<App />);

  const colorButton = screen.getByRole('button', {name: /change to midnight blue/i});
  expect(colorButton).toBeEnabled()

  const checkbox = screen.getByRole("checkbox");
  expect(checkbox).not.toBeChecked();
})

test('checkbox disabled', () => {
  render(<App />);

  const checkbox = screen.getByRole("checkbox", {label: "disable-button-checkbox"});
  fireEvent.click(checkbox);

  const colorButton = screen.getByRole("button", {name: /change to midnight blue/i});
  expect(colorButton).not.toBeEnabled();

  fireEvent.click(checkbox);
  expect(colorButton).toBeEnabled()
})

test('button is gray when disabled', () => {
  render(<App />)
  const checkbox = screen.getByRole("checkbox", {label: "disable-button-checkbox"});
  const colorButton = screen.getByRole("button", {name: /change to midnight blue/i});

  fireEvent.click(checkbox);
  expect(colorButton).toHaveStyle({backgroundColor: "gray"});
  
  fireEvent.click(checkbox);
  expect(colorButton).toHaveStyle({backgroundColor: "MediumVioletRed"});
  
})

describe("spaces before camel-case capital letters", () => {
  test('Works for no inner capital letters', () => {
    expect(replaceCamelWithSpaces("Red")).toBe("Red")
  });
  test('Works for one inner capital letters', () => {
    expect(replaceCamelWithSpaces("MidnightBlue")).toBe('Midnight Blue');
  });
  test('Works for multiple inner capital letters', () => {
    expect(replaceCamelWithSpaces('MediumVioletRed')).toBe('Medium Violet Red');
  });
})