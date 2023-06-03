import { FastifyInstance } from 'fastify';
import { prisma } from '../lib/prisma';
import { z } from 'zod';
import { KafkaSendMessage } from '../lib/kafka/producer';

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
			description: z.string(),
			quantity: z.number().int(),
		});

		const { id } = paramsSchema.parse(request.params);

		const { name, price, description, quantity } = bodySchema.parse(
			request.body
		);

		const newProduct = await prisma.product.update({
			where: {
				id,
			},
			data: {
				name,
				price,
				description,
				quantity,
			},
		});

		const kafkaProducer = new KafkaSendMessage();

		await kafkaProducer.execute('PRODUCT_UPDATED', newProduct);

		return newProduct;
	});

	app.post('/product', async (request) => {
		const bodySchema = z.object({
			name: z.string(),
			price: z.number(),
			description: z.string(),
			quantity: z.number().int(),
		});

		const { name, price, description, quantity } = bodySchema.parse(request.body);

		const product = await prisma.product.create({
			data: {
				name,
				price,
				description,
				quantity,
			},
		});

		const kafkaProducer = new KafkaSendMessage();

		await kafkaProducer.execute('PRODUCT_CREATED', product);

		return product;
	});

	app.delete('/product/:id', async (request) => {
		const paramsSchema = z.object({
			id: z.string().uuid(),
		});

		const { id } = paramsSchema.parse(request.params);

		const product = await prisma.product.findFirstOrThrow({
			where: {
				id,
			},
		});

		await prisma.product.delete({
			where: {
				id: product.id,
			},
		});

		const kafkaProducer = new KafkaSendMessage();

		await kafkaProducer.execute('PRODUCT_DELETED', product);
	});
}
