
import React, { useState, useRef, useMemo } from 'react';
import { useUser } from '../contexts/UserContext';
import { useForm } from '../hooks/useForm';
import AnimatedSection from '../components/AnimatedSection';

// Mock data for trading history
interface Trade {
  id: string;
  date: string;
  type: 'Buy' | 'Sell';
  asset: string;
  quantity: number;
  price: number;
}

const mockTrades: Trade[] = [
    { id: '1', date: '2024-07-21', type: 'Buy', asset: 'AAPL', quantity: 10, price: 195.50 },
    { id: '2', date: '2024-07-18', type: 'Sell', asset: 'TSLA', quantity: 5, price: 250.75 },
    { id: '3', date: '2024-07-15', type: 'Buy', asset: 'NVDA', quantity: 2, price: 120.10 },
    { id: '4', date: '2024-07-10', type: 'Buy', asset: 'GOOGL', quantity: 3, price: 180.25 },
    { id: '5', date: '2024-07-05', type: 'Sell', asset: 'MSFT', quantity: 8, price: 450.00 },
    { id: '6', date: '2024-06-28', type: 'Buy', asset: 'AMZN', quantity: 1, price: 185.00 },
];

const TradingHistory: React.FC<{ onAction: (trade: Trade) => void }> = ({ onAction }) => {
    const [sortConfig, setSortConfig] = useState<{ key: keyof Trade; direction: 'asc' | 'desc' } | null>(null);
    const [filterType, setFilterType] = useState<'All' | 'Buy' | 'Sell'>('All');
    const [filterAsset, setFilterAsset] = useState('');

    const filteredTrades = useMemo(() => {
        return mockTrades.filter((trade) => {
            const matchesType = filterType === 'All' || trade.type === filterType;
            const matchesAsset = trade.asset.toLowerCase().includes(filterAsset.toLowerCase());
            return matchesType && matchesAsset;
        });
    }, [filterType, filterAsset]);

    const sortedTrades = useMemo(() => {
        let sortableTrades = [...filteredTrades];
        if (sortConfig !== null) {
            sortableTrades.sort((a, b) => {
                if (a[sortConfig.key] < b[sortConfig.key]) {
                    return sortConfig.direction === 'asc' ? -1 : 1;
                }
                if (a[sortConfig.key] > b[sortConfig.key]) {
                    return sortConfig.direction === 'asc' ? 1 : -1;
                }
                return 0;
            });
        }
        return sortableTrades;
    }, [filteredTrades, sortConfig]);

    const requestSort = (key: keyof Trade) => {
        let direction: 'asc' | 'desc' = 'asc';
        if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };

    const getSortIndicator = (key: keyof Trade) => {
        if (!sortConfig || sortConfig.key !== key) {
            return <span className="ml-1 text-gray-400 opacity-50">↕</span>;
        }
        return sortConfig.direction === 'asc' ? <span className="ml-1 text-primary-purple">↑</span> : <span className="ml-1 text-primary-purple">↓</span>;
    };

    return (
        <div className="mt-12">
            <h2 className="text-2xl font-bold text-light-text dark:text-white mb-6 text-center">
                Trading History
            </h2>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-4">
                <div className="w-full sm:w-auto">
                   <label htmlFor="filterType" className="sr-only">Filter by Type</label>
                   <select
                        id="filterType"
                        value={filterType}
                        onChange={(e) => setFilterType(e.target.value as 'All' | 'Buy' | 'Sell')}
                        className="w-full sm:w-48 bg-gray-100 dark:bg-primary-dark border border-gray-300 dark:border-gray-600 rounded-md p-2 text-light-text dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-purple transition duration-200"
                   >
                       <option value="All">All Types</option>
                       <option value="Buy">Buy</option>
                       <option value="Sell">Sell</option>
                   </select>
                </div>
                <div className="w-full sm:w-auto relative">
                    <label htmlFor="filterAsset" className="sr-only">Search Asset</label>
                    <input
                        type="text"
                        id="filterAsset"
                        value={filterAsset}
                        onChange={(e) => setFilterAsset(e.target.value)}
                        placeholder="Search Asset (e.g., AAPL)"
                        className="w-full sm:w-64 bg-gray-100 dark:bg-primary-dark border border-gray-300 dark:border-gray-600 rounded-md p-2 pl-8 text-light-text dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-purple transition duration-200"
                    />
                    <svg className="w-4 h-4 absolute left-2.5 top-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                </div>
            </div>

            <div className="overflow-x-auto rounded-lg shadow-inner">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 bg-light-bg dark:bg-primary-dark text-sm">
                    <thead className="bg-gray-100 dark:bg-black/50 text-left">
                        <tr>
                            <th 
                                scope="col" 
                                className="whitespace-nowrap px-4 py-3 font-medium text-light-text dark:text-gray-200 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors select-none"
                                onClick={() => requestSort('date')}
                            >
                                <div className="flex items-center">Date {getSortIndicator('date')}</div>
                            </th>
                            <th 
                                scope="col" 
                                className="whitespace-nowrap px-4 py-3 font-medium text-light-text dark:text-gray-200 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors select-none"
                                onClick={() => requestSort('type')}
                            >
                                <div className="flex items-center">Type {getSortIndicator('type')}</div>
                            </th>
                            <th 
                                scope="col" 
                                className="whitespace-nowrap px-4 py-3 font-medium text-light-text dark:text-gray-200 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors select-none"
                                onClick={() => requestSort('asset')}
                            >
                                <div className="flex items-center">Asset {getSortIndicator('asset')}</div>
                            </th>
                            <th 
                                scope="col" 
                                className="whitespace-nowrap px-4 py-3 font-medium text-light-text dark:text-gray-200 text-right cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors select-none"
                                onClick={() => requestSort('quantity')}
                            >
                                <div className="flex items-center justify-end">Quantity {getSortIndicator('quantity')}</div>
                            </th>
                            <th 
                                scope="col" 
                                className="whitespace-nowrap px-4 py-3 font-medium text-light-text dark:text-gray-200 text-right cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors select-none"
                                onClick={() => requestSort('price')}
                            >
                                <div className="flex items-center justify-end">Price {getSortIndicator('price')}</div>
                            </th>
                            <th scope="col" className="whitespace-nowrap px-4 py-3 font-medium text-light-text dark:text-gray-200 text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                        {sortedTrades.length > 0 ? (
                            sortedTrades.map((trade) => (
                                <tr key={trade.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors duration-200">
                                    <td className="whitespace-nowrap px-4 py-3 font-medium text-light-text-secondary dark:text-gray-400">{trade.date}</td>
                                    <td className={`whitespace-nowrap px-4 py-3 font-semibold ${trade.type === 'Buy' ? 'text-green-600 dark:text-green-500' : 'text-red-600 dark:text-red-500'}`}>{trade.type}</td>
                                    <td className="whitespace-nowrap px-4 py-3 text-light-text dark:text-gray-300">{trade.asset}</td>
                                    <td className="whitespace-nowrap px-4 py-3 text-light-text-secondary dark:text-gray-400 text-right">{trade.quantity}</td>
                                    <td className="whitespace-nowrap px-4 py-3 text-light-text-secondary dark:text-gray-400 text-right">${trade.price.toFixed(2)}</td>
                                    <td className="whitespace-nowrap px-4 py-3 text-center">
                                        <button
                                            onClick={() => onAction(trade)}
                                            className="px-3 py-1 rounded-md text-white font-semibold bg-primary-purple/80 hover:bg-primary-purple transition-colors duration-300 text-xs"
                                            aria-label={`Repeat trade for ${trade.asset}`}
                                        >
                                            Repeat
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                             <tr>
                                <td colSpan={6} className="px-4 py-8 text-center text-light-text-secondary dark:text-gray-400">
                                    No trades found matching your filters.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

const ConfirmationModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  trade: Trade | null;
}> = ({ isOpen, onClose, onConfirm, trade }) => {
  if (!isOpen || !trade) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50 animate-fade-in" role="dialog" aria-modal="true" aria-labelledby="modal-title">
      <div className="bg-light-bg-secondary dark:bg-primary-gray rounded-lg shadow-xl p-6 sm:p-8 w-full max-w-md mx-4 transform transition-all duration-300 ease-out" role="document">
        <h2 id="modal-title" className="text-2xl font-bold text-light-text dark:text-white mb-4">Confirm Trade Action</h2>
        <p className="text-light-text-secondary dark:text-gray-300 mb-6">
          Are you sure you want to repeat this trade? This will execute a new market order for the same quantity.
        </p>
        <div className="border-t border-b border-gray-200 dark:border-gray-700 my-4 py-4 space-y-2">
            <p className="text-light-text dark:text-white flex justify-between">
                <span className="font-semibold">Action:</span> 
                <span className={`font-bold ${trade.type === 'Buy' ? 'text-green-500' : 'text-red-500'}`}>{trade.type}</span>
            </p>
            <p className="text-light-text dark:text-white flex justify-between">
                <span className="font-semibold">Asset:</span> 
                <span>{trade.asset}</span>
            </p>
            <p className="text-light-text dark:text-white flex justify-between">
                <span className="font-semibold">Quantity:</span> 
                <span>{trade.quantity}</span>
            </p>
        </div>
        <div className="flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="px-6 py-2 rounded-md text-light-text dark:text-gray-300 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-300"
            aria-label="Cancel action"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-6 py-2 rounded-md text-white font-semibold bg-primary-purple hover:bg-primary-purple-dark transition-colors duration-300 transform hover:scale-105"
            aria-label={`Confirm repeating the trade`}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};


const ProfilePage: React.FC = () => {
  const { user, updateUser } = useUser();
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTrade, setSelectedTrade] = useState<Trade | null>(null);

  const {
    values,
    errors,
    touched,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    setIsSubmitting,
  } = useForm({
    initialValues: {
      name: user?.name || '',
      email: user?.email || '',
      dailyLimit: user?.dailyLimit || 1000,
      monthlyLimit: user?.monthlyLimit || 10000,
    },
    validate: (values) => {
      const errors: { name?: string; email?: string; dailyLimit?: string; monthlyLimit?: string } = {};
      
      // Name validation
      if (!values.name.trim()) {
        errors.name = 'Your name is required.';
      } else if (values.name.trim().length < 2) {
        errors.name = 'Name must be at least 2 characters.';
      }

      // Email validation
      if (!values.email.trim()) {
        errors.email = 'Email address is required.';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
        errors.email = 'Please enter a valid email address.';
      }

      // Deposit Limit validation
      if (values.dailyLimit <= 0) {
        errors.dailyLimit = 'Daily limit must be a positive number.';
      }
      if (values.monthlyLimit <= 0) {
        errors.monthlyLimit = 'Monthly limit must be a positive number.';
      }
      
      return errors;
    },
    onSubmit: (formValues) => {
      setTimeout(() => {
        updateUser({ 
          name: formValues.name, 
          email: formValues.email,
          dailyLimit: Number(formValues.dailyLimit),
          monthlyLimit: Number(formValues.monthlyLimit)
        });
        setIsSubmitting(false);
        setUpdateSuccess(true);
        setTimeout(() => setUpdateSuccess(false), 3000); // Hide message after 3 seconds
      }, 1000);
    },
  });

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        updateUser({ avatar: base64String });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleActionClick = (trade: Trade) => {
    setSelectedTrade(trade);
    setIsModalOpen(true);
  };

  const handleConfirmAction = () => {
    if (selectedTrade) {
      // In a real application, you would dispatch an API call here.
      console.log(`Action confirmed for trade: ${selectedTrade.type} ${selectedTrade.quantity} of ${selectedTrade.asset}`);
    }
    setIsModalOpen(false);
    setSelectedTrade(null);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedTrade(null);
  };

  if (!user) {
    return null; // Or a loading spinner, though ProtectedRoute should prevent this
  }

  return (
    <main className="min-h-screen bg-light-bg dark:bg-primary-dark py-12 md:py-20">
      <div className="container mx-auto px-4 sm:px-6">
        <AnimatedSection>
          <div className="max-w-4xl mx-auto bg-light-bg-secondary dark:bg-primary-gray p-8 rounded-lg shadow-2xl">
            <h1 className="text-3xl md:text-4xl font-bold text-center mb-8 text-light-text dark:text-white">
              Your Profile
            </h1>
            <div className="text-center mb-6">
              <div className="flex flex-col items-center space-y-4">
                  <div className="relative group">
                      {user.avatar ? (
                          <img src={user.avatar} alt="Profile" className="w-24 h-24 rounded-full object-cover shadow-md" />
                      ) : (
                          <div className="w-24 h-24 rounded-full bg-gray-200 dark:bg-primary-dark flex items-center justify-center shadow-md">
                              <svg className="w-16 h-16 text-gray-400 dark:text-gray-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path></svg>
                          </div>
                      )}
                      <button 
                        onClick={handleUploadClick}
                        className="absolute inset-0 w-24 h-24 rounded-full bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        aria-label="Change profile picture"
                      >
                         <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                         </svg>
                      </button>
                  </div>
                  <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileChange}
                      className="hidden"
                      accept="image/*"
                      aria-label="Upload profile picture"
                  />
                  <p className="text-sm text-light-text-secondary dark:text-gray-400">Click image to change</p>
              </div>
            </div>
            <form onSubmit={handleSubmit} noValidate className="space-y-6 max-w-md mx-auto">
              
              {/* Name Field */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-light-text-secondary dark:text-gray-400">
                  Full Name
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`w-full bg-gray-100 dark:bg-primary-dark border ${
                      errors.name && touched.name ? 'border-primary-purple' : 'border-gray-300 dark:border-gray-600'
                    } rounded-md p-3 text-light-text dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 ${
                      errors.name && touched.name ? 'focus:ring-purple-500' : 'focus:ring-primary-purple'
                    } transition duration-300`}
                    aria-invalid={!!(errors.name && touched.name)}
                    aria-describedby="name-error"
                  />
                  {errors.name && touched.name && (
                    <p id="name-error" className="mt-2 text-sm text-red-400" role="alert">
                      {errors.name}
                    </p>
                  )}
                </div>
              </div>

              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-light-text-secondary dark:text-gray-400">
                  Email Address
                </label>
                <div className="mt-1">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`w-full bg-gray-100 dark:bg-primary-dark border ${
                      errors.email && touched.email ? 'border-primary-purple' : 'border-gray-300 dark:border-gray-600'
                    } rounded-md p-3 text-light-text dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 ${
                      errors.email && touched.email ? 'focus:ring-purple-500' : 'focus:ring-primary-purple'
                    } transition duration-300`}
                    aria-invalid={!!(errors.email && touched.email)}
                    aria-describedby="email-error"
                  />
                  {errors.email && touched.email && (
                    <p id="email-error" className="mt-2 text-sm text-red-400" role="alert">
                      {errors.email}
                    </p>
                  )}
                </div>
              </div>

              {/* Deposit Limits */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="dailyLimit" className="block text-sm font-medium text-light-text-secondary dark:text-gray-400">
                    Daily Deposit Limit ($)
                  </label>
                  <div className="mt-1">
                    <input
                      type="number"
                      id="dailyLimit"
                      name="dailyLimit"
                      value={values.dailyLimit}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`w-full bg-gray-100 dark:bg-primary-dark border ${
                        errors.dailyLimit && touched.dailyLimit ? 'border-primary-purple' : 'border-gray-300 dark:border-gray-600'
                      } rounded-md p-3 text-light-text dark:text-white focus:outline-none focus:ring-2 ${
                        errors.dailyLimit && touched.dailyLimit ? 'focus:ring-purple-500' : 'focus:ring-primary-purple'
                      } transition duration-300`}
                    />
                    {errors.dailyLimit && touched.dailyLimit && (
                      <p className="mt-2 text-sm text-red-400" role="alert">
                        {errors.dailyLimit}
                      </p>
                    )}
                  </div>
                </div>
                <div>
                  <label htmlFor="monthlyLimit" className="block text-sm font-medium text-light-text-secondary dark:text-gray-400">
                    Monthly Deposit Limit ($)
                  </label>
                  <div className="mt-1">
                    <input
                      type="number"
                      id="monthlyLimit"
                      name="monthlyLimit"
                      value={values.monthlyLimit}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`w-full bg-gray-100 dark:bg-primary-dark border ${
                        errors.monthlyLimit && touched.monthlyLimit ? 'border-primary-purple' : 'border-gray-300 dark:border-gray-600'
                      } rounded-md p-3 text-light-text dark:text-white focus:outline-none focus:ring-2 ${
                        errors.monthlyLimit && touched.monthlyLimit ? 'focus:ring-purple-500' : 'focus:ring-primary-purple'
                      } transition duration-300`}
                    />
                    {errors.monthlyLimit && touched.monthlyLimit && (
                      <p className="mt-2 text-sm text-red-400" role="alert">
                        {errors.monthlyLimit}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-bold text-white bg-primary-purple hover:bg-primary-purple-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-light-bg-secondary dark:focus:ring-offset-primary-gray focus:ring-purple-500 disabled:bg-gray-500 disabled:cursor-not-allowed transition duration-300 transform hover:scale-105"
                >
                  {isSubmitting ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
              {updateSuccess && (
                <div className="mt-4 text-center p-3 bg-green-100 dark:bg-green-900/50 rounded-lg text-green-800 dark:text-white">
                  Profile updated successfully!
                </div>
              )}
            </form>
            <TradingHistory onAction={handleActionClick} />
          </div>
        </AnimatedSection>
      </div>
      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onConfirm={handleConfirmAction}
        trade={selectedTrade}
      />
    </main>
  );
};

export default ProfilePage;
