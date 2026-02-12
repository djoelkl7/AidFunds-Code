
import React from 'react';
import AnimatedSection from '../../components/AnimatedSection';
import { Link } from 'react-router-dom';

const StatCard: React.FC<{ title: string; value: string; trend: string; trendUp: boolean; icon: React.ReactNode }> = ({ title, value, trend, trendUp, icon }) => (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border-l-4 border-gray-900 dark:border-gray-600">
        <div className="flex justify-between items-start">
            <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase">{title}</p>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{value}</h3>
            </div>
            <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded-md text-gray-600 dark:text-gray-300">
                {icon}
            </div>
        </div>
        <div className="mt-4 flex items-center text-sm">
            <span className={`font-bold ${trendUp ? 'text-green-500' : 'text-red-500'} mr-2`}>
                {trend}
            </span>
            <span className="text-gray-400">vs last month</span>
        </div>
    </div>
);

const AdminDashboard: React.FC = () => {
    return (
        <AnimatedSection>
            <div className="space-y-6">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Admin Dashboard</h1>
                        <p className="text-gray-500 dark:text-gray-400">System Overview & Performance</p>
                    </div>
                    <div className="text-sm text-gray-500 bg-white dark:bg-gray-800 px-3 py-1 rounded shadow-sm">
                        Last updated: Just now
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <StatCard 
                        title="Total Users" 
                        value="12,450" 
                        trend="+12%" 
                        trendUp={true}
                        icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>}
                    />
                    <StatCard 
                        title="Total Deposits" 
                        value="$45.2M" 
                        trend="+8.5%" 
                        trendUp={true}
                        icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
                    />
                    <StatCard 
                        title="Pending Loans" 
                        value="24" 
                        trend="-5%" 
                        trendUp={false} // Less is better for backlog, but visually red might mean drop. Let's interpret green as good.
                        icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>}
                    />
                    <StatCard 
                        title="Flagged Trans." 
                        value="3" 
                        trend="+1" 
                        trendUp={false}
                        icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>}
                    />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Recent Alerts */}
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="font-bold text-lg text-gray-900 dark:text-white">System Alerts</h3>
                            <button className="text-sm text-blue-500 hover:underline">View All</button>
                        </div>
                        <div className="space-y-4">
                            <div className="flex items-start p-3 bg-red-50 dark:bg-red-900/20 rounded-md">
                                <svg className="w-5 h-5 text-red-500 mt-0.5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                                <div>
                                    <p className="text-sm font-bold text-red-800 dark:text-red-300">High Value Transfer Flagged</p>
                                    <p className="text-xs text-red-600 dark:text-red-400">Transaction ID #TXN-9982 exceeded $10,000 limit without prior clearance.</p>
                                </div>
                            </div>
                            <div className="flex items-start p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-md">
                                <svg className="w-5 h-5 text-yellow-500 mt-0.5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                <div>
                                    <p className="text-sm font-bold text-yellow-800 dark:text-yellow-300">Server Load Warning</p>
                                    <p className="text-xs text-yellow-600 dark:text-yellow-400">Database latency is higher than average (120ms).</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Pending Actions */}
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="font-bold text-lg text-gray-900 dark:text-white">Pending Actions</h3>
                        </div>
                        <ul className="divide-y divide-gray-100 dark:divide-gray-700">
                            <li className="py-3 flex justify-between items-center">
                                <div>
                                    <p className="text-sm font-medium text-gray-900 dark:text-white">Review Loan Application #LN-882</p>
                                    <p className="text-xs text-gray-500">Applicant: Michael B.</p>
                                </div>
                                <Link to="/admin/loans" className="px-3 py-1 bg-blue-100 text-blue-600 text-xs font-bold rounded hover:bg-blue-200">Review</Link>
                            </li>
                             <li className="py-3 flex justify-between items-center">
                                <div>
                                    <p className="text-sm font-medium text-gray-900 dark:text-white">KYC Verification: Sarah J.</p>
                                    <p className="text-xs text-gray-500">Uploaded documents pending</p>
                                </div>
                                <button className="px-3 py-1 bg-blue-100 text-blue-600 text-xs font-bold rounded hover:bg-blue-200">Verify</button>
                            </li>
                            <li className="py-3 flex justify-between items-center">
                                <div>
                                    <p className="text-sm font-medium text-gray-900 dark:text-white">User Support Ticket #901</p>
                                    <p className="text-xs text-gray-500">"Login issues on mobile"</p>
                                </div>
                                <button className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-bold rounded hover:bg-gray-200">View</button>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </AnimatedSection>
    );
};

export default AdminDashboard;
