import React from 'react';

interface ActivityItemProps {
  date: string;
  event: string;
}

const ActivityItem: React.FC<ActivityItemProps> = ({ date, event }) => {
  const formattedDate = date.replace(/-/g, '.');

  return (
    <div className="flex py-2">
      <span className="text-gray-600 mr-4">{formattedDate}</span>
      <span className="text-gray-800 mr-4">|</span>
      <span className="text-gray-800">{event}</span>
    </div>
  );
};

export default ActivityItem;
