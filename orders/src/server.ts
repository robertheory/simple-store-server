import fastify from 'fastify';
import { ordersRoutes } from './routes/orders';
import cors from '@fastify/cors';

const app = fastify();

app.register(ordersRoutes);

app.register(cors, {
	origin: true,
});

app
	.listen({
		port: 3333,
	})
	.then(() => console.log('Listening on http://localhost:3333'));
