import React, { useState, useMemo } from 'react';
import AnimatedSection from '../../components/AnimatedSection';

interface Transaction {
  id: string;
  date: string;
  description: string;
  category: string;
  amount: number;
  status: 'Completed' | 'Pending' | 'Flagged';
}

const mockTransactions: Transaction[] = [
    { id: 'TXN-GLD-001', date: '2024-07-22', description: 'Gold Payment Settlement', category: 'Gold Assets', amount: 4200000.00, status: 'Completed' },
    { id: 'T002', date: '2024-07-21', description: 'Verification Maintenance Fee', category: 'Banking', amount: -250.00, status: 'Completed' },
    { id: 'TXN-WRE-882', date: '2024-07-21', description: 'International Wire Credit', category: 'Income', amount: 850000.00, status: 'Completed' },
    { id: 'T004', date: '2024-07-20', description: 'Security Audit Hold', category: 'Compliance', amount: 0.00, status: 'Flagged' },
    { id: 'T005', date: '2024-07-18', description: 'Account Initialization', category: 'Transfer', amount: 1000.00, status: 'Completed' },
];

const TransactionsPage: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterCategory, setFilterCategory] = useState('All');
    const [filterStatus, setFilterStatus] = useState('All');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const filteredTransactions = useMemo(() => {
        return mockTransactions.filter(t => {
            const matchesSearch = t.description.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesCategory = filterCategory === 'All' || t.category === filterCategory;
            const matchesStatus = filterStatus === 'All' || t.status === filterStatus;
            
            const transactionDate = new Date(t.date);
            const matchesStartDate = !startDate || transactionDate >= new Date(startDate);
            const matchesEndDate = !endDate || transactionDate <= new Date(endDate);

            return matchesSearch && matchesCategory && matchesStatus && matchesStartDate && matchesEndDate;
        });
    }, [searchTerm, filterCategory, filterStatus, startDate, endDate]);

    return (
        <AnimatedSection>
            <div className="bg-primary-gray rounded-lg shadow-xl p-6 border border-gray-800">
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6 gap-4">
                    <h1 className="text-2xl font-bold text-white">Audit & Transaction Log</h1>
                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-4 w-full lg:w-auto">
                         <input 
                            type="text" 
                            placeholder="Search descriptions..." 
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="bg-black/40 border border-gray-800 rounded-md p-2 text-white focus:ring-2 focus:ring-primary-purple focus:outline-none text-sm"
                         />
                         <select 
                            value={filterCategory}
                            onChange={(e) => setFilterCategory(e.target.value)}
                            className="bg-black/40 border border-gray-800 rounded-md p-2 text-white focus:ring-2 focus:ring-primary-purple focus:outline-none text-sm"
                         >
                             <option value="All">All Categories</option>
                             <option value="Gold Assets">Gold Assets</option>
                             <option value="Income">Income</option>
                             <option value="Banking">Banking</option>
                             <option value="Compliance">Compliance</option>
                         </select>
                         <select 
                            value={filterStatus}
                            onChange={(e) => setFilterStatus(e.target.value)}
                            className="bg-black/40 border border-gray-800 rounded-md p-2 text-white focus:ring-2 focus:ring-primary-purple focus:outline-none text-sm"
                         >
                             <option value="All">All Statuses</option>
                             <option value="Completed">Completed</option>
                             <option value="Pending">Pending</option>
                             <option value="Flagged">Flagged</option>
                         </select>
                         <input 
                            type="date" 
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            className="bg-black/40 border border-gray-800 rounded-md p-2 text-white focus:ring-2 focus:ring-primary-purple focus:outline-none text-sm"
                            aria-label="Start Date"
                         />
                         <input 
                            type="date" 
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                            className="bg-black/40 border border-gray-800 rounded-md p-2 text-white focus:ring-2 focus:ring-primary-purple focus:outline-none text-sm"
                            aria-label="End Date"
                         />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-gray-800">
                                <th className="p-4 text-gray-400 font-bold uppercase text-[10px] tracking-widest">Reference ID</th>
                                <th className="p-4 text-gray-400 font-bold uppercase text-[10px] tracking-widest">Description</th>
                                <th className="p-4 text-gray-400 font-bold uppercase text-[10px] tracking-widest">Category</th>
                                <th className="p-4 text-gray-400 font-bold uppercase text-[10px] tracking-widest">Status</th>
                                <th className="p-4 text-gray-400 font-bold uppercase text-[10px] tracking-widest text-right">Credit/Debit</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredTransactions.map(t => (
                                <tr key={t.id} className="border-b border-gray-900 hover:bg-black/20 transition-colors">
                                    <td className="p-4 text-gray-500 font-mono text-xs">{t.id}</td>
                                    <td className="p-4 font-semibold text-white">{t.description}</td>
                                    <td className="p-4">
                                        <span className="bg-gray-800 text-gray-300 px-2 py-1 rounded text-[10px] font-bold uppercase">
                                            {t.category}
                                        </span>
                                    </td>
                                    <td className="p-4">
                                        <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${
                                            t.status === 'Completed' ? 'text-green-500 bg-green-900/20' : 
                                            t.status === 'Flagged' ? 'text-primary-purple bg-primary-purple/20 animate-pulse' :
                                            'text-yellow-500 bg-yellow-900/20'
                                        }`}>
                                            {t.status}
                                        </span>
                                    </td>
                                    <td className={`p-4 text-right font-bold font-mono ${t.amount > 0 ? 'text-green-500' : t.amount < 0 ? 'text-primary-purple' : 'text-gray-400'}`}>
                                        {t.amount === 0 ? '--' : (t.amount > 0 ? '+' : '') + t.amount.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </AnimatedSection>
    );
};

export default TransactionsPage;