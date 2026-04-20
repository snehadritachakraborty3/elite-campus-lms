# Learning Management System (LMS)

A modern full-stack Learning Management System built with **Spring Boot** and **React**.

## Tech Stack
- **Backend:** Spring Boot 3, Spring Security, JWT, JPA, H2 Database (In-memory)
- **Frontend:** React, Vite, Context API, Vanilla CSS (Premium Design)

## How to Run

### 1. Start the Backend
1. **Requirement:** You must have **Maven** installed and in your PATH, OR use an **IDE** (like IntelliJ or Eclipse).
2. Open a terminal in the `backend` folder.
3. Run: `mvn spring-boot:run` (Note: `mvnw` was removed for simplicity, please use global `mvn`).
4. Alternatively, open the `backend` folder in your IDE and run `LmsApplication.java`.
4. **H2 Console:** Available at [http://localhost:8080/h2-console](http://localhost:8080/h2-console) (JDBC URL: `jdbc:h2:mem:lmsdb`, User: `sa`, Password: `password`).

### 2. Start the Frontend
1. Open another terminal in the `frontend` folder.
2. Run: `npm install` (if not done already).
3. Run: `npm run dev`.
4. Open the application at [http://localhost:5173](http://localhost:5173).

## Key Features
- **Modern Auth:** JWT-based login and registration.
- **Course Catalog:** Browse available courses with details.
- **Enrollment:** Instant enrollment into courses.
- **Dashboard:** Personal dashboard to track enrolled courses and learning stats.
- **Responsive Design:** Premium UI with micro-animations and a glassmorphism feel.
