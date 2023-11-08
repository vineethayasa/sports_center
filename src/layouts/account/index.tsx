import { Outlet } from "react-router-dom";
import React, { Suspense } from "react";
const Appbar = React.lazy(() => import("./Appbar"));
import ErrorBoundary from "../../components/ErrorBoundary";

const AccountLayout = () => {
  return (
    <>
      <ErrorBoundary>
        <Suspense fallback={<div className="suspense-loading">Loading...</div>}>
          <Appbar />
        </Suspense>
      </ErrorBoundary>
      <main>
        <div className="mx-auto py-6 sm:px-6 lg:px-8">
          <Outlet />
        </div>
      </main>
    </>
  );
};

export default AccountLayout;
