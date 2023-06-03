import { Kafka } from 'kafkajs';

export const kafka = new Kafka({
	brokers: ['choice-piglet-12088-us1-kafka.upstash.io:9092'],
	sasl: {
		mechanism: 'scram-sha-256',
		username: String(process.env.KAFKA_USERNAME),
		password: String(process.env.KAFKA_PASSWORD),
	},
	ssl: true,
});
