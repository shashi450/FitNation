import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const ForgotPassword = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ otp: "", email: "", password: "", confirmPassword: "" });
    const [fetchOtp, setFetchOtp] = useState("");
    const [verifyPassword, setVerifyPassword] = useState(false);

    function changeHandler(event) {
        setFormData(prevData => ({
            ...prevData,
            [event.target.name]: event.target.value,
        }));
    }

    async function submitHandler(e) {
        e.preventDefault();
        try {
            const response = await fetch('https://fitness-server-u793.onrender.com/user/forgotpassword', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: formData.email })
            });
            const responseData = await response.json();
            setFetchOtp(responseData.otp);
            console.log(responseData.otp);
            toast.success("OTP sent to your email");
        } catch (error) {
            toast.error(`Error: ${error.message}`);
        }
    }

    async function submitHandlerOtp(e) {
        e.preventDefault();
        if (fetchOtp !== parseInt(formData.otp)) {
            toast.error("OTP does not match");
        } else {
            setVerifyPassword(true);
            toast.success("OTP verified, please set your new password");
        }
    }

    async function submitHandlerConfirmPassword(e) {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }
        try {
            const response = await fetch('https://fitness-server-u793.onrender.com/user/forgotpassword/user/update', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: formData.email, passwd: formData.password })
            });
            const responseData = await response.json();
            toast.success("Password updated successfully");
            navigate("/login");
        } catch (error) {
            toast.error(`Error: ${error.message}`);
        }
    }


    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white">
            <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
                {!verifyPassword && (
                    <form onSubmit={submitHandler} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Email Address
                                <input
                                    required
                                    type="email"
                                    name="email"
                                    onChange={changeHandler}
                                    placeholder="Enter your email"
                                    value={formData.email}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-600 focus:border-orange-600"
                                />
                            </label>
                        </div>
                        <button type="submit" className="w-full bg-orange-600 text-white py-2 rounded-md hover:bg-orange-500">
                            Send OTP
                        </button>
                    </form>
                )}

                {fetchOtp && !verifyPassword && (
                    <form onSubmit={submitHandlerOtp} className="mt-6 space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                OTP
                                <input
                                    required
                                    type="text"
                                    name="otp"
                                    onChange={changeHandler}
                                    placeholder="Enter OTP"
                                    value={formData.otp}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-600 focus:border-orange-600"
                                />
                            </label>
                        </div>
                        <button type="submit" className="w-full bg-orange-600 text-white py-2 rounded-md hover:bg-orange-500">
                            Verify OTP
                        </button>
                    </form>
                )}

                {verifyPassword && (
                    <form onSubmit={submitHandlerConfirmPassword} className="mt-6 space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                New Password
                                <input
                                    required
                                    type="password"
                                    name="password"
                                    onChange={changeHandler}
                                    placeholder="Enter new password"
                                    value={formData.password}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-600 focus:border-orange-600"
                                />
                            </label>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Confirm Password
                                <input
                                    required
                                    type="password"
                                    name="confirmPassword"
                                    onChange={changeHandler}
                                    placeholder="Confirm your password"
                                    value={formData.confirmPassword}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-600 focus:border-orange-600"
                                />
                            </label>
                        </div>
                        <button type="submit" className="w-full bg-orange-600 text-white py-2 rounded-md hover:bg-orange-500">
                            Update Password
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default ForgotPassword;