import React from 'react';
import { motion } from 'framer-motion';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { User, Mail, Phone, MessageSquare } from 'lucide-react';
import { BookingData } from '../../pages/BookingPage';

interface BookingStep3Props {
  bookingData: BookingData;
  updateBookingData: (data: Partial<BookingData>) => void;
  nextStep: () => void;
  prevStep: () => void;
}

const validationSchema = Yup.object({
  firstName: Yup.string()
    .min(2, 'First name must be at least 2 characters')
    .required('First name is required'),
  lastName: Yup.string()
    .min(2, 'Last name must be at least 2 characters')
    .required('Last name is required'),
  email: Yup.string()
    .email('Please enter a valid email address')
    .required('Email is required'),
  phone: Yup.string()
    .matches(/^[\+]?[1-9][\d]{0,15}$/, 'Please enter a valid phone number')
    .required('Phone number is required'),
  notes: Yup.string()
});

const BookingStep3: React.FC<BookingStep3Props> = ({ bookingData, updateBookingData, nextStep, prevStep }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.3 }}
    >
      <h2 className="text-3xl font-bold mb-2 text-gray-900">Your Information</h2>
      <p className="text-gray-600 mb-8">Please provide your contact details</p>

      <Formik
        initialValues={bookingData.clientInfo}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          updateBookingData({ clientInfo: values });
          nextStep();
        }}
      >
        {({ isValid, dirty }) => (
          <Form className="space-y-6">
            {/* Name Fields */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                  <User className="h-4 w-4 inline mr-2" />
                  First Name *
                </label>
                <Field
                  type="text"
                  id="firstName"
                  name="firstName"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                  placeholder="Enter your first name"
                />
                <ErrorMessage name="firstName" component="div" className="mt-1 text-sm text-red-600" />
              </div>

              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                  <User className="h-4 w-4 inline mr-2" />
                  Last Name *
                </label>
                <Field
                  type="text"
                  id="lastName"
                  name="lastName"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                  placeholder="Enter your last name"
                />
                <ErrorMessage name="lastName" component="div" className="mt-1 text-sm text-red-600" />
              </div>
            </div>

            {/* Contact Fields */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                <Mail className="h-4 w-4 inline mr-2" />
                Email Address *
              </label>
              <Field
                type="email"
                id="email"
                name="email"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                placeholder="Enter your email address"
              />
              <ErrorMessage name="email" component="div" className="mt-1 text-sm text-red-600" />
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                <Phone className="h-4 w-4 inline mr-2" />
                Phone Number *
              </label>
              <Field
                type="tel"
                id="phone"
                name="phone"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                placeholder="Enter your phone number"
              />
              <ErrorMessage name="phone" component="div" className="mt-1 text-sm text-red-600" />
            </div>

            {/* Notes Field */}
            <div>
              <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-2">
                <MessageSquare className="h-4 w-4 inline mr-2" />
                Special Requests or Notes (Optional)
              </label>
              <Field
                as="textarea"
                id="notes"
                name="notes"
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 resize-none"
                placeholder="Any special requests, allergies, or preferences we should know about?"
              />
              <ErrorMessage name="notes" component="div" className="mt-1 text-sm text-red-600" />
            </div>

            {/* Appointment Summary */}
            <div className="bg-gradient-to-r from-rose-50 to-purple-50 rounded-lg p-6 mt-8">
              <h3 className="font-semibold text-gray-900 mb-4">Appointment Summary</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Service:</span>
                  <span className="font-medium">{bookingData.service?.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Stylist:</span>
                  <span className="font-medium">{bookingData.staff?.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Date:</span>
                  <span className="font-medium">
                    {bookingData.date && new Intl.DateTimeFormat('en-US', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    }).format(bookingData.date)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Time:</span>
                  <span className="font-medium">{bookingData.time}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Duration:</span>
                  <span className="font-medium">{bookingData.service?.duration}</span>
                </div>
                <div className="border-t pt-2 mt-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600 font-medium">Price:</span>
                    <span className="font-bold text-purple-600">{bookingData.service?.price}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between pt-6">
              <button
                type="button"
                onClick={prevStep}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-full font-medium hover:bg-gray-50 transition-all duration-200"
              >
                Back
              </button>
              <button
                type="submit"
                disabled={!isValid || !dirty}
                className={`px-8 py-3 rounded-full font-medium transition-all duration-200 ${
                  isValid && dirty
                    ? 'bg-gradient-to-r from-rose-500 to-purple-600 text-white hover:shadow-lg transform hover:scale-105'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                Continue to Payment
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </motion.div>
  );
};

export default BookingStep3;