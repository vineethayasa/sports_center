/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { useArticleState } from "../../context/articles/context";
import Articles from "./Article";
import { Sport } from "../../context/sports/reducer";
import { Article } from "../../context/articles/reducer";

interface Props {
  sports: Sport[];
}

const ArticlesListItems: React.FC<Props> = ({ sports }) => {
  const state: any = useArticleState();

  const { articles, isLoading, isError, errorMessage } = state;
  const [selectedSport, setSelectedSport] = useState<number | null>(null);

  const filteredArticles = selectedSport
    ? articles.filter((article: Article) => article.sport.id === selectedSport)
    : articles;

  return (
    <>
      <div>
        <button
          key="your-news"
          onClick={() => setSelectedSport(null)}
          className={`px-4 py-2 ${
            selectedSport === null
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-800"
          }`}
        >
          Your News
        </button>
        {sports.map((sport) => (
          <button
            key={sport.id}
            onClick={() => setSelectedSport(sport.id)}
            className={`px-4 py-2 ${
              selectedSport === sport.id
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-800"
            }`}
          >
            {sport.name}
          </button>
        ))}
      </div>
      {isLoading ? (
        <span>Loading...</span>
      ) : isError ? (
        <span>{errorMessage}</span>
      ) : (
        <>
          {filteredArticles.map((article: Article) => (
            <div
              key={article.id}
              className="member block mb-2 p-5 bg-white border border-gray-200 rounded-lg shadow hover-bg-gray-100"
            >
              <div className="flex justify-between items-center">
                <div>
                  <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900">
                    {article.title}
                  </h5>
                  <h1 className="text-l font-medium">
                    Date: {article.date.slice(0, 10)}
                  </h1>
                  <span>{article.summary}</span>
                </div>
                <div>
                  {article.thumbnail && (
                    <img
                      src={article.thumbnail}
                      alt={article.title}
                      className="w-28 h-28"
                    />
                  )}
                </div>
              </div>
              <Articles article={article} />
            </div>
          ))}
          {filteredArticles.length === 0 && (
            <div className="text-red-500 text-lg font-bold mt-4">
              <p>No data</p>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default ArticlesListItems;
