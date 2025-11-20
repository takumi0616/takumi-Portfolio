import React from 'react'
import AwardsItem from './AwardsItem'
import { useTranslation } from '@/i18n/client'
import { AwardsProps } from '@/app/types'

const Awards: React.FC<AwardsProps> = ({ lang }) => {
  const { t } = useTranslation(lang)

  const awards = t('awards.items', { returnObjects: true }) as {
    date: string
    event: string
    image?: string
  }[]

  return (
    <section className="mb-60">
      <h2 className="mb-20 text-center text-4xl">Awards</h2>

      <div className="mx-auto w-[92%] max-w-5xl">
        {/* モバイル: 縦一列 */}
        <div className="md:hidden">
          <div className="grid grid-cols-1 gap-4">
            {awards.map((award, index) => (
              <div key={`${award.date}-${award.event}-${index}`}>
                <AwardsItem
                  date={award.date}
                  event={award.event}
                  index={index}
                  image={award.image}
                />
              </div>
            ))}
          </div>
        </div>

        {/* デスクトップ: グリッド表示 */}
        <div className="hidden grid-cols-2 gap-6 md:grid lg:grid-cols-2">
          {awards.map((award, index) => (
            <div key={`${award.date}-${award.event}-${index}`}>
              <AwardsItem
                date={award.date}
                event={award.event}
                index={index}
                image={award.image}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Awards
