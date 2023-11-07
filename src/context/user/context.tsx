/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useReducer } from "react";
import { initialState, reducer, UserActions, UserState } from "./reducer";

const UserStateContext = createContext<UserState>(initialState);

export type UserDispatch = React.Dispatch<UserActions>;
const UserDispatchContext = createContext<UserDispatch>(() => {});

export const UserProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <UserStateContext.Provider value={state}>
      <UserDispatchContext.Provider value={dispatch}>
        {children}
      </UserDispatchContext.Provider>
    </UserStateContext.Provider>
  );
};

export const useUserState = () => useContext(UserStateContext);
export const useUserDispatch = () => useContext(UserDispatchContext);
