/* eslint-disable @typescript-eslint/no-explicit-any */
import { Preference } from "./reducer";
import { PreferenceDispatch } from "./context";
import { API_ENDPOINT } from "../../config/constants";

export const fetchPreferences = async (dispatch: PreferenceDispatch) => {
  const token = localStorage.getItem("authToken");
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
    dispatch({ type: "FETCH_PREFERENCE_SUCCESS", payload: data.preferences });
  } catch (error) {
    console.log("Error fetching preferences:", error);
    dispatch({
      type: "FETCH_PREFERENCE_FAILURE",
      payload: "Unable to load preferences",
    });
  }
};

export const updatePreferences = async (
  dispatch: PreferenceDispatch,
  updatedPreferences: Preference,
) => {
  const token = localStorage.getItem("authToken") ?? "";
  try {
    dispatch({ type: "UPDATE_PREFERENCE_REQUEST" });

    const response = await fetch(`${API_ENDPOINT}/user/preferences`, {
      method: "PATCH",
      body: JSON.stringify({ preferences: updatedPreferences }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    dispatch({ type: "UPDATE_PREFERENCE_SUCCESS", payload: data.preferences });
  } catch (error) {
    console.error("Error updating preferences:", error);
  }
};
