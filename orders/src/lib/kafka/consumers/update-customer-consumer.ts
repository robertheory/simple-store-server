import { prisma } from '../../prisma';
import { kafkaConsumer } from '../kafka.consumer';

type Customer = {
	id: string;
	name: string;
	cpf: string;
};

export async function updateCustomerConsumer() {
	console.log('CUSTOMER_UPDATED');
	const consumer = await kafkaConsumer('CUSTOMER_UPDATED');

	await consumer.run({
		eachMessage: async ({ message }) => {
			const messageToString = message.value!.toString();
			console.log(messageToString);

			const { id, name, cpf } = JSON.parse(messageToString) as Customer;

			await prisma.customer.update({
				where: {
					id,
				},
				data: {
					name,
					cpf,
				},
			});
		},
	});
}

updateCustomerConsumer();
