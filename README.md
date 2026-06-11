# ProfileHub — Profile Management Web Application

A polished, production-ready full-stack profile management app. Users can view and edit their professional profile through a modern, responsive UI backed by a REST API.

---

## ✨ Features

- **Profile View Page** — glassmorphism card with name, title, bio, contact info, and social links
- **Edit Profile Page** — form with live validation, error messages, and toast notifications
- **REST API** — GET and PUT endpoints with JSON file storage
- **Responsive** — works on mobile, tablet, and desktop
- **Smooth UX** — page transitions, hover effects, loading states

---

## 🛠 Tech Stack

| Layer     | Technology                        |
|-----------|-----------------------------------|
| Frontend  | React 18, Vite, React Router v6   |
| HTTP      | Axios                             |
| Backend   | Node.js, Express.js               |
| Storage   | JSON file (`profile.json`)        |
| Fonts     | Inter, Syne (Google Fonts)        |

---

## 📁 Folder Structure

```
profile-app/
├── frontend/
│   ├── index.html
│   ├── vite.config.js
│   ├── package.json
│   └── src/
│       ├── App.jsx
│       ├── main.jsx
│       ├── index.css
│       ├── components/
│       │   ├── ProfileCard.jsx
│       │   ├── Button.jsx
│       │   ├── SocialLinks.jsx
│       │   └── InputField.jsx
│       ├── pages/
│       │   ├── Profile.jsx
│       │   └── EditProfile.jsx
│       └── services/
│           └── api.js
│
└── backend/
    ├── server.js
    ├── package.json
    ├── routes/
    │   └── profileRoutes.js
    ├── controllers/
    │   └── profileController.js
    └── data/
        └── profile.json
```

---

## 🚀 Installation & Setup

### Prerequisites

- Node.js v18+
- npm v9+

---

### 1. Clone the project

```bash
git clone https://github.com/yourhandle/profile-app.git
cd profile-app
```

---

### 2. Run the Backend

```bash
cd backend
npm install
npm run dev       # uses nodemon for hot reload
# OR
npm start         # plain node
```

Backend runs at: **http://localhost:5000**

---

### 3. Run the Frontend

Open a second terminal:

```bash
cd frontend
npm install
npm run dev
```

Frontend runs at: **http://localhost:3000**

> The Vite dev server proxies `/api` requests to the backend automatically.

---

## 📡 API Documentation

### GET /api/profile

Returns the current profile data.

**Request**
```
GET http://localhost:5000/api/profile
```

**Response** `200 OK`
```json
{
  "name": "Alex Rivera",
  "title": "Full-Stack Developer & UI Engineer",
  "description": "I craft digital experiences...",
  "phone": "+1 (555) 012-3456",
  "email": "alex.rivera@example.com",
  "location": "San Francisco, CA",
  "linkedin": "https://linkedin.com/in/alexrivera",
  "instagram": "https://instagram.com/alexrivera.dev",
  "github": "https://github.com/alexrivera"
}
```

---

### PUT /api/profile

Updates profile data. All required fields must be present and non-empty.

**Request**
```
PUT http://localhost:5000/api/profile
Content-Type: application/json
```

```json
{
  "name": "Alex Rivera",
  "title": "Senior Engineer",
  "description": "Updated bio...",
  "phone": "+1 (555) 999-0000",
  "email": "new@example.com",
  "location": "New York, NY",
  "linkedin": "https://linkedin.com/in/alexrivera",
  "instagram": "https://instagram.com/alexrivera.dev",
  "github": "https://github.com/alexrivera"
}
```

**Response** `200 OK`
```json
{
  "message": "Profile updated successfully.",
  "profile": { ... }
}
```

**Response** `400 Bad Request` (missing required field)
```json
{
  "error": "Field \"name\" is required."
}
```

---

## 🎨 UI Design Decisions

- **Color palette:** Deep dark background (`#0a0a0f`) with violet accent (`#7c6af7`)
- **Typography:** Syne (display) + Inter (body) — high contrast, professional
- **Glassmorphism card** with `backdrop-filter: blur` for the profile view
- **Accent glow** on avatar and buttons for depth
- **Smooth transitions** on hover and page entry

---

## 🔧 Development Notes

- Profile photo is currently handled via initials-based avatar. To add image upload, extend `PUT /api/profile` with `multipart/form-data` and serve static files from the backend.
- To use a real database, replace `profileController.js` with any DB driver (MongoDB, PostgreSQL, SQLite).

---

## 📦 Build for Production

**Frontend:**
```bash
cd frontend
npm run build
# Output in frontend/dist/
```

**Backend:**
```bash
cd backend
npm start
# Serve frontend/dist as static files from Express for a unified deployment
```

---

## 💡 Suggested Git Commit History

```
git commit -m "Initial project setup — folder structure & config"
git commit -m "Backend: Express server, routes, controller, profile.json"
git commit -m "Frontend: component architecture — Button, InputField, SocialLinks"
git commit -m "Frontend: ProfileCard and Profile view page"
git commit -m "Frontend: EditProfile page with validation and toast notifications"
git commit -m "Integration: Axios API service, Vite proxy config"
git commit -m "Polish: animations, glassmorphism, responsive layout"
git commit -m "Docs: README with full API documentation"
```

---

## 📄 License

MIT
