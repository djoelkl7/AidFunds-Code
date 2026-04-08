import React from 'react';
import { Link } from 'react-router-dom';
import AnimatedSection from '../../components/AnimatedSection';
import { useUser } from '../../contexts/UserContext';

const DashboardOverview: React.FC = () => {
  const { user } = useUser();

  // Dividing $4,200,000 between accounts
  const accounts = [
    { type: 'Checking Account', number: '**** 8821', balance: 1200000.00, change: '+12.4%' },
    { type: 'Savings Account', number: '**** 4432', balance: 3000000.00, change: '+4.2%' },
    { type: 'Total Net Worth', number: 'Combined Balance', balance: 4200000.00, change: 'Stable' },
  ];

  const recentActivity = [
    { id: 1, desc: 'Gold Payment Settlement', date: 'Today, 11:20 AM', amount: 4200000.00, type: 'credit' },
    { id: 2, desc: 'Account Verification Fee', date: 'Yesterday, 4:45 PM', amount: -250.00, type: 'debit' },
    { id: 3, desc: 'International Wire Transfer', date: 'Jul 21, 10:15 AM', amount: 850000.00, type: 'credit' },
    { id: 4, desc: 'Security Compliance Audit', date: 'Jul 20, 09:00 AM', amount: 0.00, type: 'transfer' },
  ];

  return (
    <div className="space-y-6">
      {/* Account Locked Alert */}
      <AnimatedSection>
        <div className="bg-purple-900/30 border border-primary-purple/50 p-4 rounded-lg flex items-center space-x-4 mb-6">
          <div className="bg-primary-purple p-2 rounded-full">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m0 0v2m0-2h2m-2 0H10m11-3.5a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <h3 className="font-bold text-primary-purple">Account Access Restriction</h3>
            <p className="text-gray-300 text-sm">Temporary locked. Till further notice. Please contact your account manager for verification.</p>
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection>
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-white">
            Private Portfolio: {user?.name}
          </h1>
          <p className="text-gray-400">Main Account: <span className="text-primary-purple font-mono">{user?.email}</span></p>
        </header>
      </AnimatedSection>

      {/* Account Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {accounts.map((acc, idx) => (
          <AnimatedSection key={idx} delay={idx * 100}>
            <div className="bg-primary-gray p-6 rounded-lg shadow-xl border-t-4 border-primary-purple dashboard-card">
              <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">{acc.type}</p>
              <h3 className="text-2xl font-bold text-white mt-2">${acc.balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}</h3>
              <div className="flex justify-between items-end mt-4">
                <p className="text-xs text-gray-500 font-mono">{acc.number}</p>
                <span className={`text-xs font-bold px-2 py-1 rounded-full ${idx === 2 ? 'bg-blue-900/30 text-blue-400' : 'bg-green-900/30 text-green-400'}`}>
                  {acc.change}
                </span>
              </div>
            </div>
          </AnimatedSection>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <div className="lg:col-span-2">
          <AnimatedSection delay={300}>
            <div className="bg-primary-gray rounded-lg shadow-xl p-6 border border-gray-800">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-white">Asset History & Gold Payments</h2>
                <Link to="/dashboard/transactions" className="text-sm text-primary-purple hover:text-primary-purple-dark font-medium">Full Audit Trail</Link>
              </div>
              <div className="space-y-4">
                {recentActivity.map((item) => (
                  <div key={item.id} className="flex justify-between items-center p-4 bg-black/40 border border-gray-800 rounded-lg hover:border-primary-purple/50 transition-colors">
                    <div className="flex items-center">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-4 ${
                        item.type === 'credit' ? 'bg-green-900/40 text-green-400' : 'bg-red-900/40 text-red-400'
                      }`}>
                         {item.type === 'credit' ? (
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                         ) : (
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" /></svg>
                         )}
                      </div>
                      <div>
                        <p className="font-semibold text-white">{item.desc}</p>
                        <p className="text-xs text-gray-500">{item.date}</p>
                      </div>
                    </div>
                    <span className={`font-bold font-mono ${item.amount > 0 ? 'text-green-500' : item.amount < 0 ? 'text-red-500' : 'text-gray-400'}`}>
                      {item.amount > 0 ? '+' : ''}{item.amount === 0 ? 'Verification' : item.amount.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>
        </div>

        {/* Action Center - Mostly Disabled Due to Lock */}
        <div className="lg:col-span-1">
          <AnimatedSection delay={400}>
            <div className="bg-primary-gray rounded-lg shadow-xl p-6 border border-gray-800 flex flex-col h-full">
              <h2 className="text-xl font-bold text-white mb-6">Operations Center</h2>
              <div className="grid grid-cols-2 gap-4 flex-grow opacity-50 grayscale pointer-events-none">
                <div className="flex flex-col items-center justify-center p-4 bg-black/30 rounded-lg border border-gray-800">
                  <svg className="w-8 h-8 mb-2 text-primary-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" /></svg>
                  <span className="font-medium text-xs">Transfer</span>
                </div>
                <div className="flex flex-col items-center justify-center p-4 bg-black/30 rounded-lg border border-gray-800">
                  <svg className="w-8 h-8 mb-2 text-primary-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  <span className="font-medium text-xs">Withdraw</span>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-primary-purple/10 border border-primary-purple/20 rounded-lg">
                <p className="text-xs text-primary-purple font-bold text-center uppercase tracking-tighter">Account Pending Full Verification</p>
                <button className="w-full mt-2 bg-primary-purple text-white py-2 rounded text-sm font-bold hover:bg-primary-purple-dark transition-colors">
                  Contact Support
                </button>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;