
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AnimatedSection from '../../components/AnimatedSection';

const LoanDetailsPage: React.FC = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const history = [
        { date: 'Jul 15, 2024', amount: '$245.50', status: 'Paid', type: 'Auto-Debit' },
        { date: 'Jun 15, 2024', amount: '$245.50', status: 'Paid', type: 'Auto-Debit' },
        { date: 'May 15, 2024', amount: '$245.50', status: 'Paid', type: 'Manual' },
        { date: 'Apr 15, 2024', amount: '$245.50', status: 'Paid', type: 'Auto-Debit' },
    ];

    return (
        <AnimatedSection>
            <div className="space-y-6">
                 <div className="flex items-center justify-between mb-4">
                     <div className="flex items-center space-x-4">
                        <button onClick={() => navigate('/dashboard/loans')} className="text-light-text-secondary dark:text-gray-400 hover:text-primary-purple">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                        </button>
                        <h1 className="text-2xl font-bold text-light-text dark:text-white">Loan Details</h1>
                     </div>
                     <span className="bg-green-100 text-green-800 text-sm font-bold px-3 py-1 rounded-full">Active</span>
                </div>

                {/* Status Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white dark:bg-primary-gray p-6 rounded-lg shadow-md border-t-4 border-blue-500">
                        <p className="text-sm text-light-text-secondary dark:text-gray-400">Total Principal</p>
                        <p className="text-2xl font-bold text-light-text dark:text-white">$10,000.00</p>
                    </div>
                    <div className="bg-white dark:bg-primary-gray p-6 rounded-lg shadow-md border-t-4 border-primary-purple">
                        <p className="text-sm text-light-text-secondary dark:text-gray-400">Remaining Balance</p>
                        <p className="text-2xl font-bold text-light-text dark:text-white">$8,250.00</p>
                    </div>
                    <div className="bg-white dark:bg-primary-gray p-6 rounded-lg shadow-md border-t-4 border-yellow-500">
                        <p className="text-sm text-light-text-secondary dark:text-gray-400">Next Payment</p>
                        <p className="text-2xl font-bold text-light-text dark:text-white">$245.50</p>
                        <p className="text-xs text-light-text-secondary dark:text-gray-400 mt-1">Due Aug 15</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 bg-white dark:bg-primary-gray rounded-lg shadow-md p-6">
                        <h3 className="text-xl font-bold text-light-text dark:text-white mb-4">Repayment History</h3>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-gray-50 dark:bg-black/20 border-b border-gray-200 dark:border-gray-700">
                                    <tr>
                                        <th className="p-3 font-medium text-light-text-secondary dark:text-gray-400">Date</th>
                                        <th className="p-3 font-medium text-light-text-secondary dark:text-gray-400">Type</th>
                                        <th className="p-3 font-medium text-light-text-secondary dark:text-gray-400">Amount</th>
                                        <th className="p-3 font-medium text-light-text-secondary dark:text-gray-400 text-right">Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {history.map((item, idx) => (
                                        <tr key={idx} className="border-b border-gray-100 dark:border-gray-700 last:border-0 hover:bg-gray-50 dark:hover:bg-gray-800/50">
                                            <td className="p-3 text-light-text dark:text-white">{item.date}</td>
                                            <td className="p-3 text-light-text-secondary dark:text-gray-400 text-sm">{item.type}</td>
                                            <td className="p-3 font-bold text-light-text dark:text-white">{item.amount}</td>
                                            <td className="p-3 text-right">
                                                <span className="text-xs font-bold bg-green-100 text-green-700 px-2 py-1 rounded">{item.status}</span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="lg:col-span-1 space-y-6">
                         <div className="bg-white dark:bg-primary-gray p-6 rounded-lg shadow-md">
                            <h3 className="text-lg font-bold text-light-text dark:text-white mb-4">Loan Info</h3>
                            <div className="space-y-3 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-light-text-secondary dark:text-gray-400">Loan ID</span>
                                    <span className="text-light-text dark:text-white">{id}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-light-text-secondary dark:text-gray-400">Interest Rate</span>
                                    <span className="text-light-text dark:text-white">8.5% Fixed</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-light-text-secondary dark:text-gray-400">Term Length</span>
                                    <span className="text-light-text dark:text-white">48 Months</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-light-text-secondary dark:text-gray-400">Start Date</span>
                                    <span className="text-light-text dark:text-white">Jan 15, 2024</span>
                                </div>
                            </div>
                         </div>
                         
                         <button className="w-full bg-primary-purple text-white font-bold py-3 rounded-lg hover:bg-primary-purple-dark transition-colors">
                             Make One-Time Payment
                         </button>
                    </div>
                </div>
            </div>
        </AnimatedSection>
    );
};

export default LoanDetailsPage;
