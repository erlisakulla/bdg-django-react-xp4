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


test('renders Without crashing ', () => {
  render(<App />);
});


test('renders with navbar ', () => {
  render(<App />);
  const linkElement = screen.getByText(/Login/i);
  expect(linkElement).toBeInTheDocument();
});


test('renders with content Welcome to ( render container ) ', () => {
  render(<App />);
  const linkElement = screen.getByText(/Welcome to/i);
  expect(linkElement).toBeInTheDocument();
});

test('navigating to login page using navbar ', () => {
  renderWithRouter(<App />)
  expect(screen.getByText(/Login/i)).toBeInTheDocument()

  const leftClick = { button: 0 }
  userEvent.click(screen.getByText(/Login/i), leftClick)

  expect(screen.getByText(/Password/i)).toBeInTheDocument()
})



test('navigating to about page', () => {
  renderWithRouter(<App />)
  expect(screen.getByText(/About/i)).toBeInTheDocument()

  const leftClick = { button: 0 }
  userEvent.click(screen.getByText(/About/i), leftClick)

  expect(screen.getByText(/About Page/i)).toBeInTheDocument()
})


test("navigating to Sign Up Page and clicking submit returning error ", async () => {

  server.use(
    rest.post('http://localhost:8000/user/create/', (req, res, ctx) => {
      return res(ctx.json({ details: 'fields should not be empty' }),ctx.status(400))
    })
  )


  renderWithRouter(<App/>,{route:'/signup/'})


  const leftClick = { button: 0 };
  const click=document.getElementById('userSubmit');

  userEvent.click(click, leftClick);

  await waitFor(()=> screen.getByText('{"details":"fields should not be empty"}'))
});



test("navigating to Sign Up Page and clicking submit faking sucess ", async () => {

  server.use(
    rest.post('http://localhost:8000/user/create/', (req, res, ctx) => {
      return res(ctx.json({ details: 'ok ' }),ctx.status(201))
    })
  )
    // above should set state message: created sucessfully

  renderWithRouter(<App/>,{route:'/signup/'})

  const leftClick = { button: 0 };
  const click=document.getElementById('userSubmit');

  userEvent.click(click, leftClick);

  await waitFor(()=> screen.getByText('created sucessfully'))
});


test("navigating to Sign Up Page and clicking submit with errors ", async () => {

  server.use(
    rest.post('http://localhost:8000/api/token/', (req, res, ctx) => {
      return res(ctx.json({ details: 'some error ' }),ctx.status(400))
    })
  )
    // above should set state message: created sucessfully

  renderWithRouter(<App/>,{route:'/login/'})

  const leftClick = { button: 0 };
  const click=document.getElementById('userSubmit');

  userEvent.click(click, leftClick);

  await waitFor(()=> screen.getByText('{"details":"some error "}'))
});





const renderWithRouter = (ui, { route = '/' } = {}) => {
  window.history.pushState({}, 'Test page', route)

  return render(ui, { wrapper: BrowserRouter })
}


