import React, { CSSProperties } from 'react'
import { AwardsItemProps } from '@/app/types'

const clamp3: CSSProperties = {
  display: '-webkit-box',
  WebkitLineClamp: 3,
  WebkitBoxOrient: 'vertical',
  overflow: 'hidden',
}

const AwardsItem: React.FC<AwardsItemProps> = ({
  date,
  event,
  index,
  image,
}) => {
  const formattedDate = date.replace(/-/g, '.')

  return (
    <article
      className="group h-80 w-full"
      style={{ transitionDelay: `${(index ?? 0) * 40}ms` }}
    >
      {/* 白/灰を基調にしたカード（固定高さ） */}
      <div className="flex size-full flex-col rounded-2xl bg-white/20 p-4 shadow-sm backdrop-blur-md transition-transform duration-300 hover:-translate-y-0.5 hover:shadow-md">
        {/* 画像（固定高さ・カードサイズに影響しない） */}
        <div className="relative h-48 w-full overflow-hidden rounded-xl border border-gray-200 bg-gray-100">
          {image ? (
            <img
              src={image}
              alt={event}
              className="size-full object-contain object-center"
              loading="lazy"
            />
          ) : (
            <div className="flex size-full items-center justify-center text-xs text-gray-400">
              No Image
            </div>
          )}
        </div>

        <div className="mt-3 min-w-0 flex-1">
          {/* 日付：薄いグレーのピルバッジ */}
          <div className="mb-2 flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center rounded-full border border-gray-200 bg-gray-50 px-2.5 py-0.5 text-sm font-medium text-gray-700">
              {formattedDate}
            </span>
          </div>

          {/* タイトル：3行まで表示し省略、レイアウト崩れを防ぐ */}
          <h3
            className="text-lg font-medium leading-relaxed text-gray-800"
            style={clamp3}
            title={event}
          >
            {event}
          </h3>
        </div>
      </div>
    </article>
  )
}

export default AwardsItem
