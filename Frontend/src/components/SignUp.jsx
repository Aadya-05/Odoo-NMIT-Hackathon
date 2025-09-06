import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

export default function Signup() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = () => {
    console.log('Account creation attempted:', formData);
    alert('Account creation functionality would be implemented here!');
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Navigation Bar */}
      <nav className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="text-xl font-semibold text-gray-800">
            Project Title
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <a
              href="#"
              className="text-gray-600 transition-colors duration-200 hover:text-gray-900"
            >
              Home
            </a>
            <a
              href="#"
              className="text-gray-600 transition-colors duration-200 hover:text-gray-900"
            >
              Solutions
            </a>
            <a
              href="#"
              className="text-gray-600 transition-colors duration-200 hover:text-gray-900"
            >
              Work
            </a>
            <a
              href="#"
              className="text-gray-600 transition-colors duration-200 hover:text-gray-900"
            >
              About
            </a>
            <a
              href="#"
              className="text-gray-600 transition-colors duration-200 hover:text-gray-900"
            >
              Login
            </a>
            <button className="rounded-lg bg-gray-900 px-5 py-2 text-white transition-colors duration-200 hover:bg-gray-800">
              Sign Up
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <div className="flex flex-grow items-center justify-center px-4 py-8">
        <div className="w-full max-w-md">
          {/* Signup Card */}
          <div className="rounded-xl border border-gray-200 bg-white p-8 shadow-lg">
            {/* Header */}
            <div className="mb-8 text-center">
              <h1 className="mb-2 text-2xl font-bold text-gray-900">
                Create an account
              </h1>
              <p className="text-gray-600">
                Already have an account?{' '}
                <a
                  href="#"
                  className="font-medium text-blue-600 transition-colors hover:text-blue-700"
                >
                  Log in instead
                </a>
              </p>
            </div>

            {/* Form Fields */}
            <div className="space-y-5">
              {/* First Name */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  First name
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-3 transition-all duration-200 focus:border-transparent focus:bg-white focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your first name"
                />
              </div>

              {/* Last Name */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Last name
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-3 transition-all duration-200 focus:border-transparent focus:bg-white focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your last name"
                />
              </div>

              {/* Email */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-3 transition-all duration-200 focus:border-transparent focus:bg-white focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your email address"
                />
              </div>

              {/* Password */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-3 pr-12 transition-all duration-200 focus:border-transparent focus:bg-white focus:ring-2 focus:ring-blue-500"
                    placeholder="Create a password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 transform text-gray-500 transition-colors hover:text-gray-700"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              {/* Terms Checkbox */}
              <div className="flex items-start pt-2 space-x-3">
                <input
                  type="checkbox"
                  id="terms"
                  checked={agreedToTerms}
                  onChange={(e) => setAgreedToTerms(e.target.checked)}
                  className="mt-1 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <label
                  htmlFor="terms"
                  className="text-sm leading-relaxed text-gray-600"
                >
                  By creating an account, I agree to our{' '}
                  <a
                    href="#"
                    className="font-medium text-blue-600 hover:text-blue-700"
                  >
                    Terms of use
                  </a>{' '}
                  and{' '}
                  <a
                    href="#"
                    className="font-medium text-blue-600 hover:text-blue-700"
                  >
                    Privacy Policy
                  </a>
                </label>
              </div>

              {/* Submit Button */}
              <button
                onClick={handleSubmit}
                disabled={!agreedToTerms}
                className="mt-6 w-full rounded-lg bg-gray-900 px-4 py-3 font-medium text-white transition-all duration-200 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Create an account
              </button>
            </div>
          </div>

          {/* Feature Cards */}
          <div className="mt-8 grid grid-cols-2 gap-4">
            <div className="rounded-lg border border-gray-200 bg-white p-4 text-center shadow-sm">
              <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100">
                <div className="h-5 w-5 rounded-full bg-purple-600"></div>
              </div>
              <h3 className="mb-1 text-sm font-semibold text-gray-900">
                Admired Raccoon
              </h3>
              <p className="text-xs text-gray-600">Premium features</p>
            </div>
            <div className="rounded-lg border border-gray-200 bg-white p-4 text-center shadow-sm">
              <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-green-100">
                <div className="h-5 w-5 rounded-full bg-green-600"></div>
              </div>
              <h3 className="mb-1 text-sm font-semibold text-gray-900">
                Unique Aardvark
              </h3>
              <p className="text-xs text-gray-600">Advanced analytics</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-8 border-t border-gray-200 bg-white">
        <div className="mx-auto max-w-6xl px-6 py-8">
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {/* Logo Section */}
            <div>
              {/* Removed mx-auto for better alignment with list items below it */}
              <div className="mb-3 flex h-10 w-16 items-center justify-center rounded-lg bg-gray-100">
                <span className="text-xs font-medium text-gray-400">LOGO</span>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="mb-3 text-sm font-semibold text-gray-900">
                Quick Links
              </h4>
              <div className="space-y-2">
                <a
                  href="#"
                  className="block text-sm text-gray-600 transition-colors hover:text-gray-900"
                >
                  Home
                </a>
                <a
                  href="#"
                  className="block text-sm text-gray-600 transition-colors hover:text-gray-900"
                >
                  About
                </a>
                <a
                  href="#"
                  className="block text-sm text-gray-600 transition-colors hover:text-gray-900"
                >
                  Services
                </a>
                <a
                  href="#"
                  className="block text-sm text-gray-600 transition-colors hover:text-gray-900"
                >
                  Contact
                </a>
              </div>
            </div>

            {/* Company */}
            <div>
              <h4 className="mb-3 text-sm font-semibold text-gray-900">
                Company
              </h4>
              <div className="space-y-2">
                <a
                  href="#"
                  className="block text-sm text-gray-600 transition-colors hover:text-gray-900"
                >
                  About Us
                </a>
                <a
                  href="#"
                  className="block text-sm text-gray-600 transition-colors hover:text-gray-900"
                >
                  Careers
                </a>
                <a
                  href="#"
                  className="block text-sm text-gray-600 transition-colors hover:text-gray-900"
                >
                  Press
                </a>
                <a
                  href="#"
                  className="block text-sm text-gray-600 transition-colors hover:text-gray-900"
                >
                  Blog
                </a>
              </div>
            </div>

            {/* Connect */}
            <div>
              <h4 className="mb-3 text-sm font-semibold text-gray-900">
                Connect with us
              </h4>
              <div className="space-y-2">
                <a
                  href="#"
                  className="block text-sm text-gray-600 transition-colors hover:text-gray-900"
                >
                  Twitter
                </a>
                <a
                  href="#"
                  className="block text-sm text-gray-600 transition-colors hover:text-gray-900"
                >
                  LinkedIn
                </a>
                <a
                  href="#"
                  className="block text-sm text-gray-600 transition-colors hover:text-gray-900"
                >
                  GitHub
                </a>
                <a
                  href="#"
                  className="block text-sm text-gray-600 transition-colors hover:text-gray-900"
                >
                  Discord
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}