import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import BookingStep1 from '../components/booking/BookingStep1';
import BookingStep2 from '../components/booking/BookingStep2';
import BookingStep3 from '../components/booking/BookingStep3';
import BookingStep4 from '../components/booking/BookingStep4';
import BookingSuccess from '../components/booking/BookingSuccess';
import { Check } from 'lucide-react';

export interface BookingData {
  service: any;
  staff: any;
  date: Date | null;
  time: string;
  clientInfo: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    notes: string;
  };
  payment: {
    method: string;
    cardNumber: string;
    expiryDate: string;
    cvv: string;
    nameOnCard: string;
  };
}

const BookingPage = () => {
  const location = useLocation();
  const selectedService = location.state?.selectedService;
  
  const [currentStep, setCurrentStep] = useState(1);
  const [bookingData, setBookingData] = useState<BookingData>({
    service: selectedService || null,
    staff: null,
    date: null,
    time: '',
    clientInfo: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      notes: ''
    },
    payment: {
      method: 'card',
      cardNumber: '',
      expiryDate: '',
      cvv: '',
      nameOnCard: ''
    }
  });

  const steps = [
    { number: 1, title: 'Select Service', completed: currentStep > 1 },
    { number: 2, title: 'Choose Date & Time', completed: currentStep > 2 },
    { number: 3, title: 'Your Information', completed: currentStep > 3 },
    { number: 4, title: 'Payment', completed: currentStep > 4 },
  ];

  const nextStep = () => {
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const updateBookingData = (data: Partial<BookingData>) => {
    setBookingData(prev => ({ ...prev, ...data }));
  };

  if (currentStep === 5) {
    return <BookingSuccess bookingData={bookingData} />;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen pt-16 bg-gradient-to-br from-rose-50 to-purple-50"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Progress Steps */}
        <div className="mb-12">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-300 ${
                  step.completed 
                    ? 'bg-gradient-to-r from-rose-500 to-purple-600 border-transparent text-white'
                    : currentStep === step.number
                    ? 'border-purple-600 text-purple-600'
                    : 'border-gray-300 text-gray-400'
                }`}>
                  {step.completed ? (
                    <Check className="h-5 w-5" />
                  ) : (
                    <span className="text-sm font-medium">{step.number}</span>
                  )}
                </div>
                <div className="ml-3">
                  <p className={`text-sm font-medium ${
                    step.completed || currentStep === step.number
                      ? 'text-gray-900'
                      : 'text-gray-400'
                  }`}>
                    {step.title}
                  </p>
                </div>
                {index < steps.length - 1 && (
                  <div className={`hidden sm:block w-16 h-0.5 ml-6 ${
                    step.completed ? 'bg-gradient-to-r from-rose-500 to-purple-600' : 'bg-gray-300'
                  }`}></div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Step Content */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <AnimatePresence mode="wait">
            {currentStep === 1 && (
              <BookingStep1
                key="step1"
                bookingData={bookingData}
                updateBookingData={updateBookingData}
                nextStep={nextStep}
              />
            )}
            {currentStep === 2 && (
              <BookingStep2
                key="step2"
                bookingData={bookingData}
                updateBookingData={updateBookingData}
                nextStep={nextStep}
                prevStep={prevStep}
              />
            )}
            {currentStep === 3 && (
              <BookingStep3
                key="step3"
                bookingData={bookingData}
                updateBookingData={updateBookingData}
                nextStep={nextStep}
                prevStep={prevStep}
              />
            )}
            {currentStep === 4 && (
              <BookingStep4
                key="step4"
                bookingData={bookingData}
                updateBookingData={updateBookingData}
                nextStep={nextStep}
                prevStep={prevStep}
              />
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};

export default BookingPage;