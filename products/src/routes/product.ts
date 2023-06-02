import { FastifyInstance } from 'fastify';
import { prisma } from '../lib/prisma';
import { z } from 'zod';

export async function productsRoutes(app: FastifyInstance) {
	app.get('/products', async () => {
		const products = await prisma.product.findMany();

		return products;
	});

	app.get('/product/:id', async (request) => {
		const paramsSchema = z.object({
			id: z.string().uuid(),
		});

		const { id } = paramsSchema.parse(request.params);

		const product = await prisma.product.findUniqueOrThrow({
			where: {
				id,
			},
		});

		return product;
	});

	app.put('/product/:id', async (request) => {
		const paramsSchema = z.object({
			id: z.string().uuid(),
		});

		const bodySchema = z.object({
			name: z.string(),
			price: z.number(),
		});

		const { id } = paramsSchema.parse(request.params);

		const { name, price } = bodySchema.parse(request.body);

		const newProduct = await prisma.product.update({
			where: {
				id,
			},
			data: {
				name,
				price,
			},
		});

		return newProduct;
	});

	app.post('/product', async (request) => {
		const bodySchema = z.object({
			name: z.string(),
			price: z.number(),
		});

		const { name, price } = bodySchema.parse(request.body);

		const product = await prisma.product.create({
			data: {
				name,
				price,
			},
		});

		return product;
	});

	app.delete('/product/:id', async (request) => {
		const paramsSchema = z.object({
			id: z.string().uuid(),
		});

		const { id } = paramsSchema.parse(request.params);

		await prisma.product.delete({
			where: {
				id,
			},
		});
	});
}
