import React, { useState, useEffect } from 'react'
import { dummyCreationData } from '../assets/assets'
import { Gem, Sparkles, User } from 'lucide-react'
import { Protect, useUser } from '@clerk/clerk-react'
import CreationItems from '../components/CreationItems'
import axios from 'axios'
import { useAuth } from '@clerk/clerk-react'
import toast from 'react-hot-toast'


axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const Dashboard = () => {

  const [creations, setCreations] = useState([])
  const [loading, setLoading] = useState(true)

  const {getToken} = useAuth();
  const { user } = useUser(); // Get user data from Clerk

  // Debug: Log user data to see what's available
  useEffect(() => {
    if (user) {
      console.log('User data:', user);
      console.log('Image URL:', user.imageUrl);
      console.log('Profile Image URL:', user.profileImageUrl);
      console.log('Has image:', user.hasImage);
      
      // Test if the image URL is accessible
      if (user.imageUrl) {
        const testImg = new Image();
        testImg.onload = () => console.log('Image loaded successfully');
        testImg.onerror = (e) => console.log('Image failed to load:', e);
        testImg.src = user.imageUrl;
      }
    }
  }, [user]);

  const getDashboardData = async () => {
    try {
      const {data} = await axios.get('/api/user/get-user-creations', {
        headers: {
          Authorization: `Bearer ${await getToken()}`
        }
      });
      if (data.success) {
        setCreations(data.creations);
      } else {
        toast.error(data.message || "Failed to fetch dashboard data");
      }
    } catch (error) {
      toast.error("An error occurred while fetching dashboard data");
    }
    setLoading(false);
  }

  useEffect(() => {
    getDashboardData()
  }, [])
  

  return (
    <div className="h-full overflow-y-scroll p-6 flex flex-col">
      {/* User Profile Section */}
      <div className="flex items-center gap-4 mb-6 p-4 bg-white rounded-xl border border-gray-200">
        <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
          {user?.imageUrl ? (
            <img 
              src={user.imageUrl} 
              alt="Profile" 
              className="w-full h-full object-cover"
              onLoad={() => console.log('Top image loaded successfully')}
              onError={(e) => {
                console.log('Top image failed to load:', e.target.src);
                // Try to extract Google image from external accounts
                const googleAccount = user?.externalAccounts?.find(acc => acc.provider === 'google');
                if (googleAccount?.imageUrl) {
                  console.log('Trying Google image:', googleAccount.imageUrl);
                  e.target.src = googleAccount.imageUrl;
                } else {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }
              }}
            />
          ) : null}
          <User className={`w-8 h-8 text-gray-400 ${user?.imageUrl ? 'hidden' : 'block'}`} />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-slate-700">
            Welcome back, {user?.username || user?.primaryEmailAddress?.emailAddress?.split('@')[0] || user?.firstName || 'User'}!
          </h3>
          <p className="text-sm text-slate-500">
            {user?.primaryEmailAddress?.emailAddress || 'Continue creating amazing content'}
          </p>
        </div>
      </div>

      <div className="flex justify-start gap-4 flex-wrap">
        {/* Total Creations Card */}
        <div className="flex justify-between items-center w-72 p-4 px-6 bg-white
                       rounded-xl border border-gray-200">
          <div className='text-slate-600'>
            <p className='text-sm'>Total Creations</p>
            <h2 className='text-xl font-semibold'>{creations.length}</h2>
          </div>
          <div className='w-10 h-10 rounded-lg bg-gradient-to-br from-[#3588F2] to-[#0BB0D7]
          text-white flex justify-center items-center'>
            <Sparkles className='w-5 text-white'/>
          </div>
        </div>

          {/*  Active Plan Card */}

         <div className="flex justify-between items-center w-72 p-4 px-6 bg-white
                       rounded-xl border border-gray-200">
          <div className='text-slate-600'>
            <p className='text-sm'>Active Plan</p>
            <h2 className='text-xl font-semibold'>
             <Protect plan='premium' fallback= "Free">
                                     Premium
                                    </Protect>
            </h2>
          </div>
          <div className='w-10 h-10 rounded-lg bg-gradient-to-br from-[#FF61C5] to-[#9E53EE]
          text-white flex justify-center items-center'>
            <Gem className='w-5 text-white'/>
          </div>
        </div>
      </div>

      {loading ? (
          <div className='flex justify-center items-center h-3/4'> 
            <div className='w-11 h-11 rounded-full border-3 border-purple-500
                    border-t-transparent animate-spin'></div>
          </div>
      ):(
         <div className='space-y-3'>
        <p className='mt-6 mb-4'>Recent Creations</p>
        {
          creations.map((item) =><CreationItems key={item.id} item={item}/>)
        }
      </div>
      )}


      {/* Simple User Profile Footer */}
      <div className="fixed bottom-0 left-0 w-64 p-4 bg-white border-t border-gray-200">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
            {user?.imageUrl ? (
              <img 
                src={user.imageUrl} 
                alt="Profile" 
                className="w-full h-full object-cover"
                onLoad={() => console.log('Bottom image loaded successfully')}
                onError={(e) => {
                  console.log('Bottom image failed to load:', e.target.src);
                  // Try to extract Google image from external accounts
                  const googleAccount = user?.externalAccounts?.find(acc => acc.provider === 'google');
                  if (googleAccount?.imageUrl) {
                    console.log('Trying Google image for bottom:', googleAccount.imageUrl);
                    e.target.src = googleAccount.imageUrl;
                  } else {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }
                }}
              />
            ) : null}
            <User className={`w-4 h-4 text-gray-400 ${user?.imageUrl ? 'hidden' : 'block'}`} />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-slate-700 truncate">
              {user?.username || user?.primaryEmailAddress?.emailAddress?.split('@')[0] || user?.firstName || 'User'}
            </p>
            <p className="text-xs text-slate-500">Free Plan</p>
          </div>
        </div>
      </div>
     
    </div>

  )
}

export default Dashboard