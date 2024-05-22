import React from 'react';
import { useSelector } from 'react-redux';
import { selectloggedInUser } from '../../auth/authSlice';

const UserProfile = () => {
  const user=useSelector(selectloggedInUser);
  console.log(user);
  return (
    <div className='flex flex-col overflow-hidden'>
      <main className='flex-grow bg-gray-100 py-5'>
        <div className='container mx-auto h-full flex flex-col justify-center'>
          <div className='flex justify-center items-center h-full'>
            <div className='bg-white rounded-lg shadow-md w-full md:w-1/2 lg:w-2/3'>
              <div className='flex flex-col md:flex-row'>
                <div className='bg-gradient-custom text-center text-white rounded-tl-lg rounded-bl-lg flex flex-col items-center justify-center p-4 md:w-1/3'>
                  <img
                    src={user.avatar}
                    alt='Avatar'
                    className='rounded-full w-20 h-20 mb-4'
                  /> 
                   <h5 className='text-lg'>{user.FName}{' '}{user.LName}</h5> 
                 
                  <span className='mt-5 text-gray-300 cursor-pointer'>✏️</span>
                </div>
                <div className='p-4 md:w-2/3'>
                  <h6 className='text-lg font-semibold'>Information</h6>
                  <hr className='my-4' />
                  <div className='flex flex-wrap mb-4'>
                    <div className='w-1/2 mb-4'>
                      <h6 className='text-sm font-medium'>Email</h6>
                      <p className="text-gray-600 sm:truncate sm:overflow-hidden sm:text-wrap break-all">{user.email}</p>

                    </div>
                    <div className='w-1/2 mb-4'>
                      <h6 className='text-sm  font-medium'>Phone</h6>
                      <p className='text-gray-600'>{user.phone_no}</p>
                    </div>
                  </div>
                  <h6 className='text-lg font-semibold'>More Information</h6>
                  <hr className='my-4' />
                  <div className='flex flex-wrap mb-4'>
                    <div className='w-1/2 mb-4'>
                      <h6 className='text-sm font-medium'>Username</h6>
                      <p className='text-gray-600'>{user.username}</p>
                    </div>
                    <div className='w-1/2 mb-4'>
                      <h6 className='text-sm font-medium'>Role</h6>
                      <p className='text-gray-600'>{user.role}</p>
                    </div>
                  </div>
                  <div className='flex justify-start space-x-3'>
                    <a href='#!' className='text-blue-600'>
                      <i className='fab fa-facebook fa-lg'></i>
                    </a>
                    <a href='#!' className='text-blue-400'>
                      <i className='fab fa-twitter fa-lg'></i>
                    </a>
                    <a href='#!' className='text-pink-500'>
                      <i className='fab fa-instagram fa-lg'></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default UserProfile;
