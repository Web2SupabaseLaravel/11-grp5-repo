// Messages.tsx
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
import { Input } from "@/components/ui/input";
import {
  Search,
  MessageSquare,
  Clock,
  Reply,
  Star,
  Edit3,
  Send,
  MailOpen,
} from "lucide-react";

const defaultMessages = [
  {
    id: 1,
    sender: "Teacher",
    receiver: "Ahmed",
    course: "React Basics",
    status: "unread",
    priority: "high",
    time: "2h ago",
    title: "Question about hooks",
    preview: "Can you explain useEffect hook?",
    liked: false,
    replied: false,
  },
  {
    id: 2,
    sender: "Teacher",
    receiver: "Sara",
    course: "Advanced CSS",
    status: "read",
    priority: "medium",
    time: "1d ago",
    title: "Flexbox problem",
    preview: "Why my flexbox items are not aligned?",
    liked: true,
    replied: false,
  },
  {
    id: 3,
    sender: "Omar",
    receiver: "Teacher",
    course: "JavaScript Essentials",
    status: "replied",
    priority: "low",
    time: "3d ago",
    title: "Closure concept",
    preview: "Can you give more examples about closures?",
    liked: false,
    replied: true,
  },
  {
    id: 4,
    sender: "Nour",
    receiver: "Teacher",
    course: "Python Intro",
    status: "read",
    priority: "medium",
    time: "5d ago",
    title: "Functions question",
    preview: "How to return multiple values?",
    liked: false,
    replied: false,
  },
];

const defaultStats = {
  total: 4,
  unread: 1,
  replied_today: 1,
  avg_response_time: "1h 15m",
};

const studentsList = ["Ahmed", "Sara", "Omar", "Nour"];
const coursesList = [
  "React Basics",
  "Advanced CSS",
  "JavaScript Essentials",
  "Python Intro",
];

