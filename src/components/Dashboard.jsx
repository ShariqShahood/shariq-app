
import { useEffect, useState } from 'react';
import { logout } from '../authService';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import { auth, db } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { query, where, collection, onSnapshot } from 'firebase/firestore';
import 'animate.css'; // Import animate.css for animations

function Dashboard() {
  const [userName, setUserName] = useState('Guest');
  const [receivedMessages, setReceivedMessages] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchReceivedMessages = () => {
      const currentUser = auth.currentUser;
      if (!currentUser) return;

      const q = query(
        collection(db, 'teamMessages'),
        where('userId', '==', currentUser.uid)
      );

      onSnapshot(q, (snapshot) => {
        const messagesList = snapshot.docs.map((doc) => doc.data());
        setReceivedMessages(messagesList);
      });
    };

    fetchReceivedMessages();
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserName(user.displayName || user.email.split('@')[0]);
      } else {
        setUserName('Guest');
      }
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleCreateTeam = () => {
    navigate('/create-team');
  };

  return (
    <>
      <Navbar handleLogout={handleLogout} />
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center p-6 bg-white rounded-lg shadow-lg animate__animated animate__fadeIn">
          <h1 className="text-4xl font-bold mb-4">
            Welcome to the Dashboard,{' '}
            <span className="text-indigo-600 font-mono text-5xl">{userName}!</span>
          </h1>
          <p className="text-gray-600 mb-4">You are now logged in.</p>
          <button
            onClick={handleCreateTeam}
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 animate__animated animate__fadeInUp"
          >
            Create Team
          </button>
        </div>
      </div>

      <div className="mt-12 max-w-4xl mx-auto">
        <h3 className="text-3xl font-bold text-center mb-6">Messages Sent to You</h3>
        {receivedMessages.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate__animated animate__fadeInUp">
            {receivedMessages.map((msg, index) => (
              <div
                key={index}
                className="p-6 bg-white border-l-4 border-blue-500 shadow-md rounded-lg hover:shadow-lg transform hover:scale-105 transition-all duration-300 ease-in-out animate__animated animate__zoomIn"
              >
                <h4 className="text-xl font-bold text-indigo-600 mb-2">
                  {msg.senderName} sent this message:
                </h4>
                <p className="text-gray-700 mb-2">{msg.answer}</p>
                <p className="text-sm text-gray-500">Team Type: {msg.teamType}</p>
                <p className="text-sm text-gray-500">
                  Received at:{' '}
                  {msg.timestamp
                    ? new Date(msg.timestamp.seconds * 1000).toLocaleString()
                    : 'No Date Available'}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">No messages yet.</p>
        )}
      </div>
    </>
  );
}

export default Dashboard;
