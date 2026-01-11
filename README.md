# 🌆 Live City Dashboard

A React.js web application that displays live city-related data including weather, news, country information, real-time notes, and WebSocket-based notifications.  
This project demonstrates frontend fundamentals, API handling, authentication, real-time systems, and clean UI design.

---

## 🚀 Features

### 🔐 Authentication & Session Handling
- Login using DummyJSON public API
- Token-based session persistence using localStorage
- Auto-login if session exists
- Protected routes (Dashboard, Countries, Live Notes)
- Logout with session clear
- Meaningful error messages for invalid login

### 🌦 Weather Widget
- Real-time weather data using OpenWeatherMap API
- City-based weather display
- Loading and error states

### 📰 News Widget
- Top headlines using GNews API
- External links to full articles
- Clean and responsive UI

### 🌍 Country Explorer
- Country data from REST Countries API
- Search functionality
- Responsive grid layout
- Flags, population, and region details

### 💬 Firebase Live Notes (Real-Time)
- Firestore-based real-time notes/chat
- Instant updates across multiple browsers
- Username and timestamps
- Proper real-time listener cleanup

### 🔔 WebSocket Notifications
- Native WebSocket implementation (no external libraries)
- Real-time notification stream
- Connection status indicator
- Auto-reconnect logic
- Simulated server-pushed events using public echo server

---

## 🛠 Tech Stack

- React.js (Hooks only)
- React Router DOM
- Tailwind CSS
- Axios
- Firebase Firestore
- Native WebSocket API
- Vite

---

## 📂 Folder Structure

src/
├── components/
├── pages/
├── services/
├── firebase/
├── sockets/
├── App.jsx
└── main.jsx
