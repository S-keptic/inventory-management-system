import React, { useState } from 'react';
import './App.css';

const App = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                alert('Registration successful');
            } else {
                alert('Registration failed');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Something went wrong!');
        }
    };

    return (
        <div className="register-container">
            <h1>Inventory Management System</h1>
            <form onSubmit={handleSubmit} className="register-form">
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    onChange={handleChange}
                    required
                    className="input-field"
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={handleChange}
                    required
                    className="input-field"
                />
                <button type="submit" className="submit-btn">Register</button>
            </form>
        </div>
    );
};

export default App;
