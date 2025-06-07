#  Bus Ticket Booking App

A full-stack **bus ticket booking application** built using the MERN stack (MongoDB, Express, React, Node.js). The app allows users to search for buses, view available routes, book tickets, and download a PDF receipt.



---

##  Features

-  **Search Buses**: Filter by origin, destination, and travel date.
-  **View Bus Listings**: See available routes, times, and details.
-  **Book Tickets**: Secure and simple booking system.
-  **Download PDF Ticket**: PDF generated backend-side using PDFKit.
-  **Responsive UI**: Tailwind CSS-based modern frontend.

---

##  Tech Stack

###  Frontend

- React
- Tailwind CSS
- Axios

###  Backend

- Node.js
- Express.js
- MongoDB with Mongoose
- PDFKit (for PDF generation)
- JSON Web Tokens (JWT)

---

##  Getting Started

###  Prerequisites

- Node.js and npm
- MongoDB (Local or MongoDB Atlas)

###  Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/AnithVarghese/bus-ticket-booking.git
   cd bus-ticket-booking

2. **Install backend dependencies**
   ```bash
     cd backend
     npm install

3. **Create environment file for backend**

     - Inside the backend/ folder, create a .env file and add:

    ```env
      MONGO_URI=your_mongodb_connection_string
      JWT_SECRET=your_jwt_secret

4. **Start the backend server**

   ```bash
     npm run dev
5. **Open a new terminal and install frontend dependencies**

    ```bash
    cd ../frontend
    npm install

6. **Start the frontend development server**
    ```bash
    npm run dev

7. **Open the application in your browser**

    - Visit: http://localhost:5173

---

## PDF Ticket Generation
 **Tickets are generated as downloadable PDFs using PDFKit on the backend. The PDF includes:**

- Bus details

- Passenger name

- Seat information

- Booking time and date

- Output is styled and formatted for A4 printing.


## Author
*Anith Eldho Varghese*



## License
- This project is licensed under the MIT License.
