
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AnimatedSection from '../../components/AnimatedSection';

const PayBillsPage: React.FC = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        payee: '',
        fromAccount: 'Checking - **** 4582',
        amount: '',
        reference: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        navigate('/transfers/confirm', { 
            state: { 
                type: 'Bill Payment',
                data: formData 
            } 
        });
    };

    return (
        <AnimatedSection>
            <div className="max-w-2xl mx-auto bg-white dark:bg-primary-gray rounded-lg shadow-lg p-6 md:p-8">
                <h1 className="text-2xl font-bold text-light-text dark:text-white mb-6">Pay Bills</h1>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                         <label className="block text-sm font-medium text-light-text-secondary dark:text-gray-400 mb-1">Select Payee</label>
                         <select 
                            name="payee" 
                            value={formData.payee}
                            onChange={handleChange}
                            required
                            className="w-full bg-gray-50 dark:bg-black/20 border border-gray-300 dark:border-gray-600 rounded-md p-3 text-light-text dark:text-white focus:ring-2 focus:ring-primary-red focus:outline-none"
                        >
                            <option value="">Select a Biller</option>
                            <option value="Electric Company">Electric Company</option>
                            <option value="Water Services">Water Services</option>
                            <option value="Internet Provider">Internet Provider</option>
                            <option value="Credit Card">Credit Card</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-light-text-secondary dark:text-gray-400 mb-1">From Account</label>
                        <select 
                            name="fromAccount" 
                            value={formData.fromAccount}
                            onChange={handleChange}
                            className="w-full bg-gray-50 dark:bg-black/20 border border-gray-300 dark:border-gray-600 rounded-md p-3 text-light-text dark:text-white focus:ring-2 focus:ring-primary-red focus:outline-none"
                        >
                            <option>Checking - **** 4582 ($12,450.75)</option>
                            <option>Savings - **** 9921 ($35,000.00)</option>
                        </select>
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
                            className="w-full bg-gray-50 dark:bg-black/20 border border-gray-300 dark:border-gray-600 rounded-md p-3 text-light-text dark:text-white focus:ring-2 focus:ring-primary-red focus:outline-none"
                        />
                    </div>

                    <div>
                         <label className="block text-sm font-medium text-light-text-secondary dark:text-gray-400 mb-1">Reference / Account No.</label>
                         <input 
                            type="text" 
                            name="reference"
                            value={formData.reference}
                            onChange={handleChange}
                            placeholder="Biller Account Number"
                            required
                            className="w-full bg-gray-50 dark:bg-black/20 border border-gray-300 dark:border-gray-600 rounded-md p-3 text-light-text dark:text-white focus:ring-2 focus:ring-primary-red focus:outline-none"
                        />
                    </div>

                    <button type="submit" className="w-full bg-primary-red text-white font-bold py-3 rounded-lg hover:bg-red-700 transition-colors">
                        Review Payment
                    </button>
                </form>
            </div>
        </AnimatedSection>
    );
};

export default PayBillsPage;
