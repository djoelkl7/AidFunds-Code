
import React from 'react';
import { Link } from 'react-router-dom';
import AnimatedSection from '../../components/AnimatedSection';

const LoanCard: React.FC<{ type: string; balance: string; total: string; nextPayment: string; date: string; progress: number; id: string }> = ({ type, balance, total, nextPayment, date, progress, id }) => (
    <div className="bg-white dark:bg-primary-gray rounded-lg shadow-md p-6 border-l-4 border-blue-500 hover:shadow-lg transition-shadow">
        <div className="flex justify-between items-start mb-4">
            <div>
                <h3 className="text-xl font-bold text-light-text dark:text-white">{type} Loan</h3>
                <p className="text-sm text-light-text-secondary dark:text-gray-400">ID: {id}</p>
            </div>
            <Link to={`/dashboard/loans/${id}`} className="text-sm font-semibold text-blue-500 hover:underline">View Details</Link>
        </div>
        
        <div className="mb-4">
            <div className="flex justify-between text-sm mb-1">
                <span className="text-light-text-secondary dark:text-gray-400">Outstanding Balance</span>
                <span className="font-bold text-light-text dark:text-white">{balance}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${progress}%` }}></div>
            </div>
            <p className="text-xs text-right mt-1 text-light-text-secondary dark:text-gray-500">of {total} Principal</p>
        </div>

        <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-md flex justify-between items-center">
            <div>
                <p className="text-xs text-blue-800 dark:text-blue-300 font-semibold">Next Payment</p>
                <p className="text-sm font-bold text-light-text dark:text-white">{nextPayment}</p>
            </div>
            <div className="text-right">
                <p className="text-xs text-light-text-secondary dark:text-gray-400">Due Date</p>
                <p className="text-sm font-medium text-light-text dark:text-white">{date}</p>
            </div>
        </div>
    </div>
);

const LoansOverviewPage: React.FC = () => {
    return (
        <AnimatedSection>
            <div className="space-y-8">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-light-text dark:text-white">Loans & Lending</h1>
                        <p className="text-light-text-secondary dark:text-gray-400">Manage your existing loans or apply for new financing.</p>
                    </div>
                    <Link to="/dashboard/loans/apply" className="bg-primary-red text-white font-semibold py-3 px-6 rounded-lg hover:bg-red-700 transition-colors shadow-lg transform hover:scale-105">
                        Apply for New Loan
                    </Link>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <LoanCard 
                        id="LN-2023-882"
                        type="Personal" 
                        balance="$8,250.00" 
                        total="$10,000.00" 
                        nextPayment="$245.50" 
                        date="Aug 15, 2024"
                        progress={17.5}
                    />
                    <LoanCard 
                        id="LN-2021-004"
                        type="Auto" 
                        balance="$12,400.00" 
                        total="$25,000.00" 
                        nextPayment="$412.00" 
                        date="Aug 01, 2024"
                        progress={50.4}
                    />
                </div>

                <div className="bg-gradient-to-r from-gray-900 to-black rounded-lg shadow-xl p-8 text-white text-center">
                    <h2 className="text-2xl font-bold mb-4">Need Quick Cash?</h2>
                    <p className="mb-6 opacity-90 max-w-2xl mx-auto">Get approved for a personal loan up to $50,000 in minutes. Low interest rates starting from 5.99% APR.</p>
                    <Link to="/dashboard/loans/apply" className="inline-block bg-white text-black font-bold py-2 px-8 rounded-full hover:bg-gray-200 transition-colors">
                        Check Your Rate
                    </Link>
                </div>
            </div>
        </AnimatedSection>
    );
};

export default LoansOverviewPage;
