import React from "react";
import { RecoilRoot } from "recoil";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";

function addPlayer(name: string): void {
  userEvent.type(screen.getByRole("textbox"), name);
  fireEvent.submit(screen.getByTestId("playersAddPlayer"));
}

const deletePlayerAtIndex = (index: number): void =>
  userEvent.click(screen.getAllByRole("button", { name: /delete/i })[index]);

describe("App", () => {
  it("adds and removes players from the roster", () => {
    render(
      <RecoilRoot>
        <App />
      </RecoilRoot>
    );

    addPlayer("Doug");
    addPlayer("Dave");

    expect(screen.queryByText("Doug")).toBeInTheDocument();
    expect(screen.queryByText("Dave")).toBeInTheDocument();

    deletePlayerAtIndex(0);
    expect(screen.queryByText("Doug")).not.toBeInTheDocument();
    expect(screen.queryByText("Dave")).toBeInTheDocument();

    deletePlayerAtIndex(0);
    expect(screen.queryByText("Dave")).not.toBeInTheDocument();
  });
});
