import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { CreditCard, Lock, Shield } from 'lucide-react';
import { BookingData } from '../../pages/BookingPage';

interface BookingStep4Props {
  bookingData: BookingData;
  updateBookingData: (data: Partial<BookingData>) => void;
  nextStep: () => void;
  prevStep: () => void;
}

const validationSchema = Yup.object({
  nameOnCard: Yup.string()
    .min(2, 'Name must be at least 2 characters')
    .required('Name on card is required'),
  cardNumber: Yup.string()
    .matches(/^\d{16}$/, 'Card number must be 16 digits')
    .required('Card number is required'),
  expiryDate: Yup.string()
    .matches(/^(0[1-9]|1[0-2])\/\d{2}$/, 'Expiry date must be in MM/YY format')
    .required('Expiry date is required'),
  cvv: Yup.string()
    .matches(/^\d{3,4}$/, 'CVV must be 3 or 4 digits')
    .required('CVV is required')
});

const BookingStep4: React.FC<BookingStep4Props> = ({ bookingData, updateBookingData, nextStep, prevStep }) => {
  const [processing, setProcessing] = useState(false);

  const handleSubmit = async (values: any) => {
    setProcessing(true);
    updateBookingData({ payment: values });
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setProcessing(false);
    nextStep();
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4);
    }
    
    return v;
  };

  // Calculate service price (removing the range for simplicity)
  const getServicePrice = () => {
    const priceString = bookingData.service?.price || '$0';
    const price = priceString.split('-')[0].replace('$', '');
    return parseFloat(price);
  };

  const subtotal = getServicePrice();
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + tax;

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.3 }}
    >
      <h2 className="text-3xl font-bold mb-2 text-gray-900">Payment Information</h2>
      <p className="text-gray-600 mb-8">Secure payment to complete your booking</p>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Payment Form */}
        <div>
          <Formik
            initialValues={bookingData.payment}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ values, setFieldValue, isValid, dirty }) => (
              <Form className="space-y-6">
                {/* Security Notice */}
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center space-x-3">
                  <Shield className="h-5 w-5 text-green-600" />
                  <div>
                    <p className="text-sm font-medium text-green-800">Secure Payment</p>
                    <p className="text-sm text-green-600">Your payment information is encrypted and secure</p>
                  </div>
                </div>

                {/* Name on Card */}
                <div>
                  <label htmlFor="nameOnCard" className="block text-sm font-medium text-gray-700 mb-2">
                    Name on Card *
                  </label>
                  <Field
                    type="text"
                    id="nameOnCard"
                    name="nameOnCard"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                    placeholder="Enter name as it appears on card"
                  />
                  <ErrorMessage name="nameOnCard" component="div" className="mt-1 text-sm text-red-600" />
                </div>

                {/* Card Number */}
                <div>
                  <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-2">
                    <CreditCard className="h-4 w-4 inline mr-2" />
                    Card Number *
                  </label>
                  <Field name="cardNumber">
                    {({ field }: any) => (
                      <input
                        {...field}
                        type="text"
                        maxLength={19}
                        value={formatCardNumber(field.value)}
                        onChange={(e) => {
                          const formatted = formatCardNumber(e.target.value);
                          const cleaned = formatted.replace(/\s/g, '');
                          setFieldValue('cardNumber', cleaned);
                        }}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                        placeholder="1234 5678 9012 3456"
                      />
                    )}
                  </Field>
                  <ErrorMessage name="cardNumber" component="div" className="mt-1 text-sm text-red-600" />
                </div>

                {/* Expiry Date and CVV */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700 mb-2">
                      Expiry Date *
                    </label>
                    <Field name="expiryDate">
                      {({ field }: any) => (
                        <input
                          {...field}
                          type="text"
                          maxLength={5}
                          value={formatExpiryDate(field.value)}
                          onChange={(e) => {
                            const formatted = formatExpiryDate(e.target.value);
                            setFieldValue('expiryDate', formatted);
                          }}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                          placeholder="MM/YY"
                        />
                      )}
                    </Field>
                    <ErrorMessage name="expiryDate" component="div" className="mt-1 text-sm text-red-600" />
                  </div>

                  <div>
                    <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 mb-2">
                      <Lock className="h-4 w-4 inline mr-2" />
                      CVV *
                    </label>
                    <Field
                      type="text"
                      id="cvv"
                      name="cvv"
                      maxLength={4}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                      placeholder="123"
                    />
                    <ErrorMessage name="cvv" component="div" className="mt-1 text-sm text-red-600" />
                  </div>
                </div>

                {/* Submit Button */}
                <div className="flex justify-between pt-6">
                  <button
                    type="button"
                    onClick={prevStep}
                    disabled={processing}
                    className="px-6 py-3 border border-gray-300 text-gray-700 rounded-full font-medium hover:bg-gray-50 transition-all duration-200 disabled:opacity-50"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    disabled={!isValid || processing}
                    className={`px-8 py-3 rounded-full font-medium transition-all duration-200 flex items-center space-x-2 ${
                      isValid && !processing
                        ? 'bg-gradient-to-r from-rose-500 to-purple-600 text-white hover:shadow-lg transform hover:scale-105'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    {processing ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        <span>Processing...</span>
                      </>
                    ) : (
                      <>
                        <Lock className="h-5 w-5" />
                        <span>Complete Booking (${total.toFixed(2)})</span>
                      </>
                    )}
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>

        {/* Order Summary */}
        <div>
          <div className="bg-gradient-to-br from-rose-50 to-purple-50 rounded-lg p-6 sticky top-8">
            <h3 className="text-xl font-bold mb-4 text-gray-900">Booking Summary</h3>
            
            <div className="space-y-3 mb-6">
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
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric'
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
            </div>

            <div className="border-t border-gray-200 pt-4 space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal:</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Tax (8%):</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-lg font-bold text-gray-900 pt-2 border-t border-gray-200">
                <span>Total:</span>
                <span className="text-purple-600">${total.toFixed(2)}</span>
              </div>
            </div>

            <div className="mt-6 p-4 bg-white rounded-lg border border-purple-200">
              <h4 className="font-semibold text-gray-900 mb-2">Client Information</h4>
              <p className="text-sm text-gray-600">
                {bookingData.clientInfo.firstName} {bookingData.clientInfo.lastName}
              </p>
              <p className="text-sm text-gray-600">{bookingData.clientInfo.email}</p>
              <p className="text-sm text-gray-600">{bookingData.clientInfo.phone}</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default BookingStep4;