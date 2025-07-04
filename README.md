# 📚 Readora - Library Management System (Client)

A modern, responsive library management system built with React, TypeScript, and Redux Toolkit Query. This application allows users to manage books, handle borrowing operations, and track library statistics without authentication requirements.

## 🚀 Live Demo

**Client Application**: [https://readora-client.vercel.app/](https://readora-client.vercel.app/)

**Backend API**: [https://library-management-server-eta.vercel.app/api](https://library-management-server-eta.vercel.app/api)

## ✨ Features

### 📖 Book Management
- **View Books**: Browse all books in a responsive table/grid layout
- **Add Books**: Create new books with detailed information
- **Edit Books**: Update existing book details
- **Delete Books**: Remove books with confirmation dialog
- **Search & Filter**: Find books by title, author, or genre

### 📋 Borrowing System
- **Borrow Books**: Request books with quantity and due date
- **Availability Check**: Real-time validation of book availability
- **Borrow Summary**: View aggregated borrowing statistics
- **Copy Management**: Automatic availability updates based on stock

### 🎨 User Experience
- **Responsive Design**: Optimized for mobile, tablet, and desktop
- **Real-time Updates**: Instant UI updates using RTK Query
- **Loading States**: Smooth loading indicators
- **Error Handling**: User-friendly error messages
- **Toast Notifications**: Success/error feedback

## 🛠️ Technology Stack

| Category | Technology |
|----------|------------|
| **Frontend** | React 18 + TypeScript |
| **State Management** | Redux Toolkit + RTK Query |
| **Styling** | Tailwind CSS |
| **Build Tool** | Vite |
| **Deployment** | Vercel |
| **Form Handling** | React Hook Form + Zod |
| **Notifications** | React Hot Toast |

## 📱 Pages & Routes

| Route | Description |
|-------|-------------|
| `/` | Home page with featured books |
| `/books` | Complete book listing with actions |
| `/books/create` | Add new book form |
| `/books/:id` | Book details page |
| `/books/:id/edit` | Edit book form |
| `/books/:id/borrow` | Borrow book form |
| `/borrow-summary` | Borrowing statistics and summary |

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Nifazur/Readora-Library-Management-System-Client.git
   cd readora-client
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Environment Setup**
   Create a `.env` file in the root directory:
   ```env
   VITE_API_BASE_URL=https://library-management-server-eta.vercel.app/api
   VITE_APP_NAME=Readora
   ```

4. **Start development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173`

## 📦 Build & Deployment

### Build for Production
```bash
npm run build
# or
yarn build
```

### Preview Production Build
```bash
npm run preview
# or
yarn preview
```

### Deploy to Vercel
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```


## 🎯 API Integration

The client integrates with the backend API using RTK Query for efficient data fetching and caching:

### Book Operations
- `GET /api/books` - Fetch all books
- `POST /api/books` - Create new book
- `GET /api/books/:id` - Get book by ID
- `PUT /api/books/:id` - Update book
- `DELETE /api/books/:id` - Delete book

### Borrow Operations
- `POST /api/borrows` - Create borrow record
- `GET /api/borrows/summary` - Get borrow statistics



