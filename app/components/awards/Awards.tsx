import React from 'react'
import AwardsItem from './AwardsItem'
import { useTranslation } from '@/i18n/client'
import { AwardsProps } from '@/app/types'

const Awards: React.FC<AwardsProps> = ({ lang }) => {
  const { t } = useTranslation(lang)

  const awards = t('awards.items', { returnObjects: true }) as {
    date: string
    event: string
  }[]

  return (
    <div className="mb-60">
      <div className="mb-20">
        <h2 className="text-center text-4xl">Awards</h2>
      </div>
      <div className="flex justify-center">
        <div className="news mx-4 w-1/3 portrait:w-4/5">
          {awards.map((award, index) => (
            <AwardsItem
              key={`${award.date}-${award.event}-${index}`}
              date={award.date}
              event={award.event}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Awards
