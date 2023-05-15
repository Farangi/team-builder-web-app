export interface Player {
	id: string;
	name: string;
	height: number;
	weight: number;
	college: string;
	birth_city: string;
	birth_state: string;
	year_start: number;
	year_end: number;
	position: string;
	birth_date: string;
}

export interface BestPlayer {
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