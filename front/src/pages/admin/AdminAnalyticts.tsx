import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from 'recharts';
import {
  TrendingUp,
  Users,
  BookOpen,
  DollarSign,
} from 'lucide-react';

const AdminAnalytics = () => {
  const [monthlyData, setMonthlyData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [stats, setStats] = useState([]);
  const defaultStats = [
    { title: "Total Users", value: 0, icon: "Users", color: "bg-blue-500" },
    { title: "Total Courses", value: 0, icon: "BookOpen", color: "bg-green-500" },
    { title: "Total Revenue", value: 0, icon: "DollarSign", color: "bg-purple-500" },
    { title: "Trending", value: 0, icon: "TrendingUp", color: "bg-yellow-500" },
  ];

  const displayStats = stats.length > 0 ? stats : defaultStats;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');

        const [statsRes, monthlyRes, categoriesRes] = await Promise.all([
          axios.get('http://127.0.0.1:8000/api/stats', {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get('http://127.0.0.1:8000/api/monthly-data', {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get('http://127.0.0.1:8000/api/categories', {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        setStats(statsRes.data || []);
        setMonthlyData(monthlyRes.data || []);
        setCategoryData(categoriesRes.data || []);
      } catch (err) {
        console.error('Error fetching analytics data:', err);
      }
    };

    fetchData();
  }, []);

  const iconMap = {
    Users,
    BookOpen,
    DollarSign,
    TrendingUp,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-slate-800 mb-2">Analytics Dashboard</h1>
          <p className="text-lg text-slate-600">Platform performance and insights</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {displayStats.map((stat) => {
            const Icon = iconMap[stat.icon as keyof typeof iconMap];
            return (
              <Card key={stat.title} className="shadow-md border border-slate-200 rounded-xl bg-white">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-slate-600">{stat.title}</p>
                      <p className="text-3xl font-bold text-slate-900">{stat.value}</p>
                      {stat.change && <p className="text-sm font-medium text-green-600">{stat.change}</p>}
                    </div>
                    <div className={`p-3 rounded-full ${stat.color || 'bg-indigo-500'}`}>
                      {Icon && <Icon className="h-6 w-6 text-white" />}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Line Chart */}
          <Card className="shadow-md border border-slate-200 rounded-xl">
            <CardHeader className="bg-slate-100 border-b rounded-t-xl">
              <CardTitle className="text-slate-800">Monthly Growth</CardTitle>
            </CardHeader>
            <CardContent className="bg-white">
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="users" stroke="#4f46e5" strokeWidth={2} />
                  <Line type="monotone" dataKey="courses" stroke="#16a34a" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Pie Chart */}
          <Card className="shadow-md border border-slate-200 rounded-xl">
            <CardHeader className="bg-slate-100 border-b rounded-t-xl">
              <CardTitle className="text-slate-800">Course Categories</CardTitle>
            </CardHeader>
            <CardContent className="bg-white">
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color || '#6366f1'} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Bar Chart */}
        <Card className="shadow-md border border-slate-200 rounded-xl">
          <CardHeader className="bg-slate-100 border-b rounded-t-xl">
            <CardTitle className="text-slate-800">Revenue Overview</CardTitle>
          </CardHeader>
          <CardContent className="bg-white">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="revenue" fill="#4f46e5" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminAnalytics;
