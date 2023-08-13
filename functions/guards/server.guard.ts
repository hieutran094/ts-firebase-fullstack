import { H3Event } from "h3";
import ResponseError from "../utils/responseError";
const middleware = (event: H3Event) => {
  try {
    const token = event.req.headers["x-header-key"];
    if (token !== process.env.NITRO_APP_HEADER_KEY)
      throw new ResponseError({
        statusCode: 401,
        message: `Invalid token`,
      });
  } catch (e) {
    throw e;
  }
};

export default middleware;
