import React, { useState } from 'react';
import { useForm } from '../hooks/useForm';
import Logo from './Logo';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';
import { trackEvent } from '../lib/analytics';

const EyeIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
    </svg>
);

const EyeOffIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.542-7 .946-3.11 3.593-5.545 6.817-6.32M15.555 5.555a14.22 14.22 0 012.903 1.13M12 5c.48 0 .95.034 1.41.098M9.703 9.703a3 3 0 014.594-4.594M21 21l-4-4M3 3l4 4" />
    </svg>
);

const Login: React.FC = () => {
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { login } = useUser();
  const location = useLocation();
  const planName = location.state?.planName;

  const initialValues = {
    email: '',
    password: '',
  };

  const validate = (values: typeof initialValues) => {
    const errors: Partial<typeof initialValues> = {};

    if (!values.email.trim()) {
      errors.email = 'Email address is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
      errors.email = 'Please enter a valid email address.';
    }

    if (!values.password) {
      errors.password = 'Password is required.';
    }
    return errors;
  };

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
    initialValues,
    validate,
    onSubmit: (formValues) => {
      setLoginError('');
      trackEvent('login_attempt', 'auth', 'email_password');
      // Simulate API call for login
      setTimeout(() => {
        // Mock validation: only allow sarah@cashlio.finance with any password for demo
        // or any email with 'password123'
        if (formValues.email === 'sarah@cashlio.finance' || formValues.password === 'password123') {
          trackEvent('login_success', 'auth', 'email_password');
          login({ email: formValues.email, name: 'Sarah Johnson' });
          setIsSubmitting(false);
          setSubmitSuccess(true);
          // Redirect after a short delay to show success message
          setTimeout(() => {
            navigate('/');
          }, 1500);
        } else {
          trackEvent('login_failure', 'auth', 'email_password');
          setIsSubmitting(false);
          setLoginError('Invalid email or password. Please check your credentials or sign up if you don\'t have an account.');
        }
      }, 1500);
    },
  });

  const handleGoogleLogin = () => {
    trackEvent('login_attempt', 'auth', 'google');
    // In a real app, this would trigger the OAuth flow
    console.log('Attempting Google login...');
    alert('OAuth flow for Google would start here. This is a demo implementation.');
  };

  const handleFacebookLogin = () => {
    trackEvent('login_attempt', 'auth', 'facebook');
    // In a real app, this would trigger the OAuth flow
    console.log('Attempting Facebook login...');
    alert('OAuth flow for Facebook would start here. This is a demo implementation.');
  };


  return (
    <section className="min-h-screen bg-light-bg dark:bg-primary-dark flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
         <Link to="/" className="inline-block" aria-label="Cashlio Finance homepage">
          <Logo />
        </Link>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-light-text dark:text-white">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-light-bg-secondary dark:bg-primary-gray py-8 px-4 shadow-2xl sm:rounded-lg sm:px-10">
          {planName && !submitSuccess && (
            <div className="mb-4 p-3 bg-blue-100 dark:bg-blue-900/50 rounded-md text-center animate-fade-in">
              <p className="text-sm text-blue-800 dark:text-blue-200">
                To select the <span className="font-bold">"{planName}"</span> plan, please sign in first.
              </p>
            </div>
          )}
          {submitSuccess ? (
             <div className="text-center p-4 sm:p-6 bg-green-100 dark:bg-green-900/50 rounded-lg">
              <h3 className="text-2xl font-bold text-green-800 dark:text-white">Login Successful!</h3>
              <p className="text-green-700 dark:text-gray-200 mt-2">Welcome back! Redirecting you now...</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="space-y-6">
              {loginError && (
                <div className="bg-red-100 dark:bg-red-900/30 border border-red-400 dark:border-red-800 text-red-700 dark:text-red-400 px-4 py-3 rounded relative text-sm" role="alert">
                  <span className="block sm:inline">{loginError}</span>
                </div>
              )}
              <div>
                <label htmlFor="email" className="block text-sm font-medium sr-only">Email Address</label>
                  <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Email Address"
                  className={`w-full bg-gray-100 dark:bg-primary-dark border ${errors.email && touched.email ? 'border-primary-purple' : 'border-gray-300 dark:border-primary-gray'} rounded-md p-3 text-light-text dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 ${errors.email && touched.email ? 'focus:ring-primary-purple-dark' : 'focus:ring-primary-purple'} transition duration-300`}
                  aria-invalid={!!(errors.email && touched.email)}
                  aria-describedby="email-error"
                  required
                />
                {errors.email && touched.email && <p id="email-error" className="mt-2 text-sm text-red-600 dark:text-red-400" role="alert">{errors.email}</p>}
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium sr-only">Password</label>
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="current-password"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Password"
                    className={`w-full bg-gray-100 dark:bg-primary-dark border ${errors.password && touched.password ? 'border-primary-purple' : 'border-gray-300 dark:border-primary-gray'} rounded-md p-3 pr-10 text-light-text dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 ${errors.password && touched.password ? 'focus:ring-primary-purple-dark' : 'focus:ring-primary-purple'} transition duration-300`}
                    aria-invalid={!!(errors.password && touched.password)}
                    aria-describedby="password-error"
                    required
                  />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 pr-3 flex items-center" aria-label="Toggle password visibility">
                    {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                  </button>
                </div>
                {errors.password && touched.password && <p id="password-error" className="mt-2 text-sm text-red-600 dark:text-red-400" role="alert">{errors.password}</p>}
              </div>

              <div className="flex items-center justify-end">
                <div className="text-sm">
                  <Link to="/forgot-password" className="font-medium text-primary-purple hover:text-primary-purple-dark dark:hover:text-primary-purple transition-colors duration-200">
                    Forgot your password?
                  </Link>
                </div>
              </div>

              <div>
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-bold text-white bg-primary-purple hover:bg-primary-purple-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-light-bg-secondary dark:focus:ring-offset-primary-gray focus:ring-primary-purple-dark disabled:bg-gray-500 disabled:cursor-not-allowed transition duration-300 transform hover:scale-105"
                >
                    {isSubmitting ? (
                        <>
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Signing In...
                        </>
                    ) : (
                        'Sign In'
                    )}
                </button>
              </div>
            </form>
          )}

          {!submitSuccess && (
            <>
              <div className="mt-6">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center" aria-hidden="true">
                    <div className="w-full border-t border-gray-300 dark:border-gray-600" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-light-bg-secondary dark:bg-primary-gray text-light-text-secondary dark:text-gray-400">
                      Or continue with
                    </span>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-1 gap-3">
                  <div>
                    <button
                      type="button"
                      onClick={handleGoogleLogin}
                      className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-primary-dark text-sm font-medium text-light-text-secondary dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-light-bg-secondary dark:focus:ring-offset-primary-gray focus:ring-primary-purple transition-colors duration-200"
                      aria-label="Sign in with Google"
                    >
                      <svg className="w-5 h-5 mr-3" aria-hidden="true" focusable="false" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512"><path fill="currentColor" d="M488 261.8C488 403.3 381.5 512 244 512 111.8 512 0 399.5 0 261.8S111.8 11.6 244 11.6c67.8 0 120.3 28.1 159.9 65.8L354.4 134c-31-29.4-71.4-49.4-110.4-49.4-96.6 0-174.9 83.3-174.9 176.9s78.3 176.9 174.9 176.9c100.3 0 144.3-72.1 148.8-109.1H244v-66.2h238.4c4.8 26.1 7.6 54.4 7.6 84.1z"></path></svg>
                      Sign in with Google
                    </button>
                  </div>

                  <div>
                    <button
                      type="button"
                      onClick={handleFacebookLogin}
                      className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-primary-dark text-sm font-medium text-light-text-secondary dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-light-bg-secondary dark:focus:ring-offset-primary-gray focus:ring-primary-purple transition-colors duration-200"
                      aria-label="Sign in with Facebook"
                    >
                      <svg className="w-5 h-5 mr-3" aria-hidden="true" focusable="false" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path fill="currentColor" d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z"></path></svg>
                      Sign in with Facebook
                    </button>
                  </div>
                </div>
              </div>
              <div className="mt-6 text-center">
                <p className="text-sm text-light-text-secondary dark:text-gray-400">
                    Don't have an account?{' '}
                    <Link to="/signup" className="font-medium text-primary-purple hover:text-primary-purple-dark dark:hover:text-primary-purple transition-colors duration-200">
                        Sign up
                    </Link>
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default Login;