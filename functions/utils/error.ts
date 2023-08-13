import type { NitroErrorHandler } from "nitropack";

export default <NitroErrorHandler>function (err, event) {
  const response = {
    code: err.statusCode || 500,
    success: false,
    message: err.message || "Internal Server Error",
  };
  event.res.statusCode = err.statusCode || 500;

  event.res
    .setHeader("Content-Type", "application/json")
    .end(JSON.stringify(response));
};
