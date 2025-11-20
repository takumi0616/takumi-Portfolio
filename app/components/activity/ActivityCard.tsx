import React from 'react'
import { ActivityItemProps } from '@/app/types'

const ActivityItem: React.FC<ActivityItemProps> = ({ date, event }) => {
  const formattedDate = date.replace(/-/g, '.')

  return (
    <div className="flex py-2">
      <h3 className="leading-relaxed">
        <span className="mr-4 whitespace-nowrap">
          <time className="mr-4">{formattedDate}</time>
          <span>|</span>
        </span>
        <span className="block break-words sm:inline">{event}</span>
      </h3>
    </div>
  )
}

export default ActivityItem
