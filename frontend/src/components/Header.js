import React from 'react';
import { Link } from 'react-router-dom';
import Logo from './Logo';
import { FaSearch, FaShoppingCart } from "react-icons/fa";
import { FaCircleUser } from "react-icons/fa6";
import { useSelector } from 'react-redux';
import summaryApi from '../common';
import { toast } from 'react-toastify'
// import { isButtonElement } from 'react-router-dom/dist/dom';


function Header() {
  const user = useSelector(state => state.user.user);

  console.log("user header", user);


  const handleLogout = async () =>{
    const fetchData = await fetch(summaryApi.logout_user.url, {
      method : summaryApi.logout_user.method,
      credentials : 'include'
    })

      const data = await fetchData.json()


      if(data.success){
        toast.success(data.message)
      }

      if(data.error){
        toast.error(data.message)
      }
  }



  return (
    <header className="h-16 shadow-md bg-white">
      <div className="h-full container mx-auto flex items-center px-4 justify-between">
        {/* Logo and Home Link */}
        <div>
          <Link to="/">
            <Logo width={90} height={50} />
          </Link>
        </div>

        {/* Search Bar */}
        <div className="hidden lg:flex items-center justify-between max-w-sm border rounded-full focus-within:shadow-md">
          <input
            type="text"
            placeholder="Search product here..."
            className="w-full outline-none pl-2"
          />
          <div className="text-lg min-w-[50px] h-8 bg-red-600 flex items-center justify-center rounded-r-full text-white">
            <FaSearch />
          </div>
        </div>

        {/* User Icons and Buttons */}
        <div className="flex items-center gap-7">
          <div className="text-3xl cursor-pointer">
            {
              user?.profilePic ? (
                <img src={user?.profilePic} className='w-10 h-10 rounded-full' alt={user?.name} />
              ) : (
                <FaCircleUser />
              )
            }
            
          </div>

          <div className="text-2xl relative">
            <span><FaShoppingCart /></span>
            <div className="bg-red-600 text-white w-5 h-5 rounded-full p-1 flex items-center justify-center absolute -top-2 right-3">
              <p className="text-sm">0</p>
            </div>
          </div>

          <div>
            {
              user?._id ? (
                <button>logout</button>
              )
              : (
              <Link to="/login" className="px-3 py-1 rounded-full bg-red-600 text-white hover:bg-red-700">Login</Link>
              )
            }

          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;