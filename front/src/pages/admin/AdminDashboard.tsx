import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { User, Book, Layers, FileCheck ,TrendingUp} from "lucide-react";

const iconMap = {
user: User,
book: Book,
layers: Layers,
"file-check": FileCheck,
};

const AdminDashboard = () => {
  const [stats, setStats] = useState([]);
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

const defaultStats = [
  { title: "Total Users", value: null, icon: "user", color: "bg-blue-500" },
  { title: "Total Courses", value: null, icon: "book", color: "bg-green-500" },
  { title: "Total Lessons", value: null, icon: "layers", color: "bg-yellow-500" },
  { title: "Total Quizzes", value: null, icon: "file-check", color: "bg-purple-500" },
];

const displayStats = stats.length > 0 ? stats : defaultStats;

  useEffect(() => {
  const fetchData = async () => {
    try {
      const token = localStorage.getItem('token');

      const [statsRes, activityRes] = await Promise.all([
        axios.get('http://127.0.0.1:8000/api/admin/stats', {
          headers: { Authorization: `Bearer ${token}` },
        }),
        axios.get('http://127.0.0.1:8000/api/admin/recent-activity', {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);

      console.log('📊 Stats Response:', statsRes.data);
      console.log('⚡ Activity Response:', activityRes.data);

      const formattedStats = [
        {
          title: "Total Users",
          value: statsRes.data.total_users,
          icon: "user",
          color: "bg-blue-500",
        },
        {
          title: "Total Courses",
          value: statsRes.data.total_courses,
          icon: "book",
          color: "bg-green-500",
        },
        {
          title: "Total Lessons",
          value: statsRes.data.total_lessons,
          icon: "layers",
          color: "bg-yellow-500",
        },
        {
          title: "Total Quizzes",
          value: statsRes.data.total_quizzes,
          icon: "file-check",
          color: "bg-purple-500",
        },
      ];

      setStats(formattedStats);
      setActivities(activityRes.data.activities || []);
    } catch (error) {
      console.error('❌ Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  fetchData();
}, []);


  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-slate-800 mb-2">Admin Dashboard</h1>
          <p className="text-lg text-slate-600">Welcome to your main control panel</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {displayStats.map((stat, index) => {
            const Icon = iconMap[stat.icon as keyof typeof iconMap];

            return (
              <Card
                key={index}
                className="bg-white shadow-md border border-slate-200 rounded-xl"
              >
                <CardContent className="p-5 flex items-center justify-between">
                  <div>
                    <p className="text-slate-600 text-sm capitalize">{stat.title}</p>
                    <p className="text-3xl font-bold text-slate-800">
                      {stat.value !== null ? stat.value : "0"}
                    </p>
                  </div>
                  <div className={`p-3 ${stat.color} rounded-full`}>
                    {Icon && <Icon className="w-6 h-6 text-white" />}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Recent Activity */}
        <Card className="shadow-md border border-slate-200 rounded-xl">
          <CardHeader className="bg-slate-100 border-b rounded-t-xl">
            <CardTitle className="flex items-center gap-2 text-slate-800 text-lg">
              <TrendingUp className="h-5 w-5 text-indigo-600" />
              <span>Recent Activity</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {loading ? (
                <p className="text-slate-500 py-6">Loading activity...</p>
              ) : activities.length > 0 ? (
                activities.map((activity, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between bg-slate-50 border border-slate-200 rounded-lg px-4 py-3"
                  >
                    <span className="text-slate-800">{activity}</span>
                  </div>
                ))
              ) : (
                <p className="text-slate-500 py-6">No recent activity found.</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;