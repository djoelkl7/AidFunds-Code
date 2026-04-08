import React from 'react';
import AnimatedSection from '../../components/AnimatedSection';
import { useUser } from '../../contexts/UserContext';

const AccountCard: React.FC<{ title: string; balance: string; details: { label: string; value: string }[] }> = ({ title, balance, details }) => (
    <div className="bg-primary-gray rounded-lg shadow-lg overflow-hidden border-t-4 border-primary-purple border border-gray-800">
        <div className="p-6">
            <h3 className="text-xl font-bold text-white mb-1">{title}</h3>
            <h2 className="text-3xl font-extrabold text-white mb-6">{balance}</h2>
            
            <div className="space-y-4">
                {details.map((item, idx) => (
                    <div key={idx} className="flex justify-between border-b border-gray-800 pb-2 last:border-0 last:pb-0">
                        <span className="text-gray-400 text-sm">{item.label}</span>
                        <span className="font-mono font-medium text-white select-all text-sm uppercase">{item.value}</span>
                    </div>
                ))}
            </div>
        </div>
        <div className="bg-black/40 p-4 text-center">
            <button className="text-primary-purple font-bold hover:text-primary-purple-dark text-xs uppercase tracking-widest">Generate Audit Report</button>
        </div>
    </div>
);

const AccountDetailsPage: React.FC = () => {
    const { user } = useUser();
    const holderName = user?.name || 'Dolmat Bin Samsudin';

    return (
        <AnimatedSection>
            <h1 className="text-2xl font-bold text-white mb-6">Private Wealth Accounts</h1>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <AccountCard 
                    title="Liquidity Checking" 
                    balance="$1,200,000.00"
                    details={[
                        { label: 'Account Holder', value: holderName },
                        { label: 'Account Number', value: '8821-4409-1120' },
                        { label: 'Routing/Swift', value: 'CSHLBUS66' },
                        { label: 'Type', value: 'Private High-Liquidity' },
                        { label: 'Access Status', value: 'RESTRICTED' },
                    ]}
                />
                <AccountCard 
                    title="Reserve Savings" 
                    balance="$3,000,000.00"
                    details={[
                        { label: 'Interest Rate', value: '6.50% P.A.' },
                        { label: 'Vault ID', value: 'V-GLD-9981' },
                        { label: 'Currency', value: 'USD (Gold Backed)' },
                        { label: 'Status', value: 'TEMPORARY LOCKED' },
                    ]}
                />
            </div>

            <div className="mt-8 bg-primary-gray p-6 rounded-lg shadow-xl border border-gray-800">
                 <h3 className="text-xl font-bold text-white mb-4">Secured Private Cards</h3>
                 <div className="flex flex-col md:flex-row gap-6">
                    <div className="w-full md:w-80 h-48 bg-gradient-to-br from-primary-purple to-black rounded-xl p-6 text-white shadow-2xl relative overflow-hidden border border-white/10">
                        <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-white opacity-5 rounded-full"></div>
                        <div className="flex justify-between items-start mb-8">
                            <span className="font-bold tracking-widest text-lg">CSHL<span className="opacity-60">FINANCE</span></span>
                            <span className="text-xs font-bold bg-white/20 px-2 py-0.5 rounded">PREMIUM</span>
                        </div>
                        <div className="mb-6">
                            <span className="font-mono text-xl tracking-[0.3em]">**** **** **** 8821</span>
                        </div>
                        <div className="flex justify-between items-end">
                            <div>
                                <span className="text-[10px] text-gray-400 block uppercase font-bold">Holder</span>
                                <span className="text-sm font-medium uppercase">{holderName}</span>
                            </div>
                            <div>
                                <span className="text-[10px] text-gray-400 block uppercase font-bold">Valid Thru</span>
                                <span className="text-sm font-medium">08/29</span>
                            </div>
                        </div>
                    </div>
                 </div>
            </div>
        </AnimatedSection>
    );
};

export default AccountDetailsPage;