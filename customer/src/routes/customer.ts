import { FastifyInstance } from 'fastify';
import { prisma } from '../lib/prisma';
import { z } from 'zod';

export async function customerRoutes(app: FastifyInstance) {
	app.get('/customers', async () => {
		const customers = await prisma.customer.findMany();

		return customers;
	});

	app.get('/customer/:id', async (request) => {
		const paramsSchema = z.object({
			id: z.string(),
		});

		const { id } = paramsSchema.parse(request.params);

		const order = await prisma.customer.findUniqueOrThrow({
			where: {
				id,
			},
		});

		return order;
	});

	app.post('/customer', async (request) => {
		const bodySchema = z.object({
			name: z.string(),
			cpf: z.string(),
			email: z.string().email(),
		});

		const { name, cpf, email } = bodySchema.parse(request.body);

		const customer = await prisma.customer.create({
			data: {
				name,
				cpf,
				email,
			},
		});

		return customer;
	});

	app.delete('/customer/:id', async (request) => {
		const paramsSchema = z.object({
			id: z.string(),
		});

		const { id } = paramsSchema.parse(request.params);

		await prisma.customer.delete({
			where: {
				id,
			},
		});
	});
}
