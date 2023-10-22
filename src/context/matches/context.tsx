/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useReducer } from "react";
import { reducer, initialState, MatchState, MatchActions } from "./reducer";

const MatchStateContext = createContext<MatchState | undefined>(undefined);

type MatchDispatch = React.Dispatch<MatchActions>;

const MatchDispatchContext = createContext<MatchDispatch | undefined>(
  undefined,
);

export const MatchProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <MatchStateContext.Provider value={state}>
      <MatchDispatchContext.Provider value={dispatch}>
        {children}
      </MatchDispatchContext.Provider>
    </MatchStateContext.Provider>
  );
};

export const useMatchState = () => useContext(MatchStateContext);
export const useMatchDispatch = () => useContext(MatchDispatchContext);
