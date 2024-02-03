import React from 'react';

interface ActivityItemProps {
  date: string;
  event: string;
}

const ActivityItem: React.FC<ActivityItemProps> = ({ date, event }) => {
  const formattedDate = date.replace(/-/g, '.');

  return (
    <div className="flex py-2">
      <h4>
        <time className="text-gray-600 mr-4">{formattedDate}</time>
        <span className="text-gray-800 mr-4">|</span>
        <span className="text-gray-800">{event}</span>
      </h4>
    </div>
  );
};

export default ActivityItem;
