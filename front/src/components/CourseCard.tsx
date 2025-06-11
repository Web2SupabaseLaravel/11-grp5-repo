
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, Clock, User } from 'lucide-react';

interface CourseCardProps {
  id: string;
  title: string;
  description: string;
  instructor: string;
  duration: string;
  rating: number;
  studentsCount: number;
  price: number;
  imageUrl?: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  onEnroll?: (id: string) => void;
}

const CourseCard: React.FC<CourseCardProps> = ({
  id,
  title,
  description,
  instructor,
  duration,
  rating,
  studentsCount,
  price,
  imageUrl,
  level,
  onEnroll
}) => {
  const handleEnroll = () => {
    onEnroll?.(id);
  };

  return (
    <Card className="hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 overflow-hidden animate-slide-in">
      {/* Course Image */}
      <div className="h-48 bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
        {imageUrl ? (
          <img src={imageUrl} alt={title} className="w-full h-full object-cover" />
        ) : (
          <div className="text-6xl font-bold text-primary/30">{title.charAt(0)}</div>
        )}
      </div>

      <div className="p-6">
        {/* Badge and Rating */}
        <div className="flex justify-between items-start mb-3">
          <Badge variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/20">
            {level}
          </Badge>
          <div className="flex items-center space-x-1">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-medium">{rating.toFixed(1)}</span>
          </div>
        </div>

        {/* Course Title */}
        <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">{title}</h3>

        {/* Description */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">{description}</p>

        {/* Course Meta */}
        <div className="flex items-center space-x-4 mb-4 text-sm text-gray-500">
          <div className="flex items-center space-x-1">
            <User className="h-4 w-4" />
            <span>{instructor}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Clock className="h-4 w-4" />
            <span>{duration}</span>
          </div>
        </div>

        {/* Student Count */}
        <p className="text-sm text-gray-500 mb-4">{studentsCount.toLocaleString()} students enrolled</p>

        {/* Price and Enroll Button */}
        <div className="flex justify-between items-center">
          <div className="text-2xl font-bold text-primary">
            ${price === 0 ? 'Free' : price.toFixed(2)}
          </div>
          <Button 
            onClick={handleEnroll}
            className="bg-primary hover:bg-primary/90 text-white"
          >
            Enroll Now
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default CourseCard;
