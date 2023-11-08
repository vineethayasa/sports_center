import React, { Suspense } from "react";
const ArticlesList = React.lazy(() => import("./ArticlesList"));
const Favorites = React.lazy(() => import("./Favorites"));
import ErrorBoundary from "../../components/ErrorBoundary";

const Articles = () => {
  return (
    <div className="flex">
      <div className="w-3/4">
        <div>
          <h2 className="text-2xl font-bold mb-2 mt-2">Trending News</h2>
        </div>
        <ErrorBoundary>
          <Suspense
            fallback={<div className="suspense-loading">Loading...</div>}
          >
            <ArticlesList />
          </Suspense>
        </ErrorBoundary>
      </div>
      <div className="w-1/4">
        {/* <ErrorBoundary> */}
          <Suspense
            fallback={<div className="suspense-loading">Loading...</div>}
          >
            <Favorites />
          </Suspense>
        {/* </ErrorBoundary> */}
      </div>
    </div>
  );
};

export default Articles;
