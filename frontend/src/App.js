import './App.css';
import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from 'react';
import summaryApi from './common';
import Context from './context';
import { useDispatch } from 'react-redux';
import { setUserDetails } from './store/userSlice';
// import { setUserDetails } from './redux/actions'; // Assuming you have a redux action called setUserDetails

function App() {
  const [userDetails, setUserDetailsState] = useState(null);
  const dispatch = useDispatch(); // Initialize the useDispatch hook

  const fetchUserDetails = async () => {
    try {
      const response = await fetch(summaryApi.current_user.url, {
        method: summaryApi.current_user.method,
        credentials: 'include', // Ensure you include credentials for authentication
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const dataApi = await response.json();

      if (dataApi.success) {
        // Set user details in Redux store
        dispatch(setUserDetails(dataApi.data)); // Dispatching to Redux store
        setUserDetailsState(dataApi.data); // Optionally set local state as well
      } else {
        console.error('Failed to fetch user details:', dataApi.message);
      }
    } catch (error) {
      console.error('Error fetching user details:', error);
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, []);

  return (
    <>
      <Context.Provider value={{
        fetchUserDetails, // user details fetch function
        userDetails      // Provide the userDetails in context
      }}>
        <ToastContainer />
        
        <Header />  {/* Logo will be rendered inside Header */}
        <main className='min-h-[calc(120vh - 200px)]'>
          <Outlet />
        </main>
        <Footer /> 
      </Context.Provider>
    </>
  );
}

export default App;