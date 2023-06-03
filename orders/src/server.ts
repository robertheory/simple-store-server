import fastify from 'fastify';
import { ordersRoutes } from './routes/orders';
import cors from '@fastify/cors';
import './lib/kafka/consumers';

const app = fastify();

app.register(ordersRoutes);

app.register(cors, {
	origin: true,
});

app
	.listen({
		port: Number(process.env.PORT),
	})
	.then(() => console.log(`Listening on http://localhost:${process.env.PORT}`));
