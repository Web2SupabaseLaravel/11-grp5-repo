import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Star, Users, Clock, Search, Filter, X } from 'lucide-react';
import { Link } from 'react-router-dom';

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterModalOpen, setFilterModalOpen] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState('All');
  const [selectedPrice, setSelectedPrice] = useState('All');
  const [sortBy, setSortBy] = useState('None');
  const [visibleCourses, setVisibleCourses] = useState(6);


  const categories = ['All', 'Web Development', 'Frontend', 'Data Science', 'Mobile Development', 'AI/ML', 'Marketing'];
  const levels = ['All', 'Beginner', 'Intermediate', 'Advanced'];
  const prices = ['All', 'Free', 'Paid'];
  const sortOptions = ['None', 'Newest', 'Highest Rating'];

  useEffect(() => {
    const fetchCourses = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/courses');
        setCourses(response.data);
        console.log('Courses data:', response.data); 
      } catch (err) {
        setError('Failed to fetch courses');
      }
      setLoading(false);
    };

    fetchCourses();
  }, []);

  let filteredCourses = courses;

  if (selectedCategory !== 'All') {
    filteredCourses = filteredCourses.filter(course => course.category === selectedCategory);
  }

  if (selectedLevel !== 'All') {
    filteredCourses = filteredCourses.filter(course => course.level === selectedLevel);
  }

  if (selectedPrice !== 'All') {
    if (selectedPrice === 'Free') {
      filteredCourses = filteredCourses.filter(course => course.price === '$0' || course.price.toLowerCase().includes('free'));
    } else if (selectedPrice === 'Paid') {
      filteredCourses = filteredCourses.filter(course => course.price !== '$0' && !course.price.toLowerCase().includes('free'));
    }
  }

  if (searchQuery.trim() !== '') {
    filteredCourses = filteredCourses.filter(course =>
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.instructor.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  if (sortBy === 'Newest') {
    filteredCourses = [...filteredCourses].sort((a, b) => b.id - a.id);
  } else if (sortBy === 'Highest Rating') {
    filteredCourses = [...filteredCourses].sort((a, b) => b.rating - a.rating);
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Explore Our Courses</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover thousands of courses from expert instructors and advance your career
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search for courses or instructors"
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button
              variant="outline"
              className="flex items-center space-x-2"
              onClick={() => setFilterModalOpen(true)}
            >
              <Filter className="h-4 w-4" />
              <span>Filters</span>
            </Button>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-2 mb-4">
            {categories.map((category) => (
              <Badge
                key={category}
                variant={category === selectedCategory ? 'default' : 'secondary'}
                className="cursor-pointer hover:bg-blue-100"
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Badge>
            ))}
          </div>
        </div>

        {/* Filter Modal */}
        {filterModalOpen && (
          <>
            {/* Overlay */}
            <div 
              className="fixed inset-0 bg-black bg-opacity-50 z-40"
              onClick={() => setFilterModalOpen(false)}
            ></div>

            {/* Modal Content */}
            <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 bg-white rounded-lg shadow-lg p-6 w-96 max-w-full">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Advanced Filters</h3>
                <button
                  onClick={() => setFilterModalOpen(false)}
                  className="text-gray-600 hover:text-gray-900"
                  aria-label="Close filter modal"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Level filter */}
              <div className="mb-4">
                <label className="block font-medium mb-1">Level</label>
                <select
                  value={selectedLevel}
                  onChange={(e) => setSelectedLevel(e.target.value)}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                >
                  {levels.map((level) => (
                    <option key={level} value={level}>
                      {level}
                    </option>
                  ))}
                </select>
              </div>

              {/* Price filter */}
              <div className="mb-4">
                <label className="block font-medium mb-1">Price</label>
                <select
                  value={selectedPrice}
                  onChange={(e) => setSelectedPrice(e.target.value)}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                >
                  {prices.map((price) => (
                    <option key={price} value={price}>
                      {price}
                    </option>
                  ))}
                </select>
              </div>

              {/* Sort by */}
              <div className="mb-4">
                <label className="block font-medium mb-1">Sort By</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                >
                  {sortOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setFilterModalOpen(false)}>Close</Button>
              </div>
            </div>
          </>
        )}

        {/* Courses Grid */}
        {!loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.length === 0 && (
              <p className="text-center col-span-full text-gray-600">No courses found.</p>
            )}
            {filteredCourses.map((course) => (
              <Link key={course.id} to={`/course/${course.id}`}>
                <Card className="hover:shadow-lg transition-shadow h-full">
                  <div className="relative">
                    <img
                      src={course.image || '/placeholder.svg'}
                      alt={course.title}
                      className="w-full h-48 object-cover rounded-t-lg"
                    />
                    <Badge className="absolute top-3 right-3">{course.category}</Badge>
                  </div>
                  <CardHeader className="pb-3">
                    <div className="mb-2">
                      <CardTitle className="text-lg font-semibold line-clamp-2">{course.title}</CardTitle>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <Users className="h-4 w-4" />
                      <span>{course.students_count || 0} students</span>
                    </div>
                  </CardHeader>
                  <CardContent className="text-sm text-gray-700 line-clamp-3">{course.description}</CardContent>
                  <div className="flex justify-between items-center px-4 py-3 border-t text-sm text-gray-600">
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-yellow-400" />
                      <span>{course.rating?.toFixed(1) || 'N/A'}</span>
                    </div>
                    <div>{course.price || 'Free'}</div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        )}
        {/* Load More */}
        <div className="text-center mt-12">
          <Button onClick={() => setVisibleCourses(prev => prev + 6)}>Load More Courses</Button>
        </div>
      </div>
    </div>
  );
};

export default Courses;
