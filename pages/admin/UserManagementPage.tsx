
import React, { useState } from 'react';
import AnimatedSection from '../../components/AnimatedSection';

const UserManagementPage: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
    
    // Mock Users
    const [users, setUsers] = useState([
        { id: 'U1001', name: 'John Doe', email: 'john@example.com', balance: 47450.75, status: 'Active', type: 'Premium' },
        { id: 'U1002', name: 'Sarah Smith', email: 'sarah@example.com', balance: 1250.00, status: 'Active', type: 'Standard' },
        { id: 'U1003', name: 'Michael Brown', email: 'mike.b@test.com', balance: 0.00, status: 'Frozen', type: 'Standard' },
        { id: 'U1004', name: 'Emily Davis', email: 'emily.d@test.com', balance: 145000.50, status: 'Active', type: 'Platinum' },
        { id: 'U1005', name: 'Robert Wilson', email: 'r.wilson@test.com', balance: 500.00, status: 'Active', type: 'Standard' },
    ]);

    const filteredUsers = users.filter(u => 
        u.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        u.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const toggleSelectAll = () => {
        if (selectedUsers.length === filteredUsers.length) {
            setSelectedUsers([]);
        } else {
            setSelectedUsers(filteredUsers.map(u => u.id));
        }
    };

    const toggleSelectUser = (id: string) => {
        if (selectedUsers.includes(id)) {
            setSelectedUsers(selectedUsers.filter(uid => uid !== id));
        } else {
            setSelectedUsers([...selectedUsers, id]);
        }
    };

    const handleBulkAction = (action: 'Freeze' | 'Activate') => {
        if (selectedUsers.length === 0) return;
        
        const updatedUsers = users.map(user => {
            if (selectedUsers.includes(user.id)) {
                return { ...user, status: action === 'Freeze' ? 'Frozen' : 'Active' };
            }
            return user;
        });
        
        setUsers(updatedUsers);
        setSelectedUsers([]);
        alert(`Successfully ${action === 'Freeze' ? 'frozen' : 'activated'} ${selectedUsers.length} users.`);
    };

    return (
        <AnimatedSection>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">User Management</h1>
                    <div className="flex items-center gap-4 w-full md:w-auto">
                        {selectedUsers.length > 0 && (
                            <div className="flex items-center gap-2 animate-fade-in">
                                <span className="text-sm font-medium text-gray-500 dark:text-gray-400">{selectedUsers.length} selected</span>
                                <button 
                                    onClick={() => handleBulkAction('Freeze')}
                                    className="bg-red-100 text-red-700 px-3 py-1 rounded text-xs font-bold hover:bg-red-200 transition-colors"
                                >
                                    Bulk Freeze
                                </button>
                                <button 
                                    onClick={() => handleBulkAction('Activate')}
                                    className="bg-green-100 text-green-700 px-3 py-1 rounded text-xs font-bold hover:bg-green-200 transition-colors"
                                >
                                    Bulk Activate
                                </button>
                            </div>
                        )}
                        <div className="relative w-full md:w-64">
                             <input 
                                type="text" 
                                placeholder="Search users..." 
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-purple focus:outline-none"
                             />
                             <svg className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                        </div>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300">
                            <tr>
                                <th className="p-4 w-10">
                                    <input 
                                        type="checkbox" 
                                        checked={selectedUsers.length === filteredUsers.length && filteredUsers.length > 0}
                                        onChange={toggleSelectAll}
                                        className="rounded border-gray-300 text-primary-purple focus:ring-primary-purple"
                                    />
                                </th>
                                <th className="p-4 font-semibold">User Details</th>
                                <th className="p-4 font-semibold">Account Type</th>
                                <th className="p-4 font-semibold">Total Balance</th>
                                <th className="p-4 font-semibold">Status</th>
                                <th className="p-4 font-semibold text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                            {filteredUsers.map(user => (
                                <tr key={user.id} className={`hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors ${selectedUsers.includes(user.id) ? 'bg-purple-50 dark:bg-purple-900/10' : ''}`}>
                                    <td className="p-4">
                                        <input 
                                            type="checkbox" 
                                            checked={selectedUsers.includes(user.id)}
                                            onChange={() => toggleSelectUser(user.id)}
                                            className="rounded border-gray-300 text-primary-purple focus:ring-primary-purple"
                                        />
                                    </td>
                                    <td className="p-4">
                                        <div className="font-bold text-gray-900 dark:text-white">{user.name}</div>
                                        <div className="text-sm text-gray-500">{user.email}</div>
                                    </td>
                                    <td className="p-4">
                                        <span className={`px-2 py-1 text-xs font-bold rounded-full ${
                                            user.type === 'Platinum' ? 'bg-purple-100 text-purple-700' :
                                            user.type === 'Premium' ? 'bg-blue-100 text-blue-700' :
                                            'bg-gray-100 text-gray-700'
                                        }`}>{user.type}</span>
                                    </td>
                                    <td className="p-4 text-gray-900 dark:text-white font-mono">
                                        ${user.balance.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                                    </td>
                                    <td className="p-4">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                            user.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                        }`}>
                                            {user.status === 'Active' ? <span className="w-2 h-2 bg-green-500 rounded-full mr-1.5"></span> : <span className="w-2 h-2 bg-red-500 rounded-full mr-1.5"></span>}
                                            {user.status}
                                        </span>
                                    </td>
                                    <td className="p-4 text-right space-x-2">
                                        <button className="text-blue-500 hover:text-blue-700 font-medium text-sm">View</button>
                                        <button 
                                            onClick={() => {
                                                const updatedUsers = users.map(u => u.id === user.id ? { ...u, status: u.status === 'Active' ? 'Frozen' : 'Active' } : u);
                                                setUsers(updatedUsers);
                                            }}
                                            className={`${user.status === 'Active' ? 'text-red-500 hover:text-red-700' : 'text-green-500 hover:text-green-700'} font-medium text-sm`}
                                        >
                                            {user.status === 'Active' ? 'Freeze' : 'Activate'}
                                        </button>
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

export default UserManagementPage;
