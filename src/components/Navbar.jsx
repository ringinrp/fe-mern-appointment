import React, { useState } from 'react'
import {assets} from '../assets/assets_frontend/assets'
import { NavLink, useNavigate } from 'react-router-dom'

const Navbar = () => {

    const navigate = useNavigate();

    const [showMenu, setShowMenu] = useState(false);

    const[token, setShowToken] = useState(true);
    
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
            {
                token ? <div className='flex items-center gap-2 cursor-pointer group relative'>
                    <img className='w-8 rounded-full' src={assets.profile_pic} alt=''/>
                    <img className='w-2.5' src={assets.dropdown_icon} alt=''/>
                    <div className='absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block'>
                        <div className='min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4'>
                            <p onClick={()=>navigate('profile')} className='hover:text-black cursor-pointer'>My Profile</p>
                            <p onClick={()=>navigate('my-appointments')} className='hover:text-black cursor-pointer'>My Appointments</p>
                            <p className='hover:text-black cursor-pointer'>Logout</p>
                        </div>
                    </div>
                </div> : <button onClick={()=>navigate('/login')} className='bg-[#5f6FFF] text-white rounded-full px-8 py-3 font-light hidden cursor-pointer md:block'> Create account</button>
            }
            
        </div>
    </div>
  )
}

export default Navbar