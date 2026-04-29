import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import { handleContactRequest } from "./api/contact.js";

const createHeaders = (requestHeaders) => {
  const headers = new Headers();

  for (const [key, value] of Object.entries(requestHeaders)) {
    if (Array.isArray(value)) {
      for (const item of value) {
        headers.append(key, item);
      }

      continue;
    }

    if (value !== undefined) {
      headers.set(key, value);
    }
  }

  return headers;
};

const readRequestBody = async (request) => {
  const chunks = [];

  for await (const chunk of request) {
    chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
  }

  return Buffer.concat(chunks);
};

const contactApiPlugin = (environment) => {
  return {
    name: "contact-api-dev",
    apply: "serve",
    configureServer(server) {
      server.middlewares.use("/api/contact", async (req, res) => {
        const method = req.method || "GET";
        const url = new URL(req.url || "/api/contact", "http://127.0.0.1");
        const body =
          method === "GET" || method === "HEAD"
            ? undefined
            : await readRequestBody(req);

        try {
          const response = await handleContactRequest(
            new Request(url, {
              method,
              headers: createHeaders(req.headers),
              body: body?.length ? body : undefined,
            }),
            environment,
          );

          res.statusCode = response.status;
          response.headers.forEach((value, key) => {
            res.setHeader(key, value);
          });

          const responseBody = Buffer.from(await response.arrayBuffer());
          res.end(responseBody);
        } catch (error) {
          res.statusCode = 500;
          res.setHeader("Content-Type", "application/json");
          res.end(
            JSON.stringify({
              error: error.message || "Unexpected contact API error.",
            }),
          );
        }
      });
    },
  };
};

export default defineConfig(({ mode }) => {
  const environment = {
    ...process.env,
    ...loadEnv(mode, process.cwd(), ""),
  };

  return {
    plugins: [react(), contactApiPlugin(environment)],
    optimizeDeps: {
      exclude: ["eslint"],
    },
    ssr: {
      external: ["eslint"],
    },
  };
});
