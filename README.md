## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```


## Envs

```bash
discovery.type=single-node # linked to docker-compose.yml
APP_PORT=3000 # linked to docker-compose.yml
APP_DEBUG_PORT=9229 # linked to docker-compose.yml
RUN_COMMAND=start:dev # linked to docker-compose.yml
MONGODB_URL=mongodb://mongodb:27017 # linked to docker-compose.yml
MONGODB_DBNAME=mails # linked to docker-compose.yml

NODE_ENV=development
EMAIL_USER=
EMAIL_PASS=
SMTP_HOST=smtp.mail.ru
SMTP_PORT=465

REDIS_PORT=6379 # linked to docker-compose.yml
REDIS_DB=0
REDIS_HOST=redis # linked to docker-compose.yml
```