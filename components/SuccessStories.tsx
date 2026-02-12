
import React from 'react';
import AnimatedSection from './AnimatedSection';

const StoryCard: React.FC<{
  title: string;
  image: string;
  goal: string;
  strategy: string;
  result: string;
  quote: string;
  name: string;
}> = ({ title, image, goal, strategy, result, quote, name }) => (
  <div className="bg-light-bg-secondary dark:bg-primary-gray rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col md:flex-row">
    <div className="md:w-2/5 h-64 md:h-auto relative group">
      <img src={image} alt={title} className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-105" />
      <div className="absolute inset-0 bg-black/20 md:hidden"></div>
    </div>
    <div className="p-6 md:p-8 md:w-3/5 flex flex-col justify-center">
      <h3 className="text-2xl font-bold text-light-text dark:text-white mb-4">{title}</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <div>
           <span className="text-xs font-bold uppercase tracking-wider text-primary-red block mb-1">The Goal</span>
           <p className="text-light-text-secondary dark:text-gray-300 text-sm leading-relaxed">{goal}</p>
        </div>
        <div>
           <span className="text-xs font-bold uppercase tracking-wider text-primary-red block mb-1">The Strategy</span>
           <p className="text-light-text-secondary dark:text-gray-300 text-sm leading-relaxed">{strategy}</p>
        </div>
      </div>
      <div className="mb-6">
           <span className="text-xs font-bold uppercase tracking-wider text-primary-red block mb-1">The Result</span>
           <p className="text-light-text font-bold dark:text-white text-lg">{result}</p>
      </div>
      <blockquote className="border-l-4 border-primary-red pl-4 italic text-light-text-secondary dark:text-gray-400 mb-2">
        "{quote}"
      </blockquote>
      <div className="text-right font-semibold text-light-text dark:text-white text-sm">
        — {name}
      </div>
    </div>
  </div>
);

const SuccessStories: React.FC = () => {
    const stories = [
        {
            title: "From Savings to Startup Capital",
            image: "https://picsum.photos/600/800?random=30",
            goal: "Accumulate enough capital to launch a sustainable coffee brand within 3 years.",
            strategy: "Invested in the 'Aggressive Alpha' plan with consistent monthly top-ups.",
            result: "Generated 18% ROI over 3 years, exceeding the funding target by 15%.",
            quote: "AidFunds didn't just grow my money; they accelerated my dreams. The growth was consistent, and I felt secure knowing experts were handling the market volatility.",
            name: "David K., Entrepreneur"
        },
        {
            title: "A Secure, Early Retirement",
            image: "https://picsum.photos/600/800?random=31",
            goal: "Build a robust retirement fund to maintain a comfortable lifestyle post-work.",
            strategy: "Utilized the 'Starter Growth' plan for steady, long-term appreciation and dividend reinvestment.",
            result: "Achieved a stable 7% annual yield, compounding significantly over 5 years.",
            quote: "I was worried about inflation eating my savings. AidFunds provided the stability and predictable growth I needed to retire without financial anxiety.",
            name: "Margaret T., Retired Teacher"
        }
    ];

    return (
        <section className="py-12 md:py-20 bg-light-bg dark:bg-black">
             <div className="container mx-auto px-4 sm:px-6">
                <AnimatedSection>
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-light-text dark:text-white">Real Stories, Real Growth</h2>
                        <p className="text-light-text-secondary dark:text-gray-400 mt-2">See how our clients are achieving their financial ambitions with AidFunds.</p>
                        <div className="w-24 h-1 bg-primary-red mx-auto mt-4"></div>
                    </div>
                </AnimatedSection>
                <div className="grid grid-cols-1 gap-12 max-w-5xl mx-auto">
                    {stories.map((story, index) => (
                        <AnimatedSection key={index} delay={index * 150}>
                            <StoryCard {...story} />
                        </AnimatedSection>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default SuccessStories;
