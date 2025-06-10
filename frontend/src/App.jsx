import React from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import LandingPage from './components/LandingPage'
import SearchbusDashboard from './components/SearchbusDashboard'
import Errorpage from './components/Errorpage'
import Bookbuscard from './components/Bookbuscard'
import { DataProvider } from './components/Datacontext'
import BookingConfirmation from './components/BookingConfirmation'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UserLogin from './components/User/Userlogin'
import Usersignup from './components/User/Usersignup'
const App = () => {
  return (
    <DataProvider>
       <ToastContainer
        position="top-right"
        autoClose={3000} // 3 seconds
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <header>
      <Navbar/>
      </header>
      
        <BrowserRouter>
       <Routes>
          <Route path='/' element={<LandingPage/>}></Route>
          <Route path='/home/*' element={<LandingPage/>}></Route>
          <Route path='/login' element={<UserLogin/>}></Route>
          <Route path='/signup' element={<Usersignup/>}></Route>
          <Route path='/bus-tickets/*' element={<SearchbusDashboard/>}></Route>
          <Route path='/bus-tickets/viewbus/:id' element={<Bookbuscard/>}></Route>
          <Route path="/home/bus-tickets/search" element={<SearchbusDashboard />} />
          <Route path='/home/bus-tickets/booking-confirmation' element={<BookingConfirmation/>}></Route>
          <Route path='/home/bus-tickets/*' element={<SearchbusDashboard/>}></Route>
          <Route path='/home/bus-tickets/viewbus/:id' element={<Bookbuscard/>}></Route>
          <Route path='/*'  element={<Errorpage/>}></Route>

       </Routes>
      </BrowserRouter>
     
      <footer>
      <Footer/>
      </footer>
    
    </DataProvider>
  )
}

export default App
