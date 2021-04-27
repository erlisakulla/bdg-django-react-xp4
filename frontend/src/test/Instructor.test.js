import * as React from "react";
import * as ReactDOM from "react-dom";
import App from "../App";
import { act } from 'react-dom/test-utils';
import { createMemoryHistory } from "history";
import userEvent from "@testing-library/user-event";

import { rest } from 'msw'
import { setupServer } from 'msw/node'

import {
  render,
  fireEvent,
  waitFor,
  screen,
  getByText,
} from "@testing-library/react";

import "@testing-library/jest-dom/extend-expect";
import { MemoryRouter, Router, BrowserRouter } from "react-router-dom";



// declare which API requests to mock
const server = setupServer(
    // capture "GET /greeting" requests
    rest.get('/greeting', (req, res, ctx) => {
      // respond using a mocked JSON body
      return res(ctx.json({ greeting: 'hello there' }))
    })
  )

  // establish API mocking before all tests
beforeAll(() => server.listen())
// reset any request handlers that are declared as a part of our tests
// (i.e. for testing one-time error scenarios)
afterEach(() => server.resetHandlers())
// clean up once the tests are done
afterAll(() => server.close())

describe("Rendering Instructor", () => {
  test("Rendering without authentication", () => {
    renderWithRouter(<App />);
    expect(screen.getByText("Login")).toBeInTheDocument();
    expect(screen.getByText("Password")).toBeInTheDocument();
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  test("Rendering with fake authentication", () => {
    localStorage.setItem('access_token' , 'dummy token');
    renderWithRouter(<App />);
    expect(screen.getByText("Games")).toBeInTheDocument();
    expect(screen.getByText("Current Round")).toBeInTheDocument();
    expect(screen.getByText("Create Demand Pattern")).toBeInTheDocument();
  });

  test("Create Game screen", async () => {
    localStorage.setItem('access_token' , 'dummy token');
    renderWithRouter(<App />, {route : '/creategame'});
    
    expect(screen.getByText("Game ID")).toBeInTheDocument();
    expect(screen.getByText("Starting Inventory")).toBeInTheDocument();
    expect(screen.getByText("Holding Cost")).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  test("Create Demand screen", async () => {
    localStorage.setItem('access_token' , 'dummy token');
    renderWithRouter(<App />, {route : '/createdemand'});
    
    expect(screen.getByText("Enter the demand")).toBeInTheDocument();
    expect(screen.getByText("Enter the demand ID")).toBeInTheDocument();
    expect(screen.getByText("Create Demand Pattern")).toBeInTheDocument();
	fireEvent.click(screen.getByText('Create Demand Pattern'))
  });
  
});



const renderWithRouter = (ui, { route = "/instructor/" } = {}) => {
  window.history.pushState({}, "11 ", route);
  return render(ui, { wrapper: BrowserRouter });
};

