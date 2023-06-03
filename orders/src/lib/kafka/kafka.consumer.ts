import { kafka } from '.';

export const kafkaConsumer = async (topic: string) => {
	const consumer = kafka.consumer({
		groupId: 'ORDER_SERVICE',
	});

	await consumer.connect();

	consumer.subscribe({
		topic,
		fromBeginning: false,
	});

	return consumer;
};
