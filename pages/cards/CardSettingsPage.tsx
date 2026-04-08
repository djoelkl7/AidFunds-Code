
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AnimatedSection from '../../components/AnimatedSection';

const CardSettingsPage: React.FC = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    
    // Mock State
    const [isFrozen, setIsFrozen] = useState(id === '2'); // Default frozen for card 2 based on mock
    const [limit, setLimit] = useState(1500);
    const [settings, setSettings] = useState({
        online: true,
        international: false,
        contactless: true,
        atm: true
    });

    const toggleSetting = (key: keyof typeof settings) => {
        setSettings({ ...settings, [key]: !settings[key] });
    };

    return (
        <AnimatedSection>
            <div className="max-w-3xl mx-auto space-y-6">
                <div className="flex items-center space-x-4 mb-6">
                    <button onClick={() => navigate(-1)} className="text-light-text-secondary dark:text-gray-400 hover:text-primary-purple">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                    </button>
                    <h1 className="text-2xl font-bold text-light-text dark:text-white">Card Settings</h1>
                </div>

                {/* Freeze Card Section */}
                <div className={`p-6 rounded-lg shadow-md transition-colors ${isFrozen ? 'bg-blue-100 dark:bg-blue-900/20' : 'bg-white dark:bg-primary-gray'}`}>
                    <div className="flex justify-between items-center">
                        <div>
                            <h3 className="text-lg font-bold text-light-text dark:text-white">Freeze Card</h3>
                            <p className="text-sm text-light-text-secondary dark:text-gray-400">Temporarily disable all transactions on this card.</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" className="sr-only peer" checked={isFrozen} onChange={() => setIsFrozen(!isFrozen)} />
                            <div className="w-14 h-7 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                        </label>
                    </div>
                </div>

                {/* Spending Limits */}
                <div className="bg-white dark:bg-primary-gray p-6 rounded-lg shadow-md">
                    <h3 className="text-lg font-bold text-light-text dark:text-white mb-4">Spending Limits</h3>
                    <div className="mb-6">
                        <div className="flex justify-between text-sm mb-2">
                            <span className="text-light-text-secondary dark:text-gray-400">Monthly Limit</span>
                            <span className="font-bold text-light-text dark:text-white">${limit.toLocaleString()}</span>
                        </div>
                        <input 
                            type="range" 
                            min="500" 
                            max="10000" 
                            step="100" 
                            value={limit} 
                            onChange={(e) => setLimit(parseInt(e.target.value))}
                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 accent-primary-purple"
                        />
                        <div className="flex justify-between text-xs text-gray-500 mt-1">
                            <span>$500</span>
                            <span>$10,000</span>
                        </div>
                    </div>
                    <div className="bg-gray-50 dark:bg-black/20 p-4 rounded-lg flex items-start">
                         <svg className="w-5 h-5 text-yellow-500 mr-3 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                         <p className="text-sm text-light-text-secondary dark:text-gray-400">Transactions exceeding this limit will be declined automatically. You can update this at any time.</p>
                    </div>
                </div>

                {/* Usage Settings */}
                <div className="bg-white dark:bg-primary-gray p-6 rounded-lg shadow-md">
                     <h3 className="text-lg font-bold text-light-text dark:text-white mb-4">Usage Controls</h3>
                     <div className="space-y-4">
                         {Object.entries(settings).map(([key, value]) => (
                             <div key={key} className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-700 last:border-0">
                                 <span className="capitalize text-light-text dark:text-white">{key.replace(/([A-Z])/g, ' $1').trim()} Transactions</span>
                                 <label className="relative inline-flex items-center cursor-pointer">
                                    <input type="checkbox" className="sr-only peer" checked={value} onChange={() => toggleSetting(key as keyof typeof settings)} />
                                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary-purple"></div>
                                </label>
                             </div>
                         ))}
                     </div>
                </div>
            </div>
        </AnimatedSection>
    );
};

export default CardSettingsPage;
