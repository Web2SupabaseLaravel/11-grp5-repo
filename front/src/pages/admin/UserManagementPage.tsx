import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Users,
  UserCheck,
  UserCog,
  GraduationCap,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const iconMap: Record<string, React.ElementType> = {
  admin: UserCog,
  instructor: UserCheck,
  student: GraduationCap,
};

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  created_at: string;
}

const UserManagementPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  const adminCount = users.filter((u) => u.role === "admin").length;
  const instructorCount = users.filter((u) => u.role === "instructor").length;
  const studentCount = users.filter((u) => u.role === "student").length;

  const roleStats = [
    { title: "Admins", value: adminCount, icon: "admin", color: "bg-indigo-500" },
    { title: "Instructors", value: instructorCount, icon: "instructor", color: "bg-green-500" },
    { title: "Students", value: studentCount, icon: "student", color: "bg-yellow-500" },
  ];

  const fetchUsers = useCallback(async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Token not found");

      const response = await axios.get("http://localhost:8000/api/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("👀 Users Response:", response.data);

      const usersList = Array.isArray(response.data?.data)
        ? response.data.data
        : Array.isArray(response.data)
        ? response.data
        : [];

     const filtered = usersList.filter((user: Partial<User>) =>
  typeof user?.role === "string" &&
  ["admin", "student", "instructor"].includes(user.role.toLowerCase())
);


      setUsers(filtered);
      toast({
        title: "Success",
        description: "Users refreshed successfully",
      });
    } catch (error) {
      console.error("Error fetching users:", error);
      toast({
        title: "Error",
        description: "Failed to fetch users",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-100">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Header and Refresh */}
        <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-4xl font-bold text-slate-800 mb-1">User Management</h1>
            <p className="text-lg text-slate-600">List of Admins, Instructors, and Students</p>
            <p className="text-sm text-slate-500 mt-1">Total Users: {users.length}</p>
          </div>
          <button
            onClick={fetchUsers}
            className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition"
          >
            Refresh Users
          </button>
        </div>

        {/* Role stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-10">
          {roleStats.map((stat, index) => {
            const Icon = iconMap[stat.icon];
            return (
              <Card key={index} className="bg-white shadow-md border border-slate-200 rounded-xl">
                <CardContent className="p-5 flex items-center justify-between">
                  <div>
                    <p className="text-slate-600 text-sm">{stat.title}</p>
                    <p className="text-2xl font-bold text-slate-800">{stat.value}</p>
                  </div>
                  <div className={`p-3 ${stat.color} rounded-full`}>
                    {Icon && <Icon className="text-white w-6 h-6" />}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Users table */}
        <Card className="shadow-lg border border-slate-200 rounded-2xl">
          <CardHeader className="flex items-center gap-4 bg-slate-100 rounded-t-2xl border-b">
            <div className="p-2 bg-indigo-200 rounded-xl text-indigo-800">
              <Users className="w-6 h-6" />
            </div>
            <CardTitle className="text-xl font-semibold text-slate-800">Users</CardTitle>
          </CardHeader>

          <CardContent className="p-0">
            {isLoading ? (
              <div className="flex items-center justify-center py-16 text-slate-600">
                Loading users...
              </div>
            ) : users.length === 0 ? (
              <div className="text-center text-slate-600 py-16">No users found.</div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-slate-50">
                      <TableHead className="min-w-[180px] text-slate-700 font-semibold">Name</TableHead>
                      <TableHead className="min-w-[250px] text-slate-700 font-semibold">Email</TableHead>
                      <TableHead className="min-w-[150px] text-slate-700 font-semibold">Role</TableHead>
                      <TableHead className="min-w-[180px] text-slate-700 font-semibold">Created</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {users.map((user) => (
                      <TableRow key={user.id} className="hover:bg-slate-50 transition">
                        <TableCell className="text-slate-800">{user.name}</TableCell>
                        <TableCell className="text-slate-700">{user.email}</TableCell>
                        <TableCell className="capitalize text-slate-700">{user.role}</TableCell>
                        <TableCell className="text-slate-700">
                          {new Date(user.created_at).toLocaleDateString()}
                        </TableCell>
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

export default UserManagementPage;