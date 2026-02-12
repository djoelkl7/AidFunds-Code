
import React from 'react';
import AnimatedSection from '../../components/AnimatedSection';

const AccountCard: React.FC<{ title: string; balance: string; details: { label: string; value: string }[] }> = ({ title, balance, details }) => (
    <div className="bg-white dark:bg-primary-gray rounded-lg shadow-lg overflow-hidden border-t-4 border-primary-red">
        <div className="p-6">
            <h3 className="text-xl font-bold text-light-text dark:text-white mb-1">{title}</h3>
            <h2 className="text-3xl font-extrabold text-light-text dark:text-white mb-6">{balance}</h2>
            
            <div className="space-y-4">
                {details.map((item, idx) => (
                    <div key={idx} className="flex justify-between border-b border-gray-100 dark:border-gray-700 pb-2 last:border-0 last:pb-0">
                        <span className="text-light-text-secondary dark:text-gray-400">{item.label}</span>
                        <span className="font-mono font-medium text-light-text dark:text-white select-all">{item.value}</span>
                    </div>
                ))}
            </div>
        </div>
        <div className="bg-gray-50 dark:bg-black/20 p-4 text-center">
            <button className="text-primary-red font-semibold hover:text-red-700 text-sm">View Statements</button>
        </div>
    </div>
);

const AccountDetailsPage: React.FC = () => {
    return (
        <AnimatedSection>
            <h1 className="text-2xl font-bold text-light-text dark:text-white mb-6">Account Details</h1>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <AccountCard 
                    title="Primary Checking" 
                    balance="$12,450.75"
                    details={[
                        { label: 'Account Number', value: '1234 5678 9012' },
                        { label: 'Routing Number', value: '098765432' },
                        { label: 'Bank Name', value: 'AidFunds Bank, NA' },
                        { label: 'Status', value: 'Active' },
                    ]}
                />
                <AccountCard 
                    title="High Yield Savings" 
                    balance="$35,000.00"
                    details={[
                        { label: 'Account Number', value: '9876 5432 1098' },
                        { label: 'Interest Rate', value: '4.50% APY' },
                        { label: 'Bank Name', value: 'AidFunds Bank, NA' },
                        { label: 'Status', value: 'Active' },
                    ]}
                />
            </div>

            <div className="mt-8 bg-white dark:bg-primary-gray p-6 rounded-lg shadow-md">
                 <h3 className="text-xl font-bold text-light-text dark:text-white mb-4">Linked Cards</h3>
                 <div className="flex flex-col md:flex-row gap-6">
                    <div className="w-full md:w-80 h-48 bg-gradient-to-r from-gray-800 to-black rounded-xl p-6 text-white shadow-xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-white opacity-10 rounded-full"></div>
                        <div className="flex justify-between items-start mb-8">
                            <span className="font-bold tracking-wider">AidFunds</span>
                            <span className="text-sm">Debit</span>
                        </div>
                        <div className="mb-6">
                            <span className="font-mono text-xl tracking-widest">**** **** **** 4582</span>
                        </div>
                        <div className="flex justify-between items-end">
                            <div>
                                <span className="text-xs text-gray-400 block">Card Holder</span>
                                <span className="font-medium">JOHN DOE</span>
                            </div>
                            <div>
                                <span className="text-xs text-gray-400 block">Expires</span>
                                <span className="font-medium">12/26</span>
                            </div>
                        </div>
                    </div>
                 </div>
            </div>
        </AnimatedSection>
    );
};

export default AccountDetailsPage;
