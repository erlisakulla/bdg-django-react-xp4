import * as React from "react";
import * as ReactDOM from "react-dom";
import App from "../App";
import { createMemoryHistory } from "history";
import userEvent from '@testing-library/user-event'
import { setupServer } from 'msw/node'
import { rest } from 'msw'


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


//faking server 
const server = setupServer(
  rest.get('http://localhost:8000/', (req, res, ctx) => {
    return res(ctx.json({ greeting: 'hello there' }))
  })
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())


describe("App rendering", () => {
  test('renders Without crashing ', () => {
    render(<App />);
  })

  test("Navbar testing", () => {
    render(<App/>);
    expect(screen.getByText("Login")).toBeInTheDocument();
    expect(screen.getByText("Sign up")).toBeInTheDocument();
    expect(() => screen.getByText("Logout")).toThrow();
  });

  test("Main Page content testing", () => {
    render(<App />);
    
    const playerElement = screen.getByText("Login");
    const instructorElement = screen.getByText("Sign up");
    expect(playerElement).toBeInTheDocument();
   
    expect(instructorElement).toBeInTheDocument();
  });
});

describe("Navigating testing", () => {

  test('Navigating to login page', () => {
    renderWithRouter(<App />);
    expect(screen.getByText(/Login/i)).toBeInTheDocument();
    const leftClick = { button: 0 };
    userEvent.click(screen.getByText(/Login/i), leftClick);
    expect(screen.getByText(/Password/i)).toBeInTheDocument();

    expect(screen.getByRole("button")).toBeInTheDocument();
    expect(screen.getByRole("textbox")).toBeInTheDocument();

  });


  test('Navigating to Sign Up Page', () => {
    renderWithRouter(<App />);
    expect(screen.getByText(/Sign Up/i)).toBeInTheDocument();

    const leftClick = { button: 0 };
    userEvent.click(screen.getByText(/Sign Up/i), leftClick);

    expect(screen.getByText("Email")).toBeInTheDocument();
    expect(screen.getByText("Name")).toBeInTheDocument();
    expect(screen.getByText("Password")).toBeInTheDocument();
    expect(screen.getByRole("button")).toBeInTheDocument();
    expect(screen.getByRole("combobox")).toBeInTheDocument();
  });

});


describe("Fake Authentication", () => {
  test("Empty fields", async () => {
    renderWithRouter(<App/>,{route:'/signup/'})
    const leftClick = { button: 0 };
    const click=document.getElementById('userSubmit');

    userEvent.click(click, leftClick);

    expect(screen.getByText("Please enter your username.")).toBeInTheDocument();
  });

  test("Success sign up", async () => {

    server.use(
      rest.post('http://localhost:8000/user/create/', (req, res, ctx) => {
        return res(ctx.json({
			"email": "deezx@jsock.cs",
			"name": "test1",
			"is_instructor": false
		}),ctx.status(201))
      })
    )
    renderWithRouter(<App/>,{route:'/signup/'})

    const leftClick = { button: 0 };
    const click=document.getElementById('userSubmit');

    userEvent.click(click, leftClick);

    await waitFor(()=> screen.getByText('Please enter your username.'))
  });

  test("Error in response", async () => {

    server.use(
      rest.post('http://localhost:8000/api/token/', (req, res, ctx) => {
        return res(ctx.json({ details: 'some error ' }),ctx.status(400))
      })
    )
    renderWithRouter(<App/>,{route:'/login/'})

    const leftClick = { button: 0 };
    const click=document.getElementById('userSubmit');

    userEvent.click(click, leftClick);

    await waitFor(()=> screen.getByText('Please enter your Password'))
  });


});

const renderWithRouter = (ui, { route = '/' } = {}) => {
  window.history.pushState({}, 'Test page', route)

  return render(ui, { wrapper: BrowserRouter })
}


