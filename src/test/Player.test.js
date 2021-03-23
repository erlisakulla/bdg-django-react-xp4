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


it("player without crashing ", () => {

    renderWithRouter(<Player />);
    expect(screen.getByText(/Player Page/i)).toBeInTheDocument();
  });
  


it("player with server fetch igiri@gmail.com", async () => {

    server.use(
        // Faking Request to Backend 
        rest.get('http://localhost:8000/user/info/', (req, res, ctx) => {
            return res(ctx.json({ email: 'igiri@gmail.com' }))
        })
      )
      renderWithRouter(<Player />)
      await waitFor(() => screen.getByText(/igiri@gmail.com/i))
 
});
  
  

test("navigating to main game from continue", async () => {
    renderWithRouter(<App/>,{route:'/player/'})
  
      const leftClick = { button: 0 };
      userEvent.click(screen.getByText(/Continue/i), leftClick);
      expect(screen.getByText(/For Week/i)).toBeInTheDocument(); 
  });
  

  test("navigating to unknown page", async () => {
    renderWithRouter(<App/>,{route:'/randompage'})

    expect(screen.getByText(/NOT FOUND/i)).toBeInTheDocument(); 
});
  

const renderWithRouter = (ui, { route = "/player/" } = {}) => {
  window.history.pushState({}, "11 ", route);
  return render(ui, { wrapper: BrowserRouter });
};