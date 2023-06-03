import fastify from 'fastify';
import { productsRoutes } from './routes/product';
import cors from '@fastify/cors';

const app = fastify();

app.register(productsRoutes);

app.register(cors, {
	origin: true,
});

app
	.listen({
		port: Number(process.env.PORT),
	})
	.then(() => console.log(`Listening on http://localhost:${process.env.PORT}`));
