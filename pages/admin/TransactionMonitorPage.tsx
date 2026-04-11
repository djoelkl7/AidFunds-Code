
import React, { useState } from 'react';
import AnimatedSection from '../../components/AnimatedSection';

const TransactionMonitorPage: React.FC = () => {
    const [selectedTxns, setSelectedTxns] = useState<string[]>([]);
    const [transactions, setTransactions] = useState([
        { id: 'TXN-9982', user: 'John Doe', type: 'Wire Transfer', amount: 15000.00, status: 'Flagged', date: '2024-07-22 14:30', risk: 'High' },
        { id: 'TXN-9981', user: 'Emily Davis', type: 'Deposit', amount: 5000.00, status: 'Completed', date: '2024-07-22 13:15', risk: 'Low' },
        { id: 'TXN-9980', user: 'Robert Wilson', type: 'Bill Payment', amount: 120.00, status: 'Completed', date: '2024-07-22 12:00', risk: 'Low' },
        { id: 'TXN-9979', user: 'Sarah Smith', type: 'Card Purchase', amount: 4500.00, status: 'Pending', date: '2024-07-22 11:45', risk: 'Medium' },
        { id: 'TXN-9978', user: 'John Doe', type: 'Withdrawal', amount: 200.00, status: 'Completed', date: '2024-07-22 10:30', risk: 'Low' },
    ]);

    const toggleSelectAll = () => {
        if (selectedTxns.length === transactions.length) {
            setSelectedTxns([]);
        } else {
            setSelectedTxns(transactions.map(t => t.id));
        }
    };

    const toggleSelectTxn = (id: string) => {
        if (selectedTxns.includes(id)) {
            setSelectedTxns(selectedTxns.filter(tid => tid !== id));
        } else {
            setSelectedTxns([...selectedTxns, id]);
        }
    };

    const handleBulkCategorize = (newRisk: string) => {
        if (selectedTxns.length === 0) return;
        
        const updatedTxns = transactions.map(txn => {
            if (selectedTxns.includes(txn.id)) {
                return { ...txn, risk: newRisk };
            }
            return txn;
        });
        
        setTransactions(updatedTxns);
        setSelectedTxns([]);
        alert(`Successfully updated risk level to ${newRisk} for ${selectedTxns.length} transactions.`);
    };

    return (
        <AnimatedSection>
             <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Transaction Monitor</h1>
                    <div className="flex items-center gap-4">
                        {selectedTxns.length > 0 && (
                            <div className="flex items-center gap-2 animate-fade-in">
                                <span className="text-sm font-medium text-gray-500 dark:text-gray-400">{selectedTxns.length} selected</span>
                                <select 
                                    onChange={(e) => handleBulkCategorize(e.target.value)}
                                    className="bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded px-2 py-1 text-xs font-bold focus:ring-2 focus:ring-primary-purple focus:outline-none"
                                    defaultValue=""
                                >
                                    <option value="" disabled>Bulk Risk Update</option>
                                    <option value="Low">Set Low Risk</option>
                                    <option value="Medium">Set Medium Risk</option>
                                    <option value="High">Set High Risk</option>
                                </select>
                            </div>
                        )}
                        <button className="bg-primary-purple text-white px-4 py-2 rounded text-sm font-bold hover:bg-primary-purple-dark transition-colors">Export Report</button>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-gray-900 text-white">
                            <tr>
                                <th className="p-4 w-10">
                                    <input 
                                        type="checkbox" 
                                        checked={selectedTxns.length === transactions.length && transactions.length > 0}
                                        onChange={toggleSelectAll}
                                        className="rounded border-gray-300 text-primary-purple focus:ring-primary-purple"
                                    />
                                </th>
                                <th className="p-4">Txn ID</th>
                                <th className="p-4">User</th>
                                <th className="p-4">Type</th>
                                <th className="p-4">Amount</th>
                                <th className="p-4">Time</th>
                                <th className="p-4">Risk Score</th>
                                <th className="p-4">Status</th>
                                <th className="p-4 text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                            {transactions.map(txn => (
                                <tr key={txn.id} className={`hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors ${selectedTxns.includes(txn.id) ? 'bg-purple-50 dark:bg-purple-900/10' : ''}`}>
                                    <td className="p-4">
                                        <input 
                                            type="checkbox" 
                                            checked={selectedTxns.includes(txn.id)}
                                            onChange={() => toggleSelectTxn(txn.id)}
                                            className="rounded border-gray-300 text-primary-purple focus:ring-primary-purple"
                                        />
                                    </td>
                                    <td className="p-4 text-sm font-mono text-gray-500 dark:text-gray-400">{txn.id}</td>
                                    <td className="p-4 font-medium text-gray-900 dark:text-white">{txn.user}</td>
                                    <td className="p-4 text-gray-700 dark:text-gray-300">{txn.type}</td>
                                    <td className="p-4 font-bold text-gray-900 dark:text-white">${txn.amount.toLocaleString()}</td>
                                    <td className="p-4 text-sm text-gray-500">{txn.date}</td>
                                    <td className="p-4">
                                        <span className={`px-2 py-1 rounded text-xs font-bold ${
                                            txn.risk === 'High' ? 'bg-red-100 text-red-700' :
                                            txn.risk === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                                            'bg-green-100 text-green-700'
                                        }`}>
                                            {txn.risk}
                                        </span>
                                    </td>
                                    <td className="p-4">
                                        <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                                            txn.status === 'Completed' ? 'bg-green-100 text-green-800' :
                                            txn.status === 'Flagged' ? 'bg-red-100 text-red-800' :
                                            'bg-gray-100 text-gray-800'
                                        }`}>
                                            {txn.status}
                                        </span>
                                    </td>
                                    <td className="p-4 text-right">
                                        <button className="text-blue-500 hover:text-blue-700 text-sm font-semibold">Details</button>
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

export default TransactionMonitorPage;
