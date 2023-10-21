/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { fetchArticles } from "../../context/articles/actions";
import { useArticleDispatch } from "../../context/articles/context";
import ArticlesListItems from "./ArticlesListItems";

const ArticlesList: React.FC = () => {
  const dispatchArticles = useArticleDispatch();

  useEffect(() => {
    fetchArticles(dispatchArticles);
  }, []);

  return (
    <div>
      <ArticlesListItems />
    </div>
  );
};

export default ArticlesList;
