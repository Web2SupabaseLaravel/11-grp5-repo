import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Loader2, BookOpen, Star, Users, TrendingUp } from "lucide-react";

const iconMap: Record<string, JSX.Element> = {
  BookOpen: <BookOpen className="h-8 w-8 text-white" />,
  Star: <Star className="h-8 w-8 text-white" />,
  Users: <Users className="h-8 w-8 text-white" />,
  TrendingUp: <TrendingUp className="h-8 w-8 text-white" />,
};

interface Quiz {
  id: number;
  title: string;
  course: string;
  timeLimit: string;
  passingScore: string;
  questions: number;
}

interface QuizStat {
  title: string;
  value: number;
  color: string;
  icon: keyof typeof iconMap;
}

const QuizManagementPage = () => {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [quizStats, setQuizStats] = useState<QuizStat[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    fetchQuizzes();
  }, []);

  const fetchQuizzes = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://127.0.0.1:8000/api/quizzes", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const quizzesData = response.data || [];
      setQuizzes(quizzesData);

      // حساب الإحصائيات بناءً على البيانات
      const totalQuizzes = quizzesData.length;
      const activeQuizzes = quizzesData.filter((quiz: Quiz) => quiz.questions > 0).length;

      // مبدئيًا نستخدم قيم ثابتة لتجربة الباقي
      const totalAttempts = 120; // غيّر هذا لاحقًا ببيانات حقيقية
      const averageScore = 75; // غيّر هذا لاحقًا ببيانات حقيقية

      setQuizStats([
        { title: "Total Quizzes", value: totalQuizzes, color: "bg-blue-500", icon: "BookOpen" },
        { title: "Active Quizzes", value: activeQuizzes, color: "bg-green-500", icon: "Star" },
        { title: "Total Attempts", value: totalAttempts, color: "bg-purple-500", icon: "Users" },
        { title: "Average Score", value: averageScore, color: "bg-yellow-500", icon: "TrendingUp" },
      ]);
    } catch (error) {
      console.error("Error fetching quizzes:", error);
      toast({
        title: "Error",
        description: "Failed to fetch quizzes",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-100">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-800 mb-2">Quiz Management</h1>
          <p className="text-lg text-slate-600">Browse and manage all course quizzes</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {quizStats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">{stat.title}</p>
                    <p className="text-3xl font-bold">
                      {stat.title === "Average Score" ? `${stat.value}%` : stat.value}
                    </p>
                  </div>
                  <div className={`${stat.color} text-white p-3 rounded-xl`}>
                    {iconMap[stat.icon]}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="shadow-xl border border-slate-200 rounded-2xl">
          <CardHeader className="flex items-center gap-4 bg-slate-100 rounded-t-2xl border-b">
            <div className="p-2 bg-indigo-200 rounded-xl text-indigo-800 text-xl">📝</div>
            <CardTitle className="text-xl font-semibold text-slate-800">Quizzes</CardTitle>
          </CardHeader>

          <CardContent className="p-0">
            {isLoading ? (
              <div className="flex items-center justify-center py-16">
                <Loader2 className="animate-spin w-6 h-6 text-indigo-500" />
                <span className="ml-3 text-slate-600">Loading quizzes...</span>
              </div>
            ) : quizzes.length === 0 ? (
              <div className="text-center text-slate-600 py-16">
                No quizzes found.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-slate-50">
                      <TableHead className="min-w-[200px] font-semibold text-slate-700">Title</TableHead>
                      <TableHead className="min-w-[200px] font-semibold text-slate-700">Course</TableHead>
                      <TableHead className="text-slate-700">Time Limit</TableHead>
                      <TableHead className="text-slate-700">Passing Score</TableHead>
                      <TableHead className="text-center text-slate-700">Questions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {quizzes.map((quiz) => (
                      <TableRow key={quiz.id} className="hover:bg-slate-50 transition">
                        <TableCell className="font-medium text-slate-800">{quiz.title}</TableCell>
                        <TableCell className="text-slate-700">{quiz.course}</TableCell>
                        <TableCell className="text-slate-700">{quiz.timeLimit}</TableCell>
                        <TableCell className="text-slate-700">{quiz.passingScore}</TableCell>
                        <TableCell className="text-center text-slate-700">{quiz.questions}</TableCell>
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

export default QuizManagementPage;
