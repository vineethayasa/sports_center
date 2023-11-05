/* eslint-disable @typescript-eslint/no-explicit-any */
import { API_ENDPOINT } from "../../config/constants";

export const fetchPreferences = async (dispatch: any) => {
  const token = localStorage.getItem("authToken") ?? "";
  try {
    dispatch({ type: "FETCH_PREFERENCE_REQUEST" });
    const response = await fetch(`${API_ENDPOINT}/user/preferences`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    dispatch({ type: "FETCH_PREFERENCE_SUCCESS", payload: data });
  } catch (error) {
    console.log("Error fetching preferences:", error);
    dispatch({
      type: "FETCH_PREFERENCE_FAILURE",
      payload: "Unable to load preferences",
    });
  }
};
