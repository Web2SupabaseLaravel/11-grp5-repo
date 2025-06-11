import { useEffect, useState } from "react";
import axios from "axios";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Clock, Award, TrendingUp } from "lucide-react";

const MyProgress = () => {
  const [courses, setCourses] = useState([]);
  const [overallStats, setOverallStats] = useState({
    totalCourses: 0,
    completedCourses: 0,
    totalHours: 0,
    certificatesEarned: 0,
  });

  const fetchData = async () => {
    try {
      const [summaryRes, coursesRes] = await Promise.all([
        axios.get("http://127.0.0.1:8000/api/student-progress/summary"),
        axios.get("http://127.0.0.1:8000/api/student-progress/courses")
      ]);

      setOverallStats(summaryRes.data);
      setCourses(coursesRes.data);
    } catch (error) {
      console.error("Error fetching progress data", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="container mx-auto py-8 px-4">
        <div className="mb-8">
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 mb-2">My Progress</h1>
          <p className="text-slate-600 text-lg">Track your learning journey and achievements</p>
        </div>

        {}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-100 rounded-xl">
                  <BookOpen className="h-6 w-6 text-blue-600" />
                </div>

                <div>
                  <p className="text-sm font-medium text-slate-600">Total Courses</p>
                  <p className="text-3xl font-bold text-blue-600">{overallStats.totalCourses}</p>
                </div>

              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-green-100 rounded-xl">
                  <Award className="h-6 w-6 text-green-600" />
                </div>
                <div>

                  <p className="text-sm font-medium text-slate-600">Completed</p>
                  <p className="text-3xl font-bold text-green-600">{overallStats.completedCourses}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-purple-100 rounded-xl">
                  <Clock className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-600">Hours Studied</p>
                  <p className="text-3xl font-bold text-purple-600">{overallStats.totalHours}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-orange-100 rounded-xl">
                  <TrendingUp className="h-6 w-6 text-orange-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-600">Certificates</p>
                  <p className="text-3xl font-bold text-orange-600">{overallStats.certificatesEarned}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {}
        <Card>
          <CardHeader>
            <CardTitle>Course Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {courses.map((course: any) => (
                <div key={course.id} className="border border-slate-200 rounded-lg p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-slate-900 mb-2">{course.title}</h3>
                      <div className="flex items-center gap-4 text-sm text-slate-600">
                        <span>{course.completedLessons}/{course.totalLessons} lessons</span>
                        <span>{course.timeSpent} studied</span>
                      </div>

                    </div>
                    <Badge 
                      className={course.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}
                    >
                      {course.status === 'completed' ? 'Completed' : 'In Progress'}
                    </Badge>
                    
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span>{course.progress}%</span>
                    </div>
                    <Progress value={course.progress} className="h-2" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MyProgress;