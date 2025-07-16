# 🔗 MERN Stack URL Shortener App

A full-stack URL shortener application built using the MERN stack with authentication, user-specific URL management, and analytics.

## 🚀 Live Links

- **Frontend (React + Tailwind CSS):** [View on Vercel](https://your-frontend.vercel.app)
- **Backend (Node + Express):** [View on Render](https://your-backend.onrender.com)

> ✨ Replace the above URLs with your deployed links!

---

## 📦 Tech Stack

### Frontend:
- React
- Tailwind CSS
- Vite
- JWT Auth

### Backend:
- Node.js
- Express
- MongoDB Atlas
- bcryptjs
- JWT
- CORS
- dotenv

---

## 📁 Folder Structure

/client → React Frontend
/server → Node.js + Express API

---

## 🧠 Features

- 🔐 Authentication (Register / Login )
- 🌐 Shorten any valid URL
- 📊 Track click counts
- 🧾 View stats in a popup modal
- 🔒 User-specific URL dashboard
- 🍪 JWT-based auth without cookies (localStorage)
- 🌍 Hosted with Vercel (frontend) & Render (backend)

---

## 🧪 Setup Locally

### 1. Clone Repo
```bash
git clone https://github.com/your-username/mern-url-shortener.git
cd mern-url-shortener
```


### 2. Setup Backend

cd server
npm install
touch .env

#### .env example:

MONGODB_URI=mongodb+srv://<user>:<pass>@cluster.mongodb.net/mydb
JWT_SECRET=your_jwt_secret
PORT=5000

node server.js
# or with nodemon
nodemon server.js


### 3. Setup Frontend
cd ../client
npm install
touch .env

VITE_API_URL=http://localhost:5000

npm run dev


## ☁️ Deployment
Frontend → Vercel
Set Root Directory to client

Add VITE_API_URL environment variable

Backend → Render
Set Root Directory to server

Build Command: npm install

Start Command: node index.js

Add .env variables

## 🙋‍♂️ Author
Aryan Kumar
🔗 GitHub : https://github.com/AryanKumar231
📧 Email : aryanwork1204@gmail.com
