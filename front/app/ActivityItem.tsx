import React from 'react';

interface ActivityItemProps {
  date: string;
  event: string;
}

const ActivityItem: React.FC<ActivityItemProps> = ({ date, event }) => {
  const formattedDate = date.replace(/-/g, '.');

  return (
    <div className="flex py-2">
      <h4 className="text-gray-600 mr-4">{formattedDate}</h4>
      <p className="text-gray-800 mr-4">|</p>
      <h4 className="text-gray-800">{event}</h4>
    </div>
  );
};

export default ActivityItem;
