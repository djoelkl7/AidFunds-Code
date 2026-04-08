
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import AnimatedSection from '../../components/AnimatedSection';

const TransferConfirmationPage: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { type, data } = location.state as any || {};
    const [isProcessing, setIsProcessing] = useState(false);

    if (!data) {
        return <div className="text-center p-10 text-white">No transaction data found.</div>;
    }

    const handleConfirm = () => {
        setIsProcessing(true);
        // Simulate API call
        setTimeout(() => {
            navigate('/transfers/receipt', { 
                state: { 
                    type, 
                    amount: data.amount, 
                    recipient: data.toAccount || data.payee,
                    id: Math.floor(Math.random() * 1000000000) 
                } 
            });
        }, 2000);
    };

    return (
        <AnimatedSection>
             <div className="max-w-md mx-auto bg-white dark:bg-primary-gray rounded-lg shadow-lg p-6 md:p-8">
                <h1 className="text-2xl font-bold text-center text-light-text dark:text-white mb-6">Review {type}</h1>
                
                <div className="space-y-4 mb-8">
                    <div className="flex justify-between border-b border-gray-100 dark:border-gray-700 pb-2">
                        <span className="text-light-text-secondary dark:text-gray-400">From</span>
                        <span className="font-medium text-light-text dark:text-white text-right">{data.fromAccount}</span>
                    </div>
                    <div className="flex justify-between border-b border-gray-100 dark:border-gray-700 pb-2">
                        <span className="text-light-text-secondary dark:text-gray-400">To</span>
                        <span className="font-medium text-light-text dark:text-white text-right">{data.toAccount || data.payee}</span>
                    </div>
                    {data.reference && (
                        <div className="flex justify-between border-b border-gray-100 dark:border-gray-700 pb-2">
                            <span className="text-light-text-secondary dark:text-gray-400">Reference</span>
                            <span className="font-medium text-light-text dark:text-white text-right">{data.reference}</span>
                        </div>
                    )}
                     <div className="flex justify-between border-b border-gray-100 dark:border-gray-700 pb-2">
                        <span className="text-light-text-secondary dark:text-gray-400">Date</span>
                        <span className="font-medium text-light-text dark:text-white text-right">{new Date().toLocaleDateString()}</span>
                    </div>
                    <div className="flex justify-between pt-2 items-center">
                        <span className="text-lg font-bold text-light-text dark:text-white">Amount</span>
                        <span className="text-2xl font-extrabold text-primary-purple">${parseFloat(data.amount).toFixed(2)}</span>
                    </div>
                </div>

                <div className="flex gap-4">
                    <button 
                        onClick={() => navigate(-1)}
                        className="w-1/3 bg-gray-200 dark:bg-gray-700 text-light-text dark:text-white font-bold py-3 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                        disabled={isProcessing}
                    >
                        Back
                    </button>
                    <button 
                        onClick={handleConfirm}
                        disabled={isProcessing}
                        className="w-2/3 bg-primary-purple text-white font-bold py-3 rounded-lg hover:bg-primary-purple-dark transition-colors flex justify-center items-center"
                    >
                        {isProcessing ? (
                             <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                        ) : 'Confirm'}
                    </button>
                </div>
            </div>
        </AnimatedSection>
    );
};

export default TransferConfirmationPage;
