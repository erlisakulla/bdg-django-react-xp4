import * as React from "react";
import * as ReactDOM from "react-dom";
import App from "../App";
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
import { act } from "react-dom/test-utils";
import { MemoryRouter, Router, BrowserRouter } from "react-router-dom";
import Player from "../pages/Player";
import Instructor from "../pages/Instructor";



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


it("Instructor without crashing ", () => {

    renderWithRouter(<Instructor />);
    expect(screen.getByText(/Instructor Page/i)).toBeInTheDocument();
  });


test("navigating to create game  page using button", async () => {
    renderWithRouter(<App/>,{route:'/instructor/'})
    expect(screen.getByText(/Create New Game/i)).toBeInTheDocument();
  
    const leftClick = { button: 0 };
    userEvent.click(screen.getByText(/Create New Game/i), leftClick);
    expect(screen.getByText(/Submit/i)).toBeInTheDocument();
  });
  

const renderWithRouter = (ui, { route = "/instructor/" } = {}) => {
  window.history.pushState({}, "11 ", route);
  return render(ui, { wrapper: BrowserRouter });
};

