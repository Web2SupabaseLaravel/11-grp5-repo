import { useEffect, useState } from "react";
import axios from "axios";
import {Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {Calendar, Clock, Video, BookOpen, Bell, Plus, ChevronLeft, ChevronRight} from "lucide-react";
import {Select, SelectTrigger, SelectValue, SelectContent, SelectItem} from "@/components/ui/select";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {Badge} from "@/components/ui/badge";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
  headers: { "Content-Type": "application/json" },
});

const MySchedule = () => {
  const [todaySchedule, setTodaySchedule] = useState([]);
  const [upcomingCourses, setUpcomingCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [view, setView] = useState("today");
  const [weekStats, setWeekStats] = useState({
    hours: 0,
    completedSessions: 0,
    quizzesDue: 0,
  });

  const [formData, setFormData] = useState({
    title: "",
    time: "",
    type: "reminder",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [scheduleRes, coursesRes, statsRes] = await Promise.all([
          api.get("/schedule/today"),
          api.get("/courses/upcoming"),
          api.get("/schedule/stats/week"),
        ]);
        setTodaySchedule(scheduleRes.data);
        setUpcomingCourses(coursesRes.data);
        setWeekStats(statsRes.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching data:", err);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleReminderSubmit = async () => {
    try {
      const res = await api.post("/reminders", formData);
      setTodaySchedule((prev) => [...prev, res.data]);
      setFormData({ title: "", time: "", type: "reminder" });
      setOpen(false);
    } catch (err) {
      console.error("Error adding reminder:", err);
    }
  };

  const views = ["today", "week", "month"];

  const handlePrevious = () => {
    const index = views.indexOf(view);
    const newIndex = index > 0 ? index - 1 : views.length - 1;
    setView(views[newIndex]);
  };

  const handleNext = () => {
    const index = views.indexOf(view);
    const newIndex = index < views.length - 1 ? index + 1 : 0;
    setView(views[newIndex]);
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "live": return <Video className="h-4 w-4" />;
      case "quiz": return <BookOpen className="h-4 w-4" />;
      case "review": return <Clock className="h-4 w-4" />;
      default: return <Calendar className="h-4 w-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "live": return "bg-red-500";
      case "quiz": return "bg-blue-500";
      case "review": return "bg-green-500";
      default: return "bg-gray-500";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="container mx-auto py-8 px-4">
        {}
        <div className="flex justify-between items-center mb-8">
          <div>

            <h1 className="text-3xl font-bold text-slate-900 mb-2">My Study Schedule</h1>
            <p className="text-slate-600">Stay organized with your learning schedule</p>
          </div>

          {}
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Reminder
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Add a Reminder</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>

                  <Label>Title</Label>
                  <Input
                    placeholder="Reminder title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  />
                </div>

                <div>
                  <Label>Time</Label>
                  <Input
                    type="time"
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                  />
                </div>
                <div>
                  <Label>Type</Label>
                  <Select
                    value={formData.type}
                    onValueChange={(value) => setFormData({ ...formData, type: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="reminder">Reminder</SelectItem>
                      <SelectItem value="live">Live</SelectItem>
                      <SelectItem value="quiz">Quiz</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button onClick={handleReminderSubmit} className="w-full mt-4">
                  Save Reminder
                </Button>
              </div>

            </DialogContent>
          </Dialog>
        </div>

        {}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Button variant="ghost" size="sm" onClick={handlePrevious}>
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <h2 className="text-xl font-semibold capitalize">{view}</h2>
                <Button variant="ghost" size="sm" onClick={handleNext}>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>

              <div className="flex gap-2">
                <Button variant={view === "today" ? "default" : "outline"} size="sm" onClick={() => setView("today")}>Today</Button>
                <Button variant={view === "week" ? "default" : "outline"} size="sm" onClick={() => setView("week")}>Week</Button>
                <Button variant={view === "month" ? "default" : "outline"} size="sm" onClick={() => setView("month")}>Month</Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Today's Schedule
                  <Badge variant="secondary">{todaySchedule.length} items</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {todaySchedule.map((item: any, index: number) => (
                    <div key={index} className="border border-slate-200 rounded-lg p-4 hover:bg-slate-50">
                      <div className="flex items-start gap-4">
                        <div className="text-center">
                          <p className="text-sm font-semibold text-slate-900">{item.time}</p>
                          <div className={`text-white p-2 rounded-lg mt-2 ${getTypeColor(item.type)}`}>
                            {getTypeIcon(item.type)}
                          </div>

                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-slate-900 mb-1">{item.title}</h3>
                          {item.instructor && <p className="text-sm text-slate-600 mb-1">with {item.instructor}</p>}
                          {item.course && <p className="text-sm text-slate-600 mb-1">{item.course}</p>}
                          <p className="text-xs text-slate-500 mb-3">Duration: {item.duration}</p>
                          <div className="flex gap-2">
                            <Badge variant={item.status === "upcoming" ? "default" : "secondary"}>
                              {item.status}
                            </Badge>
                            {item.type === "live" && (
                              <Button size="sm">
                                <Video className="mr-2 h-4 w-4" />
                                Join Session
                              </Button>
                            )}
                            {item.type === "quiz" && (
                              <Button size="sm">
                                <BookOpen className="mr-2 h-4 w-4" />
                                Take Quiz
                              </Button>
                            )}
                            
                          </div>
                        </div>
                        <Button variant="ghost" size="sm">
                          <Bell className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {}
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  Upcoming Courses
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {upcomingCourses.map((course: any, index: number) => (
                    <div key={index} className="border border-slate-200 rounded-lg p-4">
                      <h3 className="font-semibold text-slate-900 mb-2">{course.title}</h3>
                      <p className="text-sm text-slate-600 mb-2">Next: {course.nextLesson}</p>
                      <p className="text-xs text-slate-500 mb-3">{course.date}</p>
                      <div className="mb-3">
                        <div className="flex justify-between text-sm mb-1">
                          <span>Progress</span>
                          <span>{course.progress}%</span>
                        </div>
                        <div className="w-full bg-slate-200 rounded-full h-2">
                          <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${course.progress}%` }} />
                        </div>
                      </div>
                      <p className="text-xs text-slate-500 mb-3">Instructor: {course.instructor}</p>
                      <Button size="sm" className="w-full">Continue Learning</Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* This Week Stats */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>This Week</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-slate-600">Hours Scheduled</span>
                    <span className="font-semibold">{weekStats.hours}h</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Completed Sessions</span>
                    <span className="font-semibold">{weekStats.completedSessions}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Quizzes Due</span>
                    <span className="font-semibold text-orange-600">{weekStats.quizzesDue}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MySchedule;