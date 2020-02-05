# Super Block Heroes - NestJS server

Puzzle cooperative game, fight alongside friends and defeat bosses together !

Stack:

- Angular 8 ([super-block-heroes](https://github.com/JeanCarrillo/super-block-heroes))
- NestJS

## Contributors

- Léo [LeopoldAssogbaA](https://github.com/LeopoldAssogbaA)
- Virgile [VirgileLyon](https://github.com/VirgileLyon)
- Catherine [c4th-code](https://github.com/c4th-code)
- Jean [JeanCarrillo](https://github.com/JeanCarrillo)

## How to run the app

- Clone back & front repositories on github
- Delete dist directory in server if exists
- Create the ormconfig.json file (example below)
- Drop the MySql database if exists
- Create the database
- Run server in terminal : npm start
- Run the migration files in another terminal : typeorm migration:run
- Kill and run server again in first terminal : npm run start:dev

#### Ormconfig.json File example

{
"type": "mysql",
"host": "localhost",
"port": 3306,
"username": "root",
"password": "",
"database": "",
"entities": ["dist/**/*-entity{.ts,.js}"],
"migrations": ["dist/migration/*.js"],
"cli": {
"migrationsDir": "migration"
}
}

#### TypeORM-CLI commands

- Generate an empty migration file : typeorm migration:create -n fileName
- Generate a 'real' migration file : typeorm migration:generate -n fileName
- Apply the migration file : typeorm migration:run
