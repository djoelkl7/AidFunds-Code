import React from 'react';
import { Link } from 'react-router-dom';
import AnimatedSection from '../components/AnimatedSection';

const AboutHero: React.FC = () => (
  <section 
    className="relative h-[60vh] bg-cover bg-center flex items-center justify-center text-center"
    style={{ backgroundImage: "url('https://picsum.photos/1920/1080?random=10')" }}
  >
    <div className="absolute inset-0 bg-black opacity-60"></div>
    <div className="relative z-10 text-white px-4">
      <AnimatedSection>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight">
          Our Mission: Democratizing Finance for All
        </h1>
        <p className="mt-4 text-lg md:text-xl max-w-3xl mx-auto text-gray-200">
          We are committed to breaking down barriers and making sophisticated financial tools and expert knowledge accessible to everyone.
        </p>
      </AnimatedSection>
    </div>
  </section>
);

const OurStory: React.FC = () => (
  <section className="py-12 md:py-20 bg-light-bg-secondary dark:bg-primary-dark">
    <div className="container mx-auto px-4 sm:px-6">
      <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
        <div className="md:w-1/2">
          <AnimatedSection>
            <img 
              src="https://picsum.photos/800/600?random=11" 
              alt="Our collaborative team"
              className="rounded-lg shadow-2xl w-full"
            />
          </AnimatedSection>
        </div>
        <div className="md:w-1/2 text-center md:text-left">
          <AnimatedSection delay={150}>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-light-text dark:text-white">The Genesis of AidFunds</h2>
            <div className="w-24 h-1 bg-primary-red mb-6 mx-auto md:mx-0"></div>
            <p className="text-light-text-secondary dark:text-gray-300 mb-4 leading-relaxed">
              AidFunds was born from a simple observation: the world of finance was often seen as complex, exclusive, and intimidating. We saw a gap between the powerful investment tools available to institutions and the resources accessible to everyday individuals.
            </p>
            <p className="text-light-text-secondary dark:text-gray-300 leading-relaxed">
              Driven by a passion for technology and a belief in financial equality, we set out to create a platform that is not only powerful but also intuitive and transparent. Our goal is to empower you with the confidence and tools needed to take control of your financial destiny.
            </p>
          </AnimatedSection>
        </div>
      </div>
    </div>
  </section>
);

const ValueCard: React.FC<{ icon: React.ReactElement, title: string, description: string }> = ({ icon, title, description }) => (
  <div className="text-center p-6">
    <div className="flex justify-center items-center mb-4">
      <div className="text-primary-red">{icon}</div>
    </div>
    <h3 className="text-xl font-bold mb-2 text-light-text dark:text-white">{title}</h3>
    <p className="text-light-text-secondary dark:text-gray-400">{description}</p>
  </div>
);

const OurValues: React.FC = () => {
  const values = [
    {
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>,
      title: 'Integrity',
      description: 'We operate with unwavering honesty and transparency. Your trust is our most valuable asset, and we are committed to earning it every day.',
    },
    {
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>,
      title: 'Innovation',
      description: 'We relentlessly pursue technological advancement to provide you with cutting-edge tools and data-driven insights for smarter investing.',
    },
    {
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>,
      title: 'Client-Centricity',
      description: 'Your success is our success. We place our clients at the heart of everything we do, from product design to our 24/7 expert support.',
    },
  ];

  return (
    <section className="py-12 md:py-20 bg-light-bg dark:bg-black">
      <div className="container mx-auto px-4 sm:px-6">
        <AnimatedSection>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-light-text dark:text-white">The Core Principles That Guide Us</h2>
            <div className="w-24 h-1 bg-primary-red mx-auto mt-4"></div>
          </div>
        </AnimatedSection>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {values.map((value, index) => (
            <AnimatedSection key={index} delay={150 * index}>
              <ValueCard {...value} />
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
};

const TeamMemberCard: React.FC<{ member: { avatar: string; name: string; title: string; bio: string; } }> = ({ member }) => (
    <div className="bg-light-bg-secondary dark:bg-primary-gray rounded-lg shadow-lg hover:shadow-xl h-full flex flex-col text-center p-8 transform hover:-translate-y-2 transition-all duration-300">
        <img className="w-24 h-24 rounded-full mx-auto mb-4 object-cover ring-4 ring-primary-red/50" src={member.avatar} alt={member.name} />
        <h4 className="font-bold text-xl text-light-text dark:text-white">{member.name}</h4>
        <p className="text-sm text-primary-red mb-4">{member.title}</p>
        <p className="text-light-text-secondary dark:text-gray-400 text-sm flex-grow">"{member.bio}"</p>
    </div>
);


const MeetTheTeam: React.FC = () => {
    const team = [
        { avatar: 'https://picsum.photos/200/200?random=12', name: 'Alexandra Chen', title: 'Founder & CEO', bio: 'Driving the vision to make financial growth accessible to everyone, everywhere.' },
        { avatar: 'https://picsum.photos/200/200?random=13', name: 'Ben Carter', title: 'Chief Technology Officer', bio: 'Architecting the future of finance with secure, scalable, and innovative technology.' },
        { avatar: 'https://picsum.photos/200/200?random=14', name: 'Maria Rodriguez', title: 'Head of Investments', bio: 'Curating intelligent investment strategies to navigate market dynamics and maximize returns.' },
    ];
    return (
        <section className="py-12 md:py-20 bg-light-bg-secondary dark:bg-primary-dark">
            <div className="container mx-auto px-4 sm:px-6">
                <AnimatedSection>
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-light-text dark:text-white">The Minds Behind AidFunds</h2>
                        <div className="w-24 h-1 bg-primary-red mx-auto mt-4"></div>
                    </div>
                </AnimatedSection>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
                    {team.map((member, index) => (
                        <AnimatedSection key={index} delay={150 * index}>
                           <TeamMemberCard member={member} />
                        </AnimatedSection>
                    ))}
                </div>
            </div>
        </section>
    );
}

const JoinUsCTA: React.FC = () => (
    <section className="py-12 md:py-20 bg-primary-red text-white">
        <div className="container mx-auto px-4 sm:px-6 text-center">
            <AnimatedSection>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                    Ready to Build Your Future With Us?
                </h2>
                <p className="max-w-2xl mx-auto mb-8 text-gray-200">
                    Join a community of forward-thinkers who are taking control of their financial journey. Explore our services and start investing in minutes.
                </p>
                <Link 
                    to="/investment-plans" 
                    className="bg-white text-primary-red font-bold px-8 py-4 rounded-lg text-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-primary-red focus:ring-white transition duration-300 transform hover:scale-105"
                >
                    Explore Our Services
                </Link>
            </AnimatedSection>
        </div>
    </section>
);


const AboutPage: React.FC = () => {
  return (
    <main>
      <AboutHero />
      <OurStory />
      <OurValues />
      <MeetTheTeam />
      <JoinUsCTA />
    </main>
  );
};

export default AboutPage;