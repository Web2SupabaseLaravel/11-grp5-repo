import React, { useEffect, useState } from "react";
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
  Activity,
  BookOpen,
  CheckCircle,
  Target,
  Award,
  TrendingUp,
  Star,
  Clock,
} from "lucide-react";

const MyActivity = () => {
  const [recentActivities, setRecentActivities] = useState<any[]>([]);
  const [weeklyStats, setWeeklyStats] = useState<any[]>([]);
  const [courseProgress, setCourseProgress] = useState<any[]>([]);
  const [achievements, setAchievements] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [hasMoreActivities, setHasMoreActivities] = useState(true);
  const [loadingActivities, setLoadingActivities] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [activitiesRes, statsRes, progressRes, achievementsRes] =
        await Promise.all([
          axios.get("/api/activities?page=1"),
          axios.get("/api/stats"),
          axios.get("/api/progress"),
          axios.get("/api/achievements"),
        ]);

      setRecentActivities(activitiesRes.data.activities || []);
      setWeeklyStats(statsRes.data.stats || []);
      setCourseProgress(progressRes.data.progress || []);
      setAchievements(achievementsRes.data.achievements || []);
      setHasMoreActivities(activitiesRes.data.hasMore ?? false);
    } catch (error) {
      console.error("Error loading data:", error);
    }
  };

  const loadMoreActivities = async () => {
    setLoadingActivities(true);
    try {
      const nextPage = page + 1;
      const res = await axios.get(`/api/activities?page=${nextPage}`);
      const newActivities = res.data.activities || [];

      if (newActivities.length === 0) {
        setHasMoreActivities(false);
      } else {
        setRecentActivities((prev) => [...prev, ...newActivities]);
        setPage(nextPage);
      }
    } catch (error) {
      console.error("Error loading more activities:", error);
    } finally {
      setLoadingActivities(false);
    }
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "lesson_completed":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "quiz_completed":
        return <Target className="h-4 w-4 text-blue-500" />;
      case "certificate_earned":
        return <Award className="h-4 w-4 text-yellow-500" />;
      case "lesson_started":
        return <BookOpen className="h-4 w-4 text-purple-500" />;
      default:
        return <Activity className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto py-8 px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">
            My Learning Activity
          </h1>
          <p className="text-slate-600">
            Track your progress and achievements
          </p>
        </div>

        {/* Weekly Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {(weeklyStats.length > 0 ? weeklyStats : [
            {
              title: "Lessons Completed",
              value: "-",
              change: "No updates",
              icon: <BookOpen className="h-6 w-6 text-indigo-600" />,
              bgColor: "bg-indigo-100",
              textColor: "text-indigo-600"
            },
            {
              title: "Quiz Average",
              value: "-",
              change: "No updates",
              icon: <Target className="h-6 w-6 text-green-600" />,
              bgColor: "bg-green-100",
              textColor: "text-green-600"
            },
            {
              title: "Study Hours",
              value: "-",
              change: "No updates",
              icon: <Clock className="h-6 w-6 text-purple-600" />,
              bgColor: "bg-purple-100",
              textColor: "text-purple-600"
            }
          ]).map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-xl ${stat.bgColor}`}>
                    {stat.icon}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-600">{stat.title}</p>
                    <p className={`text-3xl font-bold ${stat.textColor}`}>{stat.value}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>


        

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Activities */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                {recentActivities.length > 0 ? (
                  <div className="space-y-4">
                    {recentActivities.map((activity, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-4 p-4 border border-slate-200 rounded-lg hover:bg-slate-50"
                      >
                        <div className="mt-1">{getActivityIcon(activity.type)}</div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-slate-900 mb-1">
                            {activity.title}
                          </h3>
                          <p className="text-sm text-slate-600 mb-2">
                            {activity.course}
                          </p>
                          <div className="flex items-center justify-between">
                            <p className="text-xs text-slate-500">
                              {activity.time}
                            </p>
                            {activity.score && (
                              <Badge variant="secondary" className="text-xs">
                                Score: {activity.score}%
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-center text-slate-500">
                    No activities found.
                  </p>
                )}

                {hasMoreActivities && (
                  <Button
                    variant="outline"
                    className="w-full mt-4"
                    onClick={loadMoreActivities}
                    disabled={loadingActivities}
                  >
                    {loadingActivities ? "Loading..." : "Load More"}
                  </Button>
                )}
              </CardContent>
            </Card>
          </div>


            {/* Achievements */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5" />
                  Achievements
                </CardTitle>
              </CardHeader>
              <CardContent>
                {achievements.length > 0 ? (
                  <div className="space-y-3">
                    {achievements.map((ach, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg"
                      >
                        <Star className="h-5 w-5 text-yellow-500" />
                        <div>
                          <p className="font-medium text-slate-900 text-sm">
                            {ach.title}
                          </p>
                          <p className="text-xs text-slate-600">
                            {ach.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-center text-slate-500">
                    No achievements found.
                  </p>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
  );
};

export default MyActivity;
