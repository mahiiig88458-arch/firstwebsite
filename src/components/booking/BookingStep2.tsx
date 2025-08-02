import React, { useState } from 'react';
import { motion } from 'framer-motion';
import DatePicker from 'react-datepicker';
import { format, addDays, isSameDay } from 'date-fns';
import { Calendar, Clock, User } from 'lucide-react';
import { BookingData } from '../../pages/BookingPage';
import 'react-datepicker/dist/react-datepicker.css';

interface BookingStep2Props {
  bookingData: BookingData;
  updateBookingData: (data: Partial<BookingData>) => void;
  nextStep: () => void;
  prevStep: () => void;
}

const BookingStep2: React.FC<BookingStep2Props> = ({ bookingData, updateBookingData, nextStep, prevStep }) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(bookingData.date || new Date());
  const [selectedTime, setSelectedTime] = useState(bookingData.time || '');

  // Generate available time slots
  const timeSlots = [
    '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
    '12:00 PM', '12:30 PM', '1:00 PM', '1:30 PM', '2:00 PM', '2:30 PM',
    '3:00 PM', '3:30 PM', '4:00 PM', '4:30 PM', '5:00 PM', '5:30 PM'
  ];

  // Mock booked slots (in a real app, this would come from your backend)
  const bookedSlots = ['10:00 AM', '2:00 PM', '4:00 PM'];

  const handleNext = () => {
    if (selectedDate && selectedTime) {
      updateBookingData({ date: selectedDate, time: selectedTime });
      nextStep();
    }
  };

  const isDateDisabled = (date: Date) => {
    const today = new Date();
    const dayOfWeek = date.getDay();
    // Disable Sundays (0) and dates before today
    return date < today || dayOfWeek === 0;
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.3 }}
    >
      <h2 className="text-3xl font-bold mb-2 text-gray-900">Choose Date & Time</h2>
      <p className="text-gray-600 mb-8">Select your preferred appointment date and time</p>

      {/* Selected Service Summary */}
      <div className="bg-gradient-to-r from-rose-50 to-purple-50 rounded-lg p-4 mb-8">
        <h3 className="font-semibold text-gray-900 mb-2">Your Selection</h3>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-700 font-medium">{bookingData.service?.name}</p>
            <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
              <div className="flex items-center space-x-1">
                <Clock className="h-4 w-4" />
                <span>{bookingData.service?.duration}</span>
              </div>
              <div className="flex items-center space-x-1">
                <User className="h-4 w-4" />
                <span>{bookingData.staff?.name}</span>
              </div>
            </div>
          </div>
          <div className="text-right">
            <p className="font-semibold text-purple-600">{bookingData.service?.price}</p>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Date Selection */}
        <div>
          <h3 className="text-xl font-semibold mb-4 text-gray-900 flex items-center">
            <Calendar className="h-5 w-5 mr-2 text-purple-600" />
            Select Date
          </h3>
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <DatePicker
              selected={selectedDate}
              onChange={(date: Date | null) => setSelectedDate(date)}
              minDate={new Date()}
              maxDate={addDays(new Date(), 30)}
              filterDate={(date) => !isDateDisabled(date)}
              inline
              className="w-full"
              calendarClassName="custom-calendar"
            />
          </div>
        </div>

        {/* Time Selection */}
        <div>
          <h3 className="text-xl font-semibold mb-4 text-gray-900 flex items-center">
            <Clock className="h-5 w-5 mr-2 text-purple-600" />
            Available Times
          </h3>
          {selectedDate ? (
            <div className="grid grid-cols-2 gap-2 max-h-96 overflow-y-auto">
              {timeSlots.map((time) => {
                const isBooked = bookedSlots.includes(time);
                const isSelected = selectedTime === time;
                
                return (
                  <button
                    key={time}
                    onClick={() => !isBooked && setSelectedTime(time)}
                    disabled={isBooked}
                    className={`p-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                      isSelected
                        ? 'bg-gradient-to-r from-rose-500 to-purple-600 text-white'
                        : isBooked
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    {time}
                    {isBooked && <span className="block text-xs mt-1">Booked</span>}
                  </button>
                );
              })}
            </div>
          ) : (
            <div className="bg-gray-50 rounded-lg p-8 text-center">
              <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-500">Please select a date first</p>
            </div>
          )}
        </div>
      </div>

      {/* Selected Summary */}
      {selectedDate && selectedTime && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8 bg-white border-2 border-purple-200 rounded-lg p-4"
        >
          <h4 className="font-semibold text-gray-900 mb-2">Appointment Summary</h4>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-700">
                <span className="font-medium">{format(selectedDate, 'EEEE, MMMM d, yyyy')}</span>
              </p>
              <p className="text-gray-700">
                <span className="font-medium">{selectedTime}</span> with {bookingData.staff?.name}
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600">{bookingData.service?.name}</p>
              <p className="font-semibold text-purple-600">{bookingData.service?.price}</p>
            </div>
          </div>
        </motion.div>
      )}

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-8">
        <button
          onClick={prevStep}
          className="px-6 py-3 border border-gray-300 text-gray-700 rounded-full font-medium hover:bg-gray-50 transition-all duration-200"
        >
          Back
        </button>
        <button
          onClick={handleNext}
          disabled={!selectedDate || !selectedTime}
          className={`px-8 py-3 rounded-full font-medium transition-all duration-200 ${
            selectedDate && selectedTime
              ? 'bg-gradient-to-r from-rose-500 to-purple-600 text-white hover:shadow-lg transform hover:scale-105'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          Continue to Information
        </button>
      </div>
    </motion.div>
  );
};

export default BookingStep2;