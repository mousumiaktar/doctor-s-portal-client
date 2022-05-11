import { format } from 'date-fns';
import React, { useEffect, useState } from 'react';
import BookingModal from './BookingModal';
import Treatment from './Treatment';

const AvailableAppointments = ({date}) => {
    const [treatments, setTreatments] = useState([]);
    const [service, setService] = useState(null);

    useEffect( () => {
        fetch('services.json')
        .then(res => res.json())
        .then(data => setTreatments(data));
    },[])
    return (
        <div>
            <h4 className='text-xl text-secondary text-center'>Available Appointments on {format(date, 'PP')}</h4>
            <div className='grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
                {
                    treatments.map(treatment=><Treatment
                    key={treatment._id}
                    treatment={treatment}
                    setService={setService}
                    ></Treatment>)
                }
            </div>
            {service && <BookingModal
            date={date} 
            service={service}
            setService={setService}
            ></BookingModal>}
        </div>
    );
};

export default AvailableAppointments;