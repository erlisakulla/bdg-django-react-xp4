import * as React from "react";
import * as ReactDOM from "react-dom";
import App from "../App";
import {createMemoryHistory} from "history";
import userEvent from "@testing-library/user-event";

import {rest} from 'msw'
import {setupServer} from 'msw/node'

import {render, fireEvent, waitFor, screen, getByText} from "@testing-library/react";

import "@testing-library/jest-dom/extend-expect";
import {act} from "react-dom/test-utils";
import {MemoryRouter, Router, BrowserRouter} from "react-router-dom";
import Player from "../components/Player/Player";

// declare which API requests to mock
const server = setupServer(
// capture "GET /greeting" requests
rest.get('/greeting', (req, res, ctx) => {
    // respond using a mocked JSON body
    return res(ctx.json({greeting: 'hello there'}))
}))

// establish API mocking before all tests
beforeAll(() => server.listen())
// reset any request handlers that are declared as a part of our tests (i.e. for
// testing one-time error scenarios)
afterEach(() => server.resetHandlers())
// clean up once the tests are done
afterAll(() => server.close())

describe("Rendering Player", () => {
    test("No authentication", () => {
        renderWithRouter(<App/>);
        expect(screen.getByText("Login")).toBeInTheDocument();
        expect(screen.getByText("Password")).toBeInTheDocument();
        expect(screen.getByRole("button")).toBeInTheDocument();
    });

    test("Rendering with fake authentication", () => {
        localStorage.setItem('access_token', 'another dummy token');
        renderWithRouter(<App/>);
        expect(screen.getByText("Hello")).toBeInTheDocument();
        expect(screen.getByText("Select Game")).toBeInTheDocument();
        expect(screen.getByRole("navigation")).toBeInTheDocument();
    });

    test("Get a user from server", async() => {

        server.use(rest.get('http://localhost:8000/user/info/', (req, res, ctx) => {
            return res(ctx.json({email: 'user@test.com'}))
        }));
        localStorage.setItem('access_token', 'another dummy token');
        renderWithRouter(<Player/>)
        await waitFor(() => screen.getByText(/user@test.com/i))

    });

    

});

const renderWithRouter = (ui, {
    route = "/player/"
} = {}) => {
    window
        .history
        .pushState({}, "11 ", route);
    return render(ui, {wrapper: BrowserRouter});
};