# calendar backend
backend de la aplicación [calendar](https://github.com/Carlos-Angel/calendar)

## getting started

copy .env.example file to .env

```bash
cp .env.example .env
```

add environment variables

```shell
###> general ###
PORT=3001
NODE_ENV='development'
### general <###

###> mongo ###
MONGO_USER="user"
MONGO_PASSWORD="password"
MONGO_HOST="cluster.mongo.net"
MONGO_NAME="database"
### mongo <###
```

install dependencies

```bash
npm install
```

## `production`
```bash
npm start
```
## `development`

```bash
npm run dev
```