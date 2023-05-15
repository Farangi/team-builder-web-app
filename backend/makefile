help:
	@echo "start        - Run container for local development."
	@echo "stop         - Stop and remove container."
	@echo ""
	@echo "test         - Test a function, provide var function={folder}"

stop:
	docker-compose down

restart:
	docker-compose down
	docker-compose up -d

schema:
	-docker exec postgres bash -c "PGPASSWORD=pg_test psql -U postgres -h 127.0.0.1 -d team_builder -f ./sql/tables.sql"

load:
	-docker exec postgres bash -c "PGPASSWORD=pg_test psql -U postgres -h 127.0.0.1 -d team_builder -c \"\\copy Players (name,height,weight,college,birth_city,birth_state,year_start,year_end,position,birth_date) FROM './merged_players.csv' WITH (FORMAT csv, HEADER true);\""
	-docker exec postgres bash -c "PGPASSWORD=pg_test psql -U postgres -h 127.0.0.1 -d team_builder -c \"\\copy SeasonStats (season,player,position,age,games,points) FROM './Seasons_Stats.csv' WITH (FORMAT csv, HEADER true);\""

drop:
	-docker exec postgres bash -c "PGPASSWORD=pg_test psql -U postgres -h 127.0.0.1 -d team_builder -c \"DROP SCHEMA public CASCADE; CREATE SCHEMA public; GRANT ALL ON SCHEMA public TO postgres; GRANT ALL ON SCHEMA public TO public;\""

db:
	make schema
	make load

start:
	make restart
	make db