# Team Builder Web App

This is a web application for optimal team building.

## Table of Contents
- [Usage](#usage)
- [CLI Usage](#cli-usage)

## Usage


1. Start the application: `make start`
2. Open your browser and visit `http://localhost:3000` to access the application.

## Makefile Commands

The project includes a Makefile that provides convenient commands for running the application. Use the following commands to interact with the project:

- `make start`: Starts the application by building and running the necessary containers, creating the schema, and loading data.
- `make stop`: Stops and removes the running containers.
- `make restart`: Restarts the containers.
- `make schema`: Executes the SQL schema file inside the PostgreSQL container.
- `make load`: Loads data from CSV files into the database.
- `make drop`: Drops the existing schema and recreates it.
- `make db`: Creates the schema and loads data into the database.

To use these commands, open your terminal, navigate to the project directory (`team-builder-web-app`), and run the desired command using the `make` command followed by the command name. For example:

```bash
make start
```
This command will start the application by building and running the containers, creating the necessary schema, and loading data.