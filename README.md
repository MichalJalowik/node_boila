## Description
Stack: TS, Node, NestJs, TypeOrm, PSQL, GraphQL, NestJs-Query, Jest

## Installation and run
1. npm
```bash
$ npm ci --legacy-peer-deps
```
2. build
```bash
$ npm run build
```
3. run tests -> from /docker dir
```bash
$ docker-compose run test-runner
```
4. run api -> from /docker dir
```bash
$ docker-compose up api
```
5. run graphQL
```http
localhost:3000/graphql
```
6. sample [queries](src/utils/testingGraphQLQueries.ts)


## Migrations
Generate migrations:
1. go into /docker dir
2. go inside api container
```bash
$ docker-compose exec api bash
```
3. run migration:generate command to update db schema
```bash
$ npm run typeorm migration:generate src/migrations/<migration_file_name>
```
4. you can manually run migrations (migration:run command) but nestjs is set to runs automaticaly
```bash
$ npm run typeorm migration:run
```


## Test
from /docker dir
```bash
$ docker-compose run test-runner
```

## Running the app
from /docker dir
```bash
$ docker-compose up api
```
this will run db and nest app according to docker-compose config

### GraphQL
```http
<domain>/graphql
```

local development: localhost:3000/graphql

## License

[MIT licensed](LICENSE).
