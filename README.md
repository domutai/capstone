# Developer
Jeffrey Chen

# App Name
The List

# Live Demo
[The List](https://capstone-v5tz.onrender.com)

# Overview
The List is a VIP nightlife booking platform that allows users to book tables at exclusive clubs in major cities. Users can explore available clubs, view table maps, read reviews, and reserve tables for their next night out. Club owners can manage their listings, providing an easy way to promote their venues and manage reservations.

## Technologies Used
- **Frontend:** React, Vite, Redux Toolkit, React Router
- **Backend:** Express, Node.js
- **Database:** PostgreSQL (for production), SQLite3 (for development), Sequelize ORM
- **Authentication:** JSON Web Tokens (JWT), Bcrypt.js
- **Security:** Helmet, CORS, CSRF Protection (csurf), Express Validator
- **State Management:** Redux Toolkit, Redux Thunk
- **Hosting:** Render.com (backend and frontend)
- **Environment Management:** Dotenv, Per-env
- **Development Tools:** Nodemon, ESLint, Vite Plugin Eslint, Morgan (logging)


## Key Features:
### **Clubs**
- 🍸 **Browse Clubs**: View all available clubs based on the selected city.
- ✏️ **Create Clubs**: Club owners can add new venues to the platform.
- 🔄 **Update Clubs**: Edit club details such as table maps, descriptions, and pricing.
- 🗑️ **Delete Clubs**: Remove clubs from the platform.

### **Tables**
- 📅 **View Tables**: Explore available tables in a club with a visual map.
- ✏️ **Create Tables**: Club owners can add new tables to a club.
- 🏷️ **Book Tables**: Secure a table for a specific date and time.
- 📆 **Edit Reservation**: Change the specific date and time of the table.
- 🚫 **Cancel Tables**: Cancel your table reservation.

### **Bookings**
- 📅 **View Bookings**:  Users can view all their bookings.
- ✏️ **Create Bookings**: Users can create a booking.
- 📆 **Update Bookings**: Users can update their booking(s).
- 🚫 **Cancel Bookings**: Users can cancel or delete their booking(s).

### **Reviews**
- ⭐ **View Reviews**: See user feedback and ratings for clubs.
- ✍️ **Add Reviews**: Share your experience about a club.
- ✏️ **Edit Reviews**: Update your feedback if your opinion changes.
- 🗑️ **Delete Reviews**: Remove your review from a club.

### **Authentication**
- 🔐 **User Signup/Login**: Register and log in securely.
- 👥 **Role-Based Access**: Different functionality for users and club owners.

### **City Filtering**
- 🌆 **Select City**: View clubs based on city selection (New York City, Los Angeles).
- 🏙️ **Major Cities Grouping**: Automatically groups nearby cities into major hubs.

## Installation Guide

### Backend Setup

1. Clone this repository.

   ```bash
   git clone https://github.com/domutai/capstone.git
   ```

2. Navigate to the root directory:

   ```bash
   cd capstone
   ```

3. Navigate to the backend direcotry:

   ```bash
   cd backend
   ```

4. Install dependencies:

   ```bash
   npm install
   ```

5. Set up environment variables by creating a .env file in the root directory 
    and configuring necessary values such as database credentials and JWT secrets.

6. Run database migrations:

   ```bash
   npx sequelize-cli db:migrate
   ```

7. Seed the database:

   ```bash
   npx sequelize-cli db:seed:all
   ```

8. Start the backend development server:

   ```bash
   npm start
   ```

### Frontend Setup

1. Navigate to the client directory:

   ```bash
   cd frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the React development server:

   ```bash
   npm run dev
   ```

4. Open the application in your browser: Navigate to http://localhost:8000

