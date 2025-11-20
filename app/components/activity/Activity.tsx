import React from 'react'
import ActivityItem from './ActivityCard'
import { useTranslation } from '@/i18n/client'
import { ActivityProps } from '@/app/types'

const Activity: React.FC<ActivityProps> = ({ lang }) => {
  const { t } = useTranslation(lang)

  const activities = t('activity.items', { returnObjects: true }) as {
    date: string
    event: string
  }[]

  return (
    <section className="mb-60">
      <div className="mb-20">
        <h2 className="text-center text-4xl">Activity</h2>
      </div>

      <div className="mx-auto w-[90%] max-w-3xl">
        {/* 縦スクロールでスムーズに次の要素が見えるコンテナ */}
        <div className="bg-transparent p-0">
          {/* 5件前後が見える高さを確保し、内部だけをスクロール */}
          <div className="max-h-[420px] overflow-y-auto overscroll-auto scroll-smooth">
            <ul className="space-y-2">
              {activities.map((activity, index) => (
                <li key={`${activity.date}-${activity.event}-${index}`} className="py-2">
                  <ActivityItem date={activity.date} event={activity.event} />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Activity
