"use client";

import { useState, useEffect } from "react";
import { auth, signInWithGoogle, logout } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { User } from "firebase/auth"; 
import ProtectedRoute from "@/components/ProtectedRoute"; // Import ProtectedRoute

export default function Home() {
  const [user, setUser] = useState<User | null>(null);

  // 🔄 Listen for auth changes (runs on mount)
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe(); // Cleanup listener on unmount
  }, []);

  const handleLogout = async () => {
    await logout();
    setUser(null); // Clear state on logout
  };

  return (
    <ProtectedRoute> {/* ✅ Wrap the page inside ProtectedRoute */}
      <main className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-3xl font-bold mb-4">Welcome to AI-Reading-App 📖</h1>

        {user ? (
          <div className="text-center">
            <img
              src={user.photoURL}
              alt="Profile"
              className="w-20 h-20 rounded-full mx-auto mb-2"
            />
            <p className="text-lg font-semibold">Hello, {user.displayName} 👋</p>
            <p className="text-sm text-gray-600">{user.email}</p>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded mt-4"
            >
              Logout
            </button>
          </div>
        ) : (
          <button
            onClick={signInWithGoogle}
            className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
          >
            Sign in with Google
          </button>
        )}
      </main>
    </ProtectedRoute>
  );
}
