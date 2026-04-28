# Church Backend

A Node.js + Express backend for managing church application features such as authentication, user management, and database integration with Prisma and PostgreSQL.

---

## 🚀 Features
- User authentication (JWT-based)
- Role-based access (Admin, Member)
- Database integration with Prisma ORM
- Modular route structure (auth, users, etc.)
- Configurable environment variables
- Error handling and logging

---


---

## ⚙️ Setup & Installation
1. **Clone the repo**
   ```bash
   git clone https://github.com/MphoJr/church-backend.git
   cd church-backend
   ```
   2.Install dependencies
   ```
   npm install
   ```
   Configure environment variables Create a  file in the root:
```
DATABASE_URL="postgresql://user:password@localhost:/churchdb"
JWT_SECRET="your-secret-key"
PORT=5000
```
Generate Prisma client
```
npx prisma generate

```
Run databse migrations
```
npx prisma migrate dev --name init
```
Start the backend
```
npm run start
```

🖥️ Frontend Repository
The frontend for this project is maintained separately:
👉 Church Frontend Repository (https://github.com/MphoJr/NAOG_Frontend)
Make sure to clone and run the frontend alongside this backend for full functionality.

Scripts
• 	 → Start server
• 	 → Start with nodemon
• 	 → Regenerate Prisma client
• 	 → Apply migrations

Tech Stack
• 	Node.js (v18+ recommended)
• 	Express.js
• 	Prisma ORM
• 	PostgreSQL
• 	JWT Authentication

👤 Author
Mpho – Junior Software Developer
Passionate about full-stack apps, creative UI/UX, and scalable backend design.
