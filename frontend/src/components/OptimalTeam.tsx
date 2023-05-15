import * as React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { BestPlayer } from '../models/Player';


interface PlayersTableProps {
	players: BestPlayer[];
}

const OptimalTeam: React.FC<PlayersTableProps> = ({ players }) => {
	return (
		<TableContainer component={Paper}>
			<Table>
				<TableHead>
					<TableRow>
						<TableCell>Name</TableCell>
						<TableCell>Position</TableCell>
						<TableCell>Season Position</TableCell>
						<TableCell>Age</TableCell>
						<TableCell>Birth Date</TableCell>
						<TableCell>Games</TableCell>
						<TableCell>Points</TableCell>
						<TableCell>PPG</TableCell>
						<TableCell>Season</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{players.map((player) => (
						<TableRow key={player.id}>
							<TableCell>{player.name}</TableCell>
							<TableCell>{player.player_position}</TableCell>
							<TableCell>{player.season_position}</TableCell>
							<TableCell>{player.age}</TableCell>
							<TableCell>{player.birth_date}</TableCell>
							<TableCell>{player.games}</TableCell>
							<TableCell>{player.points}</TableCell>
							<TableCell>{player.ppg}</TableCell>
							<TableCell>{player.season}</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
};

export default OptimalTeam;
