import React, { useState, useEffect } from 'react';
import { Container, Typography, TextField, Button, Grid, Box } from '@mui/material';
import { getOptimalTeam, getPaginatedPlayers } from './api/playersAPI';
import { BestPlayer, Player } from './models/Player';
import { AddPlayer } from './components/AddPlayer';
import PlayersList from './components/PlayersList';
import OptimalTeam from './components/OptimalTeam';

function App() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(1);
  const [sum, setSum] = useState(0);
  const [optimalTeam, setOptimalTeam] = useState<BestPlayer[]>([]);

  const loadPlayers = async (page: number) => {
    const { players: fetchedPlayers, totalCount: fechedTotalCount } = await getPaginatedPlayers(page, 10);
    setPlayers(fetchedPlayers);
    setTotalCount(fechedTotalCount)
  };

  useEffect(() => {
    loadPlayers(page);
  }, [page]);


  const onAddPlayer = async () => {
    setPage(0)
    loadPlayers(page);
  };

  const handleDeletePlayer = async () => {
    setPage(0)
    loadPlayers(page);
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const buildOptimalTeam = async () => {
    const { team } = await getOptimalTeam(sum)
    setOptimalTeam(team)
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4" component="h1" gutterBottom>
        Optimal Team Builder
      </Typography>
      <AddPlayer onAddPlayer={onAddPlayer} />
      <PlayersList
        players={players}
        onDeletePlayer={handleDeletePlayer}
        page={page}
        onPageChange={handlePageChange}
        totalCount={totalCount}
      />
      <Grid container spacing={2} alignItems="center" justifyContent="center">
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            fullWidth
            label="Sum"
            type="number"
            value={sum}
            onChange={(e) => setSum(parseInt(e.target.value))}
            InputProps={{
              style: { maxWidth: '200px' },
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Box display="flex" justifyContent="center">
            <Button variant="contained" color="primary" onClick={buildOptimalTeam}>
              Build Optimal Team
            </Button>
          </Box>
        </Grid>
      </Grid>

      <OptimalTeam players={optimalTeam} />

    </Container>
  );
}

export default App;
