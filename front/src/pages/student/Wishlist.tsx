import { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, Star, Clock, Users, ShoppingCart, X } from "lucide-react";

interface Course {
  id: number;
  title: string;
  instructor: string;
  price: number;
  originalPrice: number;
  rating: number;
  students: number;
  duration: string;
  level: string;
  discount: number;
  image?: string;
}

const Wishlist = () => {
  const [wishlistCourses, setWishlistCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchWishlist();
  }, []);

  const fetchWishlist = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/wishlist"); 
      setWishlistCourses(response.data); 
    } 
    catch (error) {
      console.error("Failed to fetch wishlist", error);
      setWishlistCourses([]);
    }
    setLoading(false);
  };

  const removeFromWishlist = async (id: number) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/wishlist/${id}`);
      setWishlistCourses((prev) => prev.filter((course) => course.id !== id));
    }
     catch (error) {
      console.error("Failed to remove from wishlist", error);
    }
  };

  const addToCart = async (id: number) => {
    try {
      await axios.post(`http://127.0.0.1:8000/api/cart`, { course_id: id });
      alert("Added to cart!");
    } catch (error) {
      console.error("Failed to add to cart", error);
    }
  };

  const getLevelColor = (level: string) => {
    switch (level.toLowerCase()) {
      case "beginner":
        return "bg-green-100 text-green-800";
      case "intermediate":
        return "bg-yellow-100 text-yellow-800";
      case "advanced":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }

  };

  const totalValue = wishlistCourses.reduce((sum, course) => sum + course.price, 0);

  return (

    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="container mx-auto py-8 px-4">
        <div className="mb-8">
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 mb-2">My Wishlist</h1>
          <p className="text-slate-600 text-lg">Courses you want to take later</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-pink-100 rounded-xl">
                  <Heart className="h-6 w-6 text-pink-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-600">Wishlist Items</p>
                  <p className="text-3xl font-bold text-pink-600">{wishlistCourses.length}</p>
                </div>

              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-green-100 rounded-xl">
                  <ShoppingCart className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-600">Total Value</p>
                  <p className="text-3xl font-bold text-green-600">${totalValue.toFixed(2)}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-100 rounded-xl">
                  <Clock className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-600">Total Hours</p>
                  {}
                  <p className="text-3xl font-bold text-blue-600">
                    {wishlistCourses.reduce((sum, course) => {
                      const hrs = parseInt(course.duration) || 0;
                      return sum + hrs;
                    }, 0)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {}
        <Card>
          <CardHeader>
            <CardTitle>Your Wishlist</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <p>Loading...</p>
            ) : wishlistCourses.length === 0 ? (
              <div className="text-center py-16">
                <div className="p-4 bg-slate-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Heart className="h-8 w-8 text-slate-400" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">Your wishlist is empty</h3>
                <p className="text-slate-500">Browse courses and add them to your wishlist</p>
              </div>
            ) : (
              <div className="grid gap-6">
                {wishlistCourses.map((course) => (
                  <div
                    key={course.id}
                    className="border border-slate-200 rounded-xl p-6 hover:shadow-lg transition-shadow"
                  >
                    <div className="flex gap-6">
                      <div className="w-48 h-32 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-lg flex items-center justify-center">
                        <span className="text-2xl font-bold text-indigo-600">Course</span>
                      </div>

                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h3 className="text-xl font-semibold text-slate-900 mb-2">{course.title}</h3>
                            <p className="text-slate-600 mb-2">by {course.instructor}</p>
                            <div className="flex items-center gap-4 text-sm text-slate-600 mb-3">
                              <div className="flex items-center gap-1">
                                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                <span>{course.rating}</span>
                              </div>

                              <div className="flex items-center gap-1">
                                <Users className="h-4 w-4" />
                                <span>{course.students.toLocaleString()} students</span>
                              </div>

                              <div className="flex items-center gap-1">
                                <Clock className="h-4 w-4" />
                                <span>{course.duration}</span>
                              </div>
                              
                            </div>
                            <Badge className={getLevelColor(course.level)}>{course.level}</Badge>
                          </div>

                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeFromWishlist(course.id)}
                            className="text-slate-400 hover:text-red-500"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <span className="text-2xl font-bold text-slate-900">${course.price}</span>
                            <span className="text-lg text-slate-500 line-through">${course.originalPrice}</span>
                            <Badge className="bg-red-100 text-red-800">{course.discount}% OFF</Badge>
                          </div>

                          <Button
                            onClick={() => addToCart(course.id)}
                            className="bg-indigo-600 hover:bg-indigo-700"
                          >
                            <ShoppingCart className="mr-2 h-4 w-4" />
                            Add to Cart
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Wishlist;