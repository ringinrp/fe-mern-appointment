import React from 'react'
import { specialityData } from '../assets/assets_frontend/assets'
import { Link } from 'react-router-dom'

const SpecialistMenu = () => {
  return (
    <div className='flex flex-col items-center gap-4 py-16 text-gray-800' id='specialist'>
        <h1 className="text-3xl font-medium">Find by Speciality</h1>
        <p className="sm:w-1/3 text-sm text-center">Simply browse through our extensive list of trusted doctors, schedule your appointment hassle-free.</p>
        <div className="flex sm:justify-center gap-4 pt-5 w-full overflow-scroll">
            {specialityData.map((item, index) => (
                <Link to={`/doctors/${item.speciality}`} key={index} >
                    <img className="w-16 sm:w-24 mb-2" src={item.image} alt={item.name} />
                    <p>{item.speciality}</p>
                </Link>
            ))}
        </div>
    </div>
  )
}

export default SpecialistMenu