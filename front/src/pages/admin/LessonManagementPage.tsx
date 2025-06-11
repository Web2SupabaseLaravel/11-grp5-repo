import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { FileText, Play, Clock, ListChecks } from "lucide-react";

const iconMap = {
  FileText: <FileText className="w-6 h-6" />,
  Play: <Play className="w-6 h-6" />,
  Clock: <Clock className="w-6 h-6" />,
  ListChecks: <ListChecks className="w-6 h-6" />,
};

interface Lesson {
  id: string;
  title: string;
  content: string;
  course_id: string;
  course_title: string;
  order: number;
  duration: string;
  video_url?: string;
  content_type: "text" | "video";
  lesson_order?: number;
}

const LessonManagementPage = () => {
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  const lessonStats = [
  {title: "Total Lessons",value: lessons.length,color: "bg-blue-500",icon: "FileText",},
  {title: "Video Lessons",value: lessons.filter(l => l.content_type === "video").length,color: "bg-green-500",icon: "Play",},
  {title: "Text Lessons",value: lessons.filter(l => l.content_type === "text").length,color: "bg-purple-500",icon: "FileText",},
  {title: "Avg. Lesson Order", value: lessons.length   ? Math.round(lessons.reduce((acc, l) => acc + (l.lesson_order || 0), 0) / lessons.length): 0, color: "bg-orange-500", icon: "Clock", },
];

  useEffect(() => {
    fetchLessons();
  }, []);

  const fetchLessons = async () => {
    try {
      const token = localStorage.getItem("token");
const response = await axios.get("http://127.0.0.1:8000/api/admin/lessons", {
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

      setLessons(response.data || []);
    } catch (error) {
      console.error("Error fetching lessons:", error);
      toast({
        title: "Error",
        description: "Failed to fetch lessons",
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
          <h1 className="text-4xl font-bold text-slate-800 mb-2">Lesson Management</h1>
          <p className="text-lg text-slate-600">View course lessons (read-only)</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {lessonStats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">{stat.title}</p>
                    <p className="text-3xl font-bold">{stat.value}</p>
                  </div>
                  <div className={`${stat.color} text-white p-3 rounded-xl`}>
                    {iconMap[stat.icon]}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="border border-slate-200 shadow-lg rounded-2xl">
          <CardHeader className="flex items-center gap-4 bg-slate-100 border-b rounded-t-2xl">
            <div className="p-2 bg-indigo-200 rounded-xl text-indigo-800 text-xl">
              📘
            </div>
            <CardTitle className="text-xl font-semibold text-slate-800">
              Lessons
            </CardTitle>
          </CardHeader>

          <CardContent className="p-0">
            {isLoading ? (
              <div className="flex items-center justify-center py-16 text-slate-600">
                Loading lessons...
              </div>
            ) : lessons.length === 0 ? (
              <div className="text-center text-slate-600 py-16">
                No lessons found.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-slate-50 border-b">
                      <TableHead className="min-w-[240px] text-slate-700 font-semibold">
                        Title
                      </TableHead>
                      <TableHead className="min-w-[240px] text-slate-700 font-semibold">
                        Course
                      </TableHead>
                      <TableHead className="min-w-[120px] text-slate-700 font-semibold">
                        Order
                      </TableHead>
                      <TableHead className="min-w-[150px] text-slate-700 font-semibold">
                        Duration
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {lessons.map((lesson) => (
                      <TableRow key={lesson.id} className="hover:bg-slate-50 transition">
                        <TableCell className="text-slate-800">{lesson.title}</TableCell>
                        <TableCell className="text-slate-700">{lesson.course_title}</TableCell>
                        <TableCell className="text-slate-700">{lesson.order}</TableCell>
                        <TableCell className="text-slate-700">{lesson.duration}</TableCell>
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

export default LessonManagementPage;