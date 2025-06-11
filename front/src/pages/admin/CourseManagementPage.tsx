import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useToast } from '@/hooks/use-toast';
import { Layers, BookOpen, Users, DollarSign } from 'lucide-react';

const iconMap = {
  Layers: <Layers className="w-6 h-6" />,
  BookOpen: <BookOpen className="w-6 h-6" />,
  Users: <Users className="w-6 h-6" />,
  DollarSign: <DollarSign className="w-6 h-6" />,
};

interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  price: number | string;  // دعم price كنص أو رقم
  duration: string;
  level: string;
  created_at: string;
  status: string;
  students?: number;
  revenue?: number;
}

const CourseManagementPage = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  const stats = [
    { title: "Total Courses", value: courses.length, icon: "Layers", color: "bg-sky-500" },
    { title: "Published", value: courses.filter((c) => c.status === "published").length, icon: "BookOpen", color: "bg-green-500" },
    { title: "Total Students", value: courses.reduce((acc, c) => acc + (c.students || 0), 0), icon: "Users", color: "bg-blue-500" },
    { title: "Total Revenue", value: `$${courses.reduce((acc, c) => acc + (c.revenue || 0), 0)}`, icon: "DollarSign", color: "bg-purple-500" },
  ];

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const token = localStorage.getItem('token');

        const response = await axios.get('http://127.0.0.1:8000/api/courses', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setCourses(response.data);
      } catch (error) {
        console.error('Error fetching courses:', error);
        toast({
          title: 'Error',
          description: 'Failed to fetch courses',
          variant: 'destructive',
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchCourses();
  }, [toast]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-slate-800 mb-2">Course Management</h1>
          <p className="text-lg text-slate-600">View all available courses (read-only)</p>
        </div>

        {/* Statistic Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
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

        <Card className="border border-slate-200 shadow-md rounded-2xl">
          <CardHeader className="flex items-center gap-4 bg-slate-100 border-b rounded-t-2xl">
            <div className="p-2 bg-indigo-200 rounded-xl text-indigo-800 text-xl">📚</div>
            <CardTitle className="text-xl font-semibold text-slate-800">Courses</CardTitle>
          </CardHeader>

          <CardContent className="p-0">
            {isLoading ? (
              <div className="text-center py-16 text-slate-600 text-lg">Loading courses...</div>
            ) : courses.length === 0 ? (
              <div className="text-center py-16 text-slate-600 text-lg">No courses found.</div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-slate-50 border-b">
                      <TableHead className="text-slate-700 font-semibold min-w-[200px]">Title</TableHead>
                      <TableHead className="text-slate-700 font-semibold min-w-[180px]">Instructor</TableHead>
                      <TableHead className="text-slate-700 font-semibold min-w-[120px]">Price</TableHead>
                      <TableHead className="text-slate-700 font-semibold min-w-[120px]">Level</TableHead>
                      <TableHead className="text-slate-700 font-semibold min-w-[150px]">Duration</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {courses.map((course) => (
                      <TableRow key={course.id} className="hover:bg-slate-50 transition">
                        <TableCell>{course.title || 'Untitled'}</TableCell>
                        <TableCell>{course.instructor || 'Unknown'}</TableCell>
                        <TableCell>
                          {!isNaN(Number(course.price)) ? `$${Number(course.price).toFixed(2)}` : 'N/A'}
                        </TableCell>
                        <TableCell>{course.level || '-'}</TableCell>
                        <TableCell>{course.duration || '-'}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CourseManagementPage;