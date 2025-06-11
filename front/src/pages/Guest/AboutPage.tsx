import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookOpen, Users, Award, Target, Heart, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';

const About = () => {
  const [stats, setStats] = useState([
    { label: 'Students Worldwide', value: '0', icon: Users },
    { label: 'Expert Instructors', value: '0', icon: BookOpen },
    { label: 'Courses Available', value: '0', icon: Target },
    { label: 'Countries Reached', value: '0', icon: Globe },
  ]);

  const team = [
    { name: 'Ahmed Hassan', role: 'CEO & Founder', image: '/placeholder.svg', description: 'Former tech lead at major companies with 15+ years of experience in education technology.' },
    { name: 'Sarah Mohamed', role: 'Head of Education', image: '/placeholder.svg', description: 'PhD in Educational Psychology with expertise in online learning methodologies.' },
    { name: 'Mohamed Ali', role: 'CTO', image: '/placeholder.svg', description: 'Full-stack developer and AI specialist building the future of learning platforms.' },
  ];

  const values = [
    { icon: Heart, title: 'Passion for Learning', description: 'We believe that learning should be accessible, engaging, and transformative for everyone.' },
    { icon: Users, title: 'Community First', description: 'Our platform is built around fostering meaningful connections between learners and instructors.' },
    { icon: Award, title: 'Excellence in Education', description: 'We maintain the highest standards in course quality and learning outcomes.' },
  ];
  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/about-stats')
      .then((response) => {
        const data = response.data;
        setStats([
          { label: 'Students Worldwide', value: data.students || '0', icon: Users },
          { label: 'Expert Instructors', value: data.instructors || '0', icon: BookOpen },
          { label: 'Courses Available', value: data.courses || '0', icon: Target },
          { label: 'Countries Reached', value: data.countries || '0', icon: Globe },
        ]);
      })
      .catch((error) => {
        console.error('Failed to fetch stats:', error);
        // Keep default values on error
      });
  }, []);
  return (
    <div className="min-h-screen bg-gray-50">
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-purple-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            About Our Mission
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
            We're dedicated to making quality education accessible to everyone, everywhere, 
            through innovative technology and passionate instruction.
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center">
                  <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                    <Icon className="h-8 w-8 text-blue-600" />
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                  <div className="text-gray-600">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Our Story
              </h2>
              <div className="space-y-4 text-lg text-gray-600">
                <p>
                  Founded in 2020, our learning platform was born from a simple belief: 
                  that everyone deserves access to high-quality education, regardless of 
                  their location or background.
                </p>
                <p>
                  What started as a small team of educators and technologists has grown 
                  into a global community of learners, instructors, and innovators working 
                  together to shape the future of education.
                </p>
                <p>
                  Today, we're proud to serve students from over 80 countries, offering 
                  courses in multiple languages and covering everything from programming 
                  to creative arts.
                </p>
              </div>
            </div>
            <div className="rounded-lg overflow-hidden shadow-lg">
              <img 
                src="/placeholder.svg" 
                alt="Our team working together"
                className="w-full h-64 object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Values
            </h2>
            <p className="text-xl text-gray-600">
              The principles that guide everything we do
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <Card key={index} className="text-center">
                  <CardHeader>
                    <div className="mx-auto w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                      <Icon className="h-6 w-6 text-blue-600" />
                    </div>
                    <CardTitle className="text-xl">{value.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">{value.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Meet Our Leadership Team
            </h2>
            <p className="text-xl text-gray-600">
              The passionate people behind our mission
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="text-center">
                <CardContent className="p-6">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                  />
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
                  <p className="text-blue-600 font-medium mb-3">{member.role}</p>
                  <p className="text-gray-600 text-sm">{member.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-purple-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Start Learning?
          </h2>
          <p className="text-xl mb-8 text-blue-100 max-w-2xl mx-auto">
            Join thousands of students already learning on our platform
          </p>
          <Link to="/register">
            <Button size="lg" className="bg-white text-blue-900 hover:bg-blue-50 px-8 py-3 text-lg">
              Get Started Today
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default About;