# ComfyWay

A full-stack property management platform where users can discover and book properties, while property owners manage listings and view analytics. Includes a premium membership system offering discounts and a dark mode user interface.

---

## Features

### For Users
- Browse property listings with images, ratings, and descriptions
- View detailed property pages and reviews
- Book propertys directly through the platform
- Premium Membership: Automatically receive a 25% discount on all bookings
- Dark Mode support

### For Property Owners
- Owner dashboard with analytics and performance tracking
- Full CRUD capabilities to manage property properties
- View all bookings made by users for listed properties

---

## Tech Stack

- **Frontend**: React, Tailwind CSS, Framer Motion
- **Backend**: Node.js, Express.js, MongoDB
- **Authentication**: JWT-based (owners)
- **State Management**: React Context API
- **Deployment**: Vercel / Render / MongoDB Atlas

---

## Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/ComfyWay.git
cd ComfyWay
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables

Create a `.env` file in the root directory:

```env
MONGODB_URI=your_mongo_connection
JWT_SECRET=your_secret
```

### 4. Start the Development Server

```bash
npm run dev
```
```bash
npm run server
```

---
