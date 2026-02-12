
import React from 'react';
import { Link } from 'react-router-dom';
import AnimatedSection from '../../components/AnimatedSection';

const CardItem: React.FC<{ type: string; number: string; expiry: string; holder: string; color: string; isFrozen?: boolean; id: string }> = ({ type, number, expiry, holder, color, isFrozen, id }) => (
    <div className={`relative rounded-xl shadow-2xl overflow-hidden p-6 text-white h-56 flex flex-col justify-between transform transition-all hover:scale-105 duration-300 ${color} ${isFrozen ? 'opacity-75 grayscale' : ''}`}>
        {isFrozen && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-10">
                <span className="bg-white text-black px-4 py-2 rounded-full font-bold uppercase text-sm tracking-wider">Frozen</span>
            </div>
        )}
        <div className="flex justify-between items-start">
            <span className="font-bold text-lg tracking-wider">AidFunds</span>
            <span className="italic font-serif opacity-80">{type}</span>
        </div>
        <div className="my-4">
            <div className="flex space-x-2 mb-2">
                <div className="w-10 h-7 bg-yellow-400 rounded-md opacity-80"></div>
                <svg className="w-8 h-8 opacity-80" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>
            </div>
            <p className="font-mono text-2xl tracking-widest drop-shadow-md">{number}</p>
        </div>
        <div className="flex justify-between items-end">
            <div>
                <p className="text-xs opacity-75 uppercase">Card Holder</p>
                <p className="font-medium tracking-wide">{holder}</p>
            </div>
            <div>
                 <p className="text-xs opacity-75 uppercase">Expires</p>
                 <p className="font-medium tracking-wide">{expiry}</p>
            </div>
        </div>
        <Link to={`/dashboard/cards/${id}/settings`} className="absolute inset-0 z-20 focus:outline-none" aria-label={`Manage ${type} card`}></Link>
    </div>
);

const CardsOverviewPage: React.FC = () => {
    const cards = [
        { id: '1', type: 'Platinum Debit', number: '**** **** **** 4582', expiry: '12/26', holder: 'JOHN DOE', color: 'bg-gradient-to-br from-gray-800 to-black', isFrozen: false },
        { id: '2', type: 'Rewards Credit', number: '**** **** **** 9921', expiry: '09/25', holder: 'JOHN DOE', color: 'bg-gradient-to-br from-primary-red to-red-900', isFrozen: true },
    ];

    return (
        <AnimatedSection>
            <div className="space-y-8">
                <div className="flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-light-text dark:text-white">Your Cards</h1>
                    <div className="space-x-3">
                         <Link to="/dashboard/cards/virtual" className="inline-block bg-white dark:bg-gray-800 text-primary-red font-semibold py-2 px-4 rounded-lg border border-primary-red hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                            Virtual Cards
                        </Link>
                        <button className="bg-primary-red text-white font-semibold py-2 px-4 rounded-lg hover:bg-red-700 transition-colors">
                            + Add New Card
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
                    {cards.map(card => (
                        <CardItem key={card.id} {...card} />
                    ))}
                    
                    {/* Add Card Placeholder */}
                     <button className="rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-700 h-56 flex flex-col items-center justify-center text-gray-400 hover:text-primary-red hover:border-primary-red transition-all group">
                        <svg className="w-12 h-12 mb-2 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                        <span className="font-medium">Order Physical Card</span>
                    </button>
                </div>

                <div className="bg-white dark:bg-primary-gray p-6 rounded-lg shadow-md">
                    <h3 className="text-xl font-bold text-light-text dark:text-white mb-4">Recent Card Activity</h3>
                    <div className="space-y-4">
                        {[
                            { desc: 'Netflix Subscription', amount: -15.99, card: '**** 4582', date: 'Today' },
                            { desc: 'Apple Store', amount: -999.00, card: '**** 9921', date: 'Yesterday' },
                            { desc: 'Uber', amount: -24.50, card: '**** 4582', date: 'Jul 20' },
                        ].map((tx, i) => (
                            <div key={i} className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-700 last:border-0">
                                <div className="flex items-center">
                                    <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center mr-3 text-light-text dark:text-white">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>
                                    </div>
                                    <div>
                                        <p className="font-medium text-light-text dark:text-white">{tx.desc}</p>
                                        <p className="text-xs text-light-text-secondary dark:text-gray-400">{tx.card} • {tx.date}</p>
                                    </div>
                                </div>
                                <span className="font-bold text-light-text dark:text-white">${Math.abs(tx.amount).toFixed(2)}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </AnimatedSection>
    );
};

export default CardsOverviewPage;
