// src/components/PlayersList.tsx

import { Button, Pagination } from '@mui/material';
import { DataGrid, GridColDef, GridRowParams } from '@mui/x-data-grid';
import React, { useState } from 'react';
import { deletePlayer } from '../api/playersAPI';
import { Player } from '../models/Player';

interface PlayersListProps {
	players: Player[];
	onDeletePlayer: () => void;
	page: number;
	totalCount: number;
	onPageChange: (page: number) => void;
}

const PlayersList: React.FC<PlayersListProps> = ({ players, onDeletePlayer, page, onPageChange, totalCount }) => {
	const [selectedPlayerId, setSelectedPlayerId] = useState<string | null>(null);
	const rowsPerPage = 10;

	const columns: GridColDef[] = [
		{ field: 'id', headerName: 'ID', width: 100 },
		{ field: 'name', headerName: 'Name', width: 200 },
		{ field: 'height', headerName: 'Height', width: 120 },
		{ field: 'weight', headerName: 'Weight', width: 120 },
		{ field: 'college', headerName: 'College', width: 200 },
		{ field: 'birth_city', headerName: 'Birth City', width: 150 },
		{ field: 'birth_state', headerName: 'Birth State', width: 150 },
		{ field: 'year_start', headerName: 'Year Start', width: 150 },
		{ field: 'year_end', headerName: 'Year End', width: 150 },
		{ field: 'position', headerName: 'Position', width: 150 },
		{ field: 'birth_date', headerName: 'Birth Date', width: 150 },
	];

	const handleRowSelected = (params: GridRowParams) => {
		setSelectedPlayerId(params.id as string);
	};

	const handleDeletePlayer = async () => {
		if (!selectedPlayerId) return;
		try {
			await deletePlayer(selectedPlayerId);
			onDeletePlayer();
		} catch (error) {
			console.error(error);
		}
	};

	const handleChangePage = (event: React.ChangeEvent<unknown>, value: number) => {
		onPageChange(value);
	};

	return (
		<>
			<div style={{ height: 400, width: '100%', marginBottom: 16, marginTop: 16 }}>
				<DataGrid rows={players} columns={columns} onRowClick={handleRowSelected} slots={{ pagination: (props) => { return null } }} />
			</div>
			<Button variant="contained" color="secondary" onClick={handleDeletePlayer} disabled={!selectedPlayerId}>
				Delete Player
			</Button>
			<div style={{ display: 'flex', justifyContent: 'center', marginTop: 16, marginBottom: 16 }}>
				<Pagination count={totalCount / rowsPerPage} page={page} onChange={handleChangePage} />
			</div>
		</>
	);
};

export default PlayersList;
