import { FastifyInstance } from 'fastify';
import { prisma } from '../lib/prisma';
import { z } from 'zod';
import { KafkaSendMessage } from '../lib/kafka/producer';

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

		const kafkaProducer = new KafkaSendMessage();

		await kafkaProducer.execute('CUSTOMER_CREATED', customer);

		return customer;
	});

	app.put('/customer/:id', async (request) => {
		const paramsSchema = z.object({
			id: z.string(),
		});

		const { id } = paramsSchema.parse(request.params);

		const bodySchema = z.object({
			name: z.string(),
			cpf: z.string(),
			email: z.string().email(),
		});

		const { name, cpf, email } = bodySchema.parse(request.body);

		const customer = await prisma.customer.update({
			where: {
				id,
			},
			data: {
				name,
				cpf,
				email,
			},
		});

		const kafkaProducer = new KafkaSendMessage();

		await kafkaProducer.execute('CUSTOMER_UPDATED', customer);

		return customer;
	});

	app.delete('/customer/:id', async (request) => {
		const paramsSchema = z.object({
			id: z.string(),
		});

		const { id } = paramsSchema.parse(request.params);

		const customer = await prisma.customer.findFirstOrThrow({ where: { id } });

		await prisma.customer.delete({
			where: {
				id: customer.id,
			},
		});

		const kafkaProducer = new KafkaSendMessage();

		await kafkaProducer.execute('CUSTOMER_DELETED', customer);

		return customer;
	});
}
