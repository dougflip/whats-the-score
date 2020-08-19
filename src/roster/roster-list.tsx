import React, { FC, FormEvent, useState } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "react-beautiful-dnd";

import { Roster } from "../types";

import "./roster-list.css";

type RosterListAction = (name: string) => void;

interface RosterListProps {
  players: Roster;
  onAddPlayer: RosterListAction;
  onRemovePlayer: RosterListAction;
  onReorderPlayer: (currentIndex: number, destinationIndex: number) => void;
}

interface PlayerRowProps {
  name: string;
  onRemovePlayer: RosterListAction;
}

const PlayerRow: FC<PlayerRowProps> = (props) => {
  const { name, onRemovePlayer } = props;
  return (
    <div className="players-player-row">
      <span>{name}</span>
      <button onClick={() => onRemovePlayer(name)}>delete</button>
    </div>
  );
};

export const RosterList: FC<RosterListProps> = (props) => {
  const { players, onAddPlayer, onRemovePlayer, onReorderPlayer } = props;
  const [newName, setNewName] = useState("");
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!newName) {
      return;
    }

    onAddPlayer(newName);
    setNewName("");
  };

  const handleDragEnd = (result: DropResult) => {
    if (result.destination) {
      onReorderPlayer(result.source.index, result.destination?.index);
    }
  };

  return (
    <div className="roster-list">
      <form onSubmit={handleSubmit} data-testid="playersAddPlayer">
        <input
          className="roster-list-add-input"
          value={newName}
          placeholder="Enter a name..."
          onChange={(e) => setNewName(e.target.value)}
        />
      </form>
      <div className="roster-list-players">
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="droppable">
            {(provided, snapshot) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {players.map((player, index) => (
                  <Draggable
                    key={player.name}
                    draggableId={player.name}
                    index={index}
                  >
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <PlayerRow
                          name={player.name}
                          onRemovePlayer={onRemovePlayer}
                        />
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </div>
  );
};
