import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  MessageSquare, 
  Users, 
  Search, 
  Plus,
  TrendingUp,
  Heart,
  Reply,
  Eye,
  Star,
  Filter
} from "lucide-react";

const Community = () => {
  const categories = [
    { name: "General Discussion", posts: 234, color: "bg-blue-500" },
    { name: "Course Help", posts: 456, color: "bg-green-500" },
    { name: "Project Showcase", posts: 123, color: "bg-purple-500" },
    { name: "Career Advice", posts: 189, color: "bg-orange-500" },
    { name: "Study Groups", posts: 67, color: "bg-pink-500" }
  ];

  const trendingPosts = [
    {
      id: 1,
      title: "Best practices for React performance optimization",
      author: "Ahmed Hassan",
      category: "Course Help",
      replies: 24,
      likes: 156,
      views: 1203,
      time: "2 hours ago",
      tags: ["react", "performance", "optimization"]
    },
    {
      id: 2,
      title: "My first full-stack project - Portfolio website feedback",
      author: "Sara Mohamed",
      category: "Project Showcase", 
      replies: 18,
      likes: 89,
      views: 567,
      time: "4 hours ago",
      tags: ["portfolio", "fullstack", "feedback"]
    },
    {
      id: 3,
      title: "How to transition from frontend to backend development?",
      author: "Omar Ali",
      category: "Career Advice",
      replies: 31,
      likes: 203,
      views: 890,
      time: "6 hours ago", 
      tags: ["career", "backend", "transition"]
    },
    {
      id: 4,
      title: "Study group for JavaScript Fundamentals - Join us!",
      author: "Fatima Nasser",
      category: "Study Groups",
      replies: 12,
      likes: 45,
      views: 234,
      time: "1 day ago",
      tags: ["javascript", "study-group", "beginners"]
    }
  ];

  const topContributors = [
    { name: "Prof. Ahmed Hassan", points: 2450, role: "Instructor", avatar: "A" },
    { name: "Dr. Sara Mohamed", points: 1890, role: "Instructor", avatar: "S" },
    { name: "Ali Mahmoud", points: 1234, role: "Student", avatar: "A" },
    { name: "Nour Ibrahim", points: 987, role: "Student", avatar: "N" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="container mx-auto py-8 px-4">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2">Community Forum</h1>
            <p className="text-slate-600">Connect, learn, and share with fellow learners</p>
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Post
          </Button>
        </div>

        {/* Search and Filters */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex gap-4 items-center">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                <Input placeholder="Search discussions..." className="pl-10" />
              </div>
              <Button variant="outline">
                <Filter className="mr-2 h-4 w-4" />
                Filter
              </Button>
              <Button variant="outline">Latest</Button>
              <Button variant="outline">Popular</Button>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Categories */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5" />
                  Discussion Categories
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {categories.map((category, index) => (
                    <div key={index} className="border border-slate-200 rounded-lg p-4 hover:bg-slate-50 cursor-pointer">
                      <div className="flex items-center gap-3 mb-2">
                        <div className={`${category.color} w-3 h-3 rounded-full`}></div>
                        <h3 className="font-semibold text-slate-900">{category.name}</h3>
                      </div>
                      <p className="text-sm text-slate-600">{category.posts} posts</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Trending Posts */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Trending Discussions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {trendingPosts.map((post) => (
                    <div key={post.id} className="border border-slate-200 rounded-lg p-4 hover:bg-slate-50 cursor-pointer">
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 bg-indigo-500 text-white rounded-full flex items-center justify-center font-semibold">
                          {post.author.charAt(0)}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-slate-900 mb-2">{post.title}</h3>
                          <div className="flex items-center gap-4 text-sm text-slate-600 mb-3">
                            <span>by {post.author}</span>
                            <Badge variant="secondary">{post.category}</Badge>
                            <span>{post.time}</span>
                          </div>
                          <div className="flex items-center gap-6 text-sm text-slate-500 mb-3">
                            <span className="flex items-center gap-1">
                              <Reply className="h-4 w-4" />
                              {post.replies} replies
                            </span>
                            <span className="flex items-center gap-1">
                              <Heart className="h-4 w-4" />
                              {post.likes} likes
                            </span>
                            <span className="flex items-center gap-1">
                              <Eye className="h-4 w-4" />
                              {post.views} views
                            </span>
                          </div>
                          <div className="flex gap-2">
                            {post.tags.map((tag, tagIndex) => (
                              <Badge key={tagIndex} variant="outline" className="text-xs">
                                #{tag}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Community Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Community Stats</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-600">Total Members</span>
                    <span className="font-semibold">12,847</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-600">Posts Today</span>
                    <span className="font-semibold text-green-600">156</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-600">Active Discussions</span>
                    <span className="font-semibold">89</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-600">Online Now</span>
                    <span className="font-semibold text-blue-600">234</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Top Contributors */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="h-5 w-5" />
                  Top Contributors
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {topContributors.map((contributor, index) => (
                    <div key={index} className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-50">
                      <div className="w-8 h-8 bg-indigo-500 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                        {contributor.avatar}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-slate-900 text-sm">{contributor.name}</p>
                        <p className="text-xs text-slate-600">{contributor.role}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-semibold text-slate-900">{contributor.points}</p>
                        <p className="text-xs text-slate-500">points</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Button className="w-full justify-start">
                    <Plus className="mr-2 h-4 w-4" />
                    Start Discussion
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Users className="mr-2 h-4 w-4" />
                    Join Study Group
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Ask Question
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Community;