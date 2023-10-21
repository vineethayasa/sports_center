/* eslint-disable @typescript-eslint/no-explicit-any */
import { useArticleState } from "../../context/articles/context";
import Articles from "./Article";

export default function ArticlesListItems() {
  const state: any = useArticleState();
  console.log(state);
  const { articles, isLoading, isError, errorMessage } = state;
  console.log(state);

  if (articles.length === 0 && isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>{errorMessage}</span>;
  }

  return (
    <>
      {articles.map((article: any) => (
        <div
          key={article.id}
          className="member block mb-2 p-5 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100"
        >
          <div className="flex justify-between items-center">
            <div>
              <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900">
                {article.title}
              </h5>
              <h1 className="text-l font-medium">
                {" "}
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
    </>
  );
}
