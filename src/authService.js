import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
} from 'firebase/auth';
import { auth, db } from './firebase'; // Ensure correct path to firebase.js
import { doc, setDoc, getDoc } from 'firebase/firestore'; // Firestore functions

// Function to sign up a new user
export const signUp = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Set the user's display name using part before @ in the email
    await updateProfile(user, { displayName: email.split('@')[0] });

    // Store user data in Firestore
    await setDoc(doc(db, 'users', user.uid), {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName || 'Guest', // Default to 'Guest' if displayName not set
    });

    return user; // Return the user object with the updated displayName
  } catch (error) {
    console.error("Error during sign-up:", error.message);
    throw error;
  }
};

// Function to log in an existing user
export const login = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Check if user exists in Firestore
    const userDoc = await getDoc(doc(db, 'users', user.uid));
    if (!userDoc.exists()) {
      // If user doesn't exist in Firestore, create the user entry
      await setDoc(doc(db, 'users', user.uid), {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName || 'Guest', // Default to 'Guest' if displayName not set
      });
    }

    return user; // Return the user object
  } catch (error) {
    console.error("Error during login:", error.message);
    throw error;
  }
};

// Function to log out the user
export const logout = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Error during logout:", error.message);
  }
};

// Function to log in with Google
export const googleSignIn = async () => {
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    // Store Google user data in Firestore
    const userDoc = await getDoc(doc(db, 'users', user.uid));
    if (!userDoc.exists()) {
      // If Google user doesn't exist in Firestore, add the user entry
      await setDoc(doc(db, 'users', user.uid), {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName || 'Google User', // Default to 'Google User' if displayName not set
      });
    }

    return user;
  } catch (error) {
    console.error("Error during Google Sign-In:", error.message);
    throw error;
  }
};
