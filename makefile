help:
	@echo "stop         - Stop and remove containers."
	@echo "restart      - Stop and start containers."
	@echo "schema       - Execute SQL schema file inside the PostgreSQL container."
	@echo "load         - Load data from CSV files into the database."
	@echo "drop         - Drop existing schema and recreate it."
	@echo "db           - Create schema and load data into the database."
	@echo "start        - Restart containers, create schema, and load data."

stop:
	docker-compose down

restart:
	docker-compose down
	docker-compose up -d

schema:
	-docker exec postgres bash -c "PGPASSWORD=pg_test psql -U postgres -h 127.0.0.1 -d team_builder -f ./backend/sql/tables.sql"

load:
	-docker exec postgres bash -c "PGPASSWORD=pg_test psql -U postgres -h 127.0.0.1 -d team_builder -c \"\\copy Players (name,height,weight,college,birth_city,birth_state,year_start,year_end,position,birth_date) FROM './backend/merged_players.csv' WITH (FORMAT csv, HEADER true);\""
	-docker exec postgres bash -c "PGPASSWORD=pg_test psql -U postgres -h 127.0.0.1 -d team_builder -c \"\\copy SeasonStats (season,player,position,age,games,points) FROM './backend/Seasons_Stats.csv' WITH (FORMAT csv, HEADER true);\""

drop:
	-docker exec postgres bash -c "PGPASSWORD=pg_test psql -U postgres -h 127.0.0.1 -d team_builder -c \"DROP SCHEMA public CASCADE; CREATE SCHEMA public; GRANT ALL ON SCHEMA public TO postgres; GRANT ALL ON SCHEMA public TO public;\""

db:
	make schema
	make load

start:
	make restart
	make db