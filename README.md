# Phishing App

This project consists of a React frontend and a NestJS backend.

## Prerequisites

- Node.js (v14 or higher)
- NPM 

## Getting Started

Follow these steps to get the project up and running locally.

### 1. Clone the Repository

```bash
git clone https://github.com/your-repository/project-name.git
cd project-name
```
#### 2. Install Dependencies
Navigate to both the React and NestJS directories and install the necessary packages.

For the React app:
```bash
cd frontend
npm install
```

For the NestJS app:
```bash
cd backend
npm install
```

### 3. Set Up the Environment
NestJS Backend
In the backend folder, copy the .env.example file to .env:

change the .env.example to .env 
```bash
cp .env.example .env
```
Open the .env file and update the following environment variables:
```bash
EMAIL_USER: enter your email address
EMAIL_PASS: generate an app password from your google account https://myaccount.google.com/apppasswords
```

### 4. Running the Application 
To start the React development server, run:
```bash
cd frontend
npm run dev
```
The React app will be available at [http://localhost:3001](http://localhost:3001)

NestJS Backend
To start the NestJS server, run:
```bash
cd backend
npm run start:dev
```

The NestJS API will be available at [http://localhost:3000](http://localhost:3000)

### 5. Default Admin User
Once the NestJS application starts, it will automatically create an admin user with the following credentials:

Email: admin@example.com
Password: admin123!

### 6. Testing the phishing email
When you login using your admin credential you will find a page that contains a form and a phishing email lists.
It let's you choose lists of already existing employee's that are already seeded to the database I added my email address to the seeding function but if you want to test it with your email you can do that by first creating a user and add the user to the employee table. 



