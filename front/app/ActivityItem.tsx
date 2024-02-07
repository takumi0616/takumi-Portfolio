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
        <time className="mr-4">{formattedDate}</time>
        <span className="mr-4">|</span>
        <span>{event}</span>
      </h4>
    </div>
  );
};

export default ActivityItem;
