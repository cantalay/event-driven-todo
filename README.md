<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>


## Collection URL
Need to register first (just 4 digit pass is OK), after that we need to get a token from /login and viola!

You can use publicly accessible /audit API.

https://api.postman.com/collections/25455960-8e23936a-b4b5-4876-b293-2f3af1c0cb24?access_key=PMAT-01GRB37QT5A2WHAAGD0V4XM07E

## Webhook
https://webhook.site/#!/2313eb3d-a1ba-4afa-88ef-adcfbd009617/c2809762-d6af-453f-90e3-92adf40f84cb/1

## Some Important Enum
```
export enum TodoStatusEnum {
  TODO, -> 0 -> empty to todo-item
  IN_PROGRESS, -> 1 -> assigned user
  DONE, -> 2 -> marked as completed
}
```
Others are user friendly.

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
It will compile and serve the project on http://localhost:3000 by default.







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
