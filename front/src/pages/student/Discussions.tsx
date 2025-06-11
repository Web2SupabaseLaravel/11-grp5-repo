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
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  MessageSquare,
  Plus,
  Search,
  Filter,
  ThumbsUp,
  MessageCircle,
  Clock,
  User,
  BookOpen,
  Pin,
} from "lucide-react";

const expectedStatsTitles = [
  "My Posts",
  "Replies Received",
  "Helpful Answers",
  "Following Topics",
];

const Discussions = () => {
  const [stats, setStats] = useState([]);
  const [discussions, setDiscussions] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/discussions")
      .then((res) => {
        const data = res.data;

        // Format discussions
        const formatted = data.map((item, index) => ({
          id: item.id || index + 1,
          title: item.title || `Hot Topic #${index + 1}`,
          author: item.author_name || "Anonymous",
          course: item.course_title || "General Course",
          replies: item.replies_count ?? 1204,
          likes: item.likes_count ?? 30523,
          lastActivity: item.last_activity || "3 minutes ago",
          isPinned: item.is_pinned || false,
          tags: item.tags && item.tags.length > 0 ? item.tags : ["General", "Help"],
        }));

        setDiscussions(formatted);
      })
      .catch((error) => {
        console.error("Failed to fetch discussions:", error);

        // Fallback dummy discussions
        const fallback = [
          {
            id: 1,
            title: "How do I master JavaScript in 30 days?",
            author: "Yousef Khaled",
            course: "JS Ultimate",
            replies: 1452,
            likes: 32784,
            lastActivity: "Just now",
            isPinned: true,
            tags: ["JavaScript", "Learning", "Challenge"],
          },
          {
            id: 2,
            title: "Is Tailwind better than Bootstrap?",
            author: "Lina Ahmad",
            course: "Frontend Tools",
            replies: 804,
            likes: 17234,
            lastActivity: "12 minutes ago",
            isPinned: false,
            tags: ["Tailwind", "Bootstrap", "CSS"],
          },
          {
            id: 3,
            title: "Best database for real-time apps?",
            author: "Omar Nour",
            course: "Full Stack Essentials",
            replies: 603,
            likes: 11043,
            lastActivity: "1 hour ago",
            isPinned: false,
            tags: ["Database", "Realtime", "Firebase"],
          },
        ];

        setDiscussions(fallback);
      });

    // Fetch Stats
    axios
      .get("http://localhost:8000/api/discussion-stats")
      .then((res) => {
        const apiStats = res.data;

        const preparedStats = expectedStatsTitles.map((title) => {
          const stat = apiStats.find((s) => s.title === title);
          let icon = null;
          let color = "";

          switch (title) {
            case "My Posts":
              icon = <MessageSquare className="h-5 w-5" />;
              color = "bg-blue-500";
              break;
            case "Replies Received":
              icon = <MessageCircle className="h-5 w-5" />;
              color = "bg-green-500";
              break;
            case "Helpful Answers":
              icon = <ThumbsUp className="h-5 w-5" />;
              color = "bg-purple-500";
              break;
            case "Following Topics":
              icon = <BookOpen className="h-5 w-5" />;
              color = "bg-orange-500";
              break;
            default:
              icon = <MessageSquare className="h-5 w-5" />;
              color = "bg-gray-500";
          }

          return {
            title,
            value: stat?.value ?? 500,
            icon,
            color,
          };
        });

        setStats(preparedStats);
      })
      .catch((error) => {
        console.error("Failed to fetch stats:", error);

        const fallbackStats = expectedStatsTitles.map((title) => {
          let icon = <MessageSquare className="h-5 w-5" />;
          let color = "bg-gray-500";

          switch (title) {
            case "My Posts":
              icon = <MessageSquare className="h-5 w-5" />;
              color = "bg-blue-500";
              break;
            case "Replies Received":
              icon = <MessageCircle className="h-5 w-5" />;
              color = "bg-green-500";
              break;
            case "Helpful Answers":
              icon = <ThumbsUp className="h-5 w-5" />;
              color = "bg-purple-500";
              break;
            case "Following Topics":
              icon = <BookOpen className="h-5 w-5" />;
              color = "bg-orange-500";
              break;
          }

          return {
            title,
            value: 500,
            icon,
            color,
          };
        });

        setStats(fallbackStats);
      });
  }, []);

  const handleLike = (id) => {
    console.log("Liked discussion with id:", id);
  };

  const handleReply = (id) => {
    console.log("Reply clicked on discussion id:", id);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="container mx-auto py-8 px-4">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2">
              Discussions
            </h1>
            <p className="text-slate-600">
              Connect with fellow students and instructors
            </p>
          </div>
          <Button onClick={() => console.log("Start Discussion clicked")}>
            <Plus className="mr-2 h-4 w-4" />
            Start Discussion
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, i) => (
            <Card key={i}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-600 mb-1">{stat.title}</p>
                    <p className="text-2xl font-bold text-slate-900">
                      {stat.value}
                    </p>
                  </div>
                  <div className={`${stat.color} text-white p-3 rounded-xl`}>
                    {stat.icon}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                <Input placeholder="Search discussions..." className="pl-10" />
              </div>
              <Button variant="outline">
                <Filter className="mr-2 h-4 w-4" />
                Filter
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-4">
          {discussions.map((discussion) => (
            <Card key={discussion.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-indigo-500 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                    {discussion.author.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        {discussion.isPinned && (
                          <Pin className="h-4 w-4 text-orange-500" />
                        )}
                        <h3 className="font-semibold text-slate-900 hover:text-blue-600 cursor-pointer">
                          {discussion.title}
                        </h3>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-slate-600 mb-3">
                      <span className="flex items-center gap-1">
                        <User className="h-4 w-4" />
                        {discussion.author}
                      </span>
                      <span className="flex items-center gap-1">
                        <BookOpen className="h-4 w-4" />
                        {discussion.course}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {discussion.lastActivity}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 mb-3">
                      {discussion.tags.map((tag, idx) => (
                        <Badge key={idx} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-sm text-slate-600">
                        <span className="flex items-center gap-1">
                          <MessageCircle className="h-4 w-4" />
                          {discussion.replies} replies
                        </span>
                        <span className="flex items-center gap-1">
                          <ThumbsUp className="h-4 w-4" />
                          {discussion.likes} likes
                        </span>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" onClick={() => handleLike(discussion.id)}>
                          <ThumbsUp className="mr-2 h-4 w-4" />
                          Like
                        </Button>
                        <Button size="sm" onClick={() => handleReply(discussion.id)}>
                          <MessageCircle className="mr-2 h-4 w-4" />
                          Reply
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Post */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Start a New Discussion</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Input placeholder="Discussion title..." />
              <Textarea placeholder="What would you like to discuss?" rows={4} />
              <div className="flex justify-between items-center">
                <div className="flex gap-2">
                  <Badge variant="outline">React</Badge>
                  <Button size="sm" variant="ghost" onClick={() => console.log("Add Tags clicked")}>
                    Add Tags
                  </Button>
                </div>
                <Button onClick={() => console.log("Post Discussion clicked")}>
                  Post Discussion
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Discussions;
