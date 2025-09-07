# Advanto Dashboard Project

A full-stack web application for managing users, stores, and ratings. Supports role-based access, dashboard statistics, store ratings, and user management. This project demonstrates Admin, Normal User, and Store Owner dashboards with features such as searching, sorting, rating, and password updates.

⚠️ **Important:** Some requests (especially under `/admin/*`) may be blocked by **AdBlocker or Brave Shields** due to the word "admin" in API routes. Please **disable or pause ad-blockers** while using the deployed app.

---

## Live Deployment

- **Deployed here:** [https://full-stack-assignment-roxiler-syste.vercel.app](https://full-stack-assignment-roxiler-syste.vercel.app)  

---

## Features

- **Admin:**
  - View dashboard stats (total users, stores, ratings).
  - Manage users and stores.
  - View user and store ratings.
  - Tables are **sortable** and **searchable**.
- **Normal User:**
  - Browse stores.
  - Rate stores (1–5 stars).
  - Update password via dialog box.
  - Search stores by name or address.
- **Store Owner:**
  - View owned stores and their ratings.
  - See users who rated their stores.
  - Update password via dialog box.
- **Role-Based Access:** Admin, Normal User, and Store Owner have different dashboards and functionality.
- **Tables:** Sorting (ascending/descending) for key fields like Name, Email, etc.
- **Password Rules:** 8–16 chars, at least one uppercase, one special character.
- **Search Functionality:** Search users and stores in dashboards.
- **JWT Authentication:** Role-protected routes.

---

## 🛠 Tech Stack

- **Frontend:** React, Vite, TailwindCSS, Shadcn UI, Axios, React Router  
- **Backend:** Node.js, Express.js  
- **Database & ORM:** PostgreSQL, Prisma ORM  
- **Authentication:** JWT (JSON Web Token)  
- **Deployment:**  
  - Frontend → Vercel  
  - Backend → Render  
  - Database → Neon (PostgreSQL)  

---

## Login Credentials

- **Admin:**  
  Email: `admin123@gmail.com`  
  Password: `Admin@123`  

- **Normal User:**  
  Sign up via the signup page, then login.  

- **Store Owner:**  
  Email: `surydev123@gmail.com`  
  Password: `Suryadev@1234`  

---

## Setup and Running Locally

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Suryadev78/Full-stack-assignment---Roxiler-Systems.git
   cd Full-stack-assignment---Roxiler-Systems


2. **Install dependencies**:
   cd backend
   npm install

3.**Setup the environment variables:**    
   Rename the .env.example file to .env and add the following variables:
   ```bash
   JWT_SECRET=your-jwt-secret
   DATABASE_URL=your-database-url
   ```
   Replace `your-jwt-secret` with a random string of your choice, and `your-database-url` with the URL of your PostgreSQL database.

4.**Setup the database:**
Run migrations to create the necessary tables:
```bash
npx prisma migrate dev
npx prisma generate
```

5.**Start the server:**
```bash
node index.js
```
6.**Install the frontend dependencies:**
```bash
cd frontend
npm install
```
7.**Start the frontend server:**
```bash
npm run dev
```
8**Access the application:**
You can also run this app locally by cloning the repository and running the backend and frontend servers separately.
Backend at : http://localhost:3000
Frontend at: http://localhost:5173
### Deployment

To deploy the project, you can use any cloud hosting service that supports Node.js and PostgreSQL.

Made with ❤️ by [Suryadev](https://github.com/Suryadev78)

