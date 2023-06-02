"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/routes/customer.ts
var customer_exports = {};
__export(customer_exports, {
  customerRoutes: () => customerRoutes
});
module.exports = __toCommonJS(customer_exports);

// src/lib/prisma.ts
var import_client = require("@prisma/client");
var prisma = new import_client.PrismaClient({
  log: ["query"]
});

// src/routes/customer.ts
var import_zod = require("zod");
async function customerRoutes(app) {
  app.get("/customers", async () => {
    const customers = await prisma.customer.findMany();
    return customers;
  });
  app.get("/customer/:id", async (request) => {
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
  app.post("/customer", async (request) => {
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
  app.delete("/customer/:id", async (request) => {
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  customerRoutes
});
