import React from 'react'
import { AwardsItemProps } from '@/app/types'

const AwardsItem: React.FC<AwardsItemProps> = ({ date, event, index }) => {
  const formattedDate = date.replace(/-/g, '.')

  return (
    <div
      className="card group relative flex h-[280px] w-full flex-col rounded-xl bg-white bg-opacity-90 
                shadow-lg transition-all duration-500 ease-out hover:-translate-y-2 hover:shadow-xl"
    >
      <h3 className="title absolute left-5 top-4 font-light text-black">
        <time className="block pb-1">{formattedDate}</time>
      </h3>

      <div className="bar absolute left-5 top-[100px] h-[5px] w-[150px]">
        <div className="emptybar size-full bg-gray-200"></div>
        <div
          className="filledbar duration-600 absolute top-0 z-10 h-full w-0 bg-gradient-to-r 
                    from-blue-500 to-indigo-500 transition-all ease-out group-hover:w-[120px]"
        ></div>
      </div>

      <div className="circle absolute left-[calc(50%-60px)] top-[150px]">
        <svg
          className="fill-white stroke-2"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            className="stroke stroke-dasharray-[360] stroke-dashoffset-[360] duration-600 group-hover:stroke-dashoffset-[100] 
                      stroke-black transition-all ease-out"
            cx="60"
            cy="60"
            r="50"
          />
        </svg>
      </div>

      <div className="event-text absolute inset-x-0 bottom-8 px-4 text-center text-sm font-medium text-black">
        {event}
      </div>
    </div>
  )
}

export default AwardsItem
