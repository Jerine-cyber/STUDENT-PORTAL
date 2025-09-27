// src/pages/ProfilePage.jsx

import React, { useState, useEffect, useRef } from 'react'; 
import { useNavigate } from 'react-router-dom';
import { FaUserCircle, FaIdCard, FaTrophy, FaEdit, FaTrashAlt } from 'react-icons/fa'; 

const ProfilePage = () => {
    const navigate = useNavigate();
    const fileInputRef = useRef(null); 
    
    // --- State Management ---
    const [profileData, setProfileData] = useState(null);
    const [profileImageUrl, setProfileImageUrl] = useState('https://via.placeholder.com/150?text=Upload+Avatar');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isEditing, setIsEditing] = useState(false); // Controls the Edit Form visibility

    // DUMMY/FALLBACK DATA 
    const dummyProfile = {
        name: "Jerine Joshwa",
        id: "23BECY018",
        overallGPA: 3.87,
        major: "Computer Science and Engineering",
        totalCredits: 75,
        profileImageUrl: 'https://via.placeholder.com/150?text=Upload+Avatar'
    };

    // 1. Fetching Logic and Initial Persistence Load
    useEffect(() => {
        // Load persisted image from local storage on mount
        const savedImage = localStorage.getItem('userProfilePhoto');
        if (savedImage) {
            setProfileImageUrl(savedImage);
        }

        const fetchProfile = async () => {
            try {
                // Fetch data from the API
                const response = await fetch('http://localhost:3001/api/results'); 
                
                if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
                
                const data = await response.json();
                
                setProfileData({
                    name: data.name || "Student Name",
                    id: data.id || "N/A",
                    major: "Computer Science and Engineering", 
                    overallGPA: data.semesters ? data.semesters.reduce((sum, s) => sum + s.gpa, 0) / data.semesters.length : 0,
                    totalCredits: 75,
                });
                setError(null);
            } catch (err) {
                console.error("Failed to fetch profile data:", err);
                setError("Could not load profile. Using fallback data.");
                setProfileData(dummyProfile); 
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, []); 

    // --- Handlers ---
    const handlePhotoChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = reader.result;
                
                // SAVE TO LOCAL STORAGE
                localStorage.setItem('userProfilePhoto', base64String);
                
                // Update state for immediate display
                setProfileImageUrl(base64String);
            };
            reader.readAsDataURL(file); // Converts file to Base64 string
        }
    };

    const handleAvatarClick = () => { fileInputRef.current.click(); };
    
    const handleRemovePhoto = () => {
        const confirmDelete = window.confirm("Are you sure you want to remove your profile photo?");
        if (confirmDelete) {
            localStorage.removeItem('userProfilePhoto');
            setProfileImageUrl('https://via.placeholder.com/150?text=Upload+Avatar');
            console.log("Profile photo removed.");
        }
    };

    const handleEditClick = () => { setIsEditing(true); };
    const handleCancelEdit = () => { setIsEditing(false); };
    
    const handleSaveProfile = (e) => {
        e.preventDefault();
        // ⚠️ TODO: Implement API PUT request to update profile data here
        console.log("Saving changes to API...");
        setIsEditing(false); 
    };
    
    const getGradeColor = (gpa) => {
        if (gpa >= 3.5) return 'text-green-400';
        if (gpa >= 3.0) return 'text-blue-400';
        return 'text-yellow-400';
    };

    if (loading) {
        return <div className="flex items-center justify-center min-h-screen text-white bg-gray-900">Loading Profile...</div>;
    }

    const { name, id, major, overallGPA, totalCredits } = profileData;

    return (
        <div className="relative min-h-screen p-6 overflow-hidden font-sans text-white sm:p-10 bg-gradient-to-br from-gray-900 via-indigo-950 to-purple-950">
            
            <div className="relative z-10 w-full max-w-4xl p-8 mx-auto transition-transform duration-300 transform bg-white border border-white bg-opacity-10 border-opacity-20 backdrop-filter backdrop-blur-lg rounded-3xl shadow-3d-dark">
                
                <div className="flex items-center justify-between mb-10">
                    <div className="flex items-center">
                        <button onClick={() => navigate('/dashboard')} className="p-2 mr-4 text-white transition-colors duration-200 rounded-full hover:bg-white hover:bg-opacity-20">
                            {/* Back Button SVG */}
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                        </button>
                        <h1 className="flex items-center text-3xl font-extrabold text-white sm:text-4xl">
                            <FaUserCircle className="mr-3 text-pink-400" /> My Student Profile
                        </h1>
                    </div>
                    
                    {/* EDIT PROFILE BUTTON (Conditional) */}
                    {!isEditing && ( 
                        <button onClick={handleEditClick} className="flex items-center px-4 py-2 text-sm font-semibold text-white transition-colors duration-300 bg-indigo-600 rounded-lg shadow-md hover:bg-indigo-700">
                            <FaEdit className="w-4 h-4 mr-2" />
                            Edit Profile
                        </button>
                    )}
                </div>

                {/* Main Profile Card Layout */}
                <div className="flex flex-col p-8 bg-white border shadow-lg md:flex-row bg-opacity-5 rounded-xl border-indigo-500/20">
                    
                    {/* Left Section: Avatar & Basics */}
                    <div className="flex flex-col items-center w-full pb-6 border-b md:w-1/3 md:border-b-0 md:border-r border-indigo-700/50 md:pb-0 md:pr-8">
                        
                        {/* HIDDEN FILE INPUT */}
                        <input type="file" accept="image/*" ref={fileInputRef} onChange={handlePhotoChange} style={{ display: 'none' }} />

                        {/* PROFILE PHOTO AREA (Clickable) */}
                        <div 
                            className="relative flex items-center justify-center w-32 h-32 mb-4 overflow-hidden bg-gray-700 border-4 border-purple-400 rounded-full shadow-xl cursor-pointer group"
                            onClick={handleAvatarClick}
                        >
                            <img src={profileImageUrl} alt="Profile Photo" className="object-cover w-full h-full transition-opacity duration-300 group-hover:opacity-60" />
                            <div className="absolute inset-0 flex items-center justify-center transition-opacity duration-300 bg-black rounded-full opacity-0 bg-opacity-40 group-hover:opacity-100">
                                <FaEdit className="w-6 h-6 text-white" />
                            </div>
                        </div>
                        
                        {/* Remove Photo Button */}
                        {profileImageUrl !== dummyProfile.profileImageUrl && (
                            <button
                                onClick={handleRemovePhoto}
                                className="flex items-center mt-1 text-sm text-red-400 transition-colors hover:text-red-300"
                            >
                                <FaTrashAlt className="w-4 h-4 mr-1" /> Remove Photo
                            </button>
                        )}

                        <h2 className="text-2xl font-bold text-white">{name}</h2>
                        <p className="mt-1 text-sm text-gray-400">{major}</p>
                    </div>

                    {/* Right Section: Conditional Display */}
                    <div className="w-full pt-6 space-y-6 md:w-2/3 md:pt-0 md:pl-8">
                        
                        {isEditing ? (
                            // --- EDIT FORM VIEW ---
                            <form onSubmit={handleSaveProfile} className="space-y-4">
                                <h3 className="pb-2 text-xl font-semibold text-pink-400 border-b border-gray-600">Edit Details</h3>
                                
                                <input type="text" placeholder="Full Name" defaultValue={name} className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-blue-400 focus:border-blue-400"/>
                                <input type="text" placeholder="Major" defaultValue={major} className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-blue-400 focus:border-blue-400"/>
                                
                                <div className="flex justify-end pt-2 space-x-3">
                                    <button type="button" onClick={handleCancelEdit} className="px-4 py-2 text-sm text-gray-300 bg-gray-700 rounded-lg hover:bg-gray-600">
                                        Cancel
                                    </button>
                                    <button type="submit" className="px-4 py-2 text-sm font-bold text-white bg-green-600 rounded-lg hover:bg-green-700">
                                        Save Changes
                                    </button>
                                </div>
                            </form>
                            
                        ) : (
                            // --- METRICS VIEW (Original Display) ---
                            <>
                                <h3 className="pb-2 text-xl font-semibold text-blue-400 border-b border-gray-600">Academic Metrics</h3>
                                
                                {/* ID Card */}
                                <div className="flex items-center p-3 bg-gray-800 rounded-lg shadow-md">
                                    <FaIdCard className="w-6 h-6 mr-4 text-yellow-400" />
                                    <div><p className="text-sm text-gray-400">Student ID</p><p className="text-lg font-bold">{id}</p></div>
                                </div>

                                {/* GPA */}
                                <div className="flex items-center p-3 bg-gray-800 rounded-lg shadow-md">
                                    <FaTrophy className="w-6 h-6 mr-4 text-green-400" />
                                    <div><p className="text-sm text-gray-400">Overall Cumulative GPA</p><p className={`text-lg font-bold ${getGradeColor(overallGPA)}`}>{overallGPA ? overallGPA.toFixed(2) : 'N/A'}</p></div>
                                </div>

                                {/* Credits */}
                                <div className="flex items-center p-3 bg-gray-800 rounded-lg shadow-md">
                                    <span className="mr-4 text-2xl font-extrabold text-white">C</span>
                                    <div><p className="text-sm text-gray-400">Total Credits Earned</p><p className="text-lg font-bold">{totalCredits}</p></div>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;