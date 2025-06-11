"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "@/components/ui/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Users, DollarSign, Eye } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const iconMap = {
  BookOpen: <BookOpen className="h-6 w-6" />,
  Users: <Users className="h-6 w-6" />,
  DollarSign: <DollarSign className="h-6 w-6" />,
};

const InstructorDashboard = () => {
  const [stats, setStats] = useState([]);
  const [courses, setCourses] = useState([]);
  const [enrollments, setEnrollments] = useState([]);

  const defaultStats = [
    { title: "Total Students", value: 0, icon: "Users", color: "bg-blue-500" },
    { title: "Courses Published", value: 0, icon: "BookOpen", color: "bg-green-500" },
    { title: "Total Revenue", value: "$0", icon: "DollarSign", color: "bg-purple-500" },
  ];

  const displayStats = stats.length > 0 ? stats : defaultStats;
  const token = localStorage.getItem("token");

  const calculateStats = (courses, enrollments) => {
    const totalStudents = new Set(enrollments.map(e => e.student_id)).size;
    const coursesPublished = courses.length;
    const totalRevenue = enrollments.reduce((acc, e) => acc + (e.amount || 0), 0);

    return [
      { title: "Total Students", value: totalStudents, icon: "Users", color: "bg-blue-500" },
      { title: "Courses Published", value: coursesPublished, icon: "BookOpen", color: "bg-green-500" },
      { title: "Total Revenue", value: `$${totalRevenue}`, icon: "DollarSign", color: "bg-purple-500" },
    ];
  };

  const fetchInstructorData = async () => {
    try {
      if (!token) {
        toast({ title: "Authentication Error", description: "No token found in localStorage." });
        return;
      }

      const headers = {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      };

      const [coursesRes, enrollmentsRes] = await Promise.all([
        axios.get("http://127.0.0.1:8000/api/courses", { headers }),
        axios.get("http://127.0.0.1:8000/api/enrollments", { headers }),
      ]);

      setCourses(coursesRes.data);
      setEnrollments(enrollmentsRes.data);

      const updatedStats = calculateStats(coursesRes.data, enrollmentsRes.data);
      setStats(updatedStats);
    } catch (error) {
      console.error("Error fetching instructor data:", error);
      toast({ title: "Fetch Error", description: "Failed to fetch instructor data." });
    }
  };

  useEffect(() => {
    fetchInstructorData();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="container mx-auto py-8 px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Instructor Dashboard</h1>
          <p className="text-slate-600">Welcome back! Here's what's happening with your courses.</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {displayStats.map((stat, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-600 mb-1">{stat.title}</p>
                    <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
                  </div>
                  <div className={`${stat.color} text-white p-3 rounded-xl`}>
                    {iconMap[stat.icon]}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Active Courses */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  Active Courses
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {courses.map((course, index) => (
                    <div key={index} className="border border-slate-200 rounded-lg p-4 hover:bg-slate-50">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold text-slate-900">{course.title}</h3>
                        <Badge variant={course.status === "Published" ? "default" : "secondary"}>
                          {course.status}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-6 text-sm text-slate-600 mb-3">
                        <span>
                          {course.students} students
                        </span>
                        <span>
                          {course.lessons} lessons
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Side Panel */}
          <div className="space-y-6">
            {/* Enrollments */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Recent Enrollments
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {enrollments.map((enrollment, index) => (
                    <div key={index} className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-50">
                      <div className="w-8 h-8 bg-indigo-500 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                        {enrollment.name.charAt(0)}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-slate-900 text-sm">{enrollment.name}</p>
                        <p className="text-xs text-slate-600">{enrollment.course}</p>
                        <p className="text-xs text-slate-500">{enrollment.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstructorDashboard;
