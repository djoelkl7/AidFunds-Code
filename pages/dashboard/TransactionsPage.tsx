
import React, { useState, useMemo } from 'react';
import AnimatedSection from '../../components/AnimatedSection';

interface Transaction {
  id: string;
  date: string;
  description: string;
  category: string;
  amount: number;
  status: 'Completed' | 'Pending';
}

const mockTransactions: Transaction[] = [
    { id: 'T001', date: '2024-07-22', description: 'Starbucks Coffee', category: 'Food & Drink', amount: -5.40, status: 'Completed' },
    { id: 'T002', date: '2024-07-21', description: 'Salary Deposit', category: 'Income', amount: 3200.00, status: 'Completed' },
    { id: 'T003', date: '2024-07-20', description: 'Amazon Purchase', category: 'Shopping', amount: -45.99, status: 'Completed' },
    { id: 'T004', date: '2024-07-19', description: 'Uber Ride', category: 'Transport', amount: -18.50, status: 'Completed' },
    { id: 'T005', date: '2024-07-18', description: 'Electric Bill', category: 'Utilities', amount: -120.00, status: 'Completed' },
    { id: 'T006', date: '2024-07-18', description: 'Transfer to Savings', category: 'Transfer', amount: -500.00, status: 'Completed' },
    { id: 'T007', date: '2024-07-17', description: 'Grocery Store', category: 'Groceries', amount: -156.32, status: 'Completed' },
    { id: 'T008', date: '2024-07-16', description: 'Netflix Subscription', category: 'Entertainment', amount: -15.99, status: 'Pending' },
];

const TransactionsPage: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterCategory, setFilterCategory] = useState('All');

    const filteredTransactions = useMemo(() => {
        return mockTransactions.filter(t => {
            const matchesSearch = t.description.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesCategory = filterCategory === 'All' || t.category === filterCategory;
            return matchesSearch && matchesCategory;
        });
    }, [searchTerm, filterCategory]);

    return (
        <AnimatedSection>
            <div className="bg-white dark:bg-primary-gray rounded-lg shadow-md p-6">
                <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
                    <h1 className="text-2xl font-bold text-light-text dark:text-white">Transaction History</h1>
                    <div className="flex gap-4 w-full md:w-auto">
                         <input 
                            type="text" 
                            placeholder="Search transactions..." 
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full md:w-64 bg-gray-100 dark:bg-black/30 border border-gray-300 dark:border-gray-600 rounded-md p-2 text-light-text dark:text-white focus:ring-2 focus:ring-primary-red focus:outline-none"
                         />
                         <select 
                            value={filterCategory}
                            onChange={(e) => setFilterCategory(e.target.value)}
                            className="bg-gray-100 dark:bg-black/30 border border-gray-300 dark:border-gray-600 rounded-md p-2 text-light-text dark:text-white focus:ring-2 focus:ring-primary-red focus:outline-none"
                         >
                             <option value="All">All Categories</option>
                             <option value="Food & Drink">Food & Drink</option>
                             <option value="Income">Income</option>
                             <option value="Shopping">Shopping</option>
                             <option value="Utilities">Utilities</option>
                             <option value="Transfer">Transfer</option>
                         </select>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-gray-200 dark:border-gray-700">
                                <th className="p-4 text-light-text-secondary dark:text-gray-400 font-medium">Date</th>
                                <th className="p-4 text-light-text-secondary dark:text-gray-400 font-medium">Description</th>
                                <th className="p-4 text-light-text-secondary dark:text-gray-400 font-medium">Category</th>
                                <th className="p-4 text-light-text-secondary dark:text-gray-400 font-medium">Status</th>
                                <th className="p-4 text-light-text-secondary dark:text-gray-400 font-medium text-right">Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredTransactions.map(t => (
                                <tr key={t.id} className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                                    <td className="p-4 text-light-text dark:text-white">{t.date}</td>
                                    <td className="p-4 font-semibold text-light-text dark:text-white">{t.description}</td>
                                    <td className="p-4">
                                        <span className="bg-gray-100 dark:bg-gray-700 text-light-text-secondary dark:text-gray-300 px-2 py-1 rounded text-xs">
                                            {t.category}
                                        </span>
                                    </td>
                                    <td className="p-4">
                                        <span className={`px-2 py-1 rounded text-xs font-bold ${
                                            t.status === 'Completed' ? 'text-green-600 bg-green-100 dark:bg-green-900/30' : 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/30'
                                        }`}>
                                            {t.status}
                                        </span>
                                    </td>
                                    <td className={`p-4 text-right font-bold ${t.amount > 0 ? 'text-green-500' : 'text-light-text dark:text-white'}`}>
                                        {t.amount > 0 ? '+' : ''}{t.amount.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {filteredTransactions.length === 0 && (
                        <div className="p-8 text-center text-light-text-secondary dark:text-gray-500">
                            No transactions found.
                        </div>
                    )}
                </div>
            </div>
        </AnimatedSection>
    );
};

export default TransactionsPage;
