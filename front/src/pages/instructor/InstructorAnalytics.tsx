import { useEffect, useState } from "react";
import axios from "axios";
import {
  Card, CardContent, CardHeader, CardTitle
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  BarChart3, TrendingUp, BookOpen, Download, Calendar, Star, Target, DollarSign
} from "lucide-react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell
} from "recharts";

const Analytics = () => {
  const [enrollmentData, setEnrollmentData] = useState([]);
  const [coursePerformance, setCoursePerformance] = useState([]);
  const [deviceData, setDeviceData] = useState([]);
  
  const defaultStats = [
  { title: "Total Views", value: 0, icon: <BarChart3 className="h-5 w-5" />, color: "bg-blue-500"  },
  { title: "Completion Rate", value: "0%", icon: <Target className="h-5 w-5" />, color: "bg-green-500" },
  { title: "Average Rating", value: 0, icon: <Star className="h-5 w-5" />, color: "bg-yellow-500" },
  { title: "Revenue", value: "$0", icon: <DollarSign className="h-5 w-5" />, color: "bg-purple-500"  }
];
const [stats, setStats] = useState(defaultStats);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://127.0.0.1:8000/api/analytics");
        const data = res.data;
        
        setStats([
        { ...defaultStats[0], value: data.total_views ?? 0 },
        { ...defaultStats[1], value: `${data.completion_rate ?? 0}%`},
        { ...defaultStats[2], value: data.average_rating ?? 0 },
        { ...defaultStats[3], value: `$${data.revenue ?? 0}` }
      ]);

        setEnrollmentData(data.enrollment_trend); // [{month: 'Jan', students: 100}, ...]
        setCoursePerformance(data.course_performance); // [{course: 'React', students: 100, completion: 80}, ...]
        setDeviceData(data.device_usage); // [{name: 'Desktop', value: 50, color: '#...'}, ...]
      } catch (error) {
        console.error("Error fetching analytics:", error);
      }
    };

    fetchData();
  }, []);

return (
  <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
    <div className="container mx-auto py-8 px-4">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 mb-1">Analytics Dashboard</h1>
          <p className="text-slate-600">Detailed insights into your course performance</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600 mb-1">{stat.title}</p>
                  <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
                </div>
                <div className={`${stat.color} text-white p-3 rounded-xl`}>
                  {stat.icon}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        
        {/* Enrollment Trend */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Student Enrollment Trend
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={enrollmentData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="students" stroke="#3B82F6" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Device Usage */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Device Usage
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={deviceData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={120}
                  dataKey="value"
                >
                  {deviceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex justify-center gap-4 mt-4 flex-wrap">
              {deviceData.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-sm">{item.name}: {item.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Course Performance */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5" />
            Course Performance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={coursePerformance}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="course" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="students" fill="#3B82F6" name="Students" />
              <Bar dataKey="completion" fill="#10B981" name="Completion %" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

    </div>
  </div>
);
};

export default Analytics;