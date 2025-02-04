import React, { useState } from 'react';
import axios from 'axios';

const token = localStorage.getItem('core-token');

const NotifySubscribers = () => {
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        
            try {
                const response = await axios.post(
                    `${process.env.REACT_APP_BACKEND_BASE_URL}/api/user/notify-subscribers`,
                    { subject, message },
                    { headers: { 'Authorization': `Bearer ${token}` } }
                );
            
                alert('Notification sent successfully!');
                setSubject('');
                setMessage('');
            } catch (error) {
                console.error(error);
                alert(error.response?.data?.message || 'Error sending notification');
            }
            
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
            <div className="bg-slate-800 shadow-lg rounded-lg p-6 max-w-md w-full">
                <h2 className="text-2xl font-semibold text-center text-white mb-4">Notify Subscribers</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        placeholder="Enter subject"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        required
                        className="w-full text-black-2 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <textarea
                        placeholder="Enter your message to subscribers (HTML allowed)"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        required
                        className="w-full text-black-2 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-32"
                    />
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white font-semibold py-2 rounded-md hover:bg-blue-600 transition duration-200"
                    >
                        Notify Subscribers
                    </button>
                </form>
            </div>
        </div>
    );
};

export default NotifySubscribers;
