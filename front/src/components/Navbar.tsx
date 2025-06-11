// src/components/Navbar.tsx
import React, { useState } from "react";
import { useAuth } from "@/pages/Auth/AuthContext";
import { Button } from "@/components/ui/button";
import { Bell, User, Menu, X } from "lucide-react";
import { Link ,useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

const navConfig: Record<string, { label: string; to: string }[]> = {
  guest: [
    { label: "Home", to: "/" },
    { label: "Courses", to: "/courses" },
    { label: "About", to: "/about" },
    { label: "Contact", to: "/contact" },
    
  ],
  student: [
    { label: "Dashboard", to: "/student/dashboard" },
    { label: "Courses", to: "/student/my-courses" },
    { label: "Quizzes", to: "/student/my-quizzes" },
    { label: "Progress", to: "/student/my-progress" },
    { label: "Certificate", to: "/student/my-certificates" },
    { label: "Schedule", to: "/student/my-schedule" },
    { label: "Activity", to: "/student/my-activity" },
    { label: "Wishlist", to: "/student/wishlist" },
    { label: "Discussion", to: "/student/discussions" },
    { label: "Community", to: "/community" },
  ],
  instructor: [
    { label: "Dashboard", to: "/instructor/dashboard" },
    { label: "My Courses", to: "/instructor/courses" },
    { label: "Lessons", to: "/instructor/lessons"},
    { label: "Quizzes", to: "/instructor/quizzes"},
    { label: "Students", to: "/instructor/students"},
    { label: "Messages", to: "/instructor/messages" },
    { label: "Analytics", to: "/instructor/analytics"},
    { label: "Earnings", to: "/instructor/earning" },
  ],
  admin: [
    { label: "Dashboard", to: "/admin/dashboard" },
    { label: "Users", to: "/admin/users" },
    { label: "Courses", to: "/admin/courses" },
    { label: "Lessons", to: "/admin/lessons" },
    { label: "Quizzes", to: "/admin/quizzes" },
    { label: "Analytics", to: "/admin/analytics" },
  ],
};

const Navbar = () => {
  const { user, signout } = useAuth();
  const role = user?.role ?? "guest";
  const items = navConfig[role] ?? navConfig["guest"];
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="bg-white shadow-sm border-b border-secondary/30 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-primary">
            Learning Platform
          </Link>

          
          {/* Desktop Links */}
          <div className="hidden md:flex space-x-8">
            {items.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="text-gray-700 hover:text-primary px-3 py-2 text-sm font-medium transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <>
                {/* Notification button */}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigate("/student/notifications")}
                >
                  <Bell className="h-5 w-5" />
                </Button>

                {/* User dropdown */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <User className="h-5 w-5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-40">
                    <DropdownMenuItem onClick={() => navigate("/profile")}>
                      Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate("/settings")}>
                      Settings
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={signout} className="text-red-600">
                      Sign Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <Link to="/login">
                <Button className="bg-primary hover:bg-primary/90 text-white">
                  Sign In
                </Button>
              </Link>
            )}
          </div>
          {/* Mobile toggle */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
              
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="md:hidden pt-2 pb-3 space-y-1">
            {items.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-primary"
                onClick={() => setMobileOpen(false)}
              >
                {item.label}
              </Link>
            ))}
           {user && (
              <div className="flex items-center space-x-2 px-3 py-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setMobileOpen(false);
                    navigate("/student/notifications");
                  }}
                >
                  <Bell className="h-5 w-5" />
                </Button>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <User className="h-5 w-5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start" className="w-40">
                    <DropdownMenuItem
                      onClick={() => {
                        setMobileOpen(false);
                        navigate("/profile");
                      }}
                    >
                      Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => {
                        setMobileOpen(false);
                        navigate("/settings");
                      }}
                    >
                      Settings
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={() => {
                        setMobileOpen(false);
                        signout();
                      }}
                      className="text-red-600"
                    >
                      Sign Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};


export default Navbar;