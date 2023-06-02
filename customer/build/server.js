"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// src/server.ts
var import_fastify = __toESM(require("fastify"));

// src/lib/prisma.ts
var import_client = require("@prisma/client");
var prisma = new import_client.PrismaClient({
  log: ["query"]
});

// src/routes/customer.ts
var import_zod = require("zod");
async function customerRoutes(app2) {
  app2.get("/customers", async () => {
    const customers = await prisma.customer.findMany();
    return customers;
  });
  app2.get("/customer/:id", async (request) => {
    const paramsSchema = import_zod.z.object({
      id: import_zod.z.string()
    });
    const { id } = paramsSchema.parse(request.params);
    const order = await prisma.customer.findUniqueOrThrow({
      where: {
        id
      }
    });
    return order;
  });
  app2.post("/customer", async (request) => {
    const bodySchema = import_zod.z.object({
      name: import_zod.z.string(),
      cpf: import_zod.z.string(),
      email: import_zod.z.string().email()
    });
    const { name, cpf, email } = bodySchema.parse(request.body);
    const customer = await prisma.customer.create({
      data: {
        name,
        cpf,
        email
      }
    });
    return customer;
  });
  app2.delete("/customer/:id", async (request) => {
    const paramsSchema = import_zod.z.object({
      id: import_zod.z.string()
    });
    const { id } = paramsSchema.parse(request.params);
    await prisma.customer.delete({
      where: {
        id
      }
    });
  });
}

// src/server.ts
var import_cors = __toESM(require("@fastify/cors"));
var app = (0, import_fastify.default)();
app.register(import_cors.default, {
  origin: true
});
app.register(customerRoutes);
app.get("/", () => "<h1>Hello from Customer</h1>");
app.listen({
  port: 3333
}).then(() => console.log("Listening on http://localhost:3333"));
