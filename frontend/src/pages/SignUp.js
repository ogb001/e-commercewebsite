import React, { useState } from 'react';
import { FaRegCircleUser } from "react-icons/fa6";
import { FaEye } from "react-icons/fa";
import { IoEyeOff } from "react-icons/io5";
import { Link, useNavigate } from 'react-router-dom'; // Corrected useNavigate
import imageToBase64 from '../helpers/imageTobase64';
import loginIcons from '../asset/images.jpeg';
import summaryApi from '../common';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import toastify styles

function SignUp() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        profilePic: ""
    });

    const navigate = useNavigate(); // Corrected useNavigate

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleUploadPic = async (e) => {
        const file = e.target.files[0];
        if (file) {
            try {
                const imagePic = await imageToBase64(file);
                setFormData((prev) => ({
                    ...prev,
                    profilePic: imagePic
                }));
                console.log("imagePic", imagePic);
            } catch (error) {
                console.error("Error converting image to Base64:", error);
            }
        }
    };

    const handleOnSubmit = async (e) => {
        e.preventDefault();

        if (formData.password === formData.confirmPassword) {
            try {
                const response = await fetch(summaryApi.SignUp.url, {
                    method: summaryApi.SignUp.method,
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(formData),
                });

                const dataResponse = await response.json();

                if (dataResponse.success) {  // Corrected to use dataResponse
                    toast.success("User created successfully!"); // Display success message
                    navigate("/login"); // Navigate to login page after success
                } else {
                    toast.error(dataResponse.message || "Signup failed.");
                }

                console.log("Submitted data:", dataResponse);

            } catch (error) {
                console.error("Error submitting the form:", error);
                toast.error("User already exists.");
            }
        } else {
            toast.error("Please check password and confirm password.");
        }
    };

    return (
        <section id='sign-up'>
            <div className='mx-auto container p-4'>
                <div className='bg-white p-2 w-full max-w-md mx-auto'>
                    <div className='w-20 h-20 mx-auto text-red-600 text-4xl relative overflow-hidden rounded-full'>
                        <FaRegCircleUser />
                        <div className='absolute inset-0 flex items-center justify-center'>
                            <img src={formData.profilePic || loginIcons} alt='Profile icon' className='object-cover w-full h-full' />
                        </div>
                        <label>
                            <input
                                type='file'
                                className='hidden'
                                onChange={handleUploadPic}
                            />
                            <div className='text-xs bg-opacity-90 bg-slate-200 pb-4 pt-1 text-center cursor-pointer absolute bottom-0 w-full'>
                                Upload Photo
                            </div>
                        </label>
                    </div>

                    <form className='pt-6 flex flex-col gap-2' onSubmit={handleOnSubmit}>
                        <div className='grid'>
                            <label>Name :</label>
                            <div className='bg-slate-100 p-2 flex'>
                                <input
                                    type='text'
                                    placeholder='Enter your name'
                                    name='name'
                                    value={formData.name}
                                    onChange={handleOnChange}
                                    required
                                    className='w-full h-full outline-none bg-transparent'
                                />
                            </div>
                        </div>

                        <div className='grid'>
                            <label>Email :</label>
                            <div className='bg-slate-100 p-2 flex'>
                                <input
                                    type='email'
                                    placeholder='Enter your email'
                                    name='email'
                                    value={formData.email}
                                    onChange={handleOnChange}
                                    required
                                    className='w-full h-full outline-none bg-transparent'
                                />
                            </div>
                        </div>

                        <div>
                            <label>Password :</label>
                            <div className='bg-slate-100 p-2 flex'>
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder='Enter password'
                                    name='password'
                                    value={formData.password}
                                    onChange={handleOnChange}
                                    required
                                    className='w-full h-full outline-none bg-transparent'
                                />
                                <div
                                    className='cursor-pointer'
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    <span>
                                        {showPassword ? <IoEyeOff /> : <FaEye />}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div>
                            <label>Confirm Password :</label>
                            <div className='bg-slate-100 p-2 flex'>
                                <input
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    placeholder='Confirm your password'
                                    name='confirmPassword'
                                    value={formData.confirmPassword}
                                    onChange={handleOnChange}
                                    required
                                    className='w-full h-full outline-none bg-transparent'
                                />
                                <div
                                    className='cursor-pointer'
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                >
                                    <span>
                                        {showConfirmPassword ? <IoEyeOff /> : <FaEye />}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <button
                            type='submit'
                            className='bg-red-600 text-white px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-6'
                        >
                            Sign Up
                        </button>
                    </form>
                    <p className='my-5'>
                        Already have an account?
                        <Link to={"/login"} className='hover:text-red-700 text-red-600 hover:underline'>Login</Link>
                    </p>
                </div>
            </div>
        </section>
    );
}

export default SignUp;
