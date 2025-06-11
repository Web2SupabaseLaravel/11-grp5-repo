import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route ,useLocation } from "react-router-dom";
import { AuthProvider, UserRole } from "@/pages/Auth/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import Navbar from "@/components/Navbar";


// Pages
import SignInPage from "./pages/Auth/SignInPage";
import RegisterPage from "./pages/Auth/RegisterPage";
import ForgotPasswordPage from "./pages/Auth/ForgotPasswordPage";
import ResetPasswordPage from "./pages/Auth/ResetPasswordPage";
import Index from "./pages/Guest/Index";
import Courses from "./pages/Guest/Courses";
import CourseDetails from "./pages/Guest/CourseDetails";
import NotFound from "./pages/Guest/NotFound";
import ProfilePage from "./pages/ProfilePage";
import SettingsPage from "./pages/SettingsPage";
import AboutPage from "./pages/Guest/AboutPage";
import ContactPage from "./pages/Guest/ContactPage";
import Community from "./pages/student/Community";

import AdminDashboard from "./pages/admin/AdminDashboard";
import UserManagementPage from "./pages/admin/UserManagementPage";
import CourseManagementPage from "./pages/admin/CourseManagementPage";
import LessonManagementPage from "./pages/admin/LessonManagementPage";
import QuizManagementPage from "./pages/admin/QuizManagementPage";
import AdminAnalytics from "./pages/admin/AdminAnalyticts";

import InstructorDashboard from "./pages/instructor/InstructorDashboard";
import InstructorCoursesPage from "./pages/instructor/InstructorCoursesPage";
import InstructorQuizzes from "./pages/instructor/InstructorQuizzes";
import InstructorLessons from "./pages/instructor/InstructorLessons";
import InstructorEarnings from "./pages/instructor/InstructorEarnings";
import InstructorStudents from "./pages/instructor/InstructorStudents";
import InstructorMessages from "./pages/instructor/InstructorMessages";
import InstructorAnalytics from "./pages/instructor/InstructorAnalytics";

import StudentDashboard from "./pages/student/StudentDashboard";
import StudentCoursesPage from "./pages/student/StudentCoursesPage";
import MyProgress from "./pages/student/MyProgress";
import MyCertificates from "./pages/student/MyCertificates";
import Notifications from "./pages/Notifications";
import Wishlist from "./pages/student/Wishlist";
import Discussions from "./pages/student/Discussions";
import Quizzes from "./pages/student/MyQuizzes";
import MySchedule from "./pages/student/MySchedule";
import MyActivity from "./pages/student/MyActivity";
import MyQuizzes from "./pages/student/MyQuizzes";
import ConfirmEmailPage from "./pages/Auth/ConfirmEmailPage";  

const queryClient = new QueryClient();
const App: React.FC = () => (
  <BrowserRouter>
    <AppContent />
  </BrowserRouter>
);

const AppContent: React.FC = () => {
  const location = useLocation();
  const hideNavbarRoutes = ["/login", "/register", "/forgot-password"];
  const shouldHideNavbar = hideNavbarRoutes.includes(location.pathname);

  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          {!shouldHideNavbar && <Navbar />}
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/course/:id" element={<CourseDetails />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/reset-password" element={<ResetPasswordPage />} />
            
            <Route path="/confirm-email" element={<ConfirmEmailPage />} />

            <Route path="/login" element={<SignInPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />

            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/community" element={<Community />} />

            <Route element={<ProtectedRoute allowedRoles={["admin"] as UserRole[]} />}>
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path="/admin/users" element={<UserManagementPage />} />
              <Route path="/admin/courses" element={<CourseManagementPage />} />
              <Route path="/admin/lessons" element={<LessonManagementPage />} />
              <Route path="/admin/quizzes" element={<QuizManagementPage />} />
              <Route path="/admin/analytics" element={<AdminAnalytics />} />
            </Route>

            <Route element={<ProtectedRoute allowedRoles={["instructor"] as UserRole[]} />}>
              <Route path="/instructor/dashboard" element={<InstructorDashboard />} />
              <Route path="/instructor/courses" element={<InstructorCoursesPage />} />
              <Route path="/instructor/quizzes" element={<InstructorQuizzes />} />
              <Route path="/instructor/lessons" element={<InstructorLessons />} />
              <Route path="/instructor/Earning" element={<InstructorEarnings />} />
              <Route path="/instructor/analytics" element={<InstructorAnalytics />} />
              <Route path="/instructor/students" element={<InstructorStudents />} />
              <Route path="/instructor/messages" element={<InstructorMessages />} />
            </Route>

            <Route element={<ProtectedRoute allowedRoles={["student"] as UserRole[]} />}>
              <Route path="/student/dashboard" element={<StudentDashboard />} />
              <Route path="/student/my-courses" element={<StudentCoursesPage />} />
              <Route path="/student/my-progress" element={<MyProgress />} />
              <Route path="/student/my-certificates" element={<MyCertificates />} />
              <Route path="/student/notifications" element={<Notifications />} />
              <Route path="/student/wishlist" element={<Wishlist />} />
              <Route path="/student/discussions" element={<Discussions />} />
              <Route path="/student/my-quizzes" element={<MyQuizzes />} />
              <Route path="/student/my-schedule" element={<MySchedule />} />
              <Route path="/student/my-activity" element={<MyActivity />} />
            </Route>
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          </Routes>
        </TooltipProvider>
      </QueryClientProvider>
    </AuthProvider>
  );
};

export default App;
