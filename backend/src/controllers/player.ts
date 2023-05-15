import { Request, Response } from 'express-serve-static-core';
import client from '../db';


const getPaginatedPlayers = async (req: Request, res: Response) => {
	const { page = 0, rowsPerPage = 5 } = req.query;

	const offset = parseInt(page as string, 10) * parseInt(rowsPerPage as string, 10);
	const limit = parseInt(rowsPerPage as string, 10);
	const playersQuery = `
    SELECT * FROM players
    ORDER BY name ASC
    OFFSET $1
    LIMIT $2;
  `;

	const countQuery = 'SELECT COUNT(*) FROM players;';

	try {
		const playersResult = await client.query(playersQuery, [offset, limit]);
		const countResult = await client.query(countQuery);
		const players = playersResult.rows;
		const totalCount = parseInt(countResult.rows[0].count, 10);
		res.json({ players, totalCount });
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: 'An error occurred while fetching players.' });
	}
}

const addPlayer = async (req: Request, res: Response) => {
	const { name, height, weight, college, birth_city, birth_state, year_start, year_end, position, birth_date } = req.body;

	const insertQuery = `
    INSERT INTO players (name, height, weight, college, birth_city, birth_state, year_start, year_end, position, birth_date)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10::DATE)
    RETURNING *;
  `;

	try {
		const result = await client.query(insertQuery, [name, height, weight, college, birth_city, birth_state, year_start, year_end, position, birth_date]);
		const newPlayer = result.rows[0];

		res.status(201).json(newPlayer);
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: 'An error occurred while adding a player.' });
	}
}

const deletePlayer = async (req: Request, res: Response) => {
	const { id } = req.params;

	const deleteQuery = 'DELETE FROM players WHERE id = $1;';

	try {
		await client.query(deleteQuery, [id]);

		res.status(204).send();
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: 'An error occurred while deleting a player.' });
	}
}

export { getPaginatedPlayers, addPlayer, deletePlayer }