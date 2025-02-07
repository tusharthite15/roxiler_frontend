# Roxiler Systems MERN Stack Coding Challenge

## 📌 Overview
This project implements a **MERN Stack** application that fetches product transactions from a third-party API, initializes a database, and provides various API endpoints for transactions listing, statistics, and visualizations (bar chart, pie chart). The frontend consumes these APIs to display transactions, statistics, and charts in a dashboard.



## 🏗️ Tech Stack
- **Frontend**: React.js (with Chart.js for visualizations)
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (hosted on Vercel backend)
- **Deployment**: Backend hosted on Vercel, frontend in React

## 🚀 Features
### **Backend (Node.js + Express + MongoDB)**
- **Database Initialization**: Fetches data from [Third-Party API](https://s3.amazonaws.com/roxiler.com/product_transaction.json) and stores it in MongoDB.
- **Transactions API**: Provides paginated and searchable transactions.
- **Statistics API**: Returns total sales, total sold, and unsold items for a selected month.
- **Bar Chart API**: Returns the number of items in specific price ranges for a selected month.
- **Pie Chart API**: Returns unique product categories and their item counts for a selected month.
- **Combined API**: Fetches data from the above APIs and returns a combined response.

### **Frontend (React.js + Chart.js)**
- **Transactions Table**: Displays paginated transactions with search functionality.
- **Statistics Cards**: Show total sales, sold, and unsold items.
- **Bar Chart**: Displays price range distribution.
- **Pie Chart**: Displays item distribution by category.
- **Month Dropdown**: Allows users to filter data based on the selected month.

---
## 📂 Project Structure
```
📦 project-root
├── 📂 backend  (Node.js + Express APIs)
│   ├── 📂 models  (MongoDB Models)
│   ├── 📂 routes  (API Endpoints)
│   ├── 📂 controllers  (Business Logic)
│   ├── server.js  (Entry Point)
│   ├── database.js  (MongoDB Connection)
│   ├── seed.js  (Fetch & Store Initial Data)
│   ├── vercel.json  (Vercel Configuration)
├── 📂 frontend  (React.js + Chart.js UI)
│   ├── 📂 components  (Table, Charts, Statistics)
│   ├── 📂 pages  (Dashboard)
│   ├── 📂 services  (API Calls)
│   ├── App.js  (Main Component)
│   ├── index.js  (React Entry Point)
│   ├── package.json  (Dependencies)
├── README.md  (Project Documentation)
```

---
## 📡 Backend API Endpoints

### **1️⃣ Initialize Database**
```http
GET /api/init-db
```
- Fetches data from the third-party API and stores it in MongoDB.

### **2️⃣ Get Transactions (Search & Pagination)**
```http
GET /api/transactions?month=3&year=2024&page=1&perPage=10&search=iphone
```
- **month**: Required (1-12)
- **year**: Required
- **page**: Optional (default: 1)
- **perPage**: Optional (default: 10)
- **search**: Optional (filters by title, description, or price)

### **3️⃣ Get Statistics**
```http
GET /api/statistics?month=3
```
- Returns:
  - `totalSales`
  - `totalSoldItems`
  - `totalUnsoldItems`

### **4️⃣ Get Bar Chart Data**
```http
GET /api/barchart?month=3
```
- Returns the count of items in price ranges: `0-100`, `101-200`, ..., `901+`.

### **5️⃣ Get Pie Chart Data**
```http
GET /api/piechart?month=3
```
- Returns product categories and item counts.

### **6️⃣ Get Combined Data**
```http
GET /api/combined?month=3
```
- Returns a JSON object combining data from statistics, bar chart, and pie chart.

---
## 🎨 Frontend Features
### **Dashboard Page** (`/`)
- **Dropdown** to select a month (default: March)
- **Transactions Table** with pagination & search
- **Statistics Cards** (Total Sales, Sold, Unsold Items)
- **Bar Chart** (Price Range Distribution)
- **Pie Chart** (Category Distribution)

---
## 📦 Installation & Setup

### **Backend Setup**
```sh
cd backend
npm install
npm start  # Runs on http://localhost:5000
```
- Ensure MongoDB is running
- Deploy on Vercel (`vercel --prod`)

### **Frontend Setup**
```sh
cd frontend
npm install
npm start  # Runs on http://localhost:3000
```
- Update API URLs in `services/api.js` to point to deployed backend.

---
## 🛠 Deployment
### **Backend (Vercel)**
```sh
vercel --prod
```
- Ensure `vercel.json` is configured to expose API routes.
- Set up **MongoDB Atlas** & whitelist **Vercel IPs**.

### **Frontend (Vercel/Netlify)**
```sh
npm run build
```
- Deploy to **Vercel** or **Netlify**.

---

📽️ [Watch the demo](https://drive.google.com/file/d/17ryOsIJu7TSid4o70J6WO9Ee4xtOBtax/view?usp=sharing)



## ✅ Next Steps
- ✅ Complete API Testing using Postman
- ✅ Improve UI with Tailwind/Material-UI
- ✅ Add Authentication (JWT, Firebase, etc.)

---
## 📩 Contact
For any issues, feel free to reach out!

