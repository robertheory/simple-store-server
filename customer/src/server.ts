import fastify from 'fastify';
import { customerRoutes } from './routes/customer';
import cors from '@fastify/cors';

const app = fastify();

app.register(cors, {
	origin: true,
});

app.register(customerRoutes);

app.get('/', () => '<h1>Hello from Customer</h1>');

app
	.listen({
		port: 3333,
	})
	.then(() => console.log('Listening on http://localhost:3333'));
