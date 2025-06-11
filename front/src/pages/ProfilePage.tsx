import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Card, CardContent, CardHeader, CardTitle
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  User, Mail, Phone, MapPin, Calendar, Edit, Camera
} from 'lucide-react';

// إعداد axios مع التوكن
const axiosInstance = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
});
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // تأكد أنه نفس التخزين المستخدم عند تسجيل الدخول
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

const Profile = () => {
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);

  const [profile, setProfile] = useState({
  first_name: '',
  last_name: '',
  email: '',
  phone: '',
  dob: '',
  location: '',
  bio: '',
  avatar: '',
  joined_date: '',
});


  useEffect(() => {
    axiosInstance.get("/user")
      .then(res => {
        setProfile({
        ...res.data,
        first_name: res.data.first_name || '',
        last_name: res.data.last_name || '',
        email: res.data.email || '',
        phone: res.data.phone || '',
        dob: res.data.dob || '',
        location: res.data.location || '',
        bio: res.data.bio || '',
        avatar: res.data.avatar || '',
        joined_date: res.data.joined_date || '',
      });
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching profile:", err);
        setLoading(false);
      });
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setProfile({ ...profile, [e.target.id]: e.target.value });
  };

  const handleSave = () => {
      console.log("Saving profile...");
    axiosInstance.put("/user", profile)
      .then(res => {
              console.log("Saved!", res.data);
        setProfile(res.data.user);
        console.log("Sending:", profile);
        
        setEditing(false);
      })
      .catch(err => console.error("Error updating profile:", err));
  };

  if (loading) return <div className="p-8">Loading...</div>;
  if (!profile) return <div className="p-8">No profile data found.</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">My Profile</h1>
        <p className="text-gray-600 mb-6">Manage your personal information and preferences</p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Overview */}
          <Card>
            <CardHeader>
              <CardTitle>Profile Overview</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col items-center text-center">
                <div className="relative">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src={profile.avatar || "/placeholder-avatar.jpg"} />
                    <AvatarFallback>{profile.first_name?.[0]}{profile.last_name?.[0]}</AvatarFallback>
                  </Avatar>
                  <Button size="sm" variant="outline" className="absolute -bottom-2 -right-2 h-8 w-8 p-0">
                    <Camera className="h-4 w-4" />
                  </Button>
                </div>
                <h3 className="mt-4 text-xl font-semibold">{profile.first_name} {profile.last_name}</h3>
                <p className="text-gray-500">{profile.bio?.split(" ").slice(0, 4).join(" ")}...</p>
                <Badge variant="outline" className="mt-2">Active Learner</Badge>
              </div>

              <div className="space-y-3 text-sm">
                <div className="flex items-center space-x-3"><Mail className="h-4 w-4" /><span>{profile.email}</span></div>
                <div className="flex items-center space-x-3"><Phone className="h-4 w-4" /><span>{profile.phone}</span></div>
                <div className="flex items-center space-x-3"><MapPin className="h-4 w-4" /><span>{profile.location}</span></div>
                <div className="flex items-center space-x-3"><Calendar className="h-4 w-4" /><span>Joined: {profile.joined_date || "2024"}</span></div>
              </div>
            </CardContent>
          </Card>

          {/* Form */}
          <Card className="lg:col-span-2">
            <CardHeader className="flex justify-between items-center">
              <CardTitle>Personal Information</CardTitle>
              <Button variant="outline" size="sm" onClick={() => setEditing(!editing)}>
                <Edit className="h-4 w-4 mr-2" /> {editing ? "Cancel" : "Edit Profile"}
              </Button>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2"><Label htmlFor="first_name">First Name</Label><Input id="first_name" value={profile.first_name || ''} onChange={handleChange} disabled={!editing} /></div>
                <div className="space-y-2"><Label htmlFor="last_name">Last Name</Label><Input id="last_name" value={profile.last_name || ''} onChange={handleChange} disabled={!editing} /></div>
                <div className="space-y-2"><Label htmlFor="email">Email</Label><Input id="email" type="email" value={profile.email || ''} onChange={handleChange} disabled={!editing} /></div>
                <div className="space-y-2"><Label htmlFor="phone">Phone</Label><Input id="phone" value={profile.phone || ''} onChange={handleChange} disabled={!editing} /></div>
                <div className="space-y-2"><Label htmlFor="dob">Date of Birth</Label><Input id="dob" type="date" value={profile.dob || ''} onChange={handleChange} disabled={!editing} /></div>
                <div className="space-y-2"><Label htmlFor="location">Location</Label><Input id="location" value={profile.location || ''} onChange={handleChange} disabled={!editing} /></div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea id="bio" rows={4} value={profile.bio} onChange={handleChange} disabled={!editing} />
              </div>

              {editing && (
                <div className="flex justify-end space-x-3">
                  <Button variant="outline" onClick={() => setEditing(false)}>Cancel</Button>
                  <Button onClick={handleSave}>Save Changes</Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Profile;
