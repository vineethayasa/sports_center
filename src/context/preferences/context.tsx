/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useReducer } from "react";
import {
  reducer,
  initialState,
  PreferenceState,
  PreferenceActions,
} from "./reducer";

const PreferenceStateContext = createContext<PreferenceState | undefined>(
  undefined,
);

type PreferenceDispatch = React.Dispatch<PreferenceActions>;

const PreferenceDispatchContext = createContext<PreferenceDispatch | undefined>(
  undefined,
);

export const PreferenceProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <PreferenceStateContext.Provider value={state}>
      <PreferenceDispatchContext.Provider value={dispatch}>
        {children}
      </PreferenceDispatchContext.Provider>
    </PreferenceStateContext.Provider>
  );
};

export const usePreferenceState = () => useContext(PreferenceStateContext);
export const usePreferenceDispatch = () =>
  useContext(PreferenceDispatchContext);
