import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Clock, 
  FileText,
  CheckCircle,
  Play,
  Calendar,
  Award,
  Target
} from "lucide-react";

const MyQuizzes = () => {
  const [stats, setStats] = useState([]);
  const [upcomingQuizzes, setUpcomingQuizzes] = useState([]);
  const [completedQuizzes, setCompletedQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const iconMap = {
    "check-circle": <CheckCircle className="h-5 w-5" />,
    "clock": <Clock className="h-5 w-5" />,
    "target": <Target className="h-5 w-5" />,
    "award": <Award className="h-5 w-5" />
  };

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setError("You must be logged in to view quizzes.");
        setLoading(false);
        return;
      }

     try {
  setLoading(true);
  setError(null);

  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const [statsRes, upcomingRes, completedRes] = await Promise.all([
    axios.get("http://127.0.0.1:8000/api/quizzes/stats", { headers }),
    axios.get("http://127.0.0.1:8000/api/quizzes/upcoming", { headers }),
    axios.get("http://127.0.0.1:8000/api/quizzes/completed", { headers }),
  ]);

  console.log("stats:", statsRes.data);
  console.log("upcomingQuizzes:", upcomingRes.data);
  console.log("completedQuizzes:", completedRes.data);

  setStats(statsRes.data || []);
  setUpcomingQuizzes(upcomingRes.data || []);
  setCompletedQuizzes(completedRes.data || []);
} catch (e: any) {
  console.error("Error fetching quizzes:", e);

  setError(
    e.response?.status === 401
      ? "Unauthorized. Please login again."
      : e.response?.status === 404
      ? "Endpoint not found. Please check the API."
      : e.response?.status === 500
      ? "Server error. Please contact backend developer."
      : "Failed to fetch quizzes."
  );
}

    };

    fetchData();
  }, []);

  if (loading) return <p className="text-center mt-8">Loading...</p>;
  if (error) return <p className="text-center mt-8 text-red-600">{error}</p>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="container mx-auto py-8 px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">My Quizzes</h1>
          <p className="text-slate-600">Track your quiz progress and scores</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, i) => (
            <Card key={i}>
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Upcoming Quizzes */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Upcoming Quizzes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingQuizzes.map((quiz) => (
                  <div key={quiz.id} className="border border-slate-200 rounded-lg p-4 hover:bg-slate-50">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-semibold text-slate-900 mb-1">{quiz.title}</h3>
                        <p className="text-sm text-slate-600">{quiz.course}</p>
                      </div>
                      <Badge variant="outline">Upcoming</Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm text-slate-600 mb-4">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {quiz.date} at {quiz.time}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {quiz.duration}
                      </div>
                      <div className="flex items-center gap-1">
                        <FileText className="h-4 w-4" />
                        {quiz.questions} questions
                      </div>
                      <div className="flex items-center gap-1">
                        <Play className="h-4 w-4" />
                        {quiz.attempts} attempt(s) allowed
                      </div>
                    </div>
                    <Button className="w-full">
                      <Play className="mr-2 h-4 w-4" />
                      Start Quiz
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Completed Quizzes */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5" />
                Recent Results
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {completedQuizzes.map((quiz) => (
                  <div key={quiz.id} className="border border-slate-200 rounded-lg p-4 hover:bg-slate-50">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-semibold text-slate-900 mb-1">{quiz.title}</h3>
                        <p className="text-sm text-slate-600">{quiz.course}</p>
                      </div>
                      <Badge variant={quiz.status === "passed" ? "default" : "destructive"}>
                        {quiz.status === "passed" ? "Passed" : "Failed"}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm text-slate-600 mb-3">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {quiz.completedDate}
                      </div>
                      <div className="flex items-center gap-1">
                        <Target className="h-4 w-4" />
                        Score: {quiz.score}%
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {quiz.duration}
                      </div>
                      <div className="flex items-center gap-1">
                        <FileText className="h-4 w-4" />
                        {quiz.questions} questions
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        View Results
                      </Button>
                      {quiz.status === "failed" && (
                        <Button size="sm">
                          Retake Quiz
                        </Button>
                      )}
                    </div>
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

export default MyQuizzes;