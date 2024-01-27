# Introduction

E-commerce website api build using Express Js and Mongo DB.
The API allows users to perform CRUD operations on products,users,categories. Place order and shipment detail. 
We have also implemented the features of authentication and authorization. Proper permissions and role must be provided to provided to access protected and sensitive api.


![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)
![Jest](https://img.shields.io/badge/-jest-%23C21325?style=for-the-badge&logo=jest&logoColor=white)

## Table of contents
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Running tests](#running-tests)
  

## Tech Stack
- Node Js
- Typescript
- Express js
- Mongo DB
- Jest

## Getting started
- Clone this project using `git clone ` command;
- Create your `.env` from `.env.example` either manually or with `cp .env.example .env`
- Fill the `.env` file with your MongoDB cluster credentials and JWT encoding secret;
- Install the project dependencies with `yarn install`;
- Run the project in dev mode with `yarn run`.

## Project structure

```
.
├── config
├── constants
├── controllers
├── coverage
├── errors
├── middleware
├── models
├── routes
├── schemas
├── services
├── test
│   ├── mockData
│   ├── controllers
│   └── services
├── types
└── utils
```

## Running tests
- Use `yarn test` command to run test cases.
- Use `yarn test-coverages` to generate coverage report.
