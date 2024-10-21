import { useState } from 'react';
import { signUp, login, googleSignIn } from '../authService';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
import 'animate.css';
import Swal from 'sweetalert2';


function AuthForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate(); // Use navigate for redirection

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLogin) {
      try {
        const user = await login(email, password);
        // alert(`Logged in as ${user.email}`);
        Swal.fire(`Logged in as ${user.email}`);
        navigate('/dashboard'); // Redirect to dashboard after login
      } catch (error) {
        // alert(  error.message);
        Swal.fire(error.message, 'Wrong Credential', 'error');
      }
    } else {
      try {
        const user = await signUp(email, password);
        // alert(`Signed up as ${user.email}`);
        Swal.fire(`Signed up as ${user.email}`);
        navigate('/dashboard'); // Redirect to dashboard after signup
      } catch (error) {
        // alert(error.message);
        Swal.fire(error.message, 'Please try again', 'error');
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-indigo-600 p-6">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 animate__animated animate__fadeInDown">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
          {isLogin ? 'Login' : 'Sign Up'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            className="w-full bg-indigo-500 text-white py-2 rounded-lg hover:bg-indigo-600 transition duration-300 shadow-md"
          >
            {isLogin ? 'Login' : 'Sign Up'}
          </button>
        </form>

        <div className="text-center mt-6">
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-indigo-600 hover:underline transition duration-300"
          >
            {isLogin ? 'Switch to Sign Up' : 'Switch to Login'}
          </button>
        </div>

        <div className="mt-6 space-y-3">
          
          <button
            onClick={googleSignIn}
            className="w-full bg-yellow-500 text-white py-2 rounded-lg hover:bg-yellow-600 transition duration-300 shadow-md animate__animated animate__bounceInRight"
          >
            Sign in with Google
          </button>
        </div>
      </div>
    </div>
  );
}

export default AuthForm;
