<p align="center">
  <a target="blank"><img src="docs/wire_edge_logo.png" width="200" alt="Wire Edge Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center"> <a href="http://nodejs.org" target="_blank">Node.js</a> boilerplate repo with: NestJs, Rest, GraphQL, TypeORM(Psql), Jest, Docker, Docker-Compose.</p>
    <p align="center">

## Description

[Nest](https://github.com/nestjs/nest) based framework TypeScript starter repository.

## Installation and run
1. npm
```bash
$ npm ci
```
2. build
```bash
$ npm run build
```
3. run api -> from /docker dir
```bash
$ docker-compose up api
```
4. run swagger
```http
localhost:3000/swagger
```

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

## Swagger
Swagger config added to nestJs app
```http
<domain>/swagger
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## License

[MIT licensed](LICENSE).
