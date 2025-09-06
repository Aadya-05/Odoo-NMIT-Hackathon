import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleLogin = () => {
    console.log('Login attempted:', formData);
    alert('Login functionality would be implemented here!');
  };

  return (
    <div className="min-h-screen bg-gray-50 w-full">
      {/* Navigation Bar */}
      <nav className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="text-lg font-medium text-gray-900">
            Project Title
          </div>
          <div className="flex items-center space-x-8">
            <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors text-sm">Home</a>
            <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors text-sm">Solutions</a>
            <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors text-sm">Work</a>
            <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors text-sm">About</a>
            <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors text-sm">Login</a>
            <button className="bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors">
              Sign Up
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex items-center justify-center min-h-[calc(100vh-80px)] px-4 py-8">
        <div className="w-full max-w-md">
          
          {/* Login Form */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
            
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-2xl font-semibold text-gray-900 mb-2">Login into account</h1>
              <p className="text-gray-500 text-sm">
                Don't have an account?{' '}
                <a href="#" className="text-blue-500 hover:text-blue-600 font-medium">
                  signup instead
                </a>
              </p>
            </div>

            {/* Form Fields */}
            <div className="space-y-5">

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-sm placeholder-gray-400"
                  placeholder="Enter your email address"
                />
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-sm placeholder-gray-400"
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {/* Forgot Password */}
              <div className="text-right">
                <a href="#" className="text-blue-500 hover:text-blue-600 text-sm font-medium">
                  Forget password?
                </a>
              </div>

              {/* Login Button */}
              <div className="pt-4">
                <button
                  onClick={handleLogin}
                  className="w-full bg-gray-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all text-sm"
                >
                  Login
                </button>
              </div>

            </div>
          </div>

          {/* Additional Options */}
          <div className="mt-6 text-center">
            <p className="text-gray-500 text-sm mb-4">Or continue with</p>
            <div className="flex space-x-4">
              <button className="flex-1 bg-white border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium">
                Google
              </button>
              <button className="flex-1 bg-white border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium">
                GitHub
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}