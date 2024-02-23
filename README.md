# React API Project

This project consists of a ReactJS frontend and a Node.js backend with Express, serving as an API.

## Frontend

The frontend is hosted on Vercel at https://react-api-efn9.vercel.app/.

## Installation
To run the frontend locally, follow these steps:

1. Clone the repository:

```bash
git clone https://github.com/kousallya123/react-api.git


2. Navigate to the project directory:

  ```bash
   cd client

3. Install dependencies:


  ```bash
    npm install

3. Start the development server:


  ```bash
     npm start


Open your browser and visit http://localhost:3000.

## Backend
The backend is hosted on Vercel at https://react-api-two-chi.vercel.app/.

## API Endpoints

1. Add Data:

Endpoint: /api/add

Method: POST

Description: Adds new data to the database.

- Example:


  ```json
    {
  "title": "title",
  "description": "description"
    }

2. Update Data:

Endpoint: /api/update/:id

Method: PUT

Description: Updates existing data in the database.

- Example:


  ```json
    {
  "title": "newTitle",
  "description": "newDescription"
    }

3. Count:

Endpoint: /api/count

Method: GET

Description: Returns the count of add and update API calls and the saved datas in database.


## Setup Locally


1. Clone the repository:

   ```bash
   git clone https://github.com/kousallya123/react-api.git


2. Navigate to the project directory:  

  ```bash
     cd server


3. Install dependencies:

  ```bash
   npm install


4. Start the server:

  ```bash
   npm start



## Database

Make sure you have MongoDB installed and running locally. The server connects to a MongoDB database named your-database-name.

## Deployment
The backend and frontend are deployed on Vercel. Deployment URLs:

Frontend: (https://react-api-efn9.vercel.app/)
Backend: (https://react-api-two-chi.vercel.app/)


## Execution Time

Execution time for each API is measured using console.time() and console.timeEnd() in the server routes.

