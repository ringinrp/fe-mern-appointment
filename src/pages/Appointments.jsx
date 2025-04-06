import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { assets } from '../assets/assets_frontend/assets';

const Appointments = () => {
    const { docId } = useParams();
    const { doctors, currencySymbol } = useContext(AppContext);
    const [docInfo, setDocInfo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [docSlots, setDocSlots] = useState([]);
    const [slotIndex, setSlotIndex] = useState(0);
    const [slotTime, setSlotTime] = useState('');
    const dayOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

    useEffect(() => {
        if (!doctors) {
            setLoading(false);
            return;
        }

        const foundDoctor = doctors.find(
            (doc) => String(doc._id) === String(docId)
        );
        
        setDocInfo(foundDoctor || null);
        setLoading(false);
    }, [docId, doctors]);

    const getAvailableSlots = () => {
        setDocSlots([]);
        const today = new Date();
        const startTime = 9; // 9:00 AM
        const endTime = 20; // 8:00 PM
        const slots = [];
        let validDays = 0;
        let dayCounter = 0;
    
        while (validDays < 7) {
            let currentDate = new Date(today);
            currentDate.setDate(today.getDate() + dayCounter);
    
            // Skip Sundays
            if (currentDate.getDay() === 0) {
                dayCounter++;
                continue;
            }
    
            // Handle start time for today
            if (currentDate.toDateString() === today.toDateString()) {
                const now = new Date();
                currentDate.setHours(
                    now.getHours() > startTime ? now.getHours() : startTime,
                    Math.ceil(now.getMinutes() / 30) * 30
                );
            } else {
                currentDate.setHours(startTime, 0);
            }
    
            // Generate slots until 8:00 PM
            const dayEndTime = new Date(currentDate);
            dayEndTime.setHours(endTime, 0, 0, 0);
    
            while (currentDate <= dayEndTime) {
                const currentHour = currentDate.getHours();
                const currentMinutes = currentDate.getMinutes();
                
                // Block full hours for breaks (12 PM, 3 PM, 6 PM)
                if (currentHour === 12 || currentHour === 15 || currentHour === 18) {
                    currentDate.setMinutes(currentDate.getMinutes() + 30);
                    continue;
                }

                // Format date in English
                const formattedDate = currentDate.toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    day: '2-digit', 
                    month: 'long', 
                    year: 'numeric' 
                });

                const formattedTime = currentDate.toLocaleTimeString('en-US', {
                    hour: 'numeric',
                    minute: '2-digit',
                    hour12: true
                });
    
                slots.push({
                    date: formattedDate,
                    time: formattedTime,
                    dateTime: currentDate.toISOString()
                });
    
                currentDate.setMinutes(currentDate.getMinutes() + 30);
            }
    
            validDays++;
            dayCounter++;
        }
    
        setDocSlots(slots);
    };

    useEffect(() => {
        getAvailableSlots();
    }, [docInfo]);

    useEffect(()=>{
        console.log(docSlots)
    },[docSlots])

    if (loading) return <div>Loading...</div>;
    if (!docInfo) return <div>Doctor not found</div>;

    return docInfo && (
        <div>
            <div className='flex flex-col sm:flex-row gap-4'>
                <div>
                    <img className='bg-[#5f6FFF] w-full sm:max-w-72 rounded-lg' src={docInfo.image} alt=''/>
                </div>
                <div className='flex-1 border border-gray-400 rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0'> 
                    <p className='flex items-center gap-2 text-2xl font-medium text-gray-900'>{docInfo.name} <img className='w-5' src={assets.verified_icon} alt=''/></p>
                    <div className='flex items-center gap-2 text-sm mt-1 text-gray-600'>
                        <p>{docInfo.degree} - {docInfo.specialist}</p>
                        <button className='border py-0.8 text-sm px-2 rounded-full'>{docInfo.experience}</button>
                    </div>
                    <div>
                        <p className='flex items-center gap-2 font-medium text-gray-900 mt-5'>About <img src={assets.info_icon} alt=''/></p>
                        <p className='text-sm text-gray-600 max-w-[700px] mt-1'>{docInfo.about}</p>
                    </div>
                    <p className='text-gray-500 font-medium mt-3'>Appointment fee: <span className='text-gray-600'>{currencySymbol}{docInfo.fees}</span></p>
                </div>
            </div>
            {/* Booking Slots */}
            <div>
                
            </div>
        </div>
    );
};

export default Appointments;