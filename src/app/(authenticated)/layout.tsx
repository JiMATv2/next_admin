'use client'
import Sidebar from '@/components/Sidebar'
import { Button } from '@/components/ui/button'
import { Box, CreditCard, DollarSign, HomeIcon, LogOut, MapPin, Megaphone, Package, Scale, Settings, ShoppingBag, Tag, UserIcon, Users } from 'lucide-react'
import ProtectedRoute from '@/components/ProtectedRoute'
import Link from 'next/link'
import { Toaster } from '@/components/ui/toaster'


export default function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode
}) {




  interface NavItem {
    name: string
    href: string
    icon: React.ElementType
    countKey?: string
  }
  
  interface NavGroup {
    name: string
    items: NavItem[]
  }
  
  
  const navGroups: NavGroup[] = [
    {
      name: "Dashboard",
      items: [
        { name: "Overview", href: "/dashboard", icon: HomeIcon },
      ]
    },
    {
      name: "Sellers",
      items: [
        { name: "Sellers", href: "/sellers", icon: Users, countKey: "total_sellers" },
        { name: "Membership Packages", href: "/membership_packages", icon: Package },
        { name: "Payments", href: "/payments", icon: CreditCard },
        { name: "Paid Memberships", href: "/paid_memberships", icon: ShoppingBag },
      ]
    },
    {
      name: "Buyers",
      items: [
        { name: "Buyers", href: "/buyers", icon: Users },
  
      ]
    },
    {
      name: "Products",
      items: [
        { name: "Brands", href: "/brands", icon: Box },
        { name: "Categories", href: "/categories", icon: Box },
        { name: "Products", href: "/products", icon: Box },
        { name: "Variants", href: "/variants", icon: Tag },
        { name: "Unit of Measurement", href: "/unit_measurements", icon: Scale },
        { name: "Price Groups", href: "/price_groups", icon: DollarSign },
      ]
    },
    {
      name: "Operations",
      items: [
        { name: "Locations", href: "/locations", icon: MapPin },
        { name: "Marketing Campaigns", href: "/marketing_campaigns", icon: Megaphone },
        { name: "Marketing Banners", href: "/marketing_banners", icon: Megaphone },
        { name: "Participating Products", href: "/marketing_banner_products", icon: Megaphone },
        { name: "Staffs", href: "/staffs", icon: Users },
      ]
    },
    {
      name: "System",
      items: [
        { name: "Settings", href: "/settings", icon: Settings },
        { name: "Banner Positions", href: "/banner_positions", icon: Settings },
        { name: "Roles", href: "/roles", icon: Settings },
        { name: "App Routes", href: "/app_routes", icon: Settings },
        { name: "Logout", href: "/login", icon: LogOut },
      ]
    }
  ]

  return (
    <ProtectedRoute>
      <div className="flex h-screen bg-gray-100">
        <Sidebar sidebarTitle={'JimatAdmin'} sidebarSubtitle={'Admin Dashboard'} navGroups={navGroups} />
        <div className="flex flex-col flex-1 overflow-hidden">
          <header className="bg-white shadow-sm z-10">
            <div className="max-w mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
              <h1 className="text-2xl font-semibold text-gray-900"></h1>
              <Link href="/profile" passHref>
                <Button variant="ghost" size="sm" className="flex items-center space-x-2">
                  <UserIcon className="h-5 w-5" />
                  <span>Profile</span>
                </Button>
              </Link>
            </div>
          </header>
          <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
            <div className='bg-white p-8 shadow rounded'>


              {children}
            </div>
          </main>
        </div>
      </div>
      <Toaster />
    </ProtectedRoute>
  )
}