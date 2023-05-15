import { Request, Response } from "express";
import client from "../db";

interface BestPlayer {
	age: number;
	birth_date: string;
	games: number;
	id: string;
	name: string;
	player_position: string;
	points: number;
	ppg: number;
	season: number;
	season_position: string;
}

function calculateTeam(playersData: BestPlayer[], inputPointsSum: number) {
	// Calculate PPG for each player
	playersData.forEach((player: BestPlayer) => {
		player.ppg = player.points / player.games;
	});

	// Helper function to filter players by position
	function filterPlayersByPosition(players: BestPlayer[], position: string) {
		return players.filter((player: BestPlayer) => {
			return (
				player.player_position.includes(position) ||
				player.season_position.includes(position)
			);
		});
	}

	// Filter players by position and sort by PPG and age
	const pointGuards = filterPlayersByPosition(playersData, "PG").sort(
		(a: BestPlayer, b: BestPlayer) => b.ppg - a.ppg || a.age - b.age
	);
	const shootingGuards = filterPlayersByPosition(playersData, "SG").sort(
		(a: BestPlayer, b: BestPlayer) => b.ppg - a.ppg || a.age - b.age
	);
	const smallForwards = filterPlayersByPosition(playersData, "SF").sort(
		(a: BestPlayer, b: BestPlayer) => b.ppg - a.ppg || a.age - b.age
	);
	const powerForwards = filterPlayersByPosition(playersData, "PF").sort(
		(a: BestPlayer, b: BestPlayer) => b.ppg - a.ppg || a.age - b.age
	);
	const centers = filterPlayersByPosition(playersData, "C").sort(
		(a: BestPlayer, b: BestPlayer) => b.ppg - a.ppg || a.age - b.age
	);

	let bestTeam: BestPlayer[] = [];

	// Iterate through the sorted players list for each position
	for (const pg of pointGuards) {
		for (const sg of shootingGuards) {
			for (const sf of smallForwards) {
				for (const pf of powerForwards) {
					for (const c of centers) {
						const totalPoints = pg.points + sg.points + sf.points + pf.points + c.points;
						if (totalPoints >= inputPointsSum) {
							bestTeam = [pg, sg, sf, pf, c];
							break;
						}
					}
					if (bestTeam.length > 0) break;
				}
				if (bestTeam.length > 0) break;
			}
			if (bestTeam.length > 0) break;
		}
		if (bestTeam.length > 0) break;
	}
	return bestTeam
}


const getOptimalTeam = async (req: Request, res: Response) => {

	const { sum = 4000 } = req.query;
	const inputPointsSum = parseInt(sum as string)

	const playersQuery = `
		WITH player_stats AS (
			SELECT
				p.id,
				p.name,
				p.birth_date,
				p.position AS player_position,
				s.position AS season_position,
				s.season,
				s.age,
				s.games,
				s.points
			FROM
				Players p
				JOIN SeasonStats s ON p.name = s.player AND s.age = EXTRACT(YEAR FROM CURRENT_DATE) - EXTRACT(YEAR FROM p.birth_date)
		)
		SELECT
			id,
			name,
			birth_date,
			player_position,
			season_position,
			season,
			age,
			games,
			points
		FROM
			player_stats;
	`
	const playersData = await client.query(playersQuery);
	const team = calculateTeam(playersData.rows, inputPointsSum)
	try {
		res.json({ team })
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'An error occurred while fetching players.' });
	}

}

export { getOptimalTeam }
