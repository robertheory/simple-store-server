import { prisma } from '../../prisma';
import { kafkaConsumer } from '../kafka.consumer';

type Product = {
	id: string;
	name: string;
	price: number;
};

export async function createProductConsumer() {
	console.log('PRODUCT_CREATED');
	const consumer = await kafkaConsumer('PRODUCT_CREATED');

	await consumer.run({
		eachMessage: async ({ message }) => {
			const messageToString = message.value!.toString();
			console.log(messageToString);
			const { id, name, price } = JSON.parse(messageToString) as Product;

			await prisma.product.create({
				data: {
					id,
					name,
					price,
				},
			});
		},
	});
}

createProductConsumer();
