
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AnimatedSection from '../components/AnimatedSection';
import { useUser } from '../contexts/UserContext';
import { GoogleGenAI } from '@google/genai';

const AIFinancialAdvisor: React.FC = () => {
    const [query, setQuery] = useState('');
    const [response, setResponse] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [useThinkingMode, setUseThinkingMode] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!query.trim()) return;

        setIsLoading(true);
        setResponse('');
        setError('');

        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });
            
            const model = useThinkingMode ? 'gemini-2.5-pro' : 'gemini-2.5-flash';
            const config = useThinkingMode ? { thinkingConfig: { thinkingBudget: 32768 } } : {};

            const result = await ai.models.generateContent({
                model: model,
                contents: `As an expert financial advisor for a company called Cashlio Finance, answer the following user query about investment plans and financial strategies. The user is on a page displaying three investment plans: 'Starter Growth' (low risk), 'Dynamic Momentum' (medium risk), and 'Aggressive Alpha' (high risk). Provide a helpful, insightful, and well-structured response using Markdown for formatting (e.g., headings, bold text, lists). User query: "${query}"`,
                config: config,
            });

            setResponse(result.text);

        } catch (err) {
            console.error(err);
            setError('Sorry, I encountered an error while processing your request. The model may be overloaded. Please try again later.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <AnimatedSection>
            <div className="bg-light-bg-secondary dark:bg-primary-gray p-6 sm:p-8 rounded-lg shadow-lg mb-12">
                <h2 className="text-3xl font-bold text-center mb-2 text-light-text dark:text-white">Need Help Deciding?</h2>
                <p className="text-center text-light-text-secondary dark:text-gray-400 mb-6">Ask our AI Financial Advisor for personalized insights.</p>

                <div className="flex justify-center items-center mb-6">
                    <label htmlFor="thinking-mode-toggle" className="flex items-center cursor-pointer">
                        <span className="mr-3 text-sm font-medium text-light-text-secondary dark:text-gray-300">Quick Analysis</span>
                        <div className="relative">
                            <input
                                type="checkbox"
                                id="thinking-mode-toggle"
                                className="sr-only"
                                checked={useThinkingMode}
                                onChange={() => setUseThinkingMode(!useThinkingMode)}
                            />
                            <div className={`block ${useThinkingMode ? 'bg-primary-purple' : 'bg-gray-300 dark:bg-gray-600'} w-14 h-8 rounded-full transition-colors duration-300`}></div>
                            <div className={`dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition-transform duration-300 ${useThinkingMode ? 'translate-x-6' : ''}`}></div>
                        </div>
                        <span className="ml-3 text-sm font-medium text-light-text-secondary dark:text-gray-300">Deep Analysis (slower)</span>
                    </label>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="e.g., 'I am 30 with $10k to invest, which plan is best for me?'"
                        className="flex-grow bg-gray-100 dark:bg-primary-dark border border-gray-300 dark:border-gray-600 rounded-md p-3 text-light-text dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-purple transition duration-300"
                        disabled={isLoading}
                        aria-label="Ask a financial question"
                    />
                    <button
                        type="submit"
                        disabled={isLoading || !query.trim()}
                        className="bg-primary-purple text-white font-bold px-6 py-3 rounded-lg hover:bg-primary-purple-dark transition duration-300 transform hover:scale-105 disabled:bg-gray-400 dark:disabled:bg-gray-600 disabled:cursor-not-allowed disabled:scale-100 flex items-center justify-center"
                    >
                        {isLoading ? (
                            <>
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                {useThinkingMode ? 'Thinking...' : 'Answering...' }
                            </>
                        ) : 'Ask Advisor'}
                    </button>
                </form>

                {(response || error || isLoading) && (
                    <div className="mt-6 p-6 bg-light-bg dark:bg-black rounded-lg animate-fade-in">
                        {isLoading && !response && (
                             <div className="flex justify-center items-center">
                                <p className="text-light-text-secondary dark:text-gray-400">Our AI advisor is analyzing your query. {useThinkingMode ? 'Deep analysis may take a few moments...' : ''}</p>
                            </div>
                        )}
                        {error && <p className="text-red-500 dark:text-red-400 text-center">{error}</p>}
                        {response && (
                            <div className="prose prose-sm sm:prose dark:prose-invert max-w-none text-light-text dark:text-gray-300" style={{whiteSpace: 'pre-wrap'}}>
                                {response}
                            </div>
                        )}
                    </div>
                )}
                
                <p className="text-xs text-center text-light-text-secondary dark:text-gray-500 mt-6">
                    Disclaimer: The advice provided by the AI Financial Advisor is for informational purposes only and does not constitute financial advice. Please consult with a professional financial advisor before making any investment decisions.
                </p>
            </div>
        </AnimatedSection>
    );
};

