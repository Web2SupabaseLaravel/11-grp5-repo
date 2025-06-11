import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Home, Search, ArrowLeft, RefreshCw } from "lucide-react";

const NotFound = () => {
  const location = useLocation();
  const [isAnimated, setIsAnimated] = useState(false);

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );

    setTimeout(() => setIsAnimated(true), 100);
  }, [location.pathname]);

  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-600/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-indigo-400/20 to-pink-600/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-cyan-400/10 to-blue-600/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className={`relative z-10 text-center max-w-2xl mx-auto px-6 transition-all duration-1000 transform ${isAnimated ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
        {/* 404 Number with Gradient */}
        <div className="mb-8">
          <h1 className="text-8xl md:text-9xl font-black bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent leading-none animate-pulse">
            404
          </h1>
          <div className="w-32 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto mt-4 rounded-full"></div>
        </div>

        {/* Main Content */}
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Oops! Page Not Found
          </h2>
          <p className="text-lg text-gray-600 mb-2 leading-relaxed">
            The page you're looking for seems to have wandered off into the digital void.
          </p>
          <p className="text-sm text-gray-500">
            <span className="font-mono bg-gray-100 px-2 py-1 rounded text-red-600">
              {location.pathname}
            </span>{" "}
            doesn't exist on our server.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          <a
            href="/"
            className="group inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 hover:scale-105"
          >
            <Home className="w-5 h-5 mr-2 group-hover:animate-bounce" />
            Back to Home
          </a>

          <button
            onClick={handleRefresh}
            className="group inline-flex items-center justify-center px-8 py-4 bg-white text-gray-700 font-semibold rounded-xl border-2 border-gray-200 hover:border-gray-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 hover:scale-105"
          >
            <RefreshCw className="w-5 h-5 mr-2 group-hover:animate-spin" />
            Try Again
          </button>
        </div>

        {/* Additional Help Links */}
        <div className="space-y-3">
          <p className="text-gray-500 text-sm mb-4">Or try one of these:</p>
          <div className="flex flex-wrap justify-center gap-3">
            <a
              href="/search"
              className="inline-flex items-center px-4 py-2 text-sm text-blue-600 hover:text-blue-800 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors duration-200"
            >
              <Search className="w-4 h-4 mr-1" />
              Search
            </a>
            <a
              href="/contact"
              className="inline-flex items-center px-4 py-2 text-sm text-indigo-600 hover:text-indigo-800 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition-colors duration-200"
            >
              Contact Support
            </a>
            <button
              onClick={() => window.history.back()}
              className="inline-flex items-center px-4 py-2 text-sm text-purple-600 hover:text-purple-800 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors duration-200"
            >
              <ArrowLeft className="w-4 h-4 mr-1" />
              Go Back
            </button>
          </div>
        </div>

        {/* Fun Element */}
        <div className="mt-12 text-center">
          <div className="inline-block animate-bounce">
            <div className="text-6xl mb-2">🚀</div>
          </div>
          <p className="text-xs text-gray-400">
            Lost in space? Let's get you back on track!
          </p>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-20 w-4 h-4 bg-blue-400 rounded-full animate-ping opacity-75"></div>
      <div className="absolute top-40 right-32 w-3 h-3 bg-purple-400 rounded-full animate-ping opacity-75 delay-300"></div>
      <div className="absolute bottom-32 left-16 w-2 h-2 bg-indigo-400 rounded-full animate-ping opacity-75 delay-700"></div>
      <div className="absolute bottom-20 right-20 w-5 h-5 bg-pink-400 rounded-full animate-ping opacity-75 delay-1000"></div>
    </div>
  );
};

export default NotFound;
