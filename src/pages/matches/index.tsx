import React, { Suspense } from "react";
const MatchesList = React.lazy(() => import("./MatchesList"));
import ErrorBoundary from "../../components/ErrorBoundary";

const Matches = () => {
  return (
    <>
      <div>
        <h2 className="text-2xl font-bold ml-2">Matches</h2>
      </div>
      <ErrorBoundary>
        <Suspense fallback={<div className="suspense-loading">Loading...</div>}>
          <MatchesList />
        </Suspense>
      </ErrorBoundary>
    </>
  );
};
export default Matches;
