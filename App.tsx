
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import Login from './components/Login';
import ForgotPassword from './components/ForgotPassword';
import ProfilePage from './pages/ProfilePage';
import ProtectedRoute from './components/ProtectedRoute';
import { ThemeProvider } from './contexts/ThemeContext';
import { UserProvider } from './contexts/UserContext';
import InvestmentPlansPage from './pages/InvestmentPlansPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import SignUpPage from './pages/SignUpPage';
import PageTransition from './components/PageTransition';
import ScrollToTop from './components/ScrollToTop';

// Dashboard Components
import DashboardLayout from './components/DashboardLayout';
import DashboardOverview from './pages/dashboard/DashboardOverview';
import TransactionsPage from './pages/dashboard/TransactionsPage';
import AccountDetailsPage from './pages/dashboard/AccountDetailsPage';
import NotificationsPage from './pages/dashboard/NotificationsPage';
import StatementsPage from './pages/dashboard/StatementsPage';

// Transfer Components
import SendMoneyPage from './pages/transfers/SendMoneyPage';
import PayBillsPage from './pages/transfers/PayBillsPage';
import TransferConfirmationPage from './pages/transfers/TransferConfirmationPage';
import ReceiptPage from './pages/transfers/ReceiptPage';

// Cards Components
import CardsOverviewPage from './pages/cards/CardsOverviewPage';
import VirtualCardPage from './pages/cards/VirtualCardPage';
import CardSettingsPage from './pages/cards/CardSettingsPage';

// Loans Components
import LoansOverviewPage from './pages/loans/LoansOverviewPage';
import ApplyLoanPage from './pages/loans/ApplyLoanPage';
import LoanDetailsPage from './pages/loans/LoanDetailsPage';

