import React, { useState, useEffect } from 'react';
import axios from 'axios'; 
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { BookOpen } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  progress: number;
  totalLessons: number;
  completedLessons: number;
  level: string;
  enrolledAt: string;
  lessons: Lesson[];
  quizzes: Quiz[];
}

interface Lesson {
  id: string;
  title: string;
  content: string;
  duration: string;
  video_url?: string;
  order: number;
  completed: boolean;
}

interface Quiz {
  id: string;
  title: string;
  description: string;
  time_limit: number;
  passing_score: number;
  completed: boolean;
  score?: number;
  questions: Question[];
}

interface Question {
  id: string;
  question: string;
  options: string[];
  correct_answer: number;
}

const StudentCoursesPage = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [selectedQuiz, setSelectedQuiz] = useState<Quiz | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [view, setView] = useState<'courses' | 'course-detail' | 'lesson' | 'quiz'>('courses');
  const { toast } = useToast();

  useEffect(() => {
    const fetchCourses = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/student/courses'); 
        setCourses(response.data.courses);
      } catch (error) {
        console.error('Failed to fetch courses:', error);
        toast({
          title: 'Error fetching courses',
          description: 'Please try again later.',
          variant: 'destructive'
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchCourses();
  }, [toast]);


  const handleContinueLearning = (course: Course) => {

    setSelectedCourse(course);
    setView('course-detail');

  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">My Courses</h1>
          <p className="text-xl text-gray-600">Continue your learning journey</p>

        </div>

        {isLoading ? (
          <p className="text-center">Loading your courses...</p>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.map((course) => (
                <Card key={course.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardHeader>
                    <div className="flex justify-between items-start mb-2">
                      <Badge variant="outline">{course.level}</Badge>
                      <Badge variant="secondary">{course.progress}% Complete</Badge>
                    </div>
                    <CardTitle className="text-xl">{course.title}</CardTitle>
                    <p className="text-gray-600 text-sm line-clamp-2">{course.description}</p>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Progress</span>
                          <span>{course.completedLessons}/{course.totalLessons} lessons</span>
                        </div>
                        <Progress value={course.progress} />
                      </div>
                      <div className="flex items-center justify-between text-sm text-gray-600">
                        <span>Instructor: {course.instructor}</span>
                        <span>Enrolled: {new Date(course.enrolledAt).toLocaleDateString()}</span>
                      </div>

                      <Button className="w-full" onClick={() => handleContinueLearning(course)}>
                        Continue Learning
                      </Button>
                    </div>

                  </CardContent>
                </Card>
              ))}
            </div>
            {courses.length === 0 && (
              <div className="text-center py-16">
                <BookOpen className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-medium text-gray-900 mb-2">No courses enrolled</h3>
                <p className="text-gray-600 mb-6">
                  Explore our course catalog and start learning today
                </p>
                <Button asChild>
                  <a href="/courses">Browse Courses</a>
                </Button>
                
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default StudentCoursesPage;