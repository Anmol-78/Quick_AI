import React, { useState, useEffect } from 'react'
import { dummyCreationData } from '../assets/assets'
import { Gem, Sparkles } from 'lucide-react'
import { Protect, useAuth, useUser } from '@clerk/clerk-react'
import CreationItems from '../components/CreationItems'
import axios from 'axios'
import toast from 'react-hot-toast';

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL

const Dashboard = () => {

 const [creations, setCreations] = useState([])
 const [loading, setLoading] = useState(true)
 const { getToken } = useAuth()
 const { user } = useUser()

 const getDashboardData = async () => {
   try {
     const {data} = await axios.get('/api/user/get-user-creations', {
       headers :{
         Authorization: `Bearer ${await getToken()}`
       }
     })
     if(data.success){
       setCreations(data.creations)
     }
     else{
       toast.error(data.message)
     }
   } catch (error) {
     toast.error(error.message)
   }
   setLoading(false);
 }

 useEffect(() => {
   getDashboardData()
 }, [])
 

 return (
   <div className="h-full overflow-y-scroll p-4 sm:p-6">
     
     {/* Welcome Section */}
     <div className="mb-4">
       <h1 className="text-lg sm:text-xl font-semibold text-gray-800">
         Welcome back, {user?.firstName || user?.fullName?.split(' ')[0] || 'User'}!
       </h1>
       <p className="text-sm text-gray-600">{user?.primaryEmailAddress?.emailAddress}</p>
     </div>

     {/* Stats Cards */}
     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-5">
       {/* Total Creations Card */}
       <div className="flex justify-between items-center p-3 px-4 bg-white
                      rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
         <div className='text-slate-600'>
           <p className='text-xs'>Total Creations</p>
           <h2 className='text-lg font-semibold'>{creations.length}</h2>
         </div>
         <div className='w-8 h-8 rounded-lg bg-gradient-to-br from-[#3588F2] to-[#0BB0D7]
         text-white flex justify-center items-center'>
           <Sparkles className='w-4 text-white'/>
         </div>
       </div>

       {/* Active Plan Card */}
       <div className="flex justify-between items-center p-3 px-4 bg-white
                      rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
         <div className='text-slate-600'>
           <p className='text-xs'>Active Plan</p>
           <h2 className='text-lg font-semibold'>
            <Protect plan='premium' fallback="Free">
               Premium
             </Protect>
           </h2>
         </div>
         <div className='w-8 h-8 rounded-lg bg-gradient-to-br from-[#FF61C5] to-[#9E53EE]
         text-white flex justify-center items-center'>
           <Gem className='w-4 text-white'/>
         </div>
       </div>

     
     </div>

     {/* Recent Creations */}
     {
       loading ? 
       (
         <div className='flex justify-center items-center h-64'>
           <div className='animate-spin rounded-full h-11 w-11 border-3 border-purple-500 border-t-transparent'></div>
         </div>
       ) : 
       (
         <div className='space-y-3'>
           <p className='text-lg font-medium text-gray-900 mb-4'>Recent Creations</p>
           {creations.length > 0 ? (
             creations.map((item, index) => (
               <CreationItems key={item.id || index} item={item}/>
             ))
           ) : (
             <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-8 text-center">
               <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                 <Sparkles className="w-8 h-8 text-gray-400" />
               </div>
               <h4 className="text-lg font-medium text-gray-700 mb-2">No creations yet</h4>
               <p className="text-gray-500 text-sm">Start creating to see your work here!</p>
             </div>
           )}
         </div>
       )
     }

   </div>
 )
}

export default Dashboard