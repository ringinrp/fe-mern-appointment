import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Doctors from './pages/Doctors'
import Appointments from './pages/Appointments'
import Login from './pages/Login'
import About from './pages/About'
import Profile from './pages/Profile'
import MyAppointments from './pages/MyAppointments'
import Navbar from './components/Navbar'
import Contacts from './pages/Contacts'
import Footer from './components/Footer'

const App = () => {
  return (
    <div className='mx-4 sm:mx-[10%]'>
      <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/doctors' element={<Doctors />} />
          <Route path='/doctors/:specialist' element={<Doctors />} />
          <Route path='/appointments' element={<MyAppointments />} />
          <Route path='/appointments/:doctorId' element={<Appointments />} />
          <Route path='/login' element={<Login />} />
          <Route path='/about' element={<About />} />
          <Route path='/contacts' element={<Contacts />} />
          <Route path='/profile' element={<Profile />} />
        </Routes>
        <Footer />
    </div>
  )
}

export default App
