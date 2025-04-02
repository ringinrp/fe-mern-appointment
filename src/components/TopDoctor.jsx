import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

const TopDoctor = () => {

    const {doctors} = useContext(AppContext);
    const navigate = useNavigate();

  return (
    <div className='flex flex-col items-center gap-4 my-16 text-gray-900 md:mx-10'>
      <h1 className='text-3xl font-medium'>Top Doctor</h1>
      <p className="sm:w-1/3 text-center text-sm">Simply browse through our extensive list of trusted doctors.</p>
      
      {/* Grid Container */}
      <div className="w-full grid 
        grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 
        gap-6 pt-5 px-3 sm:px-0">
        
        {doctors.slice(0,10).map((item, index) => (
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
              <p className="text-gray-600 text-sm">{item.speciality}</p>
            </div>
          </div>
        ))}
      </div>
      
      <button onClick={()=>{navigate('/doctors'); scrollTo(0,0)}} className="mt-10 px-12 py-3 bg-blue-50 text-gray-600 rounded-full 
        hover:bg-[#5f6FFF] hover:text-white transition-colors">
        View More
      </button>
    </div>
  );
};

export default TopDoctor;