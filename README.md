
# SynergySphere

**SynergySphere** is a Task and Project Management Web Application that empowers teams to collaborate, manage projects, track tasks, and monitor progress efficiently. Built with React, Tailwind CSS, and a Node.js/Express backend, it delivers an intuitive interface for unified project and team oversight.

## Features

-   **Project Management**
    
    -   Create and manage projects
        
    -   Assign members to projects
        
    -   Track status, priority, progress, and deadlines
        
-   **Task Management**
    
    -   Add, update, and track tasks within projects
        
    -   Assign tasks to team members
        
    -   Search and filter tasks by name or description
        
    -   Update task progress in real-time
        
-   **Team Collaboration**
    
    -   Add team members
        
    -   View members on tasks and projects
        
    -   Collaborative project updates
        
-   **Dashboard & Analytics**
    
    -   Overview of projects, tasks, progress, and completions
        
    -   Progress bars & due date indicators
        
    -   Visual analytics of project health and member contributions
        
-   **User Profile**
    
    -   User login and signup
        
    -   Sidebar role and info for logged-in user
        
-   **Responsive UI**
    
    -   Collapsible sidebar
        
    -   Clean, modern, and mobile-friendly layout
        

## Tech Stack

-   **Frontend:** React, Tailwind CSS, Lucide Icons
    
-   **Backend:** Node.js, Express.js
    
-   **Database:** PostgreSQL, MySQL, or your preferred SQL DB
    
-   **State Management:** React `useState`, `useEffect` hooks
    
-   **API:** RESTful APIs for projects and tasks
    

## Installation

1.  **Clone the repository**
    
    ```
    git clone [https://github.com/Aadya-05/Odoo-NMIT-Hackathon]
    cd synergysphere
    
    ```
    
2.  **Install backend dependencies**
    
    ```
    cd server
    npm install
    
    ```
    
3.  **Install frontend dependencies**
    
    ```
    cd ../frontend
    npm install
    
    ```
    
4.  **Setup environment variables**
    
    -   Create a `.env` file in the `/server` folder with the following content:
        
    
    ```
    PORT=5000
    DATABASE_URL=your_database_connection_string
    
    ```
    

## Usage

**Start backend:**

```
cd server
npm run dev

```

**Start frontend (open a new terminal):**

```
cd frontend
npm run dev

```

## Folder Structure

```
/server
  ├─ middleware/
  ├─ routes/
  ├─ db.js
  ├─ server.js
  ├─ .env
/frontend
  ├─ public/
  ├─ src/
      ├─ assets/
      ├─ components/
          ├─ HomePage.jsx
          ├─ Login.jsx
          ├─ ProjectDashboard.jsx
          ├─ SignUp.jsx
          ├─ TaskDashboard.jsx
      ├─ App.jsx
      ├─ main.jsx
      ├─ index.css
      ├─ App.css
  ├─ index.html

```

## License

MIT License (add details as appropriate).
