import React from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import {

  CircleUser,

  Home,

  Menu,

} from "lucide-react"
import { Link, useNavigate } from 'react-router-dom'
import { sidebar } from '../Sidebar/data'
import { SidebarItem } from '../Sidebar'

const Navbar = () => {

  const navigate = useNavigate()

  return (
    <header className="animate__animated animate__backInUp flex h-14 items-center gap-4 bg-muted/40 px-4 lg:h-[60px] lg:px-6">
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="shrink-0 md:hidden"
          >
            <Menu className="h-5 w-5" />

          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="flex flex-col">
          <nav className="grid gap-2 text-lg font-medium">
            <Link
              to="#"
              className="flex items-center gap-2 text-lg font-semibold"
            >
        
              <span className="sr-only">সলিড</span>
            </Link>


            {sidebar.map((sidebarNavigation, index) => (
              <SidebarItem key={index} item={sidebarNavigation} />
            ))}

          </nav>
          
        </SheetContent>
      </Sheet>
      <div className="w-full flex-1"></div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="secondary" size="icon" className="rounded-full">
            <CircleUser className="h-5 w-5" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>My Account</DropdownMenuLabel> 
        
          <DropdownMenuItem onClick={() => navigate('/profile')} >Profile</DropdownMenuItem>
          <DropdownMenuItem onClick={() => navigate('/profile/settings')} >Settings</DropdownMenuItem>
            
            {/* Only for make the it easy to go to the login page  */}
          <DropdownMenuItem onClick={() => navigate('/login')} >Login</DropdownMenuItem>
          <DropdownMenuItem>Logout</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  )
}

export default Navbar
