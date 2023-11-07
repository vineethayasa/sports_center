/* eslint-disable @typescript-eslint/no-explicit-any */
import { API_ENDPOINT } from "../../config/constants";
import { Sport } from "./reducer";

export const fetchSports = async (dispatch: any) => {
  const token = localStorage.getItem("authToken") ?? "";
  try {
    dispatch({ type: "FETCH_SPORT_REQUEST" });
    const response = await fetch(`${API_ENDPOINT}/sports`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    // console.log(data);
    const sports: Sport[] = data.sports;
    // console.log(sports);

    dispatch({ type: "FETCH_SPORT_SUCCESS", payload: sports });
  } catch (error) {
    console.log("Error fetching sports:", error);
    dispatch({
      type: "FETCH_SPORT_FAILURE",
      payload: "Unable to load sports",
    });
  }
};
