import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleAuthProvider, FacebookAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../firebaseConfig"; // Your Firebase configuration file

const SignUp = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    userType: "", // User type must be selected
  });
  const [isSocialSignUp, setIsSocialSignUp] = useState(false); // Track if it's a social sign-up
  const navigate = useNavigate();

  // Handle input changes for traditional sign-up
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle traditional sign-up
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!userData.userType) {
      alert("Please select your user type!");
      return;
    }

    if (!userData.name || !userData.email || !userData.password) {
      alert("Please fill in all fields!");
      return;
    }

    console.log("User registered (traditional):", userData);
    alert(`Registration successful! Welcome, ${userData.name} (${userData.userType})`);
    navigate("/"); // Redirect to home page
  };

  // Social Sign-Up Handlers
  const handleSocialSignUp = async (provider) => {
    try {
      const result = await signInWithPopup(auth, provider);
      setUserData((prevData) => ({
        ...prevData,
        name: result.user.displayName,
        email: result.user.email,
      }));
      setIsSocialSignUp(true); // Mark it as a social sign-up
    } catch (error) {
      console.error("Social sign-up error:", error.message);
      alert("Social sign-up failed. Please try again.");
    }
  };

  // Finalize Social Sign-Up
  const finalizeSocialSignUp = () => {
    if (!userData.userType) {
      alert("Please select your user type!");
      return;
    }

    console.log("User registered (social):", userData);
    alert(`Registration successful! Welcome, ${userData.name} (${userData.userType})`);
    navigate("/"); // Redirect to home page
  };

  return (
    <div className="max-w-md mx-auto p-8 bg-white rounded-lg shadow-lg mt-12">
      <h2 className="text-3xl font-semibold text-center mb-6">Sign Up</h2>

      {!isSocialSignUp ? (
        <>
          {/* Traditional Sign-Up Form */}
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Full Name</label>
              <input
                type="text"
                name="name"
                value={userData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-green-500"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={userData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-green-500"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Password</label>
              <input
                type="password"
                name="password"
                value={userData.password}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-green-500"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 mb-2">User Type</label>
              <div className="flex items-center space-x-4">
                <div>
                  <input
                    type="radio"
                    id="patient"
                    name="userType"
                    value="patient"
                    checked={userData.userType === "patient"}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  <label htmlFor="patient">Patient</label>
                </div>
                <div>
                  <input
                    type="radio"
                    id="doctor"
                    name="userType"
                    value="doctor"
                    checked={userData.userType === "doctor"}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  <label htmlFor="doctor">Doctor</label>
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
            >
              Register
            </button>
          </form>

          <div className="text-center text-gray-500 my-6">Or sign up with</div>

          {/* Social Sign-Up Buttons */}
          <div className="space-y-4">
            <button
              onClick={() => handleSocialSignUp(new GoogleAuthProvider())}
              className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 flex items-center justify-center"
            >
              <i className="bi bi-google mr-2"></i> Sign Up with Google
            </button>
            <button
              onClick={() => handleSocialSignUp(new FacebookAuthProvider())}
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 flex items-center justify-center"
            >
              <i className="bi bi-facebook mr-2"></i> Sign Up with Facebook
            </button>
          </div>
        </>
      ) : (
        <>
          {/* Finalize Social Sign-Up */}
          <div className="mb-6">
            <p className="text-center text-gray-700">
              Welcome, <span className="font-semibold">{userData.name}</span>! Please select your user type to complete the registration.
            </p>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">User Type</label>
            <div className="flex items-center space-x-4">
              <div>
                <input
                  type="radio"
                  id="patient"
                  name="userType"
                  value="patient"
                  checked={userData.userType === "patient"}
                  onChange={handleChange}
                  className="mr-2"
                />
                <label htmlFor="patient">Patient</label>
              </div>
              <div>
                <input
                  type="radio"
                  id="doctor"
                  name="userType"
                  value="doctor"
                  checked={userData.userType === "doctor"}
                  onChange={handleChange}
                  className="mr-2"
                />
                <label htmlFor="doctor">Doctor</label>
              </div>
            </div>
          </div>
          <button
            onClick={finalizeSocialSignUp}
            className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
          >
            Complete Registration
          </button>
        </>
      )}
    </div>
  );
};

export default SignUp;
