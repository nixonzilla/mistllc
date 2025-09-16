import { MiddlewareHandler } from "hono";

/**
 * Safe body size limit middleware.
 * Rejects requests larger than `maxSize` (in bytes).
 */
export const bodyLimit = (maxSize: number): MiddlewareHandler => {
  return async (c, next) => {
    const contentLength = c.req.header("content-length");

    // If client declares payload too large, reject early
    if (contentLength && Number(contentLength) > maxSize) {
      return c.text("Payload too large", 413); // HTTP 413
    }

    // Stream the body and enforce size limit
    let size = 0;
    const reader = c.req.raw.body?.getReader();
    if (reader) {
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        size += value.length;
        if (size > maxSize) {
          return c.text("Payload too large", 413);
        }
      }
    }

    return next();
  };
};
// File: output
// --- a/vscode-scm:git/scm0/output?rootUri%3Dfile%253A%252F%252F%252Fc%25253A%252FUsers%252FHP%252FOneDrive%252FDocuments%252FGitHub%252Fmistllc
// +++ b/vscode-scm:git/scm0/output?rootUri%3Dfile%253A%252F%252F%252Fc%25253A%252FUsers%252FHP%252FOneDrive%252FDocuments%252FGitHub%252Fmistllc
// @@ -1,1 +1,1 @@
// +
// -Merge branch 'main' of
