import { prisma } from '../../prisma';
import { kafkaConsumer } from '../kafka.consumer';

type Product = {
	id: string;
	name: string;
	price: number;
};

export async function updateProductConsumer() {
	console.log('PRODUCT_UPDATED');
	const consumer = await kafkaConsumer('PRODUCT_UPDATED');

	await consumer.run({
		eachMessage: async ({ message }) => {
			const messageToString = message.value!.toString();
			console.log(messageToString);

			const { id, name, price } = JSON.parse(messageToString) as Product;

			await prisma.product.update({
				where: {
					id,
				},
				data: {
					name,
					price,
				},
			});
		},
	});
}

updateProductConsumer();
