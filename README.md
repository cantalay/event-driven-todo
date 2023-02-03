<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>


## Getting Start

To get started with event-driven-todo, you will need to have Node.js and pnpm (Fast, disk space efficient package manager) installed on your system. If you don't have them, you can download the latest version of Node.js from the official website: https://nodejs.org/ and install pnpm by running the following command:
```bash
$ npm install -g pnpm
```
## Installation
Once you have Node.js and pnpm installed, clone this repository and navigate to the project folder:
```
$ git clone https://github.com/cantalay/event-driven-app.git
$ cd nestjs-project
```
Next, install the project dependencies by running the following command:
```bash
$ pnpm install
```

## Running the app

```bash
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev
```






## MongoDB with Docker

After that, I will show you how to install MongoDB using Docker. Docker is a powerful tool for managing containers, which makes it easier to install and run MongoDB.

###Prerequisites

Before we start, you will need to have Docker installed on your system. If you don't have it installed, you can download it from the official website: https://www.docker.com/

## Installation
To install MongoDB using Docker, follow these steps:

1. Pull the MongoDB image from Docker Hub:

```
$ docker pull mongo
```
2. Start a new MongoDB container:

```
docker run -d --name event-driven-app \
-e MONGO_INITDB_ROOT_USERNAME=root \
-e MONGO_INITDB_ROOT_PASSWORD=root \
-p 27017:27017 \
mongo:latest
```
This will start a new container named "mongodb" and map port 27017 on the host to port 27017 in the container.

3. Verify that the container is running:
```
$ docker ps
```
