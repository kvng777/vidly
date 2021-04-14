//1. import sentry from @sentry/react
// 2. Import integrations from @sentry/tracing
// 3. function init() to initialize sentry service
// 4. function log(); to log the error to sentry
// 5. export the functions init and log

// import * as Sentry from "@sentry/react";
// import { Integrations } from "@sentry/tracing";

function init() {
  //   Sentry.init({
  //     dsn:
  //       "https://e50d4ab0f57b460fa8117b1ad447658e@o568129.ingest.sentry.io/5712885",
  //     integrations: [new Integrations.BrowserTracing()],
  //     release: "1-0-0" + process.env.npm_package_version,
  //     tracesSampleRate: 1.0
  //   });
}

function log(error) {
  console.log(error);
}

export default {
  init,
  log
};
