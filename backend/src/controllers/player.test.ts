import httpMocks from 'node-mocks-http';
import { addPlayer, deletePlayer, getPaginatedPlayers } from './player';

describe('getPaginatedPlayers', () => {
	it('should retrieve paginated players and total count', async () => {
		const request = httpMocks.createRequest({
			method: 'GET',
			query: {
				page: '0',
				rowsPerPage: '5'
			}
		});

		const response = httpMocks.createResponse();

		await getPaginatedPlayers(request, response);

		const data = response._getJSONData();

		expect(response.statusCode).toBe(200);
		expect(data).toBeDefined();
		expect(data.players).toBeDefined();
		expect(data.totalCount).toBeDefined();
	});

	it('should retrieve paginated players and total count with default values', async () => {
		const request = httpMocks.createRequest({
			method: 'GET',
			query: {}
		});

		const response = httpMocks.createResponse();

		await getPaginatedPlayers(request, response);

		const data = response._getJSONData();

		expect(response.statusCode).toBe(200);
		expect(data).toBeDefined();
		expect(data.players).toBeDefined();
		expect(data.totalCount).toBeDefined();
	});
});

describe('addPlayer', () => {
	it('should add a player with valid data', async () => {
		const validPlayer = {
			name: 'John Doe',
			height: 174,
			weight: 200,
			college: 'Example University',
			birth_city: 'Sample City',
			birth_state: 'Sample State',
			year_start: 2021,
			year_end: 2023,
			position: 'G',
			birth_date: '1995-01-01'
		};

		const request = httpMocks.createRequest({
			method: 'POST',
			body: validPlayer
		});

		const response = httpMocks.createResponse();

		await addPlayer(request, response);

		const data = response._getJSONData();

		expect(response.statusCode).toBe(201);
		expect(data).toBeDefined();
		expect(data.name).toBe(validPlayer.name);
		expect(data.height).toBe(validPlayer.height);
		expect(data.weight).toBe(validPlayer.weight);
		expect(data.college).toBe(validPlayer.college);
		expect(data.birth_city).toBe(validPlayer.birth_city);
		expect(data.birth_state).toBe(validPlayer.birth_state);
		expect(data.year_start).toBe(validPlayer.year_start);
		expect(data.year_end).toBe(validPlayer.year_end);
		expect(data.position).toBe(validPlayer.position);

		const receivedDate = new Date(data.birth_date);
		expect(isNaN(receivedDate.getTime())).toBe(false);
	});
})

describe('deletePlayer', () => {
	it('should delete an existing player', async () => {
		// Add a player first to ensure there's a player to delete
		const playerToDelete = {
			name: 'Jane Doe',
			height: 173,
			weight: 180,
			college: 'Sample College',
			birth_city: 'Test City',
			birth_state: 'Test State',
			year_start: 2020,
			year_end: 2022,
			position: 'G',
			birth_date: '1990-01-01'
		};

		const addRequest = httpMocks.createRequest({
			method: 'POST',
			body: playerToDelete
		});
		const addResponse = httpMocks.createResponse();
		await addPlayer(addRequest, addResponse);
		const addedPlayer = addResponse._getJSONData();

		// Attempt to delete the added player
		const request = httpMocks.createRequest({
			method: 'DELETE',
			params: {
				id: addedPlayer.id
			}
		});
		const response = httpMocks.createResponse();
		await deletePlayer(request, response);

		expect(response.statusCode).toBe(204);
	});

	it('should return a 500 error when attempting to delete a non-existing player', async () => {
		const nonExistingPlayerId = 'non-existing-id';

		const request = httpMocks.createRequest({
			method: 'DELETE',
			params: {
				id: nonExistingPlayerId
			}
		});
		const response = httpMocks.createResponse();
		await deletePlayer(request, response);

		const data = response._getJSONData();

		expect(response.statusCode).toBe(500);
		expect(data.error).toBe('An error occurred while deleting a player.');
	});
});
