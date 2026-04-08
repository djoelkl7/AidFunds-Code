
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AnimatedSection from '../../components/AnimatedSection';

const ApplyLoanPage: React.FC = () => {
    const navigate = useNavigate();
    const [amount, setAmount] = useState(10000);
    const [months, setMonths] = useState(24);
    const [purpose, setPurpose] = useState('Personal');
    const [monthlyPayment, setMonthlyPayment] = useState(0);

    const interestRate = 0.085; // 8.5% Fixed Rate for demo

    useEffect(() => {
        // EMI Calculation: P * r * (1+r)^n / ((1+r)^n - 1)
        const r = interestRate / 12;
        const n = months;
        const emi = (amount * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
        setMonthlyPayment(emi);
    }, [amount, months]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert("Application Submitted! We will review your details.");
        navigate('/dashboard/loans');
    };

    return (
        <AnimatedSection>
            <div className="max-w-4xl mx-auto">
                <div className="flex items-center space-x-4 mb-6">
                    <button onClick={() => navigate(-1)} className="text-light-text-secondary dark:text-gray-400 hover:text-primary-purple">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                    </button>
                    <h1 className="text-2xl font-bold text-light-text dark:text-white">Apply for a Loan</h1>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Calculator Section */}
                    <div className="lg:col-span-2 bg-white dark:bg-primary-gray rounded-lg shadow-md p-6 md:p-8">
                        <h2 className="text-xl font-bold text-light-text dark:text-white mb-6">Loan Calculator</h2>
                        
                        <div className="space-y-8">
                            <div>
                                <div className="flex justify-between mb-2">
                                    <label className="text-sm font-medium text-light-text-secondary dark:text-gray-400">Loan Amount</label>
                                    <span className="font-bold text-primary-purple text-lg">${amount.toLocaleString()}</span>
                                </div>
                                <input 
                                    type="range" 
                                    min="1000" 
                                    max="50000" 
                                    step="500" 
                                    value={amount} 
                                    onChange={(e) => setAmount(parseInt(e.target.value))}
                                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 accent-primary-purple"
                                />
                                <div className="flex justify-between text-xs text-gray-500 mt-1">
                                    <span>$1,000</span>
                                    <span>$50,000</span>
                                </div>
                            </div>

                            <div>
                                <div className="flex justify-between mb-2">
                                    <label className="text-sm font-medium text-light-text-secondary dark:text-gray-400">Duration (Months)</label>
                                    <span className="font-bold text-primary-purple text-lg">{months} Months</span>
                                </div>
                                <input 
                                    type="range" 
                                    min="6" 
                                    max="60" 
                                    step="6" 
                                    value={months} 
                                    onChange={(e) => setMonths(parseInt(e.target.value))}
                                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 accent-primary-purple"
                                />
                                <div className="flex justify-between text-xs text-gray-500 mt-1">
                                    <span>6 Months</span>
                                    <span>60 Months</span>
                                </div>
                            </div>

                             <div className="p-4 bg-gray-50 dark:bg-black/20 rounded-lg">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-light-text dark:text-white font-medium">Interest Rate</span>
                                    <span className="font-bold text-light-text dark:text-white">{(interestRate * 100).toFixed(1)}% Fixed</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-light-text dark:text-white font-medium">Estimated Monthly Payment</span>
                                    <span className="text-2xl font-bold text-primary-purple">${monthlyPayment.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>
                                </div>
                            </div>
                        </div>

                        <form onSubmit={handleSubmit} className="mt-8 pt-8 border-t border-gray-100 dark:border-gray-700">
                            <div className="mb-6">
                                <label className="block text-sm font-medium text-light-text-secondary dark:text-gray-400 mb-2">Loan Purpose</label>
                                <select 
                                    value={purpose} 
                                    onChange={(e) => setPurpose(e.target.value)}
                                    className="w-full bg-gray-100 dark:bg-black/30 border border-gray-300 dark:border-gray-600 rounded-md p-3 text-light-text dark:text-white focus:ring-2 focus:ring-primary-purple focus:outline-none"
                                >
                                    <option>Debt Consolidation</option>
                                    <option>Home Improvement</option>
                                    <option>Major Purchase</option>
                                    <option>Personal</option>
                                    <option>Business</option>
                                </select>
                            </div>
                            <button type="submit" className="w-full bg-primary-purple text-white font-bold py-4 rounded-lg hover:bg-primary-purple-dark transition-colors shadow-lg">
                                Submit Application
                            </button>
                        </form>
                    </div>

                    {/* Info Sidebar */}
                    <div className="lg:col-span-1 space-y-6">
                        <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg border border-blue-100 dark:border-blue-900/30">
                            <h3 className="font-bold text-blue-800 dark:text-blue-300 mb-2">Why Apply?</h3>
                            <ul className="list-disc list-inside text-sm text-blue-700 dark:text-blue-200 space-y-2">
                                <li>Instant decision for qualified applicants</li>
                                <li>No prepayment penalties</li>
                                <li>Fixed rates for the life of the loan</li>
                            </ul>
                        </div>
                        <div className="bg-white dark:bg-primary-gray p-6 rounded-lg shadow-md">
                             <h3 className="font-bold text-light-text dark:text-white mb-2">Requirements</h3>
                             <p className="text-sm text-light-text-secondary dark:text-gray-400 mb-4">To be approved, you generally need:</p>
                             <ul className="text-sm text-light-text-secondary dark:text-gray-400 space-y-2">
                                 <li className="flex items-center"><svg className="w-4 h-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg> Active Checking Account</li>
                                 <li className="flex items-center"><svg className="w-4 h-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg> Proof of Income</li>
                                 <li className="flex items-center"><svg className="w-4 h-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg> Good Credit Standing</li>
                             </ul>
                        </div>
                    </div>
                </div>
            </div>
        </AnimatedSection>
    );
};

export default ApplyLoanPage;