// Admin Components
import AdminLayout from './components/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import UserManagementPage from './pages/admin/UserManagementPage';
import TransactionMonitorPage from './pages/admin/TransactionMonitorPage';
import LoanApprovalsPage from './pages/admin/LoanApprovalsPage';

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <UserProvider>
        <div className="bg-light-bg dark:bg-black text-light-text dark:text-white font-sans">
          <ScrollToTop />
          <Header />
          <Routes>
            <Route 
              path="/" 
              element={
                <PageTransition>
                  <HomePage />
                </PageTransition>
              } 
            />
            <Route 
              path="/about" 
              element={
                <PageTransition>
                  <AboutPage />
                </PageTransition>
              } 
            />
            <Route 
              path="/contact" 
              element={
                <PageTransition>
                  <ContactPage />
                </PageTransition>
              } 
            />
            <Route 
              path="/login" 
              element={
                <PageTransition>
                  <Login />
                </PageTransition>
              } 
            />
            <Route 
              path="/signup" 
              element={
                <PageTransition>
                  <SignUpPage />
                </PageTransition>
              } 
            />
            <Route 
              path="/forgot-password" 
              element={
                <PageTransition>
                  <ForgotPassword />
                </PageTransition>
              } 
            />
            <Route 
              path="/investment-plans" 
              element={
                <PageTransition>
                  <InvestmentPlansPage />
                </PageTransition>
              } 
            />
            
            {/* Authenticated Dashboard Routes */}
            <Route 
              path="/dashboard" 
              element={
                <PageTransition>
                  <ProtectedRoute>
                    <DashboardLayout>
                      <DashboardOverview />
                    </DashboardLayout>
                  </ProtectedRoute>
                </PageTransition>
              } 
            />
            <Route 
              path="/dashboard/transactions" 
              element={
                <PageTransition>
                  <ProtectedRoute>
                    <DashboardLayout>
                      <TransactionsPage />
                    </DashboardLayout>
                  </ProtectedRoute>
                </PageTransition>
              } 
            />
            <Route 
              path="/dashboard/accounts" 
              element={
                <PageTransition>
                  <ProtectedRoute>
                    <DashboardLayout>
                      <AccountDetailsPage />
                    </DashboardLayout>
                  </ProtectedRoute>
                </PageTransition>
              } 
            />
            <Route 
              path="/dashboard/notifications" 
              element={
                <PageTransition>
                  <ProtectedRoute>
                    <DashboardLayout>
                      <NotificationsPage />
                    </DashboardLayout>
                  </ProtectedRoute>
                </PageTransition>
              } 
            />
            <Route 
              path="/dashboard/statements" 
              element={
                <PageTransition>
                  <ProtectedRoute>
                    <DashboardLayout>
                      <StatementsPage />
                    </DashboardLayout>
                  </ProtectedRoute>
                </PageTransition>
              } 
            />

             {/* Transfer & Payment Routes */}
            <Route 
              path="/transfers/send" 
              element={
                <PageTransition>
                  <ProtectedRoute>
                    <DashboardLayout>
                      <SendMoneyPage />
                    </DashboardLayout>
                  </ProtectedRoute>
                </PageTransition>
              } 
            />
            <Route 
              path="/transfers/pay-bills" 
              element={
                <PageTransition>
                  <ProtectedRoute>
                    <DashboardLayout>
                      <PayBillsPage />
                    </DashboardLayout>
                  </ProtectedRoute>
                </PageTransition>
              } 
            />
            <Route 
              path="/transfers/confirm" 
              element={
                <PageTransition>
                  <ProtectedRoute>
                    <DashboardLayout>
                      <TransferConfirmationPage />
                    </DashboardLayout>
                  </ProtectedRoute>
                </PageTransition>
              } 
            />
             <Route 
              path="/transfers/receipt" 
              element={
                <PageTransition>
                  <ProtectedRoute>
                    <DashboardLayout>
                      <ReceiptPage />
                    </DashboardLayout>
                  </ProtectedRoute>
                </PageTransition>
              } 
            />

            {/* Cards Routes */}
            <Route 
              path="/dashboard/cards" 
              element={
                <PageTransition>
                  <ProtectedRoute>
                    <DashboardLayout>
                      <CardsOverviewPage />
                    </DashboardLayout>
                  </ProtectedRoute>
                </PageTransition>
              } 
            />
            <Route 
              path="/dashboard/cards/virtual" 
              element={
                <PageTransition>
                  <ProtectedRoute>
                    <DashboardLayout>
                      <VirtualCardPage />
                    </DashboardLayout>
                  </ProtectedRoute>
                </PageTransition>
              } 
            />
            <Route 
              path="/dashboard/cards/:id/settings" 
              element={
                <PageTransition>
                  <ProtectedRoute>
                    <DashboardLayout>
                      <CardSettingsPage />
                    </DashboardLayout>
                  </ProtectedRoute>
                </PageTransition>
              } 
            />

            {/* Loans Routes */}
            <Route 
              path="/dashboard/loans" 
              element={
                <PageTransition>
                  <ProtectedRoute>
                    <DashboardLayout>
                      <LoansOverviewPage />
                    </DashboardLayout>
                  </ProtectedRoute>
                </PageTransition>
              } 
            />
            <Route 
              path="/dashboard/loans/apply" 
              element={
                <PageTransition>
                  <ProtectedRoute>
                    <DashboardLayout>
                      <ApplyLoanPage />
                    </DashboardLayout>
                  </ProtectedRoute>
                </PageTransition>
              } 
            />
            <Route 
              path="/dashboard/loans/:id" 
              element={
                <PageTransition>
                  <ProtectedRoute>
                    <DashboardLayout>
                      <LoanDetailsPage />
                    </DashboardLayout>
                  </ProtectedRoute>
                </PageTransition>
              } 
            />

            {/* Profile Route - Kept for Settings */}
            <Route 
              path="/profile" 
              element={
                <PageTransition>
                  <ProtectedRoute>
                    <DashboardLayout>
                        <ProfilePage />
                    </DashboardLayout>
                  </ProtectedRoute>
                </PageTransition>
              } 
            />

            {/* Admin Routes */}
            <Route 
              path="/admin" 
              element={
                <PageTransition>
                   <ProtectedRoute>
                    <AdminLayout>
                      <AdminDashboard />
                    </AdminLayout>
                   </ProtectedRoute>
                </PageTransition>
              } 
            />
            <Route 
              path="/admin/users" 
              element={
                <PageTransition>
                   <ProtectedRoute>
                    <AdminLayout>
                      <UserManagementPage />
                    </AdminLayout>
                   </ProtectedRoute>
                </PageTransition>
              } 
            />
            <Route 
              path="/admin/transactions" 
              element={
                <PageTransition>
                   <ProtectedRoute>
                    <AdminLayout>
                      <TransactionMonitorPage />
                    </AdminLayout>
                   </ProtectedRoute>
                </PageTransition>
              } 
            />
            <Route 
              path="/admin/loans" 
              element={
                <PageTransition>
                   <ProtectedRoute>
                    <AdminLayout>
                      <LoanApprovalsPage />
                    </AdminLayout>
                   </ProtectedRoute>
                </PageTransition>
              } 
            />

          </Routes>
          <Footer />
        </div>
      </UserProvider>
    </ThemeProvider>
  );
};

export default App;
