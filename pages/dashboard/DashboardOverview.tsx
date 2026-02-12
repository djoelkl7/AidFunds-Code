
import React from 'react';
import { Link } from 'react-router-dom';
import AnimatedSection from '../../components/AnimatedSection';
import { useUser } from '../../contexts/UserContext';

const DashboardOverview: React.FC = () => {
  const { user } = useUser();

  const accounts = [
    { type: 'Checking Account', number: '**** 4582', balance: 12450.75, change: '+2.5%' },
    { type: 'Savings Account', number: '**** 9921', balance: 35000.00, change: '+1.1%' },
    { type: 'Investment Portfolio', number: 'Aggressive Alpha', balance: 8750.20, change: '+5.4%' },
  ];

  const recentActivity = [
    { id: 1, desc: 'Starbucks Coffee', date: 'Today, 9:41 AM', amount: -5.40, type: 'debit' },
    { id: 2, desc: 'Salary Deposit', date: 'Yesterday, 5:00 PM', amount: 3200.00, type: 'credit' },
    { id: 3, desc: 'Amazon Purchase', date: 'Jul 20, 2:30 PM', amount: -45.99, type: 'debit' },
    { id: 4, desc: 'Transfer to Savings', date: 'Jul 19, 10:00 AM', amount: -500.00, type: 'transfer' },
  ];

  return (
    <div className="space-y-6">
      <AnimatedSection>
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-light-text dark:text-white">
            Welcome back, {user?.name.split(' ')[0]}!
          </h1>
          <p className="text-light-text-secondary dark:text-gray-400">Here's what's happening with your finances today.</p>
        </header>
      </AnimatedSection>

      {/* Account Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {accounts.map((acc, idx) => (
          <AnimatedSection key={idx} delay={idx * 100}>
            <div className="bg-white dark:bg-primary-gray p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow border-t-4 border-primary-red">
              <p className="text-sm text-light-text-secondary dark:text-gray-400 font-medium uppercase">{acc.type}</p>
              <h3 className="text-2xl font-bold text-light-text dark:text-white mt-2">${acc.balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}</h3>
              <div className="flex justify-between items-end mt-4">
                <p className="text-xs text-light-text-secondary dark:text-gray-500">{acc.number}</p>
                <span className="text-xs font-bold text-green-500 bg-green-100 dark:bg-green-900/30 px-2 py-1 rounded-full">{acc.change}</span>
              </div>
            </div>
          </AnimatedSection>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <div className="lg:col-span-2">
          <AnimatedSection delay={300}>
            <div className="bg-white dark:bg-primary-gray rounded-lg shadow-md p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-light-text dark:text-white">Recent Activity</h2>
                <Link to="/dashboard/transactions" className="text-sm text-primary-red hover:underline font-medium">View All</Link>
              </div>
              <div className="space-y-4">
                {recentActivity.map((item) => (
                  <div key={item.id} className="flex justify-between items-center p-3 hover:bg-gray-50 dark:hover:bg-gray-800/50 rounded-lg transition-colors">
                    <div className="flex items-center">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-4 ${
                        item.type === 'credit' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                      }`}>
                         {item.type === 'credit' ? (
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                         ) : (
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" /></svg>
                         )}
                      </div>
                      <div>
                        <p className="font-semibold text-light-text dark:text-white">{item.desc}</p>
                        <p className="text-xs text-light-text-secondary dark:text-gray-400">{item.date}</p>
                      </div>
                    </div>
                    <span className={`font-bold ${item.amount > 0 ? 'text-green-500' : 'text-light-text dark:text-white'}`}>
                      {item.amount > 0 ? '+' : ''}{item.amount.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>
        </div>

        {/* Quick Actions */}
        <div className="lg:col-span-1">
          <AnimatedSection delay={400}>
            <div className="bg-white dark:bg-primary-gray rounded-lg shadow-md p-6 h-full">
              <h2 className="text-xl font-bold text-light-text dark:text-white mb-6">Quick Actions</h2>
              <div className="grid grid-cols-2 gap-4">
                <Link to="/transfers/send" className="flex flex-col items-center justify-center p-4 bg-light-bg-secondary dark:bg-black/30 rounded-lg hover:bg-primary-red hover:text-white transition-all group">
                  <svg className="w-8 h-8 mb-2 text-primary-red group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  <span className="font-medium text-sm">Send Money</span>
                </Link>
                <Link to="/transfers/pay-bills" className="flex flex-col items-center justify-center p-4 bg-light-bg-secondary dark:bg-black/30 rounded-lg hover:bg-primary-red hover:text-white transition-all group">
                  <svg className="w-8 h-8 mb-2 text-primary-red group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                  <span className="font-medium text-sm">Pay Bills</span>
                </Link>
                <Link to="/dashboard/statements" className="flex flex-col items-center justify-center p-4 bg-light-bg-secondary dark:bg-black/30 rounded-lg hover:bg-primary-red hover:text-white transition-all group">
                  <svg className="w-8 h-8 mb-2 text-primary-red group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                  <span className="font-medium text-sm">Statements</span>
                </Link>
                 <Link to="/profile" className="flex flex-col items-center justify-center p-4 bg-light-bg-secondary dark:bg-black/30 rounded-lg hover:bg-primary-red hover:text-white transition-all group">
                  <svg className="w-8 h-8 mb-2 text-primary-red group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /></svg>
                  <span className="font-medium text-sm">Settings</span>
                </Link>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;
