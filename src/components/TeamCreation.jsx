import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../firebase'; // Import Firestore
import { collection, getDocs } from 'firebase/firestore'; // Firestore functions
import Navbar from './Navbar';
import 'animate.css'; // For animations

function TeamCreation() {
  const [teamType, setTeamType] = useState('');
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const navigate = useNavigate();

  // Fetch users from Firestore when the component mounts
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersCollection = collection(db, 'users'); // Access the 'users' collection
        const usersSnapshot = await getDocs(usersCollection); // Fetch all documents
        const userList = usersSnapshot.docs.map((doc) => ({
          uid: doc.id,
          ...doc.data(), // Spread the document data
        }));
        setUsers(userList); // Set the state with the fetched user data
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleTeamSelection = (event) => {
    setTeamType(event.target.value);
  };

  const handleUserSelect = (user) => {
    if (selectedUsers.includes(user)) {
      setSelectedUsers(selectedUsers.filter((u) => u !== user)); // Deselect user
    } else {
      setSelectedUsers([...selectedUsers, user]); // Add user to selection
    }
  };

  const handleProceed = () => {
    navigate('/questionnaire', { state: { teamType, selectedUsers } });
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <>
      <Navbar handleLogout={handleLogout} />
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center p-8 bg-white rounded-lg shadow-lg animate__animated animate__fadeIn">
          <h2 className="text-3xl font-bold mb-6">Create a Team</h2>
          <div className="mb-6">
            <label htmlFor="teamType" className="text-xl font-semibold">
              Select Team Type:
            </label>
            <select
              id="teamType"
              value={teamType}
              onChange={handleTeamSelection}
              className="mt-2 block w-full p-2 border border-gray-300 rounded shadow focus:outline-none focus:border-indigo-500"
            >
              <option value="">Select a team type</option>
              <option value="Development">Development Team</option>
              <option value="Management">Management Team</option>
              <option value="HR">HR Team</option>
              <option value="Cyber-Security">Cyber-Security Team</option>
              <option value="Deployement">Deployement Team</option>
              <option value="SQA">SQA Team</option>
              <option value="Database">Database Team</option>
            </select>
          </div>

          <h3 className="text-xl font-bold mb-4">Select Users:</h3>
          <div className="grid grid-cols-2 gap-4 mb-6">
            {users.length > 0 ? (
              users.map((user) => (
                <button
                  key={user.uid}
                  onClick={() => handleUserSelect(user)}
                  className={`p-3 rounded-lg transition-transform transform hover:scale-105 shadow-md ${
                    selectedUsers.includes(user) ? 'bg-indigo-300' : 'bg-gray-200'
                  } hover:bg-indigo-200 hover:shadow-lg`}
                >
                  {user.displayName || user.email}
                </button>
              ))
            ) : (
              <p className="col-span-2 text-gray-500">No users available</p>
            )}
          </div>

          <button
            onClick={handleProceed}
            className="bg-purple-500 text-white px-6 py-3 rounded-lg shadow-lg transition-colors hover:bg-purple-600 focus:ring-4 focus:ring-purple-300"
          >
            Proceed to Questions
          </button>
        </div>
      </div>
    </>
  );
}

export default TeamCreation;