const Messages = () => {
  const [messages, setMessages] = useState(defaultMessages);
  const [stats, setStats] = useState(defaultStats);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState<"all" | "sent" | "received">("all");
  const [search, setSearch] = useState("");
  const [composeOpen, setComposeOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [messageText, setMessageText] = useState("");
  const [selectedStudent, setSelectedStudent] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("");
  const [replyingToId, setReplyingToId] = useState<number | null>(null);
  const [replyText, setReplyText] = useState("");

  useEffect(() => {
    const fetchAllData = async () => {
      setLoading(true);
      try {
        const res = await axios.get("http://127.0.0.1:8000/api/messages");
        if (res.data?.messages?.length) {
          setMessages(
            res.data.messages.map((msg: any) => ({
              ...msg,
              liked: false,
              replied: false,
            }))
          );
        }
        if (res.data?.stats) setStats(res.data.stats);
      } catch (error) {
        console.error("Error fetching messages:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "unread":
        return "bg-blue-500";
      case "read":
        return "bg-gray-500";
      case "replied":
        return "bg-green-500";
      default:
        return "bg-gray-500";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "border-l-red-500";
      case "medium":
        return "border-l-yellow-500";
      case "low":
        return "border-l-green-500";
      default:
        return "border-l-gray-300";
    }
  };

  const toggleLike = (id: number) => {
    setMessages((prev) =>
      prev.map((msg) => {
        if (msg.id === id) {
          const newLiked = !msg.liked;
          const newStatus =
            newLiked && msg.status === "unread"
              ? "read"
              : msg.status;
          return { ...msg, liked: newLiked, status: newStatus };
        }
        return msg;
      })
    );
  };

  const openReplyInput = (id: number) => {
    setReplyingToId(id === replyingToId ? null : id);
    setReplyText("");
  };

  const sendReply = (id: number) => {
    if (!replyText.trim()) return alert("Reply cannot be empty");
    setMessages((prev) =>
      prev.map((msg) =>
        msg.id === id ? { ...msg, status: "replied", replied: true } : msg
      )
    );
    setReplyingToId(null);
    setReplyText("");
  };

  const sendMessage = () => {
    if (!title.trim() || !messageText.trim() || !selectedStudent || !selectedCourse) {
      alert("Please fill out all fields.");
      return;
    }
    const newMessage = {
      id: Date.now(),
      sender: "Teacher",
      receiver: selectedStudent,
      course: selectedCourse,
      status: "unread",
      priority: "medium",
      time: "Just now",
      title,
      preview: messageText.length > 40 ? messageText.slice(0, 40) + "..." : messageText,
      liked: false,
      replied: false,
    };
    setMessages((prev) => [newMessage, ...prev]);
    alert(`Message sent to ${selectedStudent} regarding ${selectedCourse}`);
    setTitle("");
    setMessageText("");
    setSelectedStudent("");
    setSelectedCourse("");
    setComposeOpen(false);
  };

  const filteredMessages = messages.filter((msg) => {
    if (filter === "sent" && msg.sender !== "Teacher") return false;
    if (filter === "received" && msg.receiver !== "Teacher") return false;
    if (search.trim()) {
      const s = search.toLowerCase();
      if (
        !(
          msg.title.toLowerCase().includes(s) ||
          msg.sender.toLowerCase().includes(s) ||
          msg.receiver.toLowerCase().includes(s) ||
          msg.course.toLowerCase().includes(s)
        )
      )
        return false;
    }
    return true;
  });

  const messageStates = [
    {
      label: "Total Messages",
      value: messages.length,
      color: "bg-gray-200",
      icon: <MessageSquare className="inline-block mr-1 h-5 w-5 text-gray-700" />,
    },
    {
      label: "Unread",
      value: messages.filter((m) => m.status === "unread").length,
      color: "bg-blue-200",
      icon: <Clock className="inline-block mr-1 h-5 w-5 text-blue-700" />,
    },
    {
      label: "Replied Today",
      value: messages.filter((m) => m.status === "replied").length,
      color: "bg-green-200",
      icon: <Reply className="inline-block mr-1 h-5 w-5 text-green-700" />,
    },
  ];

  return (
      <div className="min-h-screen bg-gradient-to-br from-white via-slate-50 to-blue-50">
      <div className="container mx-auto py-10 px-4">
        {/* Header and Compose */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
          <h1 className="text-3xl font-bold text-slate-800">📨 Student Messages</h1>
          <Button
            onClick={() => setComposeOpen(!composeOpen)}
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-xl shadow"
          >
            <Edit3 className="h-5 w-5" />
            Compose Message
          </Button>
        </div>

        {/* Compose Box */}
        {composeOpen && (
          <Card className="mb-8 shadow-lg border border-indigo-100 rounded-xl">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-indigo-700 flex items-center gap-2">
                <Edit3 className="h-5 w-5" />
                New Message
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">Student</label>
                  <select
                    value={selectedStudent}
                    onChange={(e) => setSelectedStudent(e.target.value)}
                    className="w-full p-2 rounded-lg border border-gray-300 focus:ring-indigo-500"
                  >
                    <option value="">Select Student</option>
                    {studentsList.map((s) => (
                      <option key={s}>{s}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Course</label>
                  <select
                    value={selectedCourse}
                    onChange={(e) => setSelectedCourse(e.target.value)}
                    className="w-full p-2 rounded-lg border border-gray-300 focus:ring-indigo-500"
                  >
                    <option value="">Select Course</option>
                    {coursesList.map((c) => (
                      <option key={c}>{c}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Title</label>
                <Input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter message title"
                  className="mt-1"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Message</label>
                <textarea
                  rows={4}
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  className="w-full p-2 rounded-lg border border-gray-300 focus:ring-indigo-500"
                  placeholder="Enter message content"
                />
              </div>
              <Button onClick={sendMessage} className="bg-indigo-600 hover:bg-indigo-700 text-white">
                <Send className="w-4 h-4 mr-2" />
                Send Message
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          {messageStates.map((stat) => (
            <div key={stat.label} className="rounded-xl bg-white p-4 shadow border border-slate-100 flex items-center gap-4">
              <div className={`p-3 rounded-full ${stat.color}`}>
                {stat.icon}
              </div>
              <div>
                <p className="text-sm text-gray-500">{stat.label}</p>
                <p className="text-xl font-bold text-gray-800">{stat.value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Filter/Search */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
          <div className="relative w-full sm:w-1/3">
            <Search className="absolute left-3 top-2.5 text-gray-400 h-5 w-5" />
            <Input
              placeholder="Search messages..."
              className="pl-10"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            {["all", "sent", "received"].map((type) => (
              <Button
                key={type}
                variant={filter === type ? "default" : "outline"}
                className="capitalize"
                onClick={() => setFilter(type as any)}
              >
                {type}
              </Button>
            ))}
          </div>
        </div>

        {/* Messages Grid */}
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
          {filteredMessages.length === 0 ? (
            <Card className="p-6 col-span-full text-center text-gray-500 shadow">
              <MailOpen className="mx-auto h-10 w-10 mb-2 text-indigo-400" />
              No messages found.
            </Card>
          ) : (
            filteredMessages.map((msg) => (
              <Card key={msg.id} className={`border-l-4 ${getPriorityColor(msg.priority)} p-4 rounded-xl shadow`}>
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-lg font-semibold text-gray-800">{msg.title}</h2>
                    <p className="text-sm text-gray-600">From: <strong>{msg.sender}</strong></p>
                    <p className="text-xs text-gray-500 mt-1">Course: {msg.course}</p>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <Badge className={`text-white ${getStatusColor(msg.status)}`}>{msg.status}</Badge>
                    <span className="text-xs text-gray-400">{msg.time}</span>
                  </div>
                </div>
                <p className="text-gray-700 mt-3">{msg.preview}</p>
                <div className="flex justify-between items-center mt-4">
                  <div className="flex gap-3">
                    <Button size="sm" variant="ghost" onClick={() => toggleLike(msg.id)}>
                      <Star className={`w-4 h-4 ${msg.liked ? "text-yellow-500" : "text-gray-400"}`} />
                    </Button>
                    <Button size="sm" variant="ghost" onClick={() => openReplyInput(msg.id)}>
                      <Reply className="w-4 h-4 text-indigo-500" />
                    </Button>
                  </div>
                </div>
                {replyingToId === msg.id && (
                  <div className="flex items-center gap-2 mt-4">
                    <Input
                      placeholder="Write a reply..."
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                    />
                    <Button size="sm" onClick={() => sendReply(msg.id)}>
                      <Send className="w-4 h-4 mr-1" /> Send
                    </Button>
                  </div>
                )}
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Messages;
