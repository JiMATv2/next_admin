'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { HomeIcon, BoxIcon, UsersIcon, BarChartIcon, SettingsIcon, MenuIcon, LogInIcon, ShoppingBagIcon } from 'lucide-react'

export default function Sidebar() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)

  return (
    <nav className={`bg-white shadow-md transition-all duration-300 ${isSidebarCollapsed ? 'w-16' : 'w-64'}`}>
      <div className="p-4 flex justify-between items-center">
        {!isSidebarCollapsed && <h1 className="text-2xl font-bold text-gray-800">Seller Portal</h1>}
        <Button variant="ghost" size="icon" onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}>
          <MenuIcon className="h-6 w-6" />
        </Button>
      </div>
      <ul className="space-y-2 py-4">
        <li>
          <Link href="/dashboard" className={`flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-gray-200 ${isSidebarCollapsed ? 'justify-center' : ''}`}>
            <HomeIcon className="h-5 w-5" />
            {!isSidebarCollapsed && <span>Dashboard</span>}
          </Link>
        </li>
        <li>
          <Link href="/sellers" className={`flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-gray-200 ${isSidebarCollapsed ? 'justify-center' : ''}`}>
            <ShoppingBagIcon className="h-5 w-5" />
            {!isSidebarCollapsed && <span>Sellers</span>}
          </Link>
        </li>
        <li>
          <Link href="#" className={`flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-gray-200 ${isSidebarCollapsed ? 'justify-center' : ''}`}>
            <BoxIcon className="h-5 w-5" />
            {!isSidebarCollapsed && <span>Inventory</span>}
          </Link>
        </li>
        <li>
          <Link href="#" className={`flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-gray-200 ${isSidebarCollapsed ? 'justify-center' : ''}`}>
            <UsersIcon className="h-5 w-5" />
            {!isSidebarCollapsed && <span>Customers</span>}
          </Link>
        </li>
        <li>
          <Link href="#" className={`flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-gray-200 ${isSidebarCollapsed ? 'justify-center' : ''}`}>
            <BarChartIcon className="h-5 w-5" />
            {!isSidebarCollapsed && <span>Analytics</span>}
          </Link>
        </li>
        <li>
          <Link href="#" className={`flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-gray-200 ${isSidebarCollapsed ? 'justify-center' : ''}`}>
            <SettingsIcon className="h-5 w-5" />
            {!isSidebarCollapsed && <span>Settings</span>}
          </Link>
        </li>
        <li>
          <Link href="/login" className={`flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-gray-200 ${isSidebarCollapsed ? 'justify-center' : ''}`}>
            <LogInIcon className="h-5 w-5" />
            {!isSidebarCollapsed && <span>Login</span>}
          </Link>
        </li>
      </ul>
    </nav>
  )
}