
import React from 'react';
import AnimatedSection from '../../components/AnimatedSection';

const LoanApprovalsPage: React.FC = () => {
    const loanRequests = [
        { id: 'LN-882', applicant: 'Michael Brown', amount: 15000, purpose: 'Home Improvement', creditScore: 720, income: 65000, date: '2024-07-21', status: 'Pending' },
        { id: 'LN-883', applicant: 'Jessica White', amount: 5000, purpose: 'Debt Consolidation', creditScore: 680, income: 45000, date: '2024-07-22', status: 'Pending' },
        { id: 'LN-884', applicant: 'David Miller', amount: 35000, purpose: 'Business Expansion', creditScore: 750, income: 90000, date: '2024-07-22', status: 'Pending' },
    ];

    return (
        <AnimatedSection>
            <div className="space-y-6">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Loan Approvals</h1>
                <p className="text-gray-500 dark:text-gray-400">Review pending loan applications.</p>

                <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                    {loanRequests.map(loan => (
                        <div key={loan.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden border border-gray-200 dark:border-gray-700">
                            <div className="bg-gray-50 dark:bg-gray-700/50 p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                                <h3 className="font-bold text-lg text-gray-900 dark:text-white">Application #{loan.id}</h3>
                                <span className="text-xs bg-purple-100 text-primary-purple px-2 py-1 rounded-full font-bold">{loan.status}</span>
                            </div>
                            <div className="p-6">
                                <div className="grid grid-cols-2 gap-4 mb-6">
                                    <div>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">Applicant</p>
                                        <p className="font-semibold text-gray-900 dark:text-white">{loan.applicant}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">Amount Requested</p>
                                        <p className="font-bold text-xl text-primary-purple">${loan.amount.toLocaleString()}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">Purpose</p>
                                        <p className="font-medium text-gray-900 dark:text-white">{loan.purpose}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">Credit Score</p>
                                        <p className={`font-bold ${loan.creditScore >= 700 ? 'text-green-500' : 'text-yellow-500'}`}>{loan.creditScore}</p>
                                    </div>
                                     <div>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">Annual Income</p>
                                        <p className="font-medium text-gray-900 dark:text-white">${loan.income.toLocaleString()}</p>
                                    </div>
                                     <div>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">Date Applied</p>
                                        <p className="font-medium text-gray-900 dark:text-white">{loan.date}</p>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <button className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold py-2 rounded transition-colors">
                                        Approve Loan
                                    </button>
                                    <button className="flex-1 bg-primary-purple hover:bg-primary-purple-dark text-white font-bold py-2 rounded transition-colors">
                                        Reject
                                    </button>
                                    <button className="flex-1 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-white font-bold py-2 rounded transition-colors">
                                        View Docs
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </AnimatedSection>
    );
};

export default LoanApprovalsPage;
