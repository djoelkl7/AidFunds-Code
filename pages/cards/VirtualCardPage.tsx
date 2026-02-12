import React, { useState } from 'react';
import AnimatedSection from '../../components/AnimatedSection';
import { useUser } from '../../contexts/UserContext';

const VirtualCardPage: React.FC = () => {
    const [showNumbers, setShowNumbers] = useState(false);
    const { user } = useUser();
    const holderName = user?.name || 'Dolmat Bin Samsudin';

    return (
        <AnimatedSection>
            <div className="max-w-4xl mx-auto space-y-8">
                <h1 className="text-2xl font-bold text-light-text dark:text-white">Virtual Cards</h1>
                <p className="text-light-text-secondary dark:text-gray-400">Securely shop online with disposable or persistent virtual cards. Keep your real card details private.</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                    {/* The Virtual Card Visual */}
                    <div className="relative group perspective">
                         <div className="relative rounded-xl shadow-2xl overflow-hidden p-6 text-white h-56 flex flex-col justify-between bg-gradient-to-r from-blue-600 to-indigo-700 transform transition-transform duration-500 hover:rotate-1">
                            <div className="flex justify-between items-start">
                                <span className="font-bold text-lg tracking-wider">AidFunds Virtual</span>
                                <span className="uppercase text-xs font-bold border border-white/30 px-2 py-1 rounded">Single Use</span>
                            </div>
                            <div className="my-4">
                                <p className="font-mono text-2xl tracking-widest drop-shadow-md">
                                    {showNumbers ? '4582 1234 5678 9012' : '**** **** **** 9012'}
                                </p>
                                <div className="flex space-x-6 mt-2">
                                    <div>
                                        <span className="text-xs opacity-75 block">CVV</span>
                                        <span className="font-mono">{showNumbers ? '456' : '***'}</span>
                                    </div>
                                    <div>
                                        <span className="text-xs opacity-75 block">EXP</span>
                                        <span className="font-mono">12/25</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-between items-end">
                                <p className="font-medium tracking-wide uppercase">{holderName}</p>
                                <svg className="w-10 h-10 opacity-80" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>
                            </div>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="bg-white dark:bg-primary-gray p-6 rounded-lg shadow-md space-y-6">
                        <div>
                            <h3 className="text-lg font-bold text-light-text dark:text-white mb-2">Card Actions</h3>
                            <button 
                                onClick={() => setShowNumbers(!showNumbers)}
                                className="w-full flex justify-between items-center p-3 bg-gray-50 dark:bg-black/20 rounded-md hover:bg-gray-100 dark:hover:bg-black/30 transition-colors mb-2"
                            >
                                <span className="text-light-text dark:text-white font-medium">{showNumbers ? 'Hide Details' : 'Show Details'}</span>
                                <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                            </button>
                             <button className="w-full flex justify-between items-center p-3 bg-gray-50 dark:bg-black/20 rounded-md hover:bg-gray-100 dark:hover:bg-black/30 transition-colors mb-2">
                                <span className="text-red-500 font-medium">Destroy Card</span>
                                <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                            </button>
                        </div>

                        <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                             <h3 className="text-lg font-bold text-light-text dark:text-white mb-2">Create New</h3>
                             <p className="text-sm text-light-text-secondary dark:text-gray-400 mb-4">Generate a new card for a specific merchant or one-time use.</p>
                             <button className="w-full bg-primary-red text-white font-bold py-3 rounded-lg hover:bg-red-700 transition-colors">
                                 Generate New Card
                             </button>
                        </div>
                    </div>
                </div>
            </div>
        </AnimatedSection>
    );
};

export default VirtualCardPage;