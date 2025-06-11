import { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DollarSign, TrendingUp, Users, BookOpen, Star } from "lucide-react";

const iconMap = {
  earnings: <DollarSign className="w-6 h-6" />,
  students: <Users className="w-6 h-6" />,
  courses: <BookOpen className="w-6 h-6" />,
  rating: <Star className="w-6 h-6" />,
};

const InstructorEarnings = () => {
  const [earningsData, setEarningsData] = useState({
    totalEarnings: 0,
    totalStudents: 0,
    activeCourses: 0,
    averageRating: 0,
    thisMonth: 0,
    lastMonth: 0,
  });

  const [monthlyEarnings, setMonthlyEarnings] = useState([]);
  const [courseEarnings, setCourseEarnings] = useState([]);

  const stats = [
    {
      title: "Total Earnings",
      value: `$${earningsData.totalEarnings.toLocaleString()}`,
      icon: "earnings",
      color: "bg-green-500",
    },
    {
      title: "Total Students",
      value: earningsData.totalStudents,
      icon: "students",
      color: "bg-blue-500",
    },
    {
      title: "Active Courses",
      value: earningsData.activeCourses,
      icon: "courses",
      color: "bg-purple-500",
    },
    {
      title: "Average Rating",
      value: `${earningsData.averageRating}/5`,
      icon: "rating",
      color: "bg-yellow-500",
    },
  ];

  useEffect(() => {
    const fetchEarnings = async () => {
      try {
        const res = await axios.get("http://127.0.0.1:8000/api/instructor/earnings");
        if (res.data.earnings) {
          setEarningsData({
            totalEarnings: res.data.earnings.totalEarnings ?? 0,
            totalStudents: res.data.earnings.totalStudents ?? 0,
            activeCourses: res.data.earnings.activeCourses ?? 0,
            averageRating: res.data.earnings.averageRating ?? 0,
            thisMonth: res.data.earnings.thisMonth ?? 0,
            lastMonth: res.data.earnings.lastMonth ?? 0,
          });
          setMonthlyEarnings(res.data.monthlyEarnings || []);
          setCourseEarnings(res.data.courseEarnings || []);
        }
      } catch (err) {
        console.error("Failed to load earnings data:", err);
      }
    };

    fetchEarnings();
  }, []);

  // حساب نسبة النمو مع حماية من القسمة على صفر
  const growthPercentage =
    earningsData.lastMonth === 0
      ? 0
      : ((earningsData.thisMonth - earningsData.lastMonth) / earningsData.lastMonth) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-10 px-4">
      <div className="container mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">Earnings Dashboard</h1>
          <p className="text-slate-600 text-lg">Track your revenue and student engagement</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-600 mb-1">{stat.title}</p>
                    <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
                  </div>
                  <div className={`${stat.color} text-white p-3 rounded-xl`}>{iconMap[stat.icon]}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Monthly Earnings & This Month Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Monthly Earnings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {monthlyEarnings.length === 0 ? (
                  <p className="text-slate-500">No monthly data yet.</p>
                ) : (
                  monthlyEarnings.map((month, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 border rounded-lg"
                    >
                      <div>
                        <p className="font-medium">{month.month}</p>
                        <p className="text-sm text-slate-600">{month.students} new students</p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-green-600">${month.amount}</p>
                        <div className="flex items-center text-sm text-green-600 gap-1">
                          <TrendingUp className="h-3 w-3" />
                          <span>+12%</span>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>This Month Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex justify-between">
                  <span>Current Month Earnings</span>
                  <span className="text-2xl font-bold text-green-600">${earningsData.thisMonth}</span>
                </div>
                <div className="flex justify-between">
                  <span>Previous Month</span>
                  <span>${earningsData.lastMonth}</span>
                </div>
                <div className="flex justify-between">
                  <span>Growth</span>
                  <Badge className="bg-green-100 text-green-800">
                    +{growthPercentage.toFixed(1)}%
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span>Average Rating</span>
                  <span className="text-yellow-600">⭐ {earningsData.averageRating}/5.0</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Course Performance */}
        <Card>
          <CardHeader>
            <CardTitle>Course Performance</CardTitle>
          </CardHeader>
          <CardContent>
            {courseEarnings.length === 0 ? (
              <p className="text-slate-500">No course data available.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3">Course</th>
                      <th className="text-left py-3">Students</th>
                      <th className="text-left py-3">Price</th>
                      <th className="text-left py-3">Earnings</th>
                      <th className="text-left py-3">Rating</th>
                    </tr>
                  </thead>
                  <tbody>
                    {courseEarnings.map((course) => (
                      <tr key={course.id} className="border-b hover:bg-slate-50">
                        <td className="py-3">{course.title}</td>
                        <td className="py-3">{course.students}</td>
                        <td className="py-3">${course.price}</td>
                        <td className="py-3 text-green-600 font-bold">${course.earnings}</td>
                        <td className="py-3 text-yellow-600">⭐ {course.avgRating}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default InstructorEarnings;
