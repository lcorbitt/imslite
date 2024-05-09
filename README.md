# Inventory Management System

This is a simple Inventory Management System built with NestJS for the backend, React for the frontend, and PostgreSQL for the database.

*These are the instructions without Docker because I couldn't figure out the issues I was having with Docker in a timely fashion:*

## Getting Started

To run this application locally, follow these steps:

### Prerequisites
- Node.js and npm installed on your machine.
- PostgreSQL installed locally or accessible remotely.
- Clone the repository:

```
git clone https://github.com/lcorbitt/imslite.git
```

### Backend and Frontend setup
For this project, the "api" directory holds the backend code and the "client" directory holds the frontend code. Since this app uses Turbo, you should be able to run "npm install" from the root directory and that should install dependecies for both. If that doesn't work, cd into each directory and run the "npm install" command in each.

### Run the server
- Start the app:
```
npm run dev
```

Once the containers are up and running, you can access the frontend application at http://localhost:8000.

---

*These would be my instructions if I got Docker to work correctly:*

## Getting Started

To run this application locally, you'll need Docker installed on your machine.

### Prerequisites
- Docker: Install Docker

### Installation
- Clone the repository:

```
git clone https://github.com/lcorbitt/imslite.git
```

- Navigate to the project directory:
```
cd imslite
```

- Set up environment variables:
Create a .env file in the "api" directory based on the .env.example file (I'm exposing these values just because its a simple example app, you wouldn't do this in production).

- Run the following command to build and start the Docker containers:
```
docker-compose up
```

Once the containers are up and running, you can access the frontend application at http://localhost:8000.