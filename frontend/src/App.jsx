import React, { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import SignupPage from "./pages/SignupPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SettingPage from "./pages/SettingPage";
import ProfilePage from "./pages/ProfilePage";
import Navbar from "./components/Navbar";
import { Loader } from "lucide-react";
import { useAuthStore } from "./store/useAuthStore";
import { useThemeStore } from "./store/useThemeStore";
import { Toaster } from "react-hot-toast";

const App = () => {
	const { authUser, checkAuth, isCheckingAuth } = useAuthStore();
	const { theme } = useThemeStore()

	useEffect(() => {
		checkAuth();
	}, [checkAuth]);

	if (isCheckingAuth && !authUser)
		return (
			<div className="flex items-center justify-center h-screen">
				<Loader className="size-10 animate-spin" />
			</div>
		);

	return (
		<div data-theme={theme}>
			
			<Navbar />

			<Routes>
				<Route path="/" element={authUser ? <HomePage /> : <Navigate to="/login" />} />
				<Route path="/signup" element={!authUser ? <SignupPage />: <Navigate to="/" />} />
				<Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to="/" />} />
				<Route path="/settings" element={<SettingPage />} />
				<Route path="/profile" element={authUser ? <ProfilePage />: <Navigate to="/login" />} />
			</Routes>

			<Toaster />
		</div>
	);
};

export default App;
