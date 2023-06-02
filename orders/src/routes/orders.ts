import { FastifyInstance } from 'fastify';
import { prisma } from '../lib/prisma';
import { z } from 'zod';

export async function ordersRoutes(app: FastifyInstance) {
	app.get('/orders', async () => {
		const orders = await prisma.order.findMany();

		return orders;
	});

	app.get('/order/:id', async (request) => {
		const paramsSchema = z.object({
			id: z.number(),
		});

		const { id } = paramsSchema.parse(request.params);

		const order = await prisma.order.findUniqueOrThrow({
			where: {
				id,
			},
		});

		return order;
	});

	app.post('/order', async (request) => {
		const bodySchema = z.object({
			customerId: z.string().uuid(),
			productsIds: z.array(z.string()),
		});

		const { customerId, productsIds } = bodySchema.parse(request.body);

		const order = await prisma.order.create({
			data: {
				customer: {
					connect: {
						id: customerId,
					},
				},
				OrderProducts: {
					createMany: {
						data: productsIds.map((id) => ({ productId: id })),
					},
				},
			},
		});

		return order;
	});

	app.delete('/order/:id', async (request) => {
		const paramsSchema = z.object({
			id: z.number(),
		});

		const { id } = paramsSchema.parse(request.params);

		await prisma.order.delete({
			where: {
				id,
			},
		});
	});
}
