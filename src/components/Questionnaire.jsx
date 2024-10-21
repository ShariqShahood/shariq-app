import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { db, auth } from '../firebase';
import { collection, addDoc, query, where, onSnapshot } from 'firebase/firestore';
import Navbar from './Navbar';
import Swal from 'sweetalert2'; // Import SweetAlert

function Questionnaire() {
  const location = useLocation();
  const { teamType, selectedUsers } = location.state;
  const [answers, setAnswers] = useState({});
  const [messages, setMessages] = useState([]);

  // Handle input change for answers
  const handleAnswerChange = (userId, answer) => {
    setAnswers({ ...answers, [userId]: answer });
  };

  // Function to send messages
  const handleSendMessage = async () => {
    try {
      const currentUser = auth.currentUser;

      // Send a message for each selected user
      for (const user of selectedUsers) {
        await addDoc(collection(db, 'teamMessages'), {
          teamType,
          userId: user.uid,
          displayName: user.displayName || user.email,
          answer: answers[user.uid] || 'No answer provided',
          senderId: currentUser.uid,
          senderName: currentUser.displayName || currentUser.email,
          timestamp: new Date(),
        });
      }
      fetchMessages(); // Fetch messages after sending

      // Show success alert
      Swal.fire({
        title: 'Success!',
        text: 'Messages sent successfully!',
        icon: 'success',
        confirmButtonText: 'OK',
      });

    } catch (error) {
      console.error("Error sending message:", error);
      // Optionally show an error alert
      Swal.fire({
        title: 'Error!',
        text: 'There was a problem sending your messages. Please try again.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    }
  };

  // Fetch messages from Firestore based on the team type
  const fetchMessages = () => {
    const q = query(collection(db, 'teamMessages'), where('teamType', '==', teamType));

    onSnapshot(q, (snapshot) => {
      const messagesList = snapshot.docs.map((doc) => doc.data());
      setMessages(messagesList);
    });
  };

  // Fetch messages when the component mounts
  useEffect(() => {
    fetchMessages();
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
  };
  
  return (
    <>
      <Navbar handleLogout={handleLogout} /><br /><br />
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-200 to-indigo-300 p-4 md:p-8">
        <div className="text-center p-6 md:p-8 bg-white rounded-lg shadow-lg animate__animated animate__fadeIn w-full max-w-lg">
          <h2 className="text-3xl font-bold mb-4 text-indigo-600">Team: {teamType}</h2>
          <p className="mb-4 text-gray-700">Ask the team members the following questions:</p>
          <div className="mt-4 space-y-4">
            {selectedUsers.map((user) => (
              <div key={user.uid} className="p-4 bg-gray-100 rounded-lg shadow-md animate__animated animate__fadeInUp">
                <h3 className="font-semibold text-indigo-500">{user.displayName || user.email}</h3>
                <input
                  type="text"
                  placeholder="Assign task or ask a question"
                  className="p-2 border border-gray-300 rounded w-full mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                  onChange={(e) => handleAnswerChange(user.uid, e.target.value)}
                />
              </div>
            ))}
            <button
              onClick={handleSendMessage}
              className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition w-full md:w-auto"
            >
              Send Message
            </button>
          </div>

          {/* Display all the messages */}
          <div className="mt-8">
            <h3 className="text-2xl font-bold mb-4 text-indigo-600">Team Responses</h3>
            {messages.length > 0 ? (
              <div className="grid grid-cols-1 gap-4">
                {messages.map((msg, index) => (
                  <div key={index} className="p-4 bg-gray-200 rounded-lg shadow-md text-left animate__animated animate__fadeInUp">
                    <h4 className="font-bold text-indigo-600">
                      {msg.senderName} sent a message to {msg.displayName}
                    </h4>
                    <p className="text-gray-800">{msg.answer}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-600">No messages yet.</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Questionnaire;
