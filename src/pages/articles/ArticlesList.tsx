/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { fetchArticles } from "../../context/articles/actions";
import { useArticleDispatch } from "../../context/articles/context";

import { fetchSports } from "../../context/sports/actions";
import { useSportDispatch, useSportState } from "../../context/sports/context";
import ArticlesListItems from "./ArticlesListItems";

const ArticlesList: React.FC = () => {
  const dispatchArticles = useArticleDispatch();

  useEffect(() => {
    fetchArticles(dispatchArticles);
  }, []);

  const dispatchSports = useSportDispatch();

  useEffect(() => {
    fetchSports(dispatchSports);
  }, []);

  const state: any = useSportState();
  console.log(state);
  const { sports } = state;
  console.log(sports);
  console.log(Array.isArray(sports));

  return (
    <div>
      <ArticlesListItems sports={sports} />
    </div>
  );
};

export default ArticlesList;
