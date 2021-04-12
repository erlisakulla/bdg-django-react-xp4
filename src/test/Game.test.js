import * as React from "react";
import * as ReactDOM from "react-dom";
import App from "../App";
import {createMemoryHistory} from "history";
import userEvent from '@testing-library/user-event'

import {render, fireEvent, waitFor, screen, getByText} from "@testing-library/react";

import "@testing-library/jest-dom/extend-expect";
import {act} from "react-dom/test-utils";
import {MemoryRouter, Router, BrowserRouter} from "react-router-dom";


describe("Game UI test", () => {

    test("rendering without authentification", () => {
        renderWithRouter(<App/>);
        expect(screen.getByText("Login")).toBeInTheDocument();
        expect(screen.getByText("Password")).toBeInTheDocument();
        expect(screen.getByRole("button")).toBeInTheDocument();
    });

    test("rendering with authentification", () => {
      localStorage.setItem('access_token', 'another dummy token');
      renderWithRouter(<App/>);
      expect(screen.getByText("Week #1")).toBeInTheDocument();
      expect(screen.getByText("SEND")).toBeInTheDocument();
      expect(screen.getByRole("button")).toBeInTheDocument();
  });


});

const renderWithRouter = (ui, {
    route = "/play/213"
} = {}) => {
    window
        .history
        .pushState({}, 'Test page', route)

    return render(ui, {wrapper: BrowserRouter})
}
