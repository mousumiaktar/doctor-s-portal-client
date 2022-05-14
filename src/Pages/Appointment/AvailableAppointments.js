import { format } from 'date-fns';
import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import Loading from '../Shared/Loading';
import BookingModal from './BookingModal';
import Treatment from './Treatment';

const AvailableAppointments = ({date}) => {
    // const [treatments, setTreatments] = useState([]);
    const [service, setService] = useState(null);

    const formatteDate =format(date, 'PP');
    const {data: treatments, isLoading, refetch} = useQuery(['available', formatteDate], ()=> fetch(`http://localhost:5000/available?date=${formatteDate}`)
         .then(res => res.json())
         )

         if(isLoading){
             return <Loading></Loading>
         }

    // useEffect( () => {
    //     fetch(`http://localhost:5000/available?date=${formatteDate}`)
    //     .then(res => res.json())
    //     .then(data => setTreatments(data));
    // },[formatteDate])
    return (
        <div>
            <h4 className='text-xl text-secondary text-center my-12'>Available Appointments on {format(date, 'PP')}</h4>
            <div className='grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
                {
                    treatments?.map(treatment=><Treatment
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
            refetch={refetch}
            ></BookingModal>}
        </div>
    );
};

export default AvailableAppointments;