import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const Doctors = () => {

    const {specialist} = useParams()
    const {doctors} = useContext(AppContext)

    const [filterDoc, setFilterDoc] = useState([])
    const navigate = useNavigate()

    const applyFilter = () => {
        if (specialist) {
           setFilterDoc(doctors.filter(doc => doc.specialist === specialist))
        }else{
            setFilterDoc(doctors)
        }
    }

    useEffect(() => {
        applyFilter()
    }, [specialist, doctors])

  return (
    <div>
      <p className='text-gray-600'>Browse through the doctors specialist.</p>
      <div className=' flex flex-col sm:flex-row items-start gap-5 mt-5'>
        <div className='flex flex-col gap-4 text-sm text-gray-600'>
            <p onClick={() => specialist === 'General physician' ? navigate('/doctors') : navigate('/doctors/General physician')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${specialist === "General physician" ? "bg-indigo-100 text-black" : ""}`}>General physician</p>
            <p onClick={() => specialist === 'Gynecologist' ? navigate('/doctors') : navigate('/doctors/Gynecologist')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${specialist === "Gynecologist" ? "bg-indigo-100 text-black" : ""}`}>Gynecologist</p>
            <p onClick={() => specialist === 'Dermatologist' ? navigate('/doctors') : navigate('/doctors/Dermatologist')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${specialist === "Dermatologist" ? "bg-indigo-100 text-black" : ""}`}>Dermatologist</p>
            <p onClick={() => specialist === 'Pediatricians' ? navigate('/doctors') : navigate('/doctors/Pediatricians')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${specialist === "Pediatricians" ? "bg-indigo-100 text-black" : ""}`}>Pediatricians</p>
            <p onClick={() => specialist === 'Neurologist' ? navigate('/doctors') : navigate('/doctors/Neurologist')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${specialist === "Neurologist" ? "bg-indigo-100 text-black" : ""}`}>Neurologist</p>
            <p onClick={() => specialist === 'Gastroenterologist' ? navigate('/doctors') : navigate('/doctors/Gastroenterologist')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${specialist === "Gastroenterologist" ? "bg-indigo-100 text-black" : ""}`}>Gastroenterologist</p>
        </div>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 
                            lg:grid-cols-4 xl:grid-cols-5 gap-6'>
            {
                filterDoc.map((item, index) => (
                    <div
                    onClick={()=>navigate(`/appointments/${item._id}`)}
                      key={index} 
                      className="border border-blue-200 rounded-xl overflow-hidden 
                        cursor-pointer hover:-translate-y-1 hover:shadow-lg
                        transition-all bg-white"
                    >
                      <img 
                        className="w-full h-48 object-cover bg-blue-50" 
                        src={item.image} 
                        alt={item.name} 
                      />
                      <div className="p-4">
                        <div className="flex items-center gap-2 text-sm text-green-500 mb-2">
                          <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                          <span>Available</span>
                        </div>
                        <h3 className="text-gray-900 font-medium">{item.name}</h3>
                        <p className="text-gray-600 text-sm">{item.specialist}</p>
                      </div>
                    </div>
                  ))
            }
        </div>
      </div>
    </div>
  )
}

export default Doctors