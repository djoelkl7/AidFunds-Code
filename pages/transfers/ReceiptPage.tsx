
import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import AnimatedSection from '../../components/AnimatedSection';

const ReceiptPage: React.FC = () => {
    const location = useLocation();
    const { type, amount, recipient, id } = location.state as any || {};

    if (!id) {
        return <div className="text-center p-10 text-white">Invalid receipt.</div>;
    }

    return (
        <AnimatedSection>
            <div className="max-w-md mx-auto bg-white dark:bg-primary-gray rounded-lg shadow-lg p-8 text-center">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                </div>
                
                <h1 className="text-2xl font-bold text-light-text dark:text-white mb-2">{type} Successful!</h1>
                <p className="text-light-text-secondary dark:text-gray-400 mb-8">Your transaction has been processed.</p>

                <div className="bg-gray-50 dark:bg-black/20 rounded-lg p-4 mb-8 text-left space-y-3">
                    <div className="flex justify-between">
                        <span className="text-sm text-gray-500">Transaction ID</span>
                        <span className="text-sm font-mono text-light-text dark:text-white">#{id}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-sm text-gray-500">Amount</span>
                        <span className="font-bold text-light-text dark:text-white">${parseFloat(amount).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-sm text-gray-500">To</span>
                        <span className="font-medium text-light-text dark:text-white">{recipient}</span>
                    </div>
                </div>

                <div className="space-y-3">
                    <Link to="/dashboard" className="block w-full bg-primary-purple text-white font-bold py-3 rounded-lg hover:bg-primary-purple-dark transition-colors">
                        Go to Dashboard
                    </Link>
                    <Link to="/transfers/send" className="block w-full bg-transparent text-light-text-secondary dark:text-gray-400 font-semibold py-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                        Make Another Transfer
                    </Link>
                </div>
            </div>
        </AnimatedSection>
    );
};

export default ReceiptPage;
