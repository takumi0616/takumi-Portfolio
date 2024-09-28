import React, { useState } from 'react'
import { MdArrowForwardIos, MdArrowBackIos } from 'react-icons/md'
import ActivityItem from './ActivityCard'
import { useTranslation } from '@/i18n/client'
import { ActivityProps } from '@/app/types'

const Activity: React.FC<ActivityProps> = ({ lang }) => {
  const [pageIndex, setPageIndex] = useState(0)
  const itemsPerPage = 6
  const { t } = useTranslation(lang)

  const activities = t('activity.items', { returnObjects: true }) as {
    date: string
    event: string
  }[]

  const maxPageIndex = Math.ceil(activities.length / itemsPerPage) - 1

  const nextPage = () => {
    if (pageIndex < maxPageIndex) {
      setPageIndex((prevIndex) => prevIndex + 1)
    }
  }

  const prevPage = () => {
    if (pageIndex > 0) {
      setPageIndex((prevIndex) => prevIndex - 1)
    }
  }

  const displayedActivities = activities.slice(
    pageIndex * itemsPerPage,
    (pageIndex + 1) * itemsPerPage,
  )

  return (
    <div className="mb-60">
      <div className="mb-20">
        <h2 className="text-center text-4xl">Activity</h2>
      </div>
      <div className="flex items-center justify-center">
        <div className="p-4">
          {pageIndex > 0 ? (
            <button
              onClick={prevPage}
              className="flex items-center"
              aria-label="前のページへ"
            >
              <MdArrowBackIos />
            </button>
          ) : (
            <div className="h-10 w-4"></div>
          )}
        </div>

        <div className="news mx-4 w-1/3 portrait:w-4/5">
          {displayedActivities.map((activity, index) => (
            <ActivityItem
              key={`${activity.date}-${activity.event}-${index}`}
              date={activity.date}
              event={activity.event}
            />
          ))}
        </div>

        <div className="p-4">
          {pageIndex < maxPageIndex ? (
            <button
              onClick={nextPage}
              className="flex items-center"
              aria-label="次のページへ"
            >
              <MdArrowForwardIos />
            </button>
          ) : (
            <div className="h-10 w-4"></div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Activity
