
import React from 'react';
import AnimatedSection from '../../components/AnimatedSection';

const NotificationsPage: React.FC = () => {
    const notifications = [
        { id: 1, title: 'Security Alert', message: 'New login detected from Chrome on Windows.', date: 'Today, 9:00 AM', type: 'alert' },
        { id: 2, title: 'Payment Received', message: 'You received $3,200.00 from Employer Inc.', date: 'Yesterday, 5:00 PM', type: 'success' },
        { id: 3, title: 'Bill Paid', message: 'Payment of $120.00 to Electric Co. was successful.', date: 'Jul 18, 2:00 PM', type: 'info' },
        { id: 4, title: 'Statement Available', message: 'Your June 2024 statement is now available for download.', date: 'Jul 01, 8:00 AM', type: 'info' },
    ];

    return (
        <AnimatedSection>
            <div className="max-w-4xl mx-auto">
                <h1 className="text-2xl font-bold text-light-text dark:text-white mb-6">Notifications</h1>
                <div className="bg-white dark:bg-primary-gray rounded-lg shadow-md overflow-hidden">
                    {notifications.map((note) => (
                        <div key={note.id} className="p-4 border-b border-gray-100 dark:border-gray-700 last:border-0 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors flex items-start">
                            <div className={`mt-1 w-2 h-2 rounded-full flex-shrink-0 mr-4 ${
                                note.type === 'alert' ? 'bg-red-500' : note.type === 'success' ? 'bg-green-500' : 'bg-blue-500'
                            }`}></div>
                            <div className="flex-grow">
                                <div className="flex justify-between items-baseline mb-1">
                                    <h3 className="font-bold text-light-text dark:text-white">{note.title}</h3>
                                    <span className="text-xs text-light-text-secondary dark:text-gray-500">{note.date}</span>
                                </div>
                                <p className="text-light-text-secondary dark:text-gray-400 text-sm">{note.message}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </AnimatedSection>
    );
};

export default NotificationsPage;
