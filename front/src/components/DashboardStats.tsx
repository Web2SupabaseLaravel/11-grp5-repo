
import React from 'react';
import { Card } from '@/components/ui/card';
import { Book, Clock, User, Star } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, trend }) => {
  return (
    <Card className="p-6 hover:shadow-md transition-all duration-300">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
          <p className="text-3xl font-bold text-gray-900">{value}</p>
          {trend && (
            <p className={`text-sm mt-2 ${trend.isPositive ? 'text-green-600' : 'text-red-600'}`}>
              {trend.isPositive ? '+' : ''}{trend.value}% from last month
            </p>
          )}
        </div>
        <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center">
          <div className="text-primary">
            {icon}
          </div>
        </div>
      </div>
    </Card>
  );
};

const DashboardStats = () => {
  const stats = [
    {
      title: 'Total Courses',
      value: 42,
      icon: <Book className="h-6 w-6" />,
      trend: { value: 12, isPositive: true }
    },
    {
      title: 'Learning Hours',
      value: '156h',
      icon: <Clock className="h-6 w-6" />,
      trend: { value: 8, isPositive: true }
    },
    {
      title: 'Students Enrolled',
      value: '2,847',
      icon: <User className="h-6 w-6" />,
      trend: { value: 15, isPositive: true }
    },
    {
      title: 'Average Rating',
      value: 4.8,
      icon: <Star className="h-6 w-6" />,
      trend: { value: 2, isPositive: true }
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => (
        <StatCard key={index} {...stat} />
      ))}
    </div>
  );
};

export default DashboardStats;
