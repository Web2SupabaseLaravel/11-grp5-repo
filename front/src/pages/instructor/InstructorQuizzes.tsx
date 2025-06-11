"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  BookOpen,
  Users,
  Star,
  TrendingUp,
  Plus,
  FileText,
  Edit,
  BarChart3,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";

const iconMap: any = {
  BookOpen: <BookOpen className="h-8 w-8 text-white" />,
  Star: <Star className="h-8 w-8 text-white" />,
  Users: <Users className="h-8 w-8 text-white" />,
  TrendingUp: <TrendingUp className="h-8 w-8 text-white" />,
};

// هنا لازم تحط طريقة جلب التوكن حسب التطبيق عندك
const getAuthToken = () => {
  // مثال: localStorage.getItem("token")
  return localStorage.getItem("token");
};

const InstructorQuizzes = () => {
  const [showUploadQuiz, setShowUploadQuiz] = useState(false);
  const [newQuizTitle, setNewQuizTitle] = useState("");
  const [newQuizLessonId, setNewQuizLessonId] = useState("");
  const [newQuizDescription, setNewQuizDescription] = useState("");
  const [isSubmittingQuiz, setIsSubmittingQuiz] = useState(false);
  const [quizzes, setQuizzes] = useState<any[]>([]);

  const [quizStats, setQuizStats] = useState([
    { title: "Total Quizzes", value: 0, color: "bg-blue-500", icon: "BookOpen" },
    { title: "Active Quizzes", value: 0, color: "bg-green-500", icon: "Star" },
    { title: "Total Attempts", value: 0, color: "bg-purple-500", icon: "Users" },
    { title: "Average Score", value: 0, color: "bg-yellow-500", icon: "TrendingUp" },
  ]);

  const fetchQuizzes = async () => {
    try {
      const token = getAuthToken();
      const response = await axios.get("http://127.0.0.1:8000/api/quizzes", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Quizzes fetched:", response.data.quizzes);
      setQuizzes(response.data.quizzes || []);
      
      // تحديث الاحصائيات بناء على البيانات
      const total = response.data.quizzes.length;
      const active = response.data.quizzes.filter((q: any) => q.status === "Active").length;
      const totalAttempts = response.data.quizzes.reduce((acc: number, q: any) => acc + (q.attempts || 0), 0);
      const avgScore =
        response.data.quizzes.length > 0
          ? Math.round(
              response.data.quizzes.reduce((acc: number, q: any) => acc + (q.avgScore || 0), 0) /
                response.data.quizzes.length
            )
          : 0;

      setQuizStats([
        { title: "Total Quizzes", value: total, color: "bg-blue-500", icon: "BookOpen" },
        { title: "Active Quizzes", value: active, color: "bg-green-500", icon: "Star" },
        { title: "Total Attempts", value: totalAttempts, color: "bg-purple-500", icon: "Users" },
        { title: "Average Score", value: avgScore, color: "bg-yellow-500", icon: "TrendingUp" },
      ]);
    } catch (err) {
      console.error("Error fetching quizzes:", err);
    }
  };

  useEffect(() => {
    fetchQuizzes();
  }, []);

  const handleCreateQuiz = async () => {
    if (!newQuizLessonId || !newQuizTitle || !newQuizDescription) {
      alert("Please fill out all required items.");
      return;
    }

    setIsSubmittingQuiz(true);
    try {
      const token = getAuthToken();
      await axios.post(
        "http://127.0.0.1:8000/api/quizzes",
        {
          lesson_id: newQuizLessonId,
          title: newQuizTitle,
          description: newQuizDescription,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast({
        title: "The quiz has been created!",
        description: `The quiz "${newQuizTitle}" was added successfully.`,
      });

      setNewQuizLessonId("");
      setNewQuizTitle("");
      setNewQuizDescription("");
      setShowUploadQuiz(false);

      // إعادة تحميل الكويزات لتحديث القائمة
      await fetchQuizzes();
    } catch (err) {
      console.error("Error creating quiz:", err);
      toast({
        title: "Error",
        description: "Failed to create quiz. Please try again.",
      });
    } finally {
      setIsSubmittingQuiz(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">My Quizzes</h1>
            <p className="text-gray-600">Create and manage course assessments</p>
          </div>
          <Dialog open={showUploadQuiz} onOpenChange={setShowUploadQuiz}>
            <DialogTrigger asChild>
              <Button className="flex items-center space-x-2">
                <Plus className="h-4 w-4" />
                <span>Create Quiz</span>
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Quiz</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <Label>Lesson ID</Label>
                <Input
                  value={newQuizLessonId}
                  onChange={(e) => setNewQuizLessonId(e.target.value)}
                />
                <Label>Quiz Title</Label>
                <Input
                  value={newQuizTitle}
                  onChange={(e) => setNewQuizTitle(e.target.value)}
                />
                <Label>Description</Label>
                <Textarea
                  value={newQuizDescription}
                  onChange={(e) => setNewQuizDescription(e.target.value)}
                />
              </div>
              <DialogFooter>
                <Button onClick={handleCreateQuiz} disabled={isSubmittingQuiz}>
                  Submit
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
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
                  <div className={`${stat.color} text-white p-3 rounded-xl`}>{iconMap[stat.icon]}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quiz list */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {quizzes.length === 0 ? (
            <div className="text-center text-gray-500 text-lg py-12 col-span-full">
              No quizzes found
            </div>
          ) : (
            quizzes.map((quiz) => (
              <Card key={quiz.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">{quiz.title}</CardTitle>
                    <Badge variant={quiz.status === "Active" ? "default" : "secondary"}>
                      {quiz.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600">{quiz.course}</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center space-x-2">
                        <FileText className="h-4 w-4 text-gray-500" />
                        <span>{quiz.questions} questions</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Users className="h-4 w-4 text-gray-500" />
                        <span>{quiz.attempts} attempts</span>
                      </div>
                    </div>
                    {quiz.status === "Active" && (
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Average Score:</span>
                          <span className="font-medium text-green-600">{quiz.avgScore}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-green-600 h-2 rounded-full"
                            style={{ width: `${quiz.avgScore}%` }}
                          ></div>
                        </div>
                      </div>
                    )}

                    <div className="flex space-x-2 pt-4">
                      <Button size="sm" variant="outline" className="flex-1">
                        <Edit className="h-4 w-4 mr-1" />
                        Edit
                      </Button>
                      {quiz.status === "Active" && (
                        <Button size="sm" variant="outline">
                          <BarChart3 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default InstructorQuizzes;
