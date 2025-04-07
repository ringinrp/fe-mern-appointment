// RelatedDoctors.jsx
import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';

const RelatedDoctors = ({ specialist: initialSpecialist, docId: initialDocId }) => {
  const { doctors } = useContext(AppContext);
  const [relDoc, setRelDoc] = useState([]);
  const [excludedDocIds, setExcludedDocIds] = useState([initialDocId]);
  const [currentSpecialist, setCurrentSpecialist] = useState(initialSpecialist);
  const navigate = useNavigate();

  useEffect(() => {
    setExcludedDocIds([initialDocId]);
    setCurrentSpecialist(initialSpecialist);
  }, [initialDocId, initialSpecialist]);

  useEffect(() => {
    if (doctors.length === 0) return;

    const filteredDoctors = doctors.filter((doc) => 
      doc.specialist === currentSpecialist && 
      !excludedDocIds.includes(doc._id)
    );
    
    setRelDoc(filteredDoctors);
  }, [doctors, currentSpecialist, excludedDocIds]);

  const handleDoctorClick = (doctorId) => {
    navigate(`/appointments/${doctorId}`);
    window.location.reload(); // Pastikan data baru diambil
  };

  return (
    <div className='flex flex-col items-center gap-4 my-16 text-gray-900 md:mx-10'>
       <h1 className='mt-10 text-3xl font-medium'>Related Doctor</h1>
       <p className="sm:w-1/3 text-center text-sm">Simply browse through our extensive list of trusted doctors.</p>
      {/* ... (kode tampilan tetap sama) */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 pt-5 px-3 sm:px-0">
        {relDoc.length > 0 ? (
          relDoc.slice(0, 5).map((doctor) => (
            <div
              key={doctor._id}
              onClick={() => handleDoctorClick(doctor._id)}
              className="border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:-translate-y-1 hover:shadow-lg transition-all bg-white"
            >
              <img 
                className="w-full h-48 object-cover bg-blue-50" 
                src={doctor.image || 'placeholder.jpg'}
                alt={doctor.name} 
              />
              <div className="p-4">
                <div className="flex items-center gap-2 text-sm text-green-500 mb-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  <span>Available</span>
                </div>
                <h3 className="text-gray-900 font-medium">{doctor.name}</h3>
                <p className="text-gray-600 text-sm">{doctor.specialist}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">No related doctors found</p>
        )}
      </div>
    </div>
  );
};

export default RelatedDoctors;