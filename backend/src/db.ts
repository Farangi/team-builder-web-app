import { Client, Pool } from 'pg';

//Initialize Database
const client = new Client({
	user: process.env.POSTGRES_USER || 'postgres',
	host: process.env.POSTGRES_HOST || 'localhost',
	database: process.env.POSTGRES_DB || 'team_builder',
	password: process.env.POSTGRES_PASSWORD || 'pg_test',
	port: parseInt(process.env.POSTGRES_PORT as string, 10) || 5432
});

client.connect()
	.then(() => console.log("Database connected"))
	.catch(e => console.log(e))

export default client;
