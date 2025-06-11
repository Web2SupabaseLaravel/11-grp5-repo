"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { BookOpen, Users, DollarSign, Star, Layers, Pencil, Trash2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { CheckedState } from "@radix-ui/react-checkbox";
import { Card, CardContent } from "@/components/ui/card";
import axios from "axios";
import { toast } from "@/components/ui/use-toast";

const iconMap = {
  BookOpen: <BookOpen className="w-6 h-6" />,
  Users: <Users className="w-6 h-6" />,
  DollarSign: <DollarSign className="w-6 h-6" />,
  Layers: <Layers className="w-6 h-6" />,
};

const InstructorCoursesPage = () => {
  const [showCreateCourse, setShowCreateCourse] = useState(false);
  const [editCourseId, setEditCourseId] = useState<number | null>(null);
  const [newCourseTitle, setNewCourseTitle] = useState("");
  const [newCourseDescription, setNewCourseDescription] = useState("");
  const [newCoursePrice, setNewCoursePrice] = useState("");
  const [newCourseObjectives, setNewCourseObjectives] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const [isFeatured, setIsFeatured] = useState(false);
  const [isSubmittingCourse, setIsSubmittingCourse] = useState(false);
  const [courses, setCourses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [confirmDeleteId, setConfirmDeleteId] = useState<number | null>(null);


  const stats = [
    {
      title: "Total Courses",
      value: courses.length,
      icon: "Layers",
      color: "bg-sky-500",
    },
    {
      title: "Total Students",
      value: courses.reduce((acc, c) => acc + (c.students || 0), 0),
      icon: "Users",
      color: "bg-blue-500",
    },
    {
      title: "Total Revenue",
      value: `$${courses.reduce((acc, c) => acc + (c.revenue || 0), 0)}`,
      icon: "DollarSign",
      color: "bg-purple-500",
    },
  ];

  useEffect(() => {
    fetchCourses();
    fetchCategories();
  }, []);

  const fetchCourses = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await axios.get("http://127.0.0.1:8000/api/my-courses", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCourses(res.data);
    } catch (err) {
      console.error("Failed to fetch courses", err);
    }
  };

  const fetchCategories = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await axios.get("http://127.0.0.1:8000/api/categories", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCategories(res.data);
    } catch (err) {
      console.error("Failed to fetch categories", err);
    }
  };

  const handleCreateOrUpdateCourse = async () => {
    if (!newCourseTitle || !newCourseDescription || !newCoursePrice || !selectedCategoryId) {
      toast({
        title: "Missing fields",
        description: "Please fill out all required fields.",
        variant: "destructive",
      });
      return;
    }

    const token = localStorage.getItem("token");
    setIsSubmittingCourse(true);
    try {
      const courseData = {
        title: newCourseTitle,
        description: newCourseDescription,
        price: parseFloat(newCoursePrice),
        learning_objectives: newCourseObjectives,
        category_id: parseInt(selectedCategoryId),
        is_featured: isFeatured,
      };

      if (editCourseId) {
        await axios.put(`http://127.0.0.1:8000/api/courses/${editCourseId}`, courseData, {
          headers: { Authorization: `Bearer ${token}` },
        });
        toast({ title: "Course updated!", description: `"${newCourseTitle}" has been updated.` });
      } else {
        await axios.post("http://127.0.0.1:8000/api/courses", courseData, {
          headers: { Authorization: `Bearer ${token}` },
        });
        toast({ title: "Course created!", description: `"${newCourseTitle}" created successfully.` });
      }

      fetchCourses();
      resetForm();
    } catch (err: any) {
      console.error(err);
      toast({
        title: "Error",
        description: err.response?.data?.message || "Something went wrong",
        variant: "destructive",
      });
    } finally {
      setIsSubmittingCourse(false);
    }
  };

  const handleEditCourse = (course: any) => {
    setEditCourseId(course.id);
    setNewCourseTitle(course.title);
    setNewCourseDescription(course.description);
    setNewCoursePrice(course.price);
    setNewCourseObjectives(course.learning_objectives);
    setSelectedCategoryId(course.category_id);
    setIsFeatured(course.is_featured);
    setShowCreateCourse(true);
  };

  const handleDeleteCourse = async (id: number) => {
    const token = localStorage.getItem("token");
    try {
      await axios.delete(`http://127.0.0.1:8000/api/courses/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast({ title: "Course deleted", description: `Course has been removed.` });
      fetchCourses();
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to delete course.",
        variant: "destructive",
      });
    }
  };

  const handleFeaturedChange = (checked: CheckedState) => {
    if (typeof checked === "boolean") setIsFeatured(checked);
  };

  const resetForm = () => {
    setNewCourseTitle("");
    setNewCourseDescription("");
    setNewCoursePrice("");
    setNewCourseObjectives("");
    setSelectedCategoryId("");
    setIsFeatured(false);
    setEditCourseId(null);
    setShowCreateCourse(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="container mx-auto py-8 px-4">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-slate-900 mb-2">My Courses</h1>
            <p className="text-slate-600">Manage and track your course content</p>
          </div>
          <Dialog open={showCreateCourse} onOpenChange={setShowCreateCourse}>
            <DialogTrigger asChild>
              <Button>{editCourseId ? "Edit Course" : "Create Course"}</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{editCourseId ? "Edit Course" : "New Course"}</DialogTitle>
              </DialogHeader>
              <div className="space-y-2">
                <Input placeholder="Title" value={newCourseTitle} onChange={(e) => setNewCourseTitle(e.target.value)} />
                <Textarea placeholder="Description" value={newCourseDescription} onChange={(e) => setNewCourseDescription(e.target.value)} />
                <Input placeholder="Price" type="number" value={newCoursePrice} onChange={(e) => setNewCoursePrice(e.target.value)} />
                <Textarea placeholder="Learning Objectives" value={newCourseObjectives} onChange={(e) => setNewCourseObjectives(e.target.value)} />
                <div>
                  <Label>Category</Label>
                  <select
                    className="w-full border rounded-md p-2 text-sm text-slate-700"
                    value={selectedCategoryId}
                    onChange={(e) => setSelectedCategoryId(e.target.value)}
                  >
                    <option value="">Select a category</option>
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                  </select>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox checked={isFeatured} onCheckedChange={handleFeaturedChange} />
                  <Label>Featured</Label>
                </div>
                <Button onClick={handleCreateOrUpdateCourse} disabled={isSubmittingCourse}>
                  {isSubmittingCourse ? "Submitting..." : editCourseId ? "Update Course" : "Create Course"}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {stats.map((stat, i) => (
            <Card key={i} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6 flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600 mb-1">{stat.title}</p>
                  <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
                </div>
                <div className={`${stat.color} text-white p-3 rounded-xl`}>
                  {iconMap[stat.icon]}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Course List */}
        <div className="p-6">
          {courses.length === 0 ? (
            <EmptyState />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {courses.map((course) => (
                <div key={course.id} className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-200">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-xl font-semibold text-slate-900 flex items-center gap-2">
                        {course.title}
                        {course.is_featured && <Star className="text-yellow-500 h-4 w-4" />}
                      </h3>
                      <p className="text-slate-600">{course.description}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="icon" onClick={() => handleEditCourse(course)}>
                        <Pencil className="w-4 h-4" />
                      </Button>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="icon" onClick={() => setConfirmDeleteId(course.id)}>
                            <Trash2 className="w-4 h-4 text-red-500" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Confirm Deletion</DialogTitle>
                          </DialogHeader>
                          <p>Are you sure you want to delete the course "{course.title}"?</p>
                          <div className="mt-4 flex justify-end gap-2">
                            <Button variant="outline" onClick={() => setConfirmDeleteId(null)}>Cancel</Button>
                            <Button
                              variant="destructive"
                              onClick={() => {
                                if (confirmDeleteId) handleDeleteCourse(confirmDeleteId);
                                setConfirmDeleteId(null);
                              }}
                            >
                              Confirm Delete
                            </Button>
                          </div>
                        </DialogContent>
                      </Dialog>

                    </div>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                    <CourseStat icon={<Users className="h-4 w-4" />} text={`${course.students} students`} />
                    <CourseStat icon={<DollarSign className="h-4 w-4" />} text={`$${course.price}`} />
                    <CourseStat icon={<DollarSign className="h-4 w-4" />} text={`$${course.revenue}`} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const EmptyState = () => (
  <div className="text-center py-16">
    <div className="p-4 bg-slate-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
      <BookOpen className="h-8 w-8 text-slate-400" />
    </div>
    <h3 className="text-lg font-semibold text-slate-900 mb-2">No courses found</h3>
    <p className="text-slate-500 mb-6">Create your first course to get started</p>
  </div>
);

const CourseStat = ({ icon, text }: any) => (
  <div className="flex items-center gap-2 text-slate-600">
    {icon}
    <span className="text-sm">{text}</span>
  </div>
);

export default InstructorCoursesPage;
