import React, { useEffect } from 'react';
import { createBrowserRouter,RouterProvider} from 'react-router-dom'
import {MenuPage,CartPage, SignUpPage, AboutUsPage, ContactUsPage } from './Pages'
import Logout from './features/auth/Logout';
import CheckoutPage from './Pages/CheckoutPage';
import UserProfilePage from './Pages/UserProfilePage';
import HomePage from './Pages/HomePage';
import { useDispatch } from 'react-redux';
import { verifyTokenAsync } from './features/auth/authSlice';

const router=createBrowserRouter([
  {
    path:'/',
    element:<HomePage/>
  },
{
  path:'/menu',
  element:<MenuPage />
},
{
  path:'/cart',
  element:<CartPage/>
  
},
{
  path:'/signup',
  element:<SignUpPage/>
},
{
  path:'/logout',
  element:<Logout />
},
{
  path:'/checkout',
  element:<CheckoutPage />
},
{
  path:'/userprofile',
  element:<UserProfilePage/>
},
{
  path:'/about-us',
  element:<AboutUsPage/>
},
{
  path:'/contact-us',
  element:<ContactUsPage/>
},




])
function App() {
  // const dispatch=useDispatch();
  // useEffect(()=>{
  //   dispatch(verifyTokenAsync());
  // },[dispatch])
  return (
    <div >
   
  <RouterProvider router={router} />
    </div>
  );
}

export default App;
