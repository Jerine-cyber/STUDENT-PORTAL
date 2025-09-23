import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { handleGoogleLogin } from '../firebase';
import Particles from 'react-tsparticles';

const LoginPage = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onLoginSuccess = () => {
    setIsAuthenticated(true);
    navigate('/dashboard');
  };

  const onGoogleLogin = async () => {
    const success = await handleGoogleLogin();
    if (success) {
      onLoginSuccess();
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    console.log('Email:', email, 'Password:', password);
    onLoginSuccess();
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen p-4 overflow-hidden font-sans bg-gray-900">
      {/* Particles.js Background */}
      <Particles
        className="absolute inset-0 z-0"
        id="tsparticles"
        options={{
          background: {
            color: {
              value: "#111827",
            },
          },
          fpsLimit: 120,
          interactivity: {
            events: {
              onClick: {
                enable: true,
                mode: "push",
              },
              onHover: {
                enable: true,
                mode: "repulse",
              },
              resize: true,
            },
            modes: {
              push: {
                quantity: 4,
              },
              repulse: {
                distance: 200,
                duration: 0.4,
              },
            },
          },
          particles: {
            color: {
              value: ["#8b5cf6", "#6366f1", "#3b82f6"],
            },
            links: {
              color: "#ffffff",
              distance: 150,
              enable: true,
              opacity: 0.5,
              width: 1,
            },
            collisions: {
              enable: true,
            },
            move: {
              direction: "none",
              enable: true,
              outMode: "bounce",
              random: false,
              speed: 2,
              straight: false,
            },
            number: {
              density: {
                enable: true,
                area: 800,
              },
              value: 80,
            },
            opacity: {
              value: 0.5,
            },
            shape: {
              type: "circle",
            },
            size: {
              random: true,
              value: 5,
            },
          },
          detectRetina: true,
        }}
      />
      
      {/* Language Selector */}
      <div className="absolute z-20 top-4 right-4">
        <select className="px-3 py-1 text-sm text-white bg-white border border-white rounded-md cursor-pointer bg-opacity-20 border-opacity-30 focus:outline-none focus:ring-1 focus:ring-white backdrop-blur-sm">
          <option className="text-white bg-gray-800">English</option>
          <option className="text-white bg-gray-800">Spanish</option>
          <option className="text-white bg-gray-800">French</option>
        </select>
      </div>

      {/* Main Content Card */}
      <div className="relative z-10 w-full max-w-sm sm:max-w-md p-8 sm:p-10 text-center bg-white bg-opacity-10 border border-white border-opacity-20 backdrop-filter backdrop-blur-lg rounded-3xl shadow-3d-glow transform transition-all duration-500 hover:scale-[1.01] hover:shadow-3d-glow-hover">
        <div className="flex flex-col items-center justify-center mb-4 -mt-16 sm:-mt-20">
          <div className="flex items-center justify-center w-20 h-20 mb-4 transform rounded-full shadow-lg bg-gradient-to-br from-blue-500 to-purple-500 translate-z-10">
            <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 3L1 9l11 6 11-6-11-6zm0 14.24l-7.39-3.96L1 14.5l11 6 11-6-3.61-1.93-7.39 3.96zm0-10.24L4.85 7.14 12 11l7.15-3.86L12 7z" />
            </svg>
          </div>
          <h2 className="mt-4 text-4xl font-extrabold leading-tight text-white">Student Login</h2>
          <p className="max-w-xs mx-auto mt-2 text-base text-gray-300">Welcome back to your academic portal.</p>
        </div>

        <form onSubmit={handleLogin} className="mt-8 space-y-5">
          <div className="relative">
            {/* Added id and name attributes */}
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full py-3 pl-12 pr-4 text-white placeholder-gray-300 transition-all duration-200 bg-white border border-white bg-opacity-15 border-opacity-30 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 backdrop-blur-sm"
              required
            />
            <svg className="absolute w-5 h-5 text-gray-300 transform -translate-y-1/2 left-4 top-1/2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
              <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
            </svg>
          </div>
          <div className="relative">
            {/* Added id and name attributes */}
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full py-3 pl-12 pr-4 text-white placeholder-gray-300 transition-all duration-200 bg-white border border-white bg-opacity-15 border-opacity-30 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 backdrop-blur-sm"
              required
            />
            <svg className="absolute w-5 h-5 text-gray-300 transform -translate-y-1/2 left-4 top-1/2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
            </svg>
          </div>

          <p className="text-sm font-medium text-right text-blue-400 transition-colors duration-200 cursor-pointer hover:underline">
            Forgot password?
          </p>

          <button
            type="submit"
            className="w-full px-4 py-3 font-bold text-white transition-all duration-300 transform shadow-lg bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl hover:from-blue-700 hover:to-purple-700 hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
          >
            LOGIN
          </button>
        </form>

        <p className="mt-8 mb-4 text-sm text-gray-400">
          Or sign in with
        </p>
        <div className="flex items-center justify-center space-x-4">
          <button
            onClick={onGoogleLogin}
            className="flex items-center justify-center w-12 h-12 p-2 transition-all duration-200 bg-white border border-white rounded-full shadow-lg bg-opacity-15 border-opacity-30 hover:bg-opacity-25 backdrop-blur-sm"
            aria-label="Sign in with Google"
          >
            <svg className="w-6 h-6" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.28H12v4.32h5.8c-.28 1.54-1.2 2.82-2.6 3.7l3.6 2.81c2.1-1.95 3.36-4.8 3.36-8.55z" />
              <path fill="#34A853" d="M12 23c3.2 0 5.8-1.07 7.7-2.92l-3.6-2.81c-.98.65-2.26 1.05-4.1 1.05-3.15 0-5.83-2.12-6.8-5.07H1.54l-3.66 2.8c2.03 2.83 5.43 4.67 9.8 4.67z" />
              <path fill="#FBBC05" d="M5.2 13.92c-.22-.64-.34-1.32-.34-2.02s.12-1.38.34-2.02V7.1H1.54c-.65 1.28-1 2.76-1 4.4s.35 3.12 1 4.4l3.66-2.82z" />
              <path fill="#EA4335" d="M12 4.14c1.78 0 3.34.61 4.6 1.76l3.23-3.23C17.8 1.13 15.2 0 12 0 7.6 0 4.2 1.83 2.1 4.66l3.66 2.82c.97-2.95 3.65-5.07 6.8-5.07z" />
            </svg>
          </button>
          <button
            onClick={onGoogleLogin}
            className="flex items-center justify-center w-12 h-12 p-2 transition-all duration-200 bg-white border border-white rounded-full shadow-lg bg-opacity-15 border-opacity-30 hover:bg-opacity-25 backdrop-blur-sm"
            aria-label="Sign in with Facebook"
          >
            <svg className="w-6 h-6 text-[#1877F2]" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path fill="currentColor" d="M20.25 0H3.75C1.679 0 0 1.679 0 3.75v16.5C0 22.321 1.679 24 3.75 24h8.847V15.5H9.68v-3.8h2.917V9.75c0-2.887 1.766-4.475 4.343-4.475 1.238 0 2.304.092 2.614.133v3.016h-1.801c-1.418 0-1.693.676-1.693 1.664v2.181h3.766l-.5 3.8h-3.266V24h5.056C22.321 24 24 22.321 24 20.25V3.75C24 1.679 22.321 0 20.25 0z" />
            </svg>
          </button>
        </div>

        <p className="mt-8 text-base text-gray-300">
          Don't have an account?{' '}
          <button onClick={() => navigate('/signup')} className="font-bold text-blue-400 transition-colors duration-200 hover:underline">
            SIGN UP
          </button>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
