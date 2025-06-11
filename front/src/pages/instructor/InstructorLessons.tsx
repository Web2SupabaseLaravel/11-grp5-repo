"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "@/components/ui/use-toast";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectContent,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { FileText, Play, Clock, Edit, Eye, Trash2 } from "lucide-react";

const iconMap = {
  FileText: <FileText className="w-6 h-6" />,
  Play: <Play className="w-6 h-6" />,
  Clock: <Clock className="w-6 h-6" />,
};

const InstructorLessons = () => {
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(false);
  const [courses, setCourses] = useState([]);
  const [showLessonDialog, setShowLessonDialog] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingLessonId, setEditingLessonId] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [lessonToDelete, setLessonToDelete] = useState(null);

  const [form, setForm] = useState({
    course_id: "",
    title: "",
    content: "",
    content_type: "video", // default to video since text is removed
    lesson_order: "",
  });

  const lessonStats = [
    { title: "Total Lessons", value: lessons.length, color: "bg-blue-500", icon: "FileText" },
    { title: "Video Lessons", value: lessons.filter(l => l.content_type === "video").length, color: "bg-green-500", icon: "Play" },
    { title: "Audio Lessons", value: lessons.filter(l => l.content_type === "audio").length, color: "bg-purple-500", icon: "FileText" },
    { title: "Avg. Lesson Order", value: lessons.length ? Math.round(lessons.reduce((acc, l) => acc + (l.lesson_order || 0), 0) / lessons.length) : 0, color: "bg-orange-500", icon: "Clock" },
  ];

  const fetchCourses = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/courses", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCourses(response.data);
    } catch (error) {
      console.error("Failed to fetch courses:", error);
      toast({
        title: "Error",
        description: "Failed to load courses.",
        variant: "destructive",
      });
    }
  };

  const fetchLessons = async () => {
    const token = localStorage.getItem("token");
    try {
      setLoading(true);
      const response = await axios.get("http://127.0.0.1:8000/api/lessons", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setLessons(response.data);
    } catch (error) {
      console.error("Failed to fetch lessons:", error);
      toast({
        title: "Error",
        description: "Failed to fetch lessons from server.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLessons();
    fetchCourses();
  }, []);

  const handleInputChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const openAddLessonDialog = () => {
    setEditingLessonId(null);
    setForm({
      course_id: "",
      title: "",
      content: "",
      content_type: "video", // text removed, so default to video
      lesson_order: "",
    });
    setShowLessonDialog(true);
  };

  const openEditLessonDialog = (lesson) => {
    setEditingLessonId(lesson.id);
    setForm({
      course_id: String(lesson.course_id),
      title: lesson.title,
      content: lesson.content,
      content_type: lesson.content_type,
      lesson_order: String(lesson.lesson_order),
    });
    setShowLessonDialog(true);
  };

  const handleCreateOrUpdateLesson = async () => {
    const { course_id, title, content, content_type, lesson_order } = form;

    if (!course_id || !title || !content || !content_type || !lesson_order) {
      toast({
        title: "Missing fields",
        description: "Please fill out all required fields.",
        variant: "destructive",
      });
      return;
    }

    try {
      const token = localStorage.getItem("token");
      setIsSubmitting(true);

      if (editingLessonId) {
        // Update lesson
        await axios.put(
          `http://127.0.0.1:8000/api/lessons/${editingLessonId}`,
          {
            course_id: parseInt(course_id),
            title,
            content,
            content_type,
            lesson_order: parseInt(lesson_order),
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        toast({
          title: "Lesson updated",
          description: `"${title}" has been updated successfully.`,
        });
      } else {
        // Create lesson
        await axios.post(
          "http://127.0.0.1:8000/api/lessons",
          {
            course_id: parseInt(course_id),
            title,
            content,
            content_type,
            lesson_order: parseInt(lesson_order),
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        toast({
          title: "Lesson created",
          description: `"${title}" has been added successfully.`,
        });
      }

      setForm({
        course_id: "",
        title: "",
        content: "",
        content_type: "video",
        lesson_order: "",
      });
      setShowLessonDialog(false);
      setEditingLessonId(null);
      await fetchLessons();
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        console.error("Validation error details:", error.response.data);
        toast({
          title: "Validation Error",
          description: JSON.stringify(error.response.data),
          variant: "destructive",
        });
      } else {
        console.error("Error", error);
        toast({
          title: "Error",
          description: "Something went wrong.",
          variant: "destructive",
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const openDeleteConfirm = (lesson) => {
    setLessonToDelete(lesson);
    setShowDeleteConfirm(true);
  };

  const handleDeleteLesson = async () => {
    if (!lessonToDelete) return;

    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://127.0.0.1:8000/api/lessons/${lessonToDelete.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast({
        title: "Lesson deleted",
        description: `"${lessonToDelete.title}" has been deleted successfully.`,
      });
      setShowDeleteConfirm(false);
      setLessonToDelete(null);
      await fetchLessons();
    } catch (error) {
      console.error("Failed to delete lesson:", error);
      toast({
        title: "Error",
        description: "Failed to delete the lesson.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">My Lessons</h1>
            <p className="text-gray-600">Create and manage your course lessons</p>
          </div>
          <Button onClick={openAddLessonDialog} className="flex items-center space-x-2">
            <Play className="h-4 w-4" />
            <span>Add Lesson</span>
          </Button>
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

        {/* Lessons List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {loading ? (
            <p className="text-gray-500 col-span-full text-center">Loading lessons...</p>
          ) : lessons.length === 0 ? (
            <p className="text-gray-500 col-span-full text-center">No lessons found.</p>
          ) : (
            lessons.map((lesson) => (
              <Card key={lesson.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">{lesson.title}</CardTitle>
                    <Badge variant="default">{lesson.content_type}</Badge>
                  </div>
                  <p className="text-sm text-gray-600">Course ID: {lesson.course_id}</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm text-gray-700">
                    <p>{lesson.content?.substring(0, 100)}...</p>

                    <div className="flex space-x-4 mt-2 text-gray-500">
                      <div className="flex items-center space-x-1">
                        <FileText className="h-4 w-4" />
                        <span>Order: {lesson.lesson_order}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="h-4 w-4" />
                        <span>Duration: {lesson.duration || "N/A"}</span>
                      </div>
                    </div>

                    <div className="flex space-x-2 pt-4">
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1"
                        onClick={() => openEditLessonDialog(lesson)}
                      >
                        <Edit className="h-4 w-4 mr-1" />
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1"
                        onClick={() => openDeleteConfirm(lesson)}
                      >
                        <Trash2 className="h-4 w-4 mr-1 text-red-600" />
                        Delete
                      </Button>
                      <Button size="sm" variant="outline">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        {/* Add/Edit Lesson Dialog */}
        <Dialog open={showLessonDialog} onOpenChange={setShowLessonDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingLessonId ? "Edit Lesson" : "Create New Lesson"}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <Label>Course</Label>
              <Select
                value={form.course_id}
                onValueChange={(value) => handleInputChange("course_id", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a course" />
                </SelectTrigger>
                <SelectContent>
                  {courses.map((course) => (
                    <SelectItem key={course.id} value={String(course.id)}>
                      {course.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Label>Lesson Title</Label>
              <Input
                value={form.title}
                onChange={(e) => handleInputChange("title", e.target.value)}
                placeholder="Enter Lesson Title"
              />

              <Label>Content</Label>
              <Textarea
                value={form.content}
                onChange={(e) => handleInputChange("content", e.target.value)}
                placeholder="Enter lesson content"
                rows={4}
              />

              <Label>Content Type</Label>
              <Select
                value={form.content_type}
                onValueChange={(value) => handleInputChange("content_type", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select content type" />
                </SelectTrigger>
                <SelectContent>
                  {/* Removed 'text' option */}
                  <SelectItem value="video">Video</SelectItem>
                  <SelectItem value="audio">Audio</SelectItem>
                  <SelectItem value="pdf">PDF</SelectItem>
                </SelectContent>
              </Select>

              <Label>Lesson Order</Label>
              <Input
                type="number"
                value={form.lesson_order}
                onChange={(e) => handleInputChange("lesson_order", e.target.value)}
                placeholder="Enter lesson order"
                min={1}
              />
            </div>
            <DialogFooter>
              <Button
                onClick={handleCreateOrUpdateLesson}
                disabled={isSubmitting}
              >
                {isSubmitting
                  ? editingLessonId
                    ? "Updating..."
                    : "Creating..."
                  : editingLessonId
                  ? "Update Lesson"
                  : "Create Lesson"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Delete Confirmation Dialog */}
        <Dialog open={showDeleteConfirm} onOpenChange={setShowDeleteConfirm}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Confirm Delete</DialogTitle>
            </DialogHeader>
            <p>
              Are you sure you want to delete the lesson "
              <strong>{lessonToDelete?.title}</strong>"? This action cannot be
              undone.
            </p>
            <DialogFooter className="flex justify-end space-x-4">
              <Button variant="outline" onClick={() => setShowDeleteConfirm(false)}>
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={handleDeleteLesson}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Deleting..." : "Delete"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default InstructorLessons;