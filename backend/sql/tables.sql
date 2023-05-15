CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE Players (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  height INT NOT NULL,
  weight INT NOT NULL,
  college VARCHAR(100),
  birth_date DATE,
  birth_city VARCHAR(50),
  birth_state VARCHAR(50),
  year_start INT NOT NULL,
  year_end INT NOT NULL,
  position VARCHAR(3)
);

CREATE TABLE SeasonStats (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  season INT,
  player VARCHAR(50),
  position VARCHAR(5),
  age INT,
  games INT,
  points INT
);