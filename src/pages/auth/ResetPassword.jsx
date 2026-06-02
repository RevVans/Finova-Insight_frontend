import { useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import api from '../../config/api';

export default function ResetPassword() {
    const { token } = useParams(); // Grabs the secret token from the URL path
    const [searchParams] = useSearchParams(); 
    const emailFromUrl = searchParams.get('email'); // Grabs the email from the URL query

    const [email, setEmail] = useState(emailFromUrl || '');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [errors, setErrors] = useState({});
    
    const navigate = useNavigate();

    const handleReset = async (e) => {
        e.preventDefault();
        setErrors({});

        if (password !== passwordConfirmation) {
            setErrors({ password_confirmation: ["The passwords do not match!"] });
            return;
        }

        try {
            await api.post('/reset-password', {
                token: token,
                email: email,
                password: password,
                password_confirmation: passwordConfirmation
            });

            console.log("Password reset successfully!");
            alert("Password reset! You can now login."); // Quick alert before kicking them to login
            navigate('/'); 
            
        } catch (error) {
            if (error.response && error.response.status === 422) {
                setErrors(error.response.data.errors);
            } else {
                console.error("Failed to reset password", error);
            }
        }
    };

    return (
        <div className="min-h-screen bg-[#E5F3EE] flex items-center justify-center relative p-4">
            <div className="bg-white rounded-xl shadow-md border border-gray-100 p-10 w-full max-w-[450px]">
                
                <div className="flex justify-center mb-6">
                    <img src="/Logo/Frame 57.png" alt="Finova Insight" className="h-16 object-contain" />
                </div>

                <h2 className="text-2xl font-bold text-center text-black mb-2 tracking-wide">Create New Password</h2>
                <p className="text-sm text-center text-gray-600 mb-6 font-medium">Please enter your new password below.</p>

                <form onSubmit={handleReset} className="flex flex-col gap-4">
                    {/* Hidden email input - technically they could change it, but it's pre-filled */}
                    <div>
                        <input
                            type="email"
                            className="bg-[#D9D9D9] text-gray-800 placeholder-gray-500 px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 w-full font-medium"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            readOnly // Make it read-only so they don't break the token validation
                        />
                        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email[0]}</p>}
                    </div>

                    <div>
                        <input
                            type="password"
                            placeholder="New Password (Min 8 characters)"
                            className="bg-[#D9D9D9] text-gray-800 placeholder-gray-500 px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 w-full font-medium"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password[0]}</p>}
                    </div>

                    <div>
                        <input
                            type="password"
                            placeholder="Confirm New Password"
                            className="bg-[#D9D9D9] text-gray-800 placeholder-gray-500 px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 w-full font-medium"
                            value={passwordConfirmation}
                            onChange={(e) => setPasswordConfirmation(e.target.value)}
                            required
                        />
                        {errors.password_confirmation && <p className="text-red-500 text-xs mt-1">{errors.password_confirmation[0]}</p>}
                    </div>

                    <button 
                        type="submit" 
                        className="bg-[#1C1B1F] text-white font-medium px-4 py-3 rounded-md hover:bg-black transition-colors w-full mt-2"
                    >
                        Reset Password
                    </button>
                </form>
            </div>
        </div>
    );
}