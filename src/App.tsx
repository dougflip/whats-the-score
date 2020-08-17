import React, { useState, ReactNode } from "react";

import "./app.css";
import { RosterPage } from "./roster/roster-page";
import { ScoreKeeperPage } from "./score-keeper/score-keeper-page";
import { AppPages } from "./types";

function renderPage(
  page: AppPages,
  mapper: { [key in AppPages]: () => ReactNode }
): ReactNode {
  return mapper[page]();
}

function App() {
  const [currentPage, setCurrentPage] = useState<AppPages>(AppPages.Roster);
  return (
    <div className="app">
      {renderPage(currentPage, {
        [AppPages.Roster]: () => (
          <RosterPage
            onSubmitRoster={() => setCurrentPage(AppPages.ScoreKeeper)}
          />
        ),
        [AppPages.ScoreKeeper]: () => <ScoreKeeperPage />,
      })}
    </div>
  );
}

export default App;
