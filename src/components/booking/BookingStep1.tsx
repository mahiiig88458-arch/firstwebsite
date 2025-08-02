import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Clock, Star } from 'lucide-react';
import { BookingData } from '../../pages/BookingPage';

interface BookingStep1Props {
  bookingData: BookingData;
  updateBookingData: (data: Partial<BookingData>) => void;
  nextStep: () => void;
}

const BookingStep1: React.FC<BookingStep1Props> = ({ bookingData, updateBookingData, nextStep }) => {
  const [selectedService, setSelectedService] = useState(bookingData.service);
  const [selectedStaff, setSelectedStaff] = useState(bookingData.staff);

  const services = [
    {
      id: 1,
      name: 'Precision Cut & Style',
      description: 'Expert cutting and styling tailored to your face shape',
      price: '$85-120',
      duration: '90 min',
      image: 'https://images.pexels.com/photos/3993449/pexels-photo-3993449.jpeg?auto=compress&cs=tinysrgb&w=300',
      popular: true
    },
    {
      id: 2,
      name: 'Color & Highlights',
      description: 'Professional coloring including balayage and highlights',
      price: '$120-250',
      duration: '2-3 hours',
      image: 'https://images.pexels.com/photos/3065209/pexels-photo-3065209.jpeg?auto=compress&cs=tinysrgb&w=300',
      popular: false
    },
    {
      id: 3,
      name: 'Luxury Manicure',
      description: 'Complete nail care with cuticle treatment and polish',
      price: '$45-65',
      duration: '60 min',
      image: 'https://images.pexels.com/photos/3997379/pexels-photo-3997379.jpeg?auto=compress&cs=tinysrgb&w=300',
      popular: true
    },
    {
      id: 4,
      name: 'Deep Cleansing Facial',
      description: 'Purifying treatment for clear, healthy-looking skin',
      price: '$120-150',
      duration: '75 min',
      image: 'https://images.pexels.com/photos/3757942/pexels-photo-3757942.jpeg?auto=compress&cs=tinysrgb&w=300',
      popular: false
    }
  ];

  const staff = [
    {
      id: 1,
      name: 'Isabella Martinez',
      role: 'Master Stylist',
      image: 'https://images.pexels.com/photos/762020/pexels-photo-762020.jpeg?auto=compress&cs=tinysrgb&w=150',
      specialties: ['Hair Cutting', 'Color', 'Styling'],
      rating: 4.9
    },
    {
      id: 2,
      name: 'Sophia Chen',
      role: 'Senior Colorist',
      image: 'https://images.pexels.com/photos/1181424/pexels-photo-1181424.jpeg?auto=compress&cs=tinysrgb&w=150',
      specialties: ['Color', 'Highlights', 'Balayage'],
      rating: 4.8
    },
    {
      id: 3,
      name: 'Emma Thompson',
      role: 'Nail Artist',
      image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150',
      specialties: ['Manicure', 'Pedicure', 'Nail Art'],
      rating: 4.9
    },
    {
      id: 4,
      name: 'Maya Patel',
      role: 'Esthetician',
      image: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150',
      specialties: ['Facials', 'Skincare', 'Anti-aging treatments'],
      rating: 4.7
    }
  ];

  const handleNext = () => {
    if (selectedService && selectedStaff) {
      updateBookingData({ service: selectedService, staff: selectedStaff });
      nextStep();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.3 }}
    >
      <h2 className="text-3xl font-bold mb-2 text-gray-900">Select Your Service</h2>
      <p className="text-gray-600 mb-8">Choose the service you'd like to book</p>

      {/* Service Selection */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4 text-gray-900">Available Services</h3>
        <div className="grid md:grid-cols-2 gap-4">
          {services.map((service) => (
            <div
              key={service.id}
              onClick={() => setSelectedService(service)}
              className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                selectedService?.id === service.id
                  ? 'border-purple-500 bg-purple-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-start space-x-4">
                <img
                  src={service.image}
                  alt={service.name}
                  className="w-16 h-16 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-semibold text-gray-900">{service.name}</h4>
                    {service.popular && (
                      <span className="bg-gradient-to-r from-rose-500 to-purple-600 text-white px-2 py-1 rounded-full text-xs">
                        Popular
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{service.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-purple-600">{service.price}</span>
                    <div className="flex items-center space-x-1 text-sm text-gray-500">
                      <Clock className="h-4 w-4" />
                      <span>{service.duration}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Staff Selection */}
      {selectedService && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h3 className="text-xl font-semibold mb-4 text-gray-900">Choose Your Stylist</h3>
          <div className="grid md:grid-cols-2 gap-4">
            {staff.map((member) => (
              <div
                key={member.id}
                onClick={() => setSelectedStaff(member)}
                className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                  selectedStaff?.id === member.id
                    ? 'border-purple-500 bg-purple-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center space-x-4">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900">{member.name}</h4>
                    <p className="text-sm text-purple-600 mb-1">{member.role}</p>
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="text-sm text-gray-600">{member.rating}</span>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {member.specialties.slice(0, 2).map((specialty, index) => (
                        <span
                          key={index}
                          className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs"
                        >
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Continue Button */}
      <div className="flex justify-end">
        <button
          onClick={handleNext}
          disabled={!selectedService || !selectedStaff}
          className={`px-8 py-3 rounded-full font-medium transition-all duration-200 ${
            selectedService && selectedStaff
              ? 'bg-gradient-to-r from-rose-500 to-purple-600 text-white hover:shadow-lg transform hover:scale-105'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          Continue to Date & Time
        </button>
      </div>
    </motion.div>
  );
};

export default BookingStep1;