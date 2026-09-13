# 🚗 Wheelzy

Wheelzy is a modern vehicle rental platform designed to make renting cars and booking drivers simple, fast, and convenient.

The platform provides vehicle discovery, driver discovery, user authentication, and vehicle booking functionality through a React frontend, Express.js backend, and Supabase PostgreSQL database.

---

## ✨ Features

### 👤 User

- User registration
- User login
- Browse vehicles
- View vehicle details
- Browse available drivers
- View driver details
- Book vehicles
- View booking history
- Cancel bookings

### 🚘 Vehicles

- Vehicle listings
- Vehicle categories
- Vehicle pricing
- Vehicle locations
- Vehicle images
- Fuel type
- Transmission type
- Seat capacity
- Availability status

### 👨‍✈️ Drivers

- Driver listings
- Driver profiles
- Experience information
- Driver ratings
- Driver pricing
- Driver location
- Driver availability

### 📅 Bookings

- Create bookings
- Automatic rental-day calculation
- Automatic total-price calculation
- Vehicle availability management
- View all bookings
- View user-specific bookings
- Update bookings
- Cancel bookings

---

# 🛠️ Tech Stack

## Frontend

- React.js
- JavaScript
- HTML5
- CSS3
- Vite
- Fetch API

## Backend

- Node.js
- Express.js
- CORS
- dotenv

## Database

- Supabase
- PostgreSQL

## Deployment

- Vercel

---

# 🏗️ System Architecture

```text
                    ┌──────────────────────┐
                    │    React Frontend    │
                    │       Vite           │
                    └──────────┬───────────┘
                               │
                               │ REST API
                               ▼
                    ┌──────────────────────┐
                    │   Express.js API     │
                    │     Node.js          │
                    └──────────┬───────────┘
                               │
                               │ Supabase Client
                               ▼
                    ┌──────────────────────┐
                    │       Supabase       │
                    │      PostgreSQL      │
                    └──────────────────────┘
