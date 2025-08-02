import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Phone, Mail, MapPin, Clock, MessageSquare, Send } from 'lucide-react';

const ContactPage = () => {
  const [formRef, formInView] = useInView({ triggerOnce: true });
  const [mapRef, mapInView] = useInView({ triggerOnce: true });

  const validationSchema = Yup.object({
    name: Yup.string()
      .min(2, 'Name must be at least 2 characters')
      .required('Name is required'),
    email: Yup.string()
      .email('Please enter a valid email address')
      .required('Email is required'),
    phone: Yup.string()
      .matches(/^[\+]?[1-9][\d]{0,15}$/, 'Please enter a valid phone number'),
    subject: Yup.string()
      .required('Subject is required'),
    message: Yup.string()
      .min(10, 'Message must be at least 10 characters')
      .required('Message is required')
  });

  const handleSubmit = async (values: any, { setSubmitting, resetForm }: any) => {
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    console.log('Form submitted:', values);
    alert('Thank you for your message! We\'ll get back to you soon.');
    resetForm();
    setSubmitting(false);
  };

  const contactInfo = [
    {
      icon: Phone,
      title: 'Phone',
      details: ['+1 (555) 123-4567', '+1 (555) 123-4568'],
      action: 'Call us now'
    },
    {
      icon: Mail,
      title: 'Email',
      details: ['info@luxesalon.com', 'booking@luxesalon.com'],
      action: 'Send an email'
    },
    {
      icon: MapPin,
      title: 'Address',
      details: ['123 Beauty Street', 'New York, NY 10001'],
      action: 'Get directions'
    },
    {
      icon: Clock,
      title: 'Business Hours',
      details: ['Mon-Sat: 9:00 AM - 8:00 PM', 'Sunday: 10:00 AM - 6:00 PM'],
      action: 'Visit us'
    }
  ];

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
              Get in Touch
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Have questions about our services or want to schedule an appointment? 
              We'd love to hear from you and help you look your absolute best.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((info, index) => (
              <motion.div
                key={index}
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.1, duration: 0.8 }}
                className="bg-gradient-to-br from-rose-50 to-purple-50 rounded-2xl p-6 text-center hover:shadow-lg transform hover:scale-105 transition-all duration-300"
              >
                <div className="bg-gradient-to-r from-rose-500 to-purple-600 p-3 rounded-full w-fit mx-auto mb-4">
                  <info.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-bold mb-3 text-gray-900">{info.title}</h3>
                <div className="space-y-1 mb-4">
                  {info.details.map((detail, i) => (
                    <p key={i} className="text-gray-600">{detail}</p>
                  ))}
                </div>
                <p className="text-sm text-purple-600 font-medium">{info.action}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form and Map */}
      <section className="py-20 bg-gradient-to-br from-rose-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              ref={formRef}
              initial={{ x: -50, opacity: 0 }}
              animate={formInView ? { x: 0, opacity: 1 } : {}}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl font-bold mb-6 text-gray-900">Send us a Message</h2>
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <Formik
                  initialValues={{
                    name: '',
                    email: '',
                    phone: '',
                    subject: '',
                    message: ''
                  }}
                  validationSchema={validationSchema}
                  onSubmit={handleSubmit}
                >
                  {({ isSubmitting, isValid, dirty }) => (
                    <Form className="space-y-6">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                          Full Name *
                        </label>
                        <Field
                          type="text"
                          id="name"
                          name="name"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                          placeholder="Enter your full name"
                        />
                        <ErrorMessage name="name" component="div" className="mt-1 text-sm text-red-600" />
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                            Email Address *
                          </label>
                          <Field
                            type="email"
                            id="email"
                            name="email"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                            placeholder="Enter your email"
                          />
                          <ErrorMessage name="email" component="div" className="mt-1 text-sm text-red-600" />
                        </div>

                        <div>
                          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                            Phone Number
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
                      </div>

                      <div>
                        <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                          Subject *
                        </label>
                        <Field
                          as="select"
                          id="subject"
                          name="subject"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                        >
                          <option value="">Select a subject</option>
                          <option value="appointment">Appointment Inquiry</option>
                          <option value="services">Service Questions</option>
                          <option value="pricing">Pricing Information</option>
                          <option value="feedback">Feedback</option>
                          <option value="other">Other</option>
                        </Field>
                        <ErrorMessage name="subject" component="div" className="mt-1 text-sm text-red-600" />
                      </div>

                      <div>
                        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                          <MessageSquare className="h-4 w-4 inline mr-2" />
                          Message *
                        </label>
                        <Field
                          as="textarea"
                          id="message"
                          name="message"
                          rows={6}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 resize-none"
                          placeholder="Tell us how we can help you..."
                        />
                        <ErrorMessage name="message" component="div" className="mt-1 text-sm text-red-600" />
                      </div>

                      <button
                        type="submit"
                        disabled={!isValid || !dirty || isSubmitting}
                        className={`w-full py-4 rounded-full font-medium transition-all duration-200 flex items-center justify-center space-x-2 ${
                          isValid && dirty && !isSubmitting
                            ? 'bg-gradient-to-r from-rose-500 to-purple-600 text-white hover:shadow-lg transform hover:scale-105'
                            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        }`}
                      >
                        {isSubmitting ? (
                          <>
                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                            <span>Sending...</span>
                          </>
                        ) : (
                          <>
                            <Send className="h-5 w-5" />
                            <span>Send Message</span>
                          </>
                        )}
                      </button>
                    </Form>
                  )}
                </Formik>
              </div>
            </motion.div>

            {/* Map and Additional Info */}
            <motion.div
              ref={mapRef}
              initial={{ x: 50, opacity: 0 }}
              animate={mapInView ? { x: 0, opacity: 1 } : {}}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-3xl font-bold mb-6 text-gray-900">Visit Our Salon</h2>
                
                {/* Map Placeholder */}
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-6">
                  <div className="h-64 bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                    <div className="text-center">
                      <MapPin className="h-12 w-12 text-gray-500 mx-auto mb-2" />
                      <p className="text-gray-600">Interactive Map</p>
                      <p className="text-sm text-gray-500">123 Beauty Street, NY 10001</p>
                    </div>
                  </div>
                </div>

                {/* Quick Info */}
                <div className="bg-white rounded-2xl shadow-lg p-6">
                  <h3 className="text-xl font-bold mb-4 text-gray-900">Why Choose Luxe Salon?</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-purple-600 rounded-full mt-2"></div>
                      <span className="text-gray-700">Expert stylists with 10+ years experience</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-purple-600 rounded-full mt-2"></div>
                      <span className="text-gray-700">Premium products and latest techniques</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-purple-600 rounded-full mt-2"></div>
                      <span className="text-gray-700">Luxurious, clean, and modern facilities</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-purple-600 rounded-full mt-2"></div>
                      <span className="text-gray-700">Personalized service for every client</span>
                    </li>
                  </ul>
                </div>
              </div>
            </motion.div>
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
              Ready to Book Your Appointment?
            </h2>
            <p className="text-xl mb-8 text-rose-100">
              Don't wait - treat yourself to the luxury experience you deserve
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/booking"
                className="bg-white text-purple-600 px-8 py-4 rounded-full text-lg font-semibold hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
              >
                Book Online Now
              </a>
              <a
                href="tel:+15551234567"
                className="border-2 border-white text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white hover:text-purple-600 transition-all duration-300"
              >
                Call +1 (555) 123-4567
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
};

export default ContactPage;