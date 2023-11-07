/* eslint-disable @typescript-eslint/no-explicit-any */
import { API_ENDPOINT } from "../../config/constants";
import { Match } from "./reducer";

export const fetchMatches = async (dispatch: any) => {
  const token = localStorage.getItem("authToken") ?? "";
  try {
    dispatch({ type: "FETCH_MATCH_REQUEST" });
    const response = await fetch(`${API_ENDPOINT}/matches`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    const matches: Match[] = data.matches;
    // console.log(matches);
    dispatch({ type: "FETCH_MATCH_SUCCESS", payload: matches });
  } catch (error) {
    console.log("Error fetching matches:", error);
    dispatch({
      type: "FETCH_MATCH_FAILURE",
      payload: "Unable to load matches",
    });
  }
};

export const fetchMatchById = async (id: number) => {
  const token = localStorage.getItem("authToken") ?? "";
  try {
    const response = await fetch(`${API_ENDPOINT}/matches/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    // console.log(data.score);
    return data;
  } catch (error) {
    console.log("Error fetching match:", error);
  }
};
