# Super Block Heroes - NestJS server

Puzzle cooperative game, fight alongside friends and defeat bosses together !

Stack:

- Angular 8 ([super-block-heroes](https://github.com/JeanCarrillo/super-block-heroes))
- NestJS

## Contributors

- Léo           [LeopoldAssogbaA](https://github.com/LeopoldAssogbaA)
- Virgile       [VirgileLyon](https://github.com/VirgileLyon)
- Catherine     [c4th-code](https://github.com/c4th-code)
- Jean          [JeanCarrillo](https://github.com/JeanCarrillo)

### Ormconfig.json File example
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

TypeORM-CLI commands :
- Generate an empty migration file :    typeorm migration:create -n fileName
- Generate a 'real' migration file :    typeorm migration:generate -n fileName
- Apply the migration file :            typeorm migration:run

How to run the app :
- drop the database if exists
- create the database
- delete dist directory if exists
- run server with command : npm run
- run the migration files with command  : typeorm migration:run
- run server again with command : npm run start:dev
