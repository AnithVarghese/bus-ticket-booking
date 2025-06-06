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
const App = () => {
  return (
    <DataProvider>
      
      <header>
      <Navbar/>
      </header>
      
        <BrowserRouter>
       <Routes>
          <Route path='/' element={<LandingPage/>}></Route>
          <Route path='/home/*' element={<LandingPage/>}></Route>
          <Route path='/login' element={<LandingPage/>}></Route>
          <Route path='/signup' element={<LandingPage/>}></Route>
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
