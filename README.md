🚌 Bus Ticket Booking App
A full-stack bus ticket booking application that allows users to search for available buses, view details, and book tickets. This MERN stack project demonstrates routing, state management, REST API integration, and PDF ticket generation.



📸 Features
🔍 Search & Discover: Easily search for buses by origin, destination, and desired travel date.

📅 Real-time Availability: View real-time bus listings and check seat availability instantly.

💳 Secure Booking: Book tickets seamlessly and receive a downloadable PDF ticket.

📄 Booking Details: Access and view all your booking information effortlessly.

📱 Responsive UI: Enjoy a responsive and intuitive user interface across all devices.

🛠️ Tech Stack
This application is built using the MERN stack, leveraging modern web technologies for a robust and scalable solution.

Frontend
React: A JavaScript library for building user interfaces.

Tailwind CSS: A utility-first CSS framework for rapid UI development.

Backend
Node.js: A JavaScript runtime for server-side logic.

Express.js: A fast, unopinionated, minimalist web framework for Node.js.

MongoDB (with Mongoose): A NoSQL database for flexible data storage. Mongoose provides an ODM for MongoDB.

PDFKit: A Node.js module for generating PDF documents programmatically.

JWT (JSON Web Tokens): For secure user authentication and authorization.

📁 Project Structure
The project is organized into two main directories: backend for server-side logic and frontend for the client-side application.

bus-ticket-booking/
├── backend/
│ ├── models/          # MongoDB schemas and models
│ ├── routes/          # API endpoints
│ ├── controllers/     # Logic for handling requests
│ └── server.js        # Main backend server file
├── frontend/
│ ├── components/      # Reusable React components
│ ├── pages/           # React page components (e.g., Home, Search, Booking)
│ └── App.jsx          # Main React application entry point
└── .gitignore
└── README.md

🚀 Getting Started
Follow these steps to set up and run the Bus Ticket Booking App on your local machine.

Prerequisites
Ensure you have the following installed on your system:

Node.js & npm: Download and install from nodejs.org.

MongoDB: Install MongoDB locally or set up a cloud-hosted MongoDB Atlas instance.

Installation
Clone the repository:

git clone https://github.com/AnithVarghese/bus-ticket-booking.git
cd bus-ticket-booking

Install backend dependencies:
Navigate to the backend directory and install the necessary npm packages.

cd backend
npm install

Install frontend dependencies:
Navigate to the frontend directory and install the necessary npm packages.

cd ../frontend
npm install

Environment Setup
Create a .env file in the backend/ directory and add the following environment variables:

MONGO_URI=your_mongo_db_connection_string
JWT_SECRET=your_secret_key

Replace your_mongo_db_connection_string with your MongoDB connection URI (e.g., mongodb://localhost:27017/bus_booking or your MongoDB Atlas connection string).

Replace your_secret_key with a strong, random string for JWT token signing.

Run the App
You'll need two separate terminals to run the backend and frontend simultaneously.

Terminal 1 (Backend):
Navigate to the backend directory and start the server.

cd backend
npm run dev

The backend server will typically run on http://localhost:5000 (or as configured in server.js).

Terminal 2 (Frontend):
Navigate to the frontend directory and start the React development server.

cd frontend
npm run dev

The frontend application will usually be accessible at http://localhost:5173.

Visit http://localhost:5173 in your web browser to access the application.

📦 PDF Ticket Generation
After successfully booking a ticket, users can download a formatted PDF ticket. This functionality is handled on the server side using the PDFKit library, which dynamically generates the ticket with booking details. The styling of the generated PDF is optimized for A4 size.

🧠 Future Enhancements
Admin Dashboard: Develop a dedicated dashboard for administrators to manage buses, routes, schedules, and view comprehensive reports.

Online Payment Integration: Integrate popular payment gateways like Razorpay or Stripe for secure and seamless transactions.

Email Notifications & QR Code Tickets: Enhance the notification system with detailed email confirmations and implement QR codes on tickets for easier scanning and verification.

User Profiles: Allow users to manage their personal information and preferences.

Dynamic Pricing: Implement a system for dynamic fare adjustments based on demand or time.

👨‍💻 Author
Anith Eldho Varghese

📄 License
This project is licensed under the MIT License. See the LICENSE file for more details.
