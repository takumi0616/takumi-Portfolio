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
        <div className="w-[90%] max-w-[800px]">
          {/* スクロールスナップ対応のコンテナ */}
          <div
            className="flex w-full overflow-x-auto scroll-smooth whitespace-nowrap pb-8"
            style={{ scrollSnapType: 'x mandatory' }}
          >
            {awards.map((award, index) => (
              <div
                key={`${award.date}-${award.event}-${index}`}
                className="inline-block w-[40%] min-w-[250px] whitespace-normal px-2"
                style={{ scrollSnapAlign: 'center' }}
              >
                <AwardsItem
                  date={award.date}
                  event={award.event}
                  index={index}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Awards
