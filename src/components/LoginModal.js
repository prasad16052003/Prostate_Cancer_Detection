import React, { useState } from "react";
import { GoogleAuthProvider, FacebookAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../firebaseConfig";

const LoginModal = ({ show, onClose }) => {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
    userType: "", // User type must be selected
  });
  const [isSocialLogin, setIsSocialLogin] = useState(false); // Track if it's a social login

  // Handle input changes for traditional login
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle traditional login
  const handleTraditionalLogin = (e) => {
    e.preventDefault();

    if (!userData.userType) {
      alert("Please select your user type!");
      return;
    }

    if (!userData.email || !userData.password) {
      alert("Please fill in all fields!");
      return;
    }

    console.log("User logged in (traditional):", userData);
    alert(`Login successful! Welcome back, ${userData.userType === "patient" ? "Patient" : "Doctor"}`);
    onClose(); // Close the modal after login
  };

  // Social Login Handlers
  const handleSocialLogin = async (provider) => {
    try {
      const result = await signInWithPopup(auth, provider);
      setUserData((prevData) => ({
        ...prevData,
        email: result.user.email,
      }));
      setIsSocialLogin(true); // Mark it as a social login
    } catch (error) {
      console.error("Social login error:", error.message);
      alert("Social login failed. Please try again.");
    }
  };

  // Finalize Social Login
  const finalizeSocialLogin = () => {
    if (!userData.userType) {
      alert("Please select your user type!");
      return;
    }

    console.log("User logged in (social):", userData);
    alert(`Login successful! Welcome back, ${userData.userType === "patient" ? "Patient" : "Doctor"}`);
    onClose(); // Close the modal after login
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold">Login</h3>
          <button onClick={onClose} className="text-gray-600 hover:text-gray-800">
            <i className="bi bi-x-lg"></i>
          </button>
        </div>

        {!isSocialLogin ? (
          <>
            {/* Traditional Login Form */}
            <form onSubmit={handleTraditionalLogin} className="mb-6">
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
                Login
              </button>
            </form>

            <div className="text-center text-gray-500 mb-6">Or log in with</div>

            {/* Social Login Buttons */}
            <div className="space-y-4">
              <button
                onClick={() => handleSocialLogin(new GoogleAuthProvider())}
                className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 flex items-center justify-center"
              >
                <i className="bi bi-google mr-2"></i> Login with Google
              </button>
              <button
                onClick={() => handleSocialLogin(new FacebookAuthProvider())}
                className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 flex items-center justify-center"
              >
                <i className="bi bi-facebook mr-2"></i> Login with Facebook
              </button>
            </div>
          </>
        ) : (
          <>
            {/* Finalize Social Login */}
            <div className="mb-6">
              <p className="text-center text-gray-700">
                Welcome back! Please select your user type to complete login.
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
              onClick={finalizeSocialLogin}
              className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
            >
              Complete Login
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default LoginModal;
