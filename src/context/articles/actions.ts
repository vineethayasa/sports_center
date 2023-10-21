/* eslint-disable @typescript-eslint/no-explicit-any */
import { API_ENDPOINT } from "../../config/constants";

export const fetchArticles = async (dispatch: any) => {
  const token = localStorage.getItem("authToken") ?? "";
  try {
    dispatch({ type: "FETCH_ARTICLE_REQUEST" });
    const response = await fetch(`${API_ENDPOINT}/articles`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    dispatch({ type: "FETCH_ARTICLE_SUCCESS", payload: data });
  } catch (error) {
    console.log("Error fetching articles:", error);
    dispatch({
      type: "FETCH_ARTICLE_FAILURE",
      payload: "Unable to load articles",
    });
  }
};

export const fetchArticlebyId = async (id: number) => {
  const token = localStorage.getItem("authToken") ?? "";
  try {
    const response = await fetch(`${API_ENDPOINT}/articles/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    // console.log(data);
    return data;
  } catch (error) {
    console.log("Error fetching article:", error);
  }
};
