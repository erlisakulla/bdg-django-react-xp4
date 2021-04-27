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
        expect(screen.getByText("Sign up")).toBeInTheDocument();
        expect(screen.getByText("Beer Game")).toBeInTheDocument();
    });

    test("rendering with authentication", () => {
      localStorage.setItem('access_token', 'another dummy token');
      renderWithRouter(<App/>);
      expect(screen.getByText("Beer Game")).toBeInTheDocument();
		expect(screen.getByText("logout")).toBeInTheDocument();
		expect(screen.getByText("Week #")).toBeInTheDocument();
		expect(screen.getByRole("tabpanel")).toBeInTheDocument();

		
  });


});

const renderWithRouter = (ui, {
    
	route = "/role/1"
} = {}) => {
    window
        .history
        .pushState({}, 'Test page', route)

    return render(ui, {wrapper: BrowserRouter})
}
