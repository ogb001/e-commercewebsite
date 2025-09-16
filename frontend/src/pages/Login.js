import React, { useState, useContext} from 'react';
import { FaRegCircleUser } from "react-icons/fa6";
import { FaEye } from "react-icons/fa";
import { IoEyeOff } from "react-icons/io5";
import { Link, useNavigate } from 'react-router-dom';
// import summaryApi from '../common';
import { toast } from 'react-toastify';
import context from '../context'; // Keeping this as it's being imported

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const { fetchUserDatains } = useContext(context); // Keeping this as per your structure

  // console.log("generalContext", generalContext.fetchUserDatains());

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8080/api/signin', { // Replace with the actual API call
        method: 'POST', // Replace with the correct method
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const dataApi = await response.json();

      if (response.ok) {
        if (dataApi.success) {
          toast.success(dataApi.message);
  
          navigate("/"); // Correctly use navigate function to redirect
          fetchUserDatains()
        } else if (dataApi.error) {
          toast.error(dataApi.message);
        }
      } else {
        toast.error("An unexpected error occurred.");
      }
    } catch (error) {
      toast.error("Failed to connect to the server.");
    }
  };

  console.log("Data login", data);

  return (
    <section id='login'>
      <div className='mx-auto container p-4'>
        <div className='bg-white p-2 w-full max-w-md mx-auto'>
          <div className='w-20 h-20 mx-auto text-black text-4xl'>
            <FaRegCircleUser />
          </div>

          <form className='pt-6 flex flex-col gap-2' onSubmit={handleOnSubmit}>
            <div className='grid'>
              <label>Email:</label>
              <div className='bg-slate-100 p-2 flex'>
                <input
                  type='email'
                  placeholder='Enter email'
                  name='email'
                  value={data.email}
                  onChange={handleOnChange}
                  className='w-full h-full outline-none bg-transparent'
                />
              </div>
            </div>

            <div>
              <label>Password:</label>
              <div className='bg-slate-100 p-2 flex items-center'>
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder='Enter password'
                  value={data.password}
                  name='password'
                  onChange={handleOnChange}
                  className='w-full h-full outline-none bg-transparent'
                />
                <div
                  className='cursor-pointer ml-2'
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <span>
                    {showPassword ? <IoEyeOff /> : <FaEye />}
                  </span>
                </div>
              </div>
              <Link to={"forgot-password"} className='block w-fit ml-auto hover:underline hover:text-red-600'>
                Forgot password?
              </Link>
            </div>

            <button
              type='submit'
              className='bg-red-600 text-white px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-6'
            >
              Login
            </button>
          </form>
          <p className='my-5'>
            Don't have an account?{' '}
            <Link to={"/sign-up"} className='hover:text-red-700 text-red-600 hover:underline'>
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}

export default Login;


