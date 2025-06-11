import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Play, Clock, Users, Star, BookOpen, Award, CheckCircle, Heart, Share2, ShoppingCart
} from 'lucide-react';
import axios from 'axios';

const CourseDetails = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEnrolling, setIsEnrolling] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/courses/${id}`);
        setCourse(response.data);
      } catch (error) {
        console.error("Failed to fetch course:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [id]);

  const handleEnrollNow = async () => {
    setIsEnrolling(true);
    try {
      // Add your enrollment logic here
      const response = await axios.post(`http://localhost:8000/api/courses/${id}/enroll`);
      alert('Successfully enrolled in the course!');
    } catch (error) {
      console.error("Failed to enroll:", error);
      alert('Failed to enroll. Please try again.');
    } finally {
      setIsEnrolling(false);
    }
  };

  const handleAddToCart = async () => {
    setIsAddingToCart(true);
    try {
      // Add your cart logic here
      const response = await axios.post(`http://localhost:8000/api/cart/add`, {
        courseId: id,
        title: course.title,
        price: course.price,
        image: course.image
      });
      alert('Course added to cart successfully!');
    } catch (error) {
      console.error("Failed to add to cart:", error);
      alert('Failed to add to cart. Please try again.');
    } finally {
      setIsAddingToCart(false);
    }
  };

  if (loading) return <div className="text-center py-10">Loading course details...</div>;
  if (!course) return <div className="text-center py-10 text-red-600">Course not found.</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="mb-8">
              <div className="mb-4">
                <Badge variant="secondary" className="mb-2">{course.category || 'Course'}</Badge>
                <h1 className="text-3xl font-bold text-gray-900 mb-4">{course.title}</h1>
                <p className="text-lg text-gray-600 mb-4">{course.description}</p>
              </div>

              <div className="flex items-center space-x-6 text-sm text-gray-600 mb-6">
                <div className="flex items-center space-x-1">
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <span className="font-medium">{course.rating || 'N/A'}</span>
                  <span>({course.students || 0} students)</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="h-4 w-4" />
                  <span>{course.duration || 'N/A'}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <BookOpen className="h-4 w-4" />
                  <span>{course.lessons || 0} lessons</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-600">
                  Created by <Link to="#" className="text-blue-600 hover:underline">{course.instructor || 'Unknown'}</Link>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="sm"><Heart className="h-4 w-4" /></Button>
                  <Button variant="ghost" size="sm"><Share2 className="h-4 w-4" /></Button>
                </div>
              </div>
            </div>

            {/* Video Preview */}
            <Card className="mb-8">
              <CardContent className="p-0">
                <div className="relative">
                  <img
                    src={course.image || '/api/placeholder/800/400'}
                    alt={course.title}
                    className="w-full h-64 object-cover rounded-t-lg"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-t-lg">
                    <Button size="lg" className="bg-white text-black hover:bg-gray-100">
                      <Play className="h-6 w-6 mr-2" />
                      Preview Course
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* What you'll learn */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>What you'll learn</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {(
  typeof course.learning_objectives === 'string'
    ? course.learning_objectives.split(',').map(obj => obj.trim())
    : Array.isArray(course.learning_objectives)
    ? course.learning_objectives
    : []
).map((item, index) => (

                    <div key={index} className="flex items-start space-x-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                      <span className="text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Curriculum */}
            <Card>
              <CardHeader>
                <CardTitle>Course Curriculum</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {(course.curriculum || []).map((section, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <h3 className="font-medium text-gray-900">{section.title}</h3>
                        <div className="text-sm text-gray-600">
                          {section.lessons || 0} lessons • {section.duration || 'N/A'}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <CardContent className="p-6">
                <div className="text-center mb-6">
                  <div className="text-3xl font-bold text-gray-900">{course.price || 'Free'}</div>
                  {course.original_price && (
                    <div className="text-lg text-gray-500 line-through">{course.original_price}</div>
                  )}
                  <div className="text-sm text-red-600 font-medium">Limited Offer</div>
                </div>

                <Button 
                  className="w-full mb-4" 
                  size="lg"
                  onClick={handleEnrollNow}
                  disabled={isEnrolling}
                >
                  {isEnrolling ? 'Enrolling...' : 'Enroll Now'}
                </Button>
                
                <Button 
                  variant="outline" 
                  className="w-full mb-6"
                  onClick={handleAddToCart}
                  disabled={isAddingToCart}
                >
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  {isAddingToCart ? 'Adding...' : 'Add to Cart'}
                </Button>

                <div className="text-center text-sm text-gray-600 mb-6">
                  30-Day Money-Back Guarantee
                </div>

                <div className="space-y-4">
                  <h3 className="font-medium text-gray-900">This course includes:</h3>
                  <div className="space-y-2">
                    {(course.includes || []).map((item, index) => (
                      <div key={index} className="flex items-center space-x-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t space-y-2 text-sm text-gray-600">
                  <div className="flex justify-between">
                    <span>Level:</span>
                    <span>{course.level || 'N/A'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Last updated:</span>
                    <span>{course.last_updated || 'N/A'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Language:</span>
                    <span>{course.language || 'N/A'}</span>
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

export default CourseDetails;