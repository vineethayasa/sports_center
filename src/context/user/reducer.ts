import { Preference } from "../preferences/reducer";

export interface User {
  id: number;
  name: string;
  email: string;
  preferences: Preference;
}

export interface UserState {
  user?: User;
  isLoading: boolean;
  isError: boolean;
  errorMessage: string;
}

export type UserActions =
  | { type: "FETCH_USER_REQUEST" }
  | { type: "FETCH_USER_SUCCESS"; payload: User }
  | { type: "FETCH_USER_FAILURE"; payload: string };

export const initialState: UserState = {
  user: undefined,
  isLoading: false,
  isError: false,
  errorMessage: "",
};

export const reducer = (
  state: UserState = initialState,
  action: UserActions,
): UserState => {
  switch (action.type) {
    case "FETCH_USER_REQUEST":
      return {
        ...state,
        isLoading: true,
      };

    case "FETCH_USER_SUCCESS":
      return {
        ...state,
        isLoading: false,
        user: action.payload,
      };

    case "FETCH_USER_FAILURE":
      return {
        ...state,
        isLoading: false,
        isError: true,
        errorMessage: action.payload,
      };

    default:
      return state;
  }
};