interface InvestmentPlan {
  name: string;
  description: string;
  keyFeatures: string[];
  minInvestment: string;
  expectedReturns: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

const investmentPlans: InvestmentPlan[] = [
  {
    name: 'Starter Growth',
    description: 'Perfect for beginners looking to get started with investing. A balanced portfolio with a focus on stable growth.',
    keyFeatures: ['Diversified Portfolio', 'Low Management Fees', 'Automated Rebalancing', 'Access to Financial Advisors'],
    minInvestment: '$500',
    expectedReturns: '5-7% Annually',
    riskLevel: 'Low',
  },
  {
    name: 'Dynamic Momentum',
    description: 'For investors with some experience seeking higher returns. This plan focuses on growth stocks and market trends.',
    keyFeatures: ['Growth-Oriented Stocks', 'Active Management', 'In-depth Market Analysis', 'Quarterly Portfolio Review'],
    minInvestment: '$5,000',
    expectedReturns: '8-12% Annually',
    riskLevel: 'Medium',
  },
  {
    name: 'Aggressive Alpha',
    description: 'Designed for seasoned investors aiming for maximum returns. A high-risk, high-reward portfolio with a focus on emerging markets and tech.',
    keyFeatures: ['High-Growth Assets', 'Emerging Market Exposure', 'Advanced Trading Tools', 'Dedicated Portfolio Manager'],
    minInvestment: '$25,000',
    expectedReturns: '15%+ Annually',
    riskLevel: 'High',
  },
];

const ConfirmationModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  planName: string;
}> = ({ isOpen, onClose, onConfirm, planName }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50 animate-fade-in" role="dialog" aria-modal="true" aria-labelledby="modal-title">
      <div className="bg-light-bg-secondary dark:bg-primary-gray rounded-lg shadow-xl p-6 sm:p-8 w-full max-w-md mx-4 transform transition-all duration-300 ease-out" role="document">
        <h2 id="modal-title" className="text-2xl font-bold text-light-text dark:text-white mb-4">Confirm Your Selection</h2>
        <p className="text-light-text-secondary dark:text-gray-300 mb-6">
          Are you sure you want to select the <span className="font-bold text-primary-purple">{planName}</span> plan?
        </p>
        <div className="flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="px-6 py-2 rounded-md text-light-text dark:text-gray-300 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-300"
            aria-label="Cancel plan selection"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-6 py-2 rounded-md text-white font-semibold bg-primary-purple hover:bg-primary-purple-dark transition-colors duration-300 transform hover:scale-105"
            aria-label={`Confirm selection of ${planName} plan`}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};


