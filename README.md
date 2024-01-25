# Project-4

Event Management System

Introduction
Welcome to the Event Management System! This system allows users to create events, register for events, and view event details with registered participants.

Built With:

- Node.js
- Express.js
- Prisma

Requirements
To run this project correctly, you have the following installed package:

    @prisma/client,
    body-parser,
    cors,
    dotenv,
    express,
    multer,
    mysql,
    nodemailer,
    nodemon,
    prisma

Setup

1. **Clone the Repository:**

   git clone https://github.com/DijarZ/Project-4.git ,  
   cd Project-4

2. Install Dependencies:
   npm install

3. Set Up Environment Variables:  
   DATABASE_USER="\*\*\*"  
   DATABASE_PASSWORD="\*\*\*"  
   DATABASE_NAME="\*\*\*"  
   DATABASE_URL="\*\*\*"

EMAIL_ADMIN="\*\*\*"  
PASS_ADMIN="\*\*\*"

these \*\*\* you can replace with your data.

4.Database Migration:

npx sequelize-cli db:migrate

5.Run the App
npm start

Access the application at http://localhost:3000.

**API Testing**

To test the API and explore its endpoints, you can use the Postman collection:

[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/30404220-dd3b5a1b-0262-40f0-881f-c8daace418ba?access_key=PMAT-01HMW7927TNZEW2EK8NBZHZJ35)
