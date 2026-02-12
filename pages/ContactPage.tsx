
import React, { useState } from 'react';
import AnimatedSection from '../components/AnimatedSection';
import { useForm } from '../hooks/useForm';

const ContactHero: React.FC = () => (
  <section 
    className="relative h-[50vh] bg-cover bg-center flex items-center justify-center text-center"
    style={{ backgroundImage: "url('https://picsum.photos/1920/1080?random=20')" }}
  >
    <div className="absolute inset-0 bg-black opacity-60"></div>
    <div className="relative z-10 text-white px-4">
      <AnimatedSection>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight">
          Get in Touch
        </h1>
        <p className="mt-4 text-lg md:text-xl max-w-2xl mx-auto text-gray-200">
          We're here to help. Reach out to us for any inquiries, support, or feedback.
        </p>
      </AnimatedSection>
    </div>
  </section>
);

const ContactInfoCard: React.FC<{ icon: React.ReactElement; title: string; details: string[]; delay?: number }> = ({ icon, title, details, delay = 0 }) => (
    <AnimatedSection delay={delay}>
        <div className="bg-light-bg-secondary dark:bg-primary-gray p-8 rounded-lg shadow-lg text-center h-full hover:shadow-xl transition-shadow duration-300">
            <div className="text-primary-red mb-6 flex justify-center">
                {React.cloneElement(icon, { className: "w-10 h-10" })}
            </div>
            <h3 className="text-xl font-bold mb-4 text-light-text dark:text-white">{title}</h3>
            {details.map((detail, i) => (
                <p key={i} className="text-light-text-secondary dark:text-gray-400 mb-1">{detail}</p>
            ))}
        </div>
    </AnimatedSection>
);

const ContactForm: React.FC = () => {
    const [submitSuccess, setSubmitSuccess] = useState(false);

    const {
        values,
        errors,
        touched,
        isSubmitting,
        handleChange,
        handleBlur,
        handleSubmit,
        setIsSubmitting,
        resetForm
    } = useForm({
        initialValues: {
            name: '',
            email: '',
            subject: '',
            message: ''
        },
        validate: (values) => {
            const errors: any = {};
            if (!values.name.trim()) errors.name = 'Name is required';
            if (!values.email.trim()) {
                errors.email = 'Email is required';
            } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
                errors.email = 'Invalid email address';
            }
            if (!values.subject.trim()) errors.subject = 'Subject is required';
            if (!values.message.trim()) errors.message = 'Message is required';
            return errors;
        },
        onSubmit: (values) => {
            // Simulate API call
            setTimeout(() => {
                console.log('Contact form submitted:', values);
                setIsSubmitting(false);
                setSubmitSuccess(true);
                resetForm();
                setTimeout(() => setSubmitSuccess(false), 5000);
            }, 1500);
        }
    });

    return (
        <div className="bg-white dark:bg-primary-gray p-8 rounded-lg shadow-xl">
            <h3 className="text-2xl font-bold mb-6 text-light-text dark:text-white">Send us a Message</h3>
            {submitSuccess ? (
                <div className="bg-green-100 dark:bg-green-900/50 p-4 rounded-lg text-center animate-fade-in">
                    <h4 className="text-xl font-bold text-green-800 dark:text-green-300 mb-2">Message Sent!</h4>
                    <p className="text-green-700 dark:text-gray-300">Thank you for reaching out. We'll get back to you shortly.</p>
                </div>
            ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-light-text-secondary dark:text-gray-400 mb-1">Name</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={values.name}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className={`w-full bg-gray-50 dark:bg-black/20 border ${errors.name && touched.name ? 'border-primary-red' : 'border-gray-300 dark:border-gray-600'} rounded-md p-3 text-light-text dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-red transition duration-300`}
                            />
                            {errors.name && touched.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-light-text-secondary dark:text-gray-400 mb-1">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={values.email}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className={`w-full bg-gray-50 dark:bg-black/20 border ${errors.email && touched.email ? 'border-primary-red' : 'border-gray-300 dark:border-gray-600'} rounded-md p-3 text-light-text dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-red transition duration-300`}
                            />
                            {errors.email && touched.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
                        </div>
                    </div>
                    <div>
                        <label htmlFor="subject" className="block text-sm font-medium text-light-text-secondary dark:text-gray-400 mb-1">Subject</label>
                        <input
                            type="text"
                            id="subject"
                            name="subject"
                            value={values.subject}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={`w-full bg-gray-50 dark:bg-black/20 border ${errors.subject && touched.subject ? 'border-primary-red' : 'border-gray-300 dark:border-gray-600'} rounded-md p-3 text-light-text dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-red transition duration-300`}
                        />
                        {errors.subject && touched.subject && <p className="mt-1 text-sm text-red-500">{errors.subject}</p>}
                    </div>
                    <div>
                        <label htmlFor="message" className="block text-sm font-medium text-light-text-secondary dark:text-gray-400 mb-1">Message</label>
                        <textarea
                            id="message"
                            name="message"
                            rows={5}
                            value={values.message}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={`w-full bg-gray-50 dark:bg-black/20 border ${errors.message && touched.message ? 'border-primary-red' : 'border-gray-300 dark:border-gray-600'} rounded-md p-3 text-light-text dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-red transition duration-300`}
                        ></textarea>
                        {errors.message && touched.message && <p className="mt-1 text-sm text-red-500">{errors.message}</p>}
                    </div>
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-primary-red text-white font-bold px-8 py-3 rounded-lg text-lg hover:bg-red-700 disabled:bg-gray-500 disabled:cursor-not-allowed transition duration-300 transform hover:scale-105"
                    >
                        {isSubmitting ? 'Sending...' : 'Send Message'}
                    </button>
                </form>
            )}
        </div>
    );
};

const ContactPage: React.FC = () => {
  return (
    <main className="bg-light-bg dark:bg-black min-h-screen pb-20">
      <ContactHero />
      
      <div className="container mx-auto px-4 sm:px-6 -mt-16 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            <ContactInfoCard 
                delay={0}
                icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>}
                title="Visit Us"
                details={['123 Finance Street', 'Manhattan, NY 10001', 'United States']}
            />
            <ContactInfoCard 
                delay={150}
                icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>}
                title="Email Us"
                details={['support@aidfunds.online', 'info@aidfunds.online', 'careers@aidfunds.online']}
            />
            <ContactInfoCard 
                delay={300}
                icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>}
                title="Call Us"
                details={['+1 (555) 123-4567', '+1 (555) 987-6543', 'Mon-Fri, 9am - 6pm EST']}
            />
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
            <div className="lg:w-1/2">
                <AnimatedSection delay={450}>
                    <div className="mb-8">
                        <h2 className="text-3xl font-bold text-light-text dark:text-white mb-4">We'd Love to Hear From You</h2>
                        <div className="w-24 h-1 bg-primary-red mb-6"></div>
                        <p className="text-light-text-secondary dark:text-gray-400 text-lg leading-relaxed">
                            Whether you have a question about our investment plans, need assistance with your account, or just want to share your feedback, our dedicated team is ready to assist you.
                        </p>
                    </div>
                    <img 
                        src="https://picsum.photos/800/600?random=21" 
                        alt="Customer Support" 
                        className="rounded-lg shadow-xl w-full object-cover h-64 md:h-80"
                    />
                </AnimatedSection>
            </div>
            <div className="lg:w-1/2">
                <AnimatedSection delay={600}>
                    <ContactForm />
                </AnimatedSection>
            </div>
        </div>
      </div>
    </main>
  );
};

export default ContactPage;
