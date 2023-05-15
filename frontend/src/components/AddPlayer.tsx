import { Button, Container, Grid, TextField } from '@mui/material';
import { useState } from 'react';
import { addPlayer } from '../api/playersAPI';
import { Player } from '../models/Player';

interface AddPlayerProps {
	onAddPlayer: () => Promise<void>;
}

export const AddPlayer: React.FC<AddPlayerProps> = ({ onAddPlayer }) => {
	const [player, setPlayer] = useState<Omit<Player, 'id'>>({
		name: '',
		height: 0,
		weight: 0,
		college: '',
		birth_city: '',
		birth_state: '',
		year_start: 0,
		year_end: 0,
		position: '',
		birth_date: '',
	});

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target;
		setPlayer((prevPlayer) => ({
			...prevPlayer,
			[name]: value,
		}));
	};


	const handleSubmit = async () => {
		try {
			await addPlayer(player);
			alert('Player added successfully.');
			setPlayer({
				name: '',
				height: 0,
				weight: 0,
				college: '',
				birth_city: '',
				birth_state: '',
				year_start: 0,
				year_end: 0,
				position: '',
				birth_date: '',
			});
			onAddPlayer();
		} catch (error: any) {
			alert(error.message);
		}
	};

	return (
		<Container>
			<Grid container spacing={2} justifyContent="center">
				<Grid item xs={12} md={6}>
					<TextField fullWidth label="Name" name="name" value={player.name} onChange={handleChange} />
				</Grid>
				<Grid item xs={6} md={3}>
					<TextField fullWidth label="Height" name="height" type="number" value={player.height} onChange={handleChange} />
				</Grid>
				<Grid item xs={6} md={3}>
					<TextField fullWidth label="Weight" name="weight" type="number" value={player.weight} onChange={handleChange} />
				</Grid>
				<Grid item xs={12} md={6}>
					<TextField fullWidth label="College" name="college" value={player.college} onChange={handleChange} />
				</Grid>
				<Grid item xs={6} md={3}>
					<TextField fullWidth label="Birth City" name="birth_city" value={player.birth_city} onChange={handleChange} />
				</Grid>
				<Grid item xs={6} md={3}>
					<TextField fullWidth label="Birth State" name="birth_state" value={player.birth_state} onChange={handleChange} />
				</Grid>
				<Grid item xs={6} md={3}>
					<TextField fullWidth label="Year Start" name="year_start" type="number" value={player.year_start} onChange={handleChange} />
				</Grid>
				<Grid item xs={6} md={3}>
					<TextField fullWidth label="Year End" name="year_end" type="number" value={player.year_end} onChange={handleChange} />
				</Grid>
				<Grid item xs={6} md={3}>
					<TextField fullWidth label="Position" name="position" value={player.position} onChange={handleChange} />
				</Grid>
				<Grid item xs={6} md={3}>
					<TextField fullWidth label="Birth Date" name="birth_date" type="date" value={player.birth_date} onChange={handleChange} InputLabelProps={{ shrink: true }} />
				</Grid>
				<Grid item xs={12} md={6}>
					<Grid container justifyContent="center">
						<Button variant="contained" color="primary" onClick={handleSubmit}>
							Add Player
						</Button>
					</Grid>
				</Grid>
			</Grid>
		</Container>
	);
};
