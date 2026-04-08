
import React, { useState } from 'react';
import AnimatedSection from '../../components/AnimatedSection';
import { trackEvent } from '../../lib/analytics';

const StatementsPage: React.FC = () => {
    const [downloading, setDownloading] = useState<string | null>(null);

    const statements = [
        { month: 'June 2024', date: 'Jul 01, 2024', size: '1.2 MB' },
        { month: 'May 2024', date: 'Jun 01, 2024', size: '1.1 MB' },
        { month: 'April 2024', date: 'May 01, 2024', size: '1.3 MB' },
        { month: 'March 2024', date: 'Apr 01, 2024', size: '1.1 MB' },
    ];

    const handleDownload = (month: string) => {
        setDownloading(month);
        trackEvent('download_statement', 'engagement', month);
        
        // Simulate a small delay for the "download" process
        setTimeout(() => {
            // Create a simple text-based blob to simulate a PDF
            // In a real app, this would be a fetch to an API endpoint that returns a PDF blob
            const content = `Statement for ${month}\n\nThis is a simulated account statement for AidFunds Online.\n\nPeriod: ${month}\nStatus: Processed\n\nThank you for choosing AidFunds Online.`;
            const blob = new Blob([content], { type: 'application/pdf' });
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `AidFunds_Statement_${month.replace(' ', '_')}.pdf`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
            setDownloading(null);
        }, 1000);
    };

    return (
        <AnimatedSection>
            <div className="max-w-4xl mx-auto">
                <h1 className="text-2xl font-bold text-light-text dark:text-white mb-6">Account Statements</h1>
                <div className="bg-white dark:bg-primary-gray rounded-lg shadow-md overflow-hidden">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50 dark:bg-black/20 border-b border-gray-200 dark:border-gray-700">
                            <tr>
                                <th className="p-4 font-medium text-light-text-secondary dark:text-gray-400">Period</th>
                                <th className="p-4 font-medium text-light-text-secondary dark:text-gray-400">Date Issued</th>
                                <th className="p-4 font-medium text-light-text-secondary dark:text-gray-400">Size</th>
                                <th className="p-4 font-medium text-light-text-secondary dark:text-gray-400 text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {statements.map((stmt, idx) => (
                                <tr key={idx} className="border-b border-gray-100 dark:border-gray-800 last:border-0 hover:bg-gray-50 dark:hover:bg-gray-800/50">
                                    <td className="p-4 font-semibold text-light-text dark:text-white">{stmt.month}</td>
                                    <td className="p-4 text-light-text-secondary dark:text-gray-400">{stmt.date}</td>
                                    <td className="p-4 text-light-text-secondary dark:text-gray-400">{stmt.size}</td>
                                    <td className="p-4 text-right">
                                        <button 
                                            onClick={() => handleDownload(stmt.month)}
                                            disabled={downloading === stmt.month}
                                            className="text-primary-red hover:text-red-700 font-medium text-sm flex items-center justify-end w-full disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            {downloading === stmt.month ? (
                                                <>
                                                    <svg className="animate-spin h-4 w-4 mr-1 text-primary-red" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                    </svg>
                                                    Preparing...
                                                </>
                                            ) : (
                                                <>
                                                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                                                    Download
                                                </>
                                            )}
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

export default StatementsPage;
