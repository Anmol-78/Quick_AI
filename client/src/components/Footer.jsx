import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
   <footer className="px-6 md:px-16 lg:px-24 xl:px-32 mt-auto pt-8 h-full bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 text-gray-800 border-t border-gray-200">
    <div className="flex flex-col md:flex-row justify-between w-full gap-10 border-b border-gray-300/50 pb-6">
        <div className="md:max-w-96">
            <img className="h-9" src={assets.logo} 
            alt="dummyLogoDark" />
            <p className="mt-6 text-sm text-gray-600 leading-relaxed">
                Experience the power of AI with QuickAi. <br />
                Transform your content creation with our suite of premium AI tools.
                Write articles, generate images, and enhance your workflow.
            </p>
        </div>
        <div className="flex-1 flex items-start md:justify-end gap-20">
            <div>
                <h2 className="font-semibold mb-5 text-gray-900">Company</h2>
                <ul className="text-sm space-y-3">
                    <li><a href="#" className="text-gray-600 hover:text-indigo-600 transition-colors duration-200">Home</a></li>
                    <li><a href="#" className="text-gray-600 hover:text-indigo-600 transition-colors duration-200">About us</a></li>
                    <li><a href="#" className="text-gray-600 hover:text-indigo-600 transition-colors duration-200">Contact us</a></li>
                    <li><a href="#" className="text-gray-600 hover:text-indigo-600 transition-colors duration-200">Privacy policy</a></li>
                </ul>
            </div>
            <div>
                <h2 className="font-semibold text-gray-900 mb-5">Subscribe to our newsletter</h2>
                <div className="text-sm space-y-2">
                    <p className="text-gray-600">The latest news, articles, and resources, sent to your inbox weekly.</p>
                    <div className="flex items-center gap-2 pt-4">
                        <input className="border border-gray-300 bg-white placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none w-full max-w-64 h-9 rounded-lg px-3 text-gray-900 shadow-sm" type="email" placeholder="Enter your email" />
                        <button className="bg-indigo-600 hover:bg-indigo-700 w-24 h-9 text-white rounded-lg cursor-pointer transition-colors duration-200 font-medium shadow-sm">
                            Subscribe</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <p className="pt-4 text-center text-xs md:text-sm pb-5 text-gray-500">
        Copyright 2025 © QuickAi. All Right Reserved.
    </p>
</footer>
  )
}

export default Footer