import * as React from "react";
import * as ReactDOM from "react-dom";
import App from "../App";
import { createMemoryHistory } from "history";
import userEvent from '@testing-library/user-event'

import {
  render,
  fireEvent,
  waitFor,
  screen,
  getByText,
} from "@testing-library/react";

import "@testing-library/jest-dom/extend-expect";
import { act } from "react-dom/test-utils";
import { MemoryRouter, Router, BrowserRouter } from "react-router-dom";

import PlayGameView from "../pages/Game";

it("PLAY GAME renders without crashing", () => {
  const div11 = document.createElement("div");
  ReactDOM.render(<PlayGameView />, div11);
});

it("Default Page contains Text", () => {
  const { getByText, getbyLabelText } = render(<PlayGameView />);

  getByText("For Week #1");
});




  

const renderWithRouter = (ui, { route = '/' } = {}) => {
    window.history.pushState({}, 'Test page', route)
  
    return render(ui, { wrapper: BrowserRouter })
  }
