import React from 'react'
import {assets} from '../assets/assets_frontend/assets'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className='flex items-center justify-between text-sm py-4 mb-5 border-b border-b-gray-400'>
        <img className='w-44 cursor-pointer' src={assets.logo} alt='navbar'/>
        <ul className='hidden md:flex items-start gap-5 font-medium'>
            <NavLink to='/'>
                <li className='py-1'>Home</li>
                <hr className='border-none outline-none h-0.5 bg-[#5f6FFF] w-3/5 m-auto hidden'/>
            </NavLink>
            <NavLink to='/doctors'>
                <li className='py-1'>Doctors</li>
                <hr className='border-none outline-none h-0.5 bg-[#5f6FFF] w-3/5 m-auto hidden'/>
            </NavLink>
            <NavLink to='/about'>
                <li className='py-1'>About</li>
                <hr className='border-none outline-none h-0.5 bg-[#5f6FFF] w-3/5 m-auto hidden'/>
            </NavLink>
            <NavLink to='/contacts'>
                <li className='py-1'>Contacts</li>
                <hr className='border-none outline-none h-0.5 bg-[#5f6FFF] w-3/5 m-auto hidden'/>
            </NavLink>
        </ul>
        <div className='flex gap-5 items-center'>
            <button className='bg-[#5f6FFF] text-white rounded-full px-8 py-3 font-light hidden md:block'> Create account</button>
        </div>
    </div>
  )
}

export default Navbar