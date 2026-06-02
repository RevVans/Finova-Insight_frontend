import { useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../config/api';

export default function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState(''); // To show the green success message!
    const [errors, setErrors] = useState({});

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});
        setStatus('');

        try {
            // Tell Laravel to send the email!
            const response = await api.post('/forgot-password', { email: email });

            // Laravel usually returns a 'status' message when successful
            setStatus(response.data.status || "If that email exists, we just sent a reset link!");
            setEmail(''); // Clear the box

        } catch (error) {
            if (error.response && error.response.status === 422) {
                setErrors(error.response.data.errors);
            } else {
                console.error("Something went completely wrong!", error);
            }
        }
    };

    return (
        <div className="min-h-screen bg-[#E5F3EE] flex items-center justify-center relative p-4">
            <div className="bg-white rounded-xl shadow-md border border-gray-100 p-10 w-full max-w-[450px]">
                <div className="flex justify-center mb-6">
                    <img src="/Logo/Frame 57.png" alt="Finova Insight" className="h-16 object-contain" />
                </div>
                <h2 className="text-2xl font-bold text-center text-black mb-2 tracking-wide">Forgot Your Password?</h2>
                <p className="text-sm text-center text-gray-600 mb-6 font-medium">Enter your email and we will send you a reset link.</p>

                {/* The Green Success Message */}
                {status && <div className="text-green-600 text-sm text-center mb-4 font-medium">{status}</div>}

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div>
                        <input
                            type="email"
                            placeholder="Email Address"
                            className="bg-[#D9D9D9] text-gray-800 placeholder-gray-500 px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 w-full font-medium"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        {/* The Red Error Message */}
                        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email[0]}</p>}
                    </div>

                    <button
                    type="submit"
                    className="bg-[#1C1B1F] text-white font-medium px-4 py-3 rounded-md hover:bg-black transition-colors w-full"
                    >
                        Send Reset Link
                    </button>
                </form>

                <div className="mt-6 text-center">
                    <Link to="/login" className="text-sm text-black hover:underline font-medium">Wait, I remembered it! Go back to Login.</Link>
                </div>
            </div>

        </div>
    );

}