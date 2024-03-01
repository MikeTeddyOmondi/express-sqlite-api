# Express LibSQL(~~sqlite~~) API

This application uses [libsql](https://github.com/tursodatabase/libsql/) (a fork of sqlite)

Generate schema in sqlite database

```shell
# pnpx drizzle-kit generate:sqlite
pnpm generate:migrations 
```

Run migrations in sqlite database

```shell
# node ./src/migrate.js
pnpm run:migrations 

```

Benchmarks: Using the rewrk HTTP load benchmarker
```shell 
rewrk -c 256 -d 60s -h http://localhost:3489/todos --pct
```