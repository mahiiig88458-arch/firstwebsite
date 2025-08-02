import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';
import { Scissors, Palette, Sparkles, Clock, Star } from 'lucide-react';

const ServicesPage = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [ref, inView] = useInView({ triggerOnce: true });

  const categories = [
    { id: 'all', name: 'All Services', icon: Sparkles },
    { id: 'hair', name: 'Hair Services', icon: Scissors },
    { id: 'nails', name: 'Nail Services', icon: Palette },
    { id: 'facial', name: 'Facial Treatments', icon: Star },
  ];

  const services = [
    {
      id: 1,
      category: 'hair',
      name: 'Precision Cut & Style',
      description: 'Expert cutting and styling tailored to your face shape and lifestyle',
      price: '$85-120',
      duration: '90 min',
      image: 'https://images.pexels.com/photos/3993449/pexels-photo-3993449.jpeg?auto=compress&cs=tinysrgb&w=400',
      popular: true
    },
    {
      id: 2,
      category: 'hair',
      name: 'Color & Highlights',
      description: 'Professional coloring services including balayage, highlights, and full color',
      price: '$120-250',
      duration: '2-3 hours',
      image: 'https://images.pexels.com/photos/3065209/pexels-photo-3065209.jpeg?auto=compress&cs=tinysrgb&w=400',
      popular: false
    },
    {
      id: 3,
      category: 'hair',
      name: 'Keratin Treatment',
      description: 'Smoothing treatment that eliminates frizz and reduces styling time',
      price: '$200-300',
      duration: '2.5 hours',
      image: 'https://images.pexels.com/photos/3993206/pexels-photo-3993206.jpeg?auto=compress&cs=tinysrgb&w=400',
      popular: false
    },
    {
      id: 4,
      category: 'nails',
      name: 'Luxury Manicure',
      description: 'Complete nail care with cuticle treatment, shaping, and polish',
      price: '$45-65',
      duration: '60 min',
      image: 'https://images.pexels.com/photos/3997379/pexels-photo-3997379.jpeg?auto=compress&cs=tinysrgb&w=400',
      popular: true
    },
    {
      id: 5,
      category: 'nails',
      name: 'Gel Nail Extensions',
      description: 'Long-lasting gel extensions with your choice of length and design',
      price: '$75-95',
      duration: '90 min',
      image: 'https://images.pexels.com/photos/1444442/pexels-photo-1444442.jpeg?auto=compress&cs=tinysrgb&w=400',
      popular: false
    },
    {
      id: 6,
      category: 'nails',
      name: 'Spa Pedicure',
      description: 'Relaxing foot treatment with exfoliation, massage, and nail care',
      price: '$55-75',
      duration: '75 min',
      image: 'https://images.pexels.com/photos/1319460/pexels-photo-1319460.jpeg?auto=compress&cs=tinysrgb&w=400',
      popular: false
    },
    {
      id: 7,
      category: 'facial',
      name: 'Deep Cleansing Facial',
      description: 'Purifying treatment for clear, healthy-looking skin',
      price: '$120-150',
      duration: '75 min',
      image: 'https://images.pexels.com/photos/3757942/pexels-photo-3757942.jpeg?auto=compress&cs=tinysrgb&w=400',
      popular: true
    },
    {
      id: 8,
      category: 'facial',
      name: 'Anti-Aging Facial',
      description: 'Advanced treatment to reduce fine lines and improve skin texture',
      price: '$180-220',
      duration: '90 min',
      image: 'https://images.pexels.com/photos/3997991/pexels-photo-3997991.jpeg?auto=compress&cs=tinysrgb&w=400',
      popular: false
    },
    {
      id: 9,
      category: 'facial',
      name: 'Hydrating Facial',
      description: 'Moisture-rich treatment for dry and dehydrated skin',
      price: '$140-170',
      duration: '75 min',
      image: 'https://images.pexels.com/photos/3985333/pexels-photo-3985333.jpeg?auto=compress&cs=tinysrgb&w=400',
      popular: false
    }
  ];

  const filteredServices = activeCategory === 'all' 
    ? services 
    : services.filter(service => service.category === activeCategory);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen pt-16"
    >
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-rose-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-rose-600 to-purple-600 bg-clip-text text-transparent">
              Our Premium Services
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover our comprehensive range of beauty services, designed to enhance your natural beauty 
              and leave you feeling confident and radiant.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 bg-white sticky top-16 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  activeCategory === category.id
                    ? 'bg-gradient-to-r from-rose-500 to-purple-600 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <category.icon className="h-5 w-5" />
                <span>{category.name}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section ref={ref} className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredServices.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ y: 50, opacity: 0 }}
                animate={inView ? { y: 0, opacity: 1 } : {}}
                transition={{ delay: index * 0.1, duration: 0.8 }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transform hover:scale-105 transition-all duration-300 group"
              >
                <div className="relative">
                  <div 
                    className="h-48 bg-cover bg-center group-hover:scale-110 transition-transform duration-500"
                    style={{backgroundImage: `url(${service.image})`}}
                  ></div>
                  {service.popular && (
                    <div className="absolute top-4 left-4 bg-gradient-to-r from-rose-500 to-purple-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                      Popular
                    </div>
                  )}
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4 text-gray-600" />
                      <span className="text-sm text-gray-600">{service.duration}</span>
                    </div>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 text-gray-900">{service.name}</h3>
                  <p className="text-gray-600 mb-4 text-sm leading-relaxed">{service.description}</p>
                  
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-2xl font-bold text-purple-600">{service.price}</span>
                  </div>
                  
                  <Link
                    to="/booking"
                    state={{ selectedService: service }}
                    className="w-full bg-gradient-to-r from-rose-500 to-purple-600 text-white py-3 px-6 rounded-full font-medium hover:shadow-lg transform hover:scale-105 transition-all duration-200 text-center block"
                  >
                    Book Now
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-rose-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Experience Luxury?
            </h2>
            <p className="text-xl mb-8 text-rose-100">
              Book your appointment today and let our expert team pamper you with premium services
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/booking"
                className="bg-white text-purple-600 px-8 py-4 rounded-full text-lg font-semibold hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
              >
                Book Appointment
              </Link>
              <Link
                to="/contact"
                className="border-2 border-white text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white hover:text-purple-600 transition-all duration-300"
              >
                Contact Us
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
};

export default ServicesPage;