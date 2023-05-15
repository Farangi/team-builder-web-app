import express from 'express';
import playerRoutes from './routes/player';
import teamRoutes from './routes/team';
import cors from 'cors'

const app = express();
const port = process.env.PORT || 3001;

app.use(cors())
app.use(express.json());
app.use('/api/players', playerRoutes);
app.use('/api/team', teamRoutes);


app.listen(port, () => {
	console.log(`Server is running at http://localhost:${port}`);
});
