
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AnimatedSection from '../../components/AnimatedSection';

const SendMoneyPage: React.FC = () => {
    const navigate = useNavigate();
    const [transferType, setTransferType] = useState<'internal' | 'external'>('internal');
    const [formData, setFormData] = useState({
        fromAccount: 'Checking - **** 4582',
        toAccount: '',
        amount: '',
        note: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Validate and proceed to confirmation
        navigate('/transfers/confirm', { 
            state: { 
                type: 'Transfer',
                data: { ...formData, transferType } 
            } 
        });
    };

    return (
        <AnimatedSection>
            <div className="max-w-2xl mx-auto bg-white dark:bg-primary-gray rounded-lg shadow-lg p-6 md:p-8">
                <h1 className="text-2xl font-bold text-light-text dark:text-white mb-6">Send Money</h1>
                
                <div className="flex mb-6 bg-gray-100 dark:bg-black/30 p-1 rounded-lg">
                    <button 
                        onClick={() => setTransferType('internal')}
                        className={`flex-1 py-2 text-sm font-semibold rounded-md transition-all ${transferType === 'internal' ? 'bg-white dark:bg-gray-700 shadow-sm text-primary-purple' : 'text-gray-500'}`}
                    >
                        Internal Transfer
                    </button>
                    <button 
                        onClick={() => setTransferType('external')}
                        className={`flex-1 py-2 text-sm font-semibold rounded-md transition-all ${transferType === 'external' ? 'bg-white dark:bg-gray-700 shadow-sm text-primary-purple' : 'text-gray-500'}`}
                    >
                        External Bank
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-light-text-secondary dark:text-gray-400 mb-1">From Account</label>
                        <select 
                            name="fromAccount" 
                            value={formData.fromAccount}
                            onChange={handleChange}
                            className="w-full bg-gray-50 dark:bg-black/20 border border-gray-300 dark:border-gray-600 rounded-md p-3 text-light-text dark:text-white focus:ring-2 focus:ring-primary-purple focus:outline-none"
                        >
                            <option>Checking - **** 4582 ($12,450.75)</option>
                            <option>Savings - **** 9921 ($35,000.00)</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-light-text-secondary dark:text-gray-400 mb-1">To {transferType === 'internal' ? 'Account' : 'Recipient'}</label>
                        {transferType === 'internal' ? (
                             <select 
                                name="toAccount" 
                                value={formData.toAccount}
                                onChange={handleChange}
                                required
                                className="w-full bg-gray-50 dark:bg-black/20 border border-gray-300 dark:border-gray-600 rounded-md p-3 text-light-text dark:text-white focus:ring-2 focus:ring-primary-purple focus:outline-none"
                            >
                                <option value="">Select Account</option>
                                <option value="Savings - **** 9921">Savings - **** 9921</option>
                                <option value="Checking - **** 4582">Checking - **** 4582</option>
                            </select>
                        ) : (
                            <input 
                                type="text"
                                name="toAccount"
                                value={formData.toAccount}
                                onChange={handleChange}
                                placeholder="Recipient Name or IBAN"
                                required
                                className="w-full bg-gray-50 dark:bg-black/20 border border-gray-300 dark:border-gray-600 rounded-md p-3 text-light-text dark:text-white focus:ring-2 focus:ring-primary-purple focus:outline-none"
                            />
                        )}
                    </div>

                    <div>
                         <label className="block text-sm font-medium text-light-text-secondary dark:text-gray-400 mb-1">Amount ($)</label>
                         <input 
                            type="number" 
                            name="amount"
                            value={formData.amount}
                            onChange={handleChange}
                            placeholder="0.00"
                            min="0.01"
                            step="0.01"
                            required
                            className="w-full bg-gray-50 dark:bg-black/20 border border-gray-300 dark:border-gray-600 rounded-md p-3 text-light-text dark:text-white focus:ring-2 focus:ring-primary-purple focus:outline-none"
                        />
                    </div>

                    <div>
                         <label className="block text-sm font-medium text-light-text-secondary dark:text-gray-400 mb-1">Note (Optional)</label>
                         <input 
                            type="text" 
                            name="note"
                            value={formData.note}
                            onChange={handleChange}
                            placeholder="e.g., Rent, Gift"
                            className="w-full bg-gray-50 dark:bg-black/20 border border-gray-300 dark:border-gray-600 rounded-md p-3 text-light-text dark:text-white focus:ring-2 focus:ring-primary-purple focus:outline-none"
                        />
                    </div>

                    <button type="submit" className="w-full bg-primary-purple text-white font-bold py-3 rounded-lg hover:bg-primary-purple-dark transition-colors">
                        Review Transfer
                    </button>
                </form>
            </div>
        </AnimatedSection>
    );
};

export default SendMoneyPage;