const PlanCard: React.FC<{ plan: InvestmentPlan; index: number; onSelectPlan: (plan: InvestmentPlan) => void; }> = ({ plan, index, onSelectPlan }) => {
    const getRiskColor = (risk: 'Low' | 'Medium' | 'High') => {
        switch (risk) {
            case 'Low': return 'bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-300';
            case 'Medium': return 'bg-yellow-100 dark:bg-yellow-900/50 text-yellow-800 dark:text-yellow-300';
            case 'High': return 'bg-red-100 dark:bg-red-900/50 text-red-800 dark:text-red-300';
        }
    };
    
    return (
        <AnimatedSection delay={150 + (index * 150)}>
            <div className="bg-light-bg-secondary dark:bg-primary-gray p-8 rounded-lg shadow-lg hover:shadow-2xl h-full flex flex-col transform hover:-translate-y-2 transition-all duration-300 border-t-4 border-primary-purple">
                <div className="flex justify-between items-start mb-4">
                    <h3 className="text-2xl font-bold text-light-text dark:text-white">{plan.name}</h3>
                    <span className={`px-3 py-1 text-sm font-semibold rounded-full ${getRiskColor(plan.riskLevel)}`}>{plan.riskLevel} Risk</span>
                </div>
                <p className="text-light-text-secondary dark:text-gray-400 mb-6 flex-grow">{plan.description}</p>
                
                <div className="mb-6">
                    <h4 className="font-semibold text-light-text dark:text-gray-200 mb-3">Key Features:</h4>
                    <ul className="space-y-2">
                        {plan.keyFeatures.map((feature, i) => (
                            <li key={i} className="flex items-center text-light-text-secondary dark:text-gray-400">
                                <svg className="w-5 h-5 mr-2 text-primary-purple flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                                <span>{feature}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="grid grid-cols-2 gap-4 text-center my-4 py-4 border-y border-gray-200 dark:border-gray-700">
                    <div>
                        <p className="text-sm text-light-text-secondary dark:text-gray-400">Minimum Investment</p>
                        <p className="text-xl font-bold text-light-text dark:text-white">{plan.minInvestment}</p>
                    </div>
                    <div>
                        <p className="text-sm text-light-text-secondary dark:text-gray-400">Expected Returns</p>
                        <p className="text-xl font-bold text-light-text dark:text-white">{plan.expectedReturns}</p>
                    </div>
                </div>

                <button 
                  onClick={() => onSelectPlan(plan)}
                  className="w-full mt-auto bg-primary-purple text-white font-bold px-6 py-3 rounded-lg text-base hover:bg-primary-purple-dark transition duration-300 transform hover:scale-105"
                >
                    Get Started
                </button>
            </div>
        </AnimatedSection>
    );
};

const InvestmentPlansPage: React.FC = () => {
  const [selectedPlan, setSelectedPlan] = useState<InvestmentPlan | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user } = useUser();
  const navigate = useNavigate();

  const handleSelectPlan = (plan: InvestmentPlan) => {
    if (user) {
      setSelectedPlan(plan);
      setIsModalOpen(true);
    } else {
      navigate('/signup', { state: { from: '/investment-plans', planName: plan.name } });
    }
  };

  const handleConfirmSelection = () => {
    setIsModalOpen(false);
    alert(`You have successfully selected the "${selectedPlan?.name}" plan! This feature will be integrated with your profile soon.`);
    setSelectedPlan(null); // Reset selection
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPlan(null);
  };

  return (
    <main className="bg-light-bg dark:bg-black">
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <AnimatedSection>
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-extrabold text-light-text dark:text-white">Our Investment Plans</h1>
              <p className="text-lg text-light-text-secondary dark:text-gray-400 mt-4 max-w-3xl mx-auto">
                Find the perfect investment strategy tailored to your financial goals, risk tolerance, and timeline. We're here to help you grow your wealth.
              </p>
              <div className="w-24 h-1 bg-primary-purple mx-auto mt-6"></div>
            </div>
          </AnimatedSection>
          
          <AIFinancialAdvisor />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {investmentPlans.map((plan, index) => (
              <PlanCard key={plan.name} plan={plan} index={index} onSelectPlan={handleSelectPlan} />
            ))}
          </div>
        </div>
      </section>
      
      {selectedPlan && (
        <ConfirmationModal 
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onConfirm={handleConfirmSelection}
          planName={selectedPlan.name}
        />
      )}
    </main>
  );
};

export default InvestmentPlansPage;