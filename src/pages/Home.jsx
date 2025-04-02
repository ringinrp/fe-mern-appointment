import React from 'react'
import Header from '../components/Header'
import SpecialistMenu from '../components/SpecialistMenu'
import TopDoctor from '../components/TopDoctor'
import Banner from './Banner'

const Home = () => {
  return (
    <div>
        <Header />
        <SpecialistMenu />
        <TopDoctor />
        <Banner />
    </div>
  )
}

export default Home
