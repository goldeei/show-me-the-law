import Fastify from "fastify";
import {
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from "@fastify/type-provider-zod";
import { env } from "./env.js";

// TODO: register statutesRoutes once packages/db lands (05-scaffold-setup.md §6)
export function buildApp() {
  const app = Fastify({
    logger:
      env.NODE_ENV === "production"
        ? true
        : { transport: { target: "pino-pretty" } },
  }).withTypeProvider<ZodTypeProvider>();

  app.setValidatorCompiler(validatorCompiler);
  app.setSerializerCompiler(serializerCompiler);

  app.get("/health", async () => ({ status: "ok" }));

  return app;
}
