import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, Calendar, Award, TrendingUp, Clock } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

const StudentDashboard = () => {
  const [stats, setStats] = useState([]);
  const [courses, setCourses] = useState([]);
  const [lessons, setLessons] = useState([]);

  useEffect(() => {
    // جلب الإحصائيات
    axios.get('http://127.0.0.1:8000/api/student/stats')
      .then(res => setStats(res.data))
      .catch(err => console.error('Failed to load stats:', err));

    // جلب الدورات
    axios.get('http://127.0.0.1:8000/api/student/courses')
      .then(res => setCourses(res.data))
      .catch(err => console.error('Failed to load courses:', err));

    // جلب الدروس القادمة
    axios.get('http://127.0.0.1:8000/api/upcoming-lessons')
      .then(res => setLessons(res.data))
      .catch(err => console.error('Failed to load lessons:', err));
  }, []);

  const iconMap = {
    "BookOpen": BookOpen,
    "Calendar": Calendar,
    "Award": Award,
    "TrendingUp": TrendingUp,
    "Clock": Clock,
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Student Dashboard</h1>
          <p className="text-gray-600">Welcome back, continue your learning journey!</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {(stats.length ? stats : [
            { title: "Enrolled Courses", value: "0", icon: "BookOpen", color: "bg-blue-500" },
            { title: "Completed Lessons", value: "0", icon: "Calendar", color: "bg-green-500" },
            { title: "Certificates Earned", value: "0", icon: "Award", color: "bg-purple-500" },
            { title: "Study Hours", value: "0", icon: "Clock", color: "bg-orange-500" },
          ]).map((stat) => {
            const Icon = iconMap[stat.icon] || Clock;
            return (
              <Card key={stat.title}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                      <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                    </div>
                    <div className={`p-3 rounded-full ${stat.color}`}>
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Courses Progress */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Your Course Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {courses.map((course, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <h3 className="font-medium text-gray-900">{course.title}</h3>
                      <span className="text-sm text-gray-500">{course.progress}%</span>
                    </div>
                    <Progress value={course.progress} className="h-2" />
                    <p className="text-sm text-gray-500">by {course.instructor}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Upcoming Lessons</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {lessons.map((lesson, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <h3 className="font-medium text-gray-900">{lesson.title}</h3>
                      <p className="text-sm text-gray-500">{lesson.course}</p>
                    </div>
                    <span className="text-sm text-blue-600">{lesson.time}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;