# Project Name

This project consists of a React frontend and a NestJS backend.

## Prerequisites

- Node.js (v14 or higher)
- NPM or Yarn

## Getting Started

Follow these steps to get the project up and running locally.

### 1. Clone the Repository

```bash
git clone https://github.com/your-repository/project-name.git
cd project-name
```
2. Install Dependencies
Navigate to both the React and NestJS directories and install the necessary packages.

For the React app:
 
cd frontend
npm install


For the NestJS app:

cd backend
npm install

3. Set Up the Environment
NestJS Backend
In the backend folder, copy the .env.example file to .env:

change the .env.example to .env
Open the .env file and update the following environment variables:

EMAIL_USER: enter your email address
EMAIL_PASS: generate an app password from your google account https://myaccount.google.com/apppasswords

4. Running the Application 
To start the React development server, run:
cd frontend
npm run dev
The React app will be available at http://localhost:3001

NestJS Backend
To start the NestJS server, run:

cd backend
npm run start:dev

The NestJS API will be available at http://localhost:3000

5. Default Admin User
Once the NestJS application starts, it will automatically create an admin user with the following credentials:

Email: admin@example.com
Password: admin123!



