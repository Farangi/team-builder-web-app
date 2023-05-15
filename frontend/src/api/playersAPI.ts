import axios from 'axios';
import { BestPlayer, Player } from '../models/Player';

axios.defaults.baseURL = 'http://localhost:3001/api';

export async function getPaginatedPlayers(page: number, rowsPerPage: number): Promise<{ players: Player[]; totalCount: number }> {
	try {
		const response = await axios.get('/players', {
			params: {
				page,
				rowsPerPage,
			},
		});

		return {
			players: response.data.players,
			totalCount: response.data.totalCount,
		};
	} catch (error) {
		console.error(error);
		throw new Error('Failed to fetch players.');
	}
}

export async function addPlayer(player: Omit<Player, 'id'>): Promise<Player> {
	try {
		const response = await axios.post('/players', player);
		return response.data;
	} catch (error) {
		console.error(error);
		throw new Error('Failed to add player.');
	}
}

export async function deletePlayer(id: string): Promise<void> {
	try {
		await axios.delete(`/players/${id}`);
	} catch (error) {
		console.error(error);
		throw new Error('Failed to delete player.');
	}
}

export async function getOptimalTeam(sum: number): Promise<{ team: BestPlayer[] }> {
	try {
		const response = await axios.get('/team', {
			params: {
				sum
			}
		});
		return { team: response.data.team }
	} catch (error) {
		console.error(error);
		throw new Error('Failed to get optimal team.');
	}
}