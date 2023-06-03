import { prisma } from '../../prisma';
import { kafkaConsumer } from '../kafka.consumer';

type Customer = {
	id: string;
	name: string;
	cpf: string;
};

export async function createCustomerConsumer() {
	console.log('CUSTOMER_CREATED');
	const consumer = await kafkaConsumer('CUSTOMER_CREATED');

	await consumer.run({
		eachMessage: async ({ message }) => {
			const messageToString = message.value!.toString();
			console.log(messageToString);

			const { cpf, id, name } = JSON.parse(messageToString) as Customer;

			await prisma.customer.create({
				data: {
					id,
					cpf,
					name,
				},
			});
		},
	});
}

createCustomerConsumer();
