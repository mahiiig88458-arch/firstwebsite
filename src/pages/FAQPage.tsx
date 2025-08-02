import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ChevronDown, HelpCircle, Clock, CreditCard, Calendar, Users, Scissors, Star } from 'lucide-react';

const FAQPage = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [ref, inView] = useInView({ triggerOnce: true });

  const faqCategories = [
    {
      title: 'General Questions',
      icon: HelpCircle,
      faqs: [
        {
          question: 'What services do you offer at Luxe Salon?',
          answer: 'We offer a comprehensive range of beauty services including hair cutting, coloring, styling, manicures, pedicures, facial treatments, eyebrow shaping, and special occasion styling. Our expert team specializes in the latest trends and techniques to help you look and feel your best.'
        },
        {
          question: 'Do you use high-quality products?',
          answer: 'Absolutely! We use only premium, professional-grade products from top brands in the beauty industry. Our products are carefully selected for their quality, safety, and effectiveness to ensure the best results for our clients.'
        },
        {
          question: 'Are your stylists licensed and experienced?',
          answer: 'Yes, all our stylists are fully licensed professionals with extensive training and experience. Our team regularly attends workshops and training sessions to stay current with the latest trends, techniques, and safety protocols.'
        }
      ]
    },
    {
      title: 'Booking & Appointments',
      icon: Calendar,
      faqs: [
        {
          question: 'How can I book an appointment?',
          answer: 'You can book an appointment through our online booking system on our website, call us at +1 (555) 123-4567, or visit us in person. Our online system is available 24/7 for your convenience and shows real-time availability.'
        },
        {
          question: 'How far in advance should I book?',
          answer: 'We recommend booking at least 1-2 weeks in advance, especially for weekend appointments or with specific stylists. However, we often have same-day availability for certain services, so feel free to call and check.'
        },
        {
          question: 'Can I request a specific stylist?',
          answer: 'Yes! You can request a specific stylist when booking your appointment. Each of our stylists has their own specialties and expertise, and we\'re happy to match you with the perfect professional for your needs.'
        },
        {
          question: 'What is your cancellation policy?',
          answer: 'We require at least 24 hours notice for cancellations to avoid any charges. Cancellations made less than 24 hours in advance or no-shows will be charged 50% of the service cost. You can cancel or reschedule through our online system or by calling us.'
        }
      ]
    },
    {
      title: 'Pricing & Payment',
      icon: CreditCard,
      faqs: [
        {
          question: 'What payment methods do you accept?',
          answer: 'We accept all major credit cards (Visa, MasterCard, American Express), debit cards, cash, and digital payments like Apple Pay and Google Pay. Payment is due at the time of service.'
        },
        {
          question: 'Do you offer package deals or discounts?',
          answer: 'Yes! We offer various package deals for multiple services, loyalty program discounts for regular clients, and special promotions throughout the year. Ask about our current offers when booking your appointment.'
        },
        {
          question: 'Is gratuity included in the service price?',
          answer: 'Gratuity is not included in our service prices. Tipping is appreciated but not mandatory. The standard tip is 15-20% of the service cost, but ultimately it\'s at your discretion based on your satisfaction with the service.'
        }
      ]
    },
    {
      title: 'Services & Treatments',
      icon: Scissors,
      faqs: [
        {
          question: 'How long do different services take?',
          answer: 'Service times vary: haircuts (45-90 minutes), color services (2-4 hours), manicures (45-60 minutes), pedicures (60-75 minutes), and facials (60-90 minutes). Exact timing depends on your hair type, chosen service, and desired results.'
        },
        {
          question: 'Do you offer consultations before services?',
          answer: 'Yes! We provide complimentary consultations for all new clients and for any major hair changes. During the consultation, we\'ll discuss your goals, assess your hair condition, and recommend the best approach for your desired look.'
        },
        {
          question: 'Can you work with all hair types and textures?',
          answer: 'Absolutely! Our stylists are trained and experienced in working with all hair types, textures, and ethnicities. We have specialized knowledge in curly hair, straight hair, coarse hair, fine hair, and everything in between.'
        },
        {
          question: 'Do you offer bridal and special event services?',
          answer: 'Yes! We specialize in bridal hair and makeup, as well as styling for special events like proms, graduations, and parties. We recommend booking these services well in advance and we offer trials to ensure you love your look.'
        }
      ]
    },
    {
      title: 'Salon Policies',
      icon: Users,
      faqs: [
        {
          question: 'What should I expect during my first visit?',
          answer: 'During your first visit, please arrive 15 minutes early to complete our client information form. You\'ll have a consultation with your stylist to discuss your goals and preferences, followed by your service. We\'ll also provide aftercare instructions and product recommendations.'
        },
        {
          question: 'What is your policy on children?',
          answer: 'We welcome children for services! We offer special children\'s cuts and styling. For safety reasons, children must be accompanied by a parent or guardian at all times. We ask that siblings not receiving services be supervised to maintain a peaceful environment for all clients.'
        },
        {
          question: 'Do you have parking available?',
          answer: 'Yes, we have complimentary parking available for our clients. We have a dedicated parking lot adjacent to the salon with convenient access. Street parking is also available on Beauty Street.'
        },
        {
          question: 'What are your hours of operation?',
          answer: 'We\'re open Monday through Saturday from 9:00 AM to 8:00 PM, and Sundays from 10:00 AM to 6:00 PM. Holiday hours may vary, so please check our website or call ahead during holiday seasons.'
        }
      ]
    }
  ];

  const toggleFAQ = (categoryIndex: number, faqIndex: number) => {
    const globalIndex = categoryIndex * 100 + faqIndex;
    setOpenIndex(openIndex === globalIndex ? null : globalIndex);
  };

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
              Frequently Asked Questions
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Find answers to common questions about our services, booking process, 
              and salon policies. Can't find what you're looking for? Contact us directly!
            </p>
          </motion.div>
        </div>
      </section>

      {/* FAQ Sections */}
      <section ref={ref} className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {faqCategories.map((category, categoryIndex) => (
            <motion.div
              key={categoryIndex}
              initial={{ y: 50, opacity: 0 }}
              animate={inView ? { y: 0, opacity: 1 } : {}}
              transition={{ delay: categoryIndex * 0.1, duration: 0.8 }}
              className="mb-12"
            >
              {/* Category Header */}
              <div className="flex items-center mb-6">
                <div className="bg-gradient-to-r from-rose-500 to-purple-600 p-3 rounded-full mr-4">
                  <category.icon className="h-6 w-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">{category.title}</h2>
              </div>

              {/* FAQ Items */}
              <div className="space-y-4">
                {category.faqs.map((faq, faqIndex) => {
                  const globalIndex = categoryIndex * 100 + faqIndex;
                  const isOpen = openIndex === globalIndex;

                  return (
                    <div
                      key={faqIndex}
                      className="bg-gradient-to-r from-rose-50 to-purple-50 rounded-lg border border-gray-200 overflow-hidden"
                    >
                      <button
                        onClick={() => toggleFAQ(categoryIndex, faqIndex)}
                        className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-white/50 transition-colors duration-200"
                      >
                        <span className="text-lg font-semibold text-gray-900 pr-4">
                          {faq.question}
                        </span>
                        <motion.div
                          animate={{ rotate: isOpen ? 180 : 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <ChevronDown className="h-5 w-5 text-purple-600 flex-shrink-0" />
                        </motion.div>
                      </button>
                      
                      <AnimatePresence>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                          >
                            <div className="px-6 pb-4 border-t border-white/50">
                              <p className="text-gray-700 leading-relaxed pt-4">
                                {faq.answer}
                              </p>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-20 bg-gradient-to-r from-rose-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Still Have Questions?
            </h2>
            <p className="text-xl mb-8 text-rose-100">
              Our friendly team is here to help! Contact us for personalized assistance 
              or to discuss your specific beauty needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="bg-white text-purple-600 px-8 py-4 rounded-full text-lg font-semibold hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
              >
                Contact Us
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

      {/* Quick Stats */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { icon: Clock, number: '10+', label: 'Years Experience' },
              { icon: Users, number: '5000+', label: 'Happy Clients' },
              { icon: Scissors, number: '15', label: 'Expert Stylists' },
              { icon: Star, number: '4.9', label: 'Average Rating' }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ scale: 0 }}
                animate={inView ? { scale: 1 } : {}}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="text-center"
              >
                <div className="bg-gradient-to-r from-rose-500 to-purple-600 p-3 rounded-full w-fit mx-auto mb-3">
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
                <div className="text-3xl md:text-4xl font-bold text-purple-600 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default FAQPage;