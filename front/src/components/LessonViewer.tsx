
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Clock, Play, CheckCircle } from 'lucide-react';

interface Lesson {
  id: string;
  title: string;
  content: string;
  duration: string;
  video_url?: string;
  order: number;
  completed?: boolean;
}

interface LessonViewerProps {
  lesson: Lesson;
  onComplete: () => void;
  onBack: () => void;
}

const LessonViewer = ({ lesson, onComplete, onBack }: LessonViewerProps) => {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="flex items-center gap-2">
                {lesson.completed && <CheckCircle className="h-5 w-5 text-green-500" />}
                {lesson.title}
              </CardTitle>
              <div className="flex items-center gap-2 mt-2">
                <Badge variant="outline" className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {lesson.duration}
                </Badge>
                <Badge variant="outline">
                  Lesson {lesson.order}
                </Badge>
              </div>
            </div>
            <Button variant="outline" onClick={onBack}>
              Back to Course
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {lesson.video_url && (
            <div className="mb-6">
              <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <Play className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-600">Video Player</p>
                  <p className="text-sm text-gray-500">{lesson.video_url}</p>
                </div>
              </div>
            </div>
          )}
          
          <div className="prose max-w-none">
            <div className="whitespace-pre-wrap">{lesson.content}</div>
          </div>
          
          <div className="flex justify-end mt-6">
            {!lesson.completed && (
              <Button onClick={onComplete}>
                Mark as Complete
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LessonViewer;
