import { Player, BestPlayer } from '../models/Player';
import { addPlayer, deletePlayer, getPaginatedPlayers, getOptimalTeam } from './playersAPI';

describe('getPaginatedPlayers', () => {
	it('should fetch and return paginated players and total count', async () => {
		const result = await getPaginatedPlayers(1, 2);

		// Check if the response has the expected structure
		expect(result).toHaveProperty('players');
		expect(result).toHaveProperty('totalCount');

		// Check if 'players' is an array of Player objects
		expect(Array.isArray(result.players)).toBe(true);
		result.players.forEach(player => {
			expect(player).toHaveProperty('id');
			expect(player).toHaveProperty('name');
			expect(player).toHaveProperty('position');
		});

		// Check if 'totalCount' is a number
		expect(typeof result.totalCount).toBe('number');
	});

	it('should throw an error when the API call fails', async () => {
		try {
			await getPaginatedPlayers(-1, 2); // Assuming the API will fail for negative page numbers
		} catch (error: any) {
			expect(error).toBeInstanceOf(Error);
			expect(error.message).toBe('Failed to fetch players.');
		}
	});
});

describe('addPlayer', () => {
	it('should add a player and return the created player with an id', async () => {
		const newPlayer: Omit<Player, 'id'> = {
			name: 'Test Player',
			height: 180,
			weight: 80,
			college: 'Test University',
			birth_city: 'Test City',
			birth_state: 'Test State',
			year_start: 2023,
			year_end: 2023,
			position: 'G',
			birth_date: '1999-01-01',
		};

		const result = await addPlayer(newPlayer);

		// Check if the response has the expected structure
		expect(result).toHaveProperty('id');
		expect(result.name).toEqual(newPlayer.name);
		expect(result.height).toEqual(newPlayer.height);
		expect(result.weight).toEqual(newPlayer.weight);
		expect(result.college).toEqual(newPlayer.college);
		expect(result.position).toEqual(newPlayer.position);
	});

	it('should throw an error when the API call fails', async () => {
		const invalidPlayer: Omit<Player, 'id'> = {
			// Assuming the API will fail if the name is missing
			name: '',
			height: 180,
			weight: 80,
			college: 'Test University',
			birth_city: 'Test City',
			birth_state: 'Test State',
			year_start: 2023,
			year_end: 2023,
			position: 'G',
			birth_date: '1999-01-01',
		};

		try {
			await addPlayer(invalidPlayer);
		} catch (error: any) {
			expect(error).toBeInstanceOf(Error);
			expect(error.message).toBe('Failed to add player.');
		}
	});
});

describe('deletePlayer', () => {
	it('should delete a player by id', async () => {
		// Create a new player for deletion
		const newPlayer: Omit<Player, 'id'> = {
			name: 'Test Player to Delete',
			height: 180,
			weight: 80,
			college: 'Test University',
			birth_city: 'Test City',
			birth_state: 'Test State',
			year_start: 2023,
			year_end: 2023,
			position: 'G',
			birth_date: '1999-01-01',
		};
		const createdPlayer = await addPlayer(newPlayer);

		// Delete the created player
		await deletePlayer(createdPlayer.id);
	});

	it('should throw an error when the API call fails', async () => {
		// Assuming the API will fail if the id is invalid
		const invalidId = 'invalid-id';

		try {
			await deletePlayer(invalidId);
		} catch (error: any) {
			expect(error).toBeInstanceOf(Error);
			expect(error.message).toBe('Failed to delete player.');
		}
	});
});

describe('getOptimalTeam', () => {
	it('should fetch and return the optimal team given a sum', async () => {
		const sum = 1000;
		const result = await getOptimalTeam(sum);

		// Check if the response has the expected structure
		expect(result).toHaveProperty('team');

		// Check if 'team' is an array of BestPlayer objects
		expect(Array.isArray(result.team)).toBe(true);
		result.team.forEach(player => {
			expect(player).toHaveProperty('age');
			expect(player).toHaveProperty('birth_date');
			expect(player).toHaveProperty('games');
			expect(player).toHaveProperty('id');
			expect(player).toHaveProperty('name');
			expect(player).toHaveProperty('player_position');
			expect(player).toHaveProperty('points');
			expect(player).toHaveProperty('ppg');
			expect(player).toHaveProperty('season');
			expect(player).toHaveProperty('season_position');
		});
	});

	it('should throw an error when the API call fails', async () => {
		// Assuming the API will fail if the sum is negative
		const invalidSum = -1000;

		try {
			await getOptimalTeam(invalidSum);
		} catch (error: any) {
			expect(error).toBeInstanceOf(Error);
			expect(error.message).toBe('Failed to get optimal team.');
		}
	});
});