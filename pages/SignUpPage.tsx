import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../components/Logo';
import SignUpForm from '../components/SignUpForm';

const SignUpPage: React.FC = () => {
  return (
    <section className="min-h-screen bg-light-bg dark:bg-primary-dark flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <Link to="/" className="inline-block" aria-label="AidFunds homepage">
          <Logo />
        </Link>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-light-text dark:text-white">
          Create your account
        </h2>
        <p className="mt-2 text-center text-sm text-light-text-secondary dark:text-gray-400">
          Or{' '}
          <Link to="/login" className="font-medium text-primary-red hover:text-red-500 transition-colors duration-200">
            sign in to your existing account
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-light-bg-secondary dark:bg-primary-gray py-8 px-4 shadow-2xl sm:rounded-lg sm:px-10">
          <SignUpForm />
        </div>
      </div>
    </section>
  );
};

export default SignUpPage;