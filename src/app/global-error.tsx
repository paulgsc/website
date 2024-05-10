"use client";

import { FC } from "react";

const GlobalErrorPage: FC<{ error: Error }> = ({ error }) => {
  // @todo: implement our own sentry error handling
  // captureException(error);

  return (
    <html>
      <body>
        <main>
          500
          <h1 className="special -mt-4">Internal Server Error</h1>
          <p className="-mt-4 max-w-sm text-center text-lg">
            This page has thrown a non-recoverable error.
          </p>
          Back to Home
        </main>
      </body>
    </html>
  );
};

export default GlobalErrorPage;
