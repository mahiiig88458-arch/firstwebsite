import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { CheckCircle, Calendar, Mail, Phone, Home, Download } from 'lucide-react';
import { BookingData } from '../../pages/BookingPage';
import emailjs from 'emailjs-com';

interface BookingSuccessProps {
  bookingData: BookingData;
}

const BookingSuccess: React.FC<BookingSuccessProps> = ({ bookingData }) => {
  const bookingId = `LX${Date.now()}`;

  useEffect(() => {
    // Send confirmation email
    const sendConfirmationEmail = async () => {
      try {
        const templateParams = {
          to_name: `${bookingData.clientInfo.firstName} ${bookingData.clientInfo.lastName}`,
          to_email: bookingData.clientInfo.email,
          booking_id: bookingId,
          service_name: bookingData.service?.name,
          stylist_name: bookingData.staff?.name,
          appointment_date: bookingData.date ? new Intl.DateTimeFormat('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          }).format(bookingData.date) : '',
          appointment_time: bookingData.time,
          client_phone: bookingData.clientInfo.phone,
          special_notes: bookingData.clientInfo.notes || 'None'
        };

        // Note: Replace these with your actual EmailJS credentials
        await emailjs.send(
          'YOUR_SERVICE_ID',
          'YOUR_TEMPLATE_ID',
          templateParams,
          'YOUR_PUBLIC_KEY'
        );
      } catch (error) {
        console.log('Email sending failed:', error);
      }
    };

    sendConfirmationEmail();
  }, [bookingData, bookingId]);

  const downloadConfirmation = () => {
    const confirmationData = `
LUXE SALON - APPOINTMENT CONFIRMATION
=====================================

Booking ID: ${bookingId}
Date: ${new Date().toLocaleDateString()}

CLIENT INFORMATION:
Name: ${bookingData.clientInfo.firstName} ${bookingData.clientInfo.lastName}
Email: ${bookingData.clientInfo.email}
Phone: ${bookingData.clientInfo.phone}

APPOINTMENT DETAILS:
Service: ${bookingData.service?.name}
Stylist: ${bookingData.staff?.name}
Date: ${bookingData.date ? new Intl.DateTimeFormat('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(bookingData.date) : ''}
Time: ${bookingData.time}
Duration: ${bookingData.service?.duration}

Special Notes: ${bookingData.clientInfo.notes || 'None'}

SALON CONTACT:
Phone: +1 (555) 123-4567
Email: info@luxesalon.com
Address: 123 Beauty Street, NY 10001

Thank you for choosing Luxe Salon!
    `;

    const blob = new Blob([confirmationData], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `LuxeSalon_Confirmation_${bookingId}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen pt-16 bg-gradient-to-br from-rose-50 to-purple-50"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="bg-white rounded-2xl shadow-xl p-8 text-center"
        >
          {/* Success Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
            className="mb-6"
          >
            <div className="mx-auto w-24 h-24 bg-gradient-to-r from-green-400 to-green-600 rounded-full flex items-center justify-center">
              <CheckCircle className="h-12 w-12 text-white" />
            </div>
          </motion.div>

          {/* Success Message */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Booking Confirmed! 🎉
            </h1>
            <p className="text-xl text-gray-600 mb-2">
              Your appointment has been successfully booked
            </p>
            <p className="text-lg text-purple-600 font-semibold mb-8">
              Booking ID: {bookingId}
            </p>
          </motion.div>

          {/* Appointment Details */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="bg-gradient-to-r from-rose-50 to-purple-50 rounded-xl p-6 mb-8 text-left"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center">Appointment Details</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Calendar className="h-5 w-5 text-purple-600" />
                  <div>
                    <p className="text-sm text-gray-600">Date & Time</p>
                    <p className="font-semibold">
                      {bookingData.date && new Intl.DateTimeFormat('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      }).format(bookingData.date)} at {bookingData.time}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-5 h-5 bg-purple-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs">S</span>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Service</p>
                    <p className="font-semibold">{bookingData.service?.name}</p>
                  </div>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-5 h-5 bg-rose-500 rounded-full"></div>
                  <div>
                    <p className="text-sm text-gray-600">Your Stylist</p>
                    <p className="font-semibold">{bookingData.staff?.name}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs">⏱</span>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Duration</p>
                    <p className="font-semibold">{bookingData.service?.duration}</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Important Information */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.0, duration: 0.6 }}
            className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8"
          >
            <h3 className="font-semibold text-blue-900 mb-2">Important Information</h3>
            <ul className="text-sm text-blue-800 text-left space-y-1">
              <li>• A confirmation email has been sent to {bookingData.clientInfo.email}</li>
              <li>• Please arrive 15 minutes before your appointment time</li>
              <li>• Bring a valid ID and payment method</li>
              <li>• Free cancellation up to 24 hours before your appointment</li>
            </ul>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.6 }}
            className="grid md:grid-cols-2 gap-4 mb-8"
          >
            <div className="flex items-center justify-center space-x-2 bg-gray-50 rounded-lg p-4">
              <Phone className="h-5 w-5 text-purple-600" />
              <div className="text-left">
                <p className="text-sm text-gray-600">Call us</p>
                <p className="font-semibold">+1 (555) 123-4567</p>
              </div>
            </div>
            <div className="flex items-center justify-center space-x-2 bg-gray-50 rounded-lg p-4">
              <Mail className="h-5 w-5 text-purple-600" />
              <div className="text-left">
                <p className="text-sm text-gray-600">Email us</p>
                <p className="font-semibold">info@luxesalon.com</p>
              </div>
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.4, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <button
              onClick={downloadConfirmation}
              className="flex items-center justify-center space-x-2 bg-gradient-to-r from-rose-500 to-purple-600 text-white px-6 py-3 rounded-full font-medium hover:shadow-lg transform hover:scale-105 transition-all duration-200"
            >
              <Download className="h-5 w-5" />
              <span>Download Confirmation</span>
            </button>
            <Link
              to="/"
              className="flex items-center justify-center space-x-2 border-2 border-purple-600 text-purple-600 px-6 py-3 rounded-full font-medium hover:bg-purple-600 hover:text-white transition-all duration-200"
            >
              <Home className="h-5 w-5" />
              <span>Back to Home</span>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default BookingSuccess;