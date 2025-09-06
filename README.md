# Advanto Dashboard Project

A full-stack web application for managing users, stores, and ratings. Supports role-based access, dashboard statistics, store ratings, and user management. This project demonstrates Admin, Normal User, and Store Owner dashboards with features such as searching, sorting, rating, and password updates.

### Features

- **Admin:** View dashboard stats (total users, stores, ratings), manage users and stores, view user and store ratings. Tables are sortable and searchable.
- **Normal User:** Browse stores, rate stores (1–5 stars), update password via dialog box, search stores by name or address.
- **Store Owner:** View owned stores and their ratings, see users who rated their stores, update password via dialog box.
- **Role-Based Access:** Admin, Normal User, and Store Owner have different dashboard access and functionality.
- **Tables:** All tables support sorting (ascending/descending) for key fields like Name, Email, etc.
- **Password Rules:** Passwords must be 8–16 characters, contain at least one uppercase letter, and one special character.
- **Search Functionality:** Users and stores can be searched in the dashboards.
- **JWT Authentication:** Routes are protected based on user role.

### Login Credentials

- **Admin:**  You can login as an admin to explore the Admin dashboard and its functionality.
  Email: `admin123@gmail.com`  
  Password: `Admin@123`  

- **Normal User:** First, sign up using the signup page you will be redirected to the normal user dashboard.

- **Store Owner:**  You can login as a store owner to explore the Store Owner dashboard and its functionality.
  Email: `surydev123@gmail.com`  
  Password: `Suryadev@1234`  

### Setup and Running the Project

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
Backend: http://localhost:3000
Frontend: http://localhost:5173
### Deployment

To deploy the project, you can use any cloud hosting service that supports Node.js and PostgreSQL.

Made with ❤️ by [Suryadev](https://github.com/Suryadev78)

