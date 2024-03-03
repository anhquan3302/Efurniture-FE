import React, { useState } from 'react';
import './booking.css';
//
import Validation from './Validation';
//

const Booking = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState({ hour: 1, min: 0, ampm: 'AM' });
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  //
  const [dateError, setDateError] = useState(null);
  const [timeError, setTimeError] = useState(null);
  //
  const [values, setValues] = useState({
    name: '',
    phone: '',
    email: ''  
  })
  const [errors, setErrors] = useState({})
  //

  const handleDateChange = (e) => {
    //
    const selectedDateObj = new Date(e.target.value);

    // Check if selected date is after the current time
    if (selectedDateObj.getTime() >= new Date().getTime()) {
      setSelectedDate(e.target.value);
    } else {
      // Display an error message or disable the submit button
      console.error('Selected date cannot be before the current time');
      setDateError('Selected date cannot be before the current time');
      // Add logic to display an error message or disable the submit button
    }
  };

  const handleTimeChange = (e) => {
    const target = e.target;
    setSelectedTime({
      ...selectedTime,
      hour: target.name === 'hour' ? parseInt(target.value) : selectedTime.hour,
      min: target.name === 'min' ? parseInt(target.value) : selectedTime.min,
      ampm: target.name === 'ampm' ? target.value : selectedTime.ampm,
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'name') setName(value);
    if (name === 'phone') setPhone(value);
    if (name === 'email') setEmail(value);
    //
    const newObj = {...values, [e.target.name]: e.target.value} //
    setValues(newObj)
    //
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    //
    setErrors(Validation(values));
    //
    
      // Handle form submission logic here
      //
      console.log(
        'Name:', name,
        '\nPhone:', phone,
        '\nEmail:', email,
        '\nDate:', selectedDate,
        '\nTime:', `${selectedTime.hour}:${selectedTime.min} ${selectedTime.ampm}`
      );
    
  };

  return (
    <div className='content'>
      <div className="booking-form">
        <h1 className='title-booking'>Showroom Booking</h1>
        <form className="form-booking" onSubmit={handleSubmit}>

          <div className="form-row">
            <div className='group'>
                <label className='label-booking' htmlFor="name">NAME:</label>
                <input className="input_booking" type="text" id="name" name="name" value={name} onChange={handleInputChange} required />
                {errors.name && <p style={{color:"red"}}>{errors.name}</p>}
            </div>
            <div className='group'>
                <label htmlFor="phone">PHONE:</label>
                <input className="input_booking" type="tel" id="phone" name="phone" value={phone} onChange={handleInputChange} pattern="[0-9]{10,15}" required  />
                {errors.phone && <p style={{color:"red"}}>{errors.phone}</p>}
            </div>
          </div>

          <div className="form-row">
            <label htmlFor="email">EMAIL:</label>
            <input className="input_booking" type="email" id="email" name="email" value={email} onChange={handleInputChange} required />
            {errors.email && <p style={{color:"red"}}>{errors.email}</p>}
          </div>
          

          <div className="form-row d-flex">
            <div className='group inputVisitDate'>
                <label htmlFor="date">VISIT DATE:</label>
                <input className="input_booking" type="date" id="date" name="date" value={selectedDate} onChange={handleDateChange} required />
                {dateError && <p style={{color:"red"}}>{dateError}</p>}
            </div>

            <div className='group visitTime_hour_minute'>
                <label htmlFor="date">VISIT TIME:</label>
                <div className='hour_minute'>
                    <input className="input_booking" type="number" id="hour" name="hour" min="1" max="12" value={selectedTime.hour} onChange={handleTimeChange} required />
                    <span>HOUR</span>
                    <input className="input_booking" type="number" id="min" name="min" min="0" max="59" value={selectedTime.min} onChange={handleTimeChange} required />
                    <span>MIN</span>
                    <select className="select_booking" id="ampm" name="ampm" value={selectedTime.ampm} onChange={handleTimeChange} required>
                        <option value="AM">AM</option>
                        <option value="PM">PM</option>
                    </select>
                </div>
                
            </div>

          </div>
          
          <button className="submit_btn" type="submit">BOOK NOW</button>
        </form>
      </div>
    </div>
  )
}

export default Booking;