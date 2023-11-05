import { Sport } from "../sports/reducer";
import { Team } from "../teams/reducer";

export interface Preference {
  favoriteSports: Sport[];
  favoriteTeams: Team[];
}

export interface PreferenceState {
  preferences: Preference[];
  isLoading: boolean;
  isError: boolean;
  errorMessage: string;
}

export type PreferenceActions =
  | { type: "FETCH_PREFERENCE_REQUEST" }
  | { type: "FETCH_PREFERENCE_SUCCESS"; payload: Preference[] }
  | { type: "FETCH_PREFERENCE_FAILURE"; payload: string };

export const initialState: PreferenceState = {
  preferences: [],
  isLoading: false,
  isError: false,
  errorMessage: "",
};

export const reducer = (
  state: PreferenceState = initialState,
  action: PreferenceActions,
): PreferenceState => {
  switch (action.type) {
    case "FETCH_PREFERENCE_REQUEST":
      return {
        ...state,
        isLoading: true,
      };
    case "FETCH_PREFERENCE_SUCCESS":
      return {
        ...state,
        isLoading: false,
        preferences: action.payload,
      };
    case "FETCH_PREFERENCE_FAILURE":
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
