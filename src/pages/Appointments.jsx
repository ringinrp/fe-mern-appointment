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
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState(null);
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
        const today = new Date();
        const startTime = 9; 
        const endTime = 20; 
        const slots = [];
        let validDays = 0;
        let dayCounter = 0;
    
        while (validDays < 7) {
            const currentDate = new Date(today);
            currentDate.setDate(today.getDate() + dayCounter);
    
            if (currentDate.getDay() === 0) {
                dayCounter++;
                continue;
            }
    
            if (currentDate.toDateString() === today.toDateString()) {
                const now = new Date();
                currentDate.setHours(
                    now.getHours() > startTime ? now.getHours() : startTime,
                    Math.ceil(now.getMinutes() / 30) * 30
                );
            } else {
                currentDate.setHours(startTime, 0);
            }
    
            const dayEndTime = new Date(currentDate);
            dayEndTime.setHours(endTime, 0, 0, 0);
    
            while (currentDate <= dayEndTime) {
                const currentHour = currentDate.getHours();
                
                if (currentHour === 12 || currentHour === 15 || currentHour === 18) {
                    currentDate.setMinutes(currentDate.getMinutes() + 30);
                    continue;
                }

                // Format tanggal dan waktu yang mudah dibaca
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
                    dateTime: currentDate.toISOString(), // Format ISO untuk backend
                    displayDateTime: currentDate.toLocaleString('en-US', { // Format tampilan
                        weekday: 'long',
                        day: '2-digit',
                        month: 'long',
                        year: 'numeric',
                        hour: 'numeric',
                        minute: '2-digit',
                        hour12: true
                    })
                });
    
                currentDate.setMinutes(currentDate.getMinutes() + 30);
            }
    
            validDays++;
            dayCounter++;
        }
    
        setDocSlots(slots);
    };

    useEffect(() => {
        if (docInfo) {
            getAvailableSlots();
        }
    }, [docInfo]);

    const groupedSlots = docSlots.reduce((acc, slot) => {
        const date = new Date(slot.dateTime);
        const dateKey = date.toISOString().split('T')[0];
        
        if (!acc[dateKey]) {
            acc[dateKey] = {
                dateKey: dateKey,
                day: dayOfWeek[date.getDay()],
                date: date.toLocaleDateString('en-US', {
                    day: '2-digit',
                    month: 'long',
                    year: 'numeric'
                }),
                slots: []
            };
        }
        acc[dateKey].slots.push(slot);
        return acc;
    }, {});

    const uniqueDates = Object.values(groupedSlots);

    useEffect(() => {
        if (uniqueDates.length > 0 && !selectedDate) {
            setSelectedDate(uniqueDates[0].dateKey);
        }
    }, [uniqueDates, selectedDate]);

    const filteredSlots = selectedDate ? groupedSlots[selectedDate]?.slots || [] : [];

    if (loading) return <div>Loading...</div>;
    if (!docInfo) return <div>Doctor not found</div>;

    return (
        <div className="p-4 sm:p-8">
            {/* Doctor Info Section */}
            <div className='flex flex-col sm:flex-row gap-4'>
                <div>
                    <img 
                        className='bg-[#5f6FFF] w-full sm:max-w-72 rounded-lg' 
                        src={docInfo.image} 
                        alt={docInfo.name} 
                    />
                </div>
                <div className='flex-1 border border-gray-400 rounded-lg p-8 bg-white'>
                    <p className='flex items-center gap-2 text-2xl font-medium'>
                        {docInfo.name} 
                        <img className='w-5' src={assets.verified_icon} alt='Verified'/>
                    </p>
                    <div className='flex items-center gap-2 text-sm mt-1 text-gray-600'>
                        <p>{docInfo.degree} - {docInfo.specialist}</p>
                        <button className='border px-2 py-0.5 rounded-full'>
                            {docInfo.experience} years experience
                        </button>
                    </div>
                    <div className='mt-5'>
                        <p className='flex items-center gap-2 font-medium'>
                            About <img src={assets.info_icon} alt='Info' className='w-4'/>
                        </p>
                        <p className='text-sm text-gray-600 max-w-[700px] mt-1'>
                            {docInfo.about}
                        </p>
                    </div>
                    <p className='text-gray-500 mt-3'>
                        Appointment fee: 
                        <span className='text-gray-600 ml-1'>
                            {currencySymbol}{docInfo.fees}
                        </span>
                    </p>
                </div>
            </div>

            {/* Booking Section */}
            <div className='sm:ml-72 sm:pl-4 mt-8'>
                <h3 className='text-xl font-medium mb-4'>Available Time Slots</h3>
                
                {/* Day Selector */}
                <div className='flex gap-2 overflow-x-auto pb-2'>
                    {uniqueDates.map((dateGroup) => (
                        <button 
                            key={dateGroup.dateKey}
                            className={`px-4 py-2 rounded-lg focus:outline-none transition-colors ${
                                selectedDate === dateGroup.dateKey 
                                    ? 'bg-[#5f6FFF] text-white' 
                                    : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-100'
                            }`}
                            onClick={() => {
                                setSelectedDate(dateGroup.dateKey);
                                setSelectedTime(null);
                            }}
                        >
                            <div className='text-sm font-medium'>{dateGroup.day}</div>
                            <div className='text-xs'>{dateGroup.date.split(', ')[0]}</div>
                        </button>
                    ))}
                </div>

                {/* Time Slots */}
                <div className='mt-4 grid grid-cols-3 sm:grid-cols-4 gap-3'>
                    {filteredSlots.map((slot, index) => (
                        <button 
                            key={index}
                            className={`px-3 py-2 rounded-lg shadow-sm focus:outline-none transition-all ${
                                selectedTime?.dateTime === slot.dateTime
                                    ? 'bg-[#5f6FFF] text-white'
                                    : 'bg-white border border-gray-300 hover:bg-gray-50'
                            }`}
                            onClick={() => setSelectedTime(slot)}
                        >
                            {slot.time}
                        </button>
                    ))}
                </div>

                {/* Confirmation Section */}
                {selectedTime && (
                    <div className='mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200'>
                        <p className='font-medium mb-2'>Selected Appointment:</p>
                        <div className='space-y-1'>
                            {/* Tampilkan format yang mudah dibaca */}
                            <div>
                                <span className='text-gray-600'>Full Date:</span> 
                                <span className='ml-1'>{selectedTime.displayDateTime}</span>
                            </div>
                            <div>
                                <span className='text-gray-600'>Date:</span> 
                                <span className='ml-1'>{selectedTime.date}</span>
                            </div>
                            <div>
                                <span className='text-gray-600'>Time:</span> 
                                <span className='ml-1'>{selectedTime.time}</span>
                            </div>
                            <div>
                                <span className='text-gray-600'>Fee:</span> 
                                <span className='ml-1'>{currencySymbol}{docInfo.fees}</span>
                            </div>
                        </div>
                        <button 
                            className='mt-4 w-full bg-[#5f6FFF] text-white py-2 rounded-lg hover:bg-blue-700 transition-colors'
                            onClick={() => {
                                // Kirim data ke backend
                                console.log('Appointment Data:', {
                                    doctor: docInfo.name,
                                    date: selectedTime.date,
                                    time: selectedTime.time,
                                    isoDateTime: selectedTime.dateTime, // Format ISO untuk backend
                                    displayDateTime: selectedTime.displayDateTime
                                });
                                
                                alert('Appointment confirmed!');
                                setSelectedDate(null);
                                setSelectedTime(null);
                            }}
                        >
                            Confirm Appointment
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Appointments;