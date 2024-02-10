import React, { useState } from 'react';
import ActivityItem from './cards/ActivityCard';
import { MdArrowForwardIos } from 'react-icons/md';
import { MdArrowBackIos } from 'react-icons/md';

const activities = [
  { date: '2024-02-02', event: '技育CAMP マンスリーハッカソンvol14 出場' },
  { date: '2024-01-30', event: 'マネーの龍 1次審査通過' },
  { date: '2024-01-27', event: 'マネーの龍 出場' },
  { date: '2023-12-06', event: 'スタイルアーツ主催 LT会参加' },
  { date: '2023-11-16', event: 'CA Tech Accel参加' },
  { date: '2023-10-28', event: 'JPhacks2023 出場' },
  { date: '2023-10-14', event: '技育CAMP マンスリーハッカソンvol10 出場' },
  { date: '2023-09-23', event: '技育展 決勝進出 「CARTA HOLDINGS賞」' },
] satisfies Record<'date' | 'event', string>[];

const Activity: React.FC = () => {
  const [pageIndex, setPageIndex] = useState(0);
  const itemsPerPage = 4;
  const maxPageIndex = Math.ceil(activities.length / itemsPerPage) - 1;

  const nextPage = () => {
    console.log('Next page button clicked');
    if (pageIndex < maxPageIndex) {
      setPageIndex((prevIndex) => prevIndex + 1);
    }
  };

  const prevPage = () => {
    console.log('Prev page button clicked');
    if (pageIndex > 0) {
      setPageIndex((prevIndex) => prevIndex - 1);
    }
  };

  const displayedActivities = activities.slice(
    pageIndex * itemsPerPage,
    (pageIndex + 1) * itemsPerPage
  );

  return (
    <div className="mb-40">
      <div className="mb-20">
        <h2 className="text-center text-4xl">Activity</h2>
      </div>
      <div className="flex items-center justify-center">
        <div className="px-4 py-4">
          {pageIndex > 0 ? (
            <button
              onClick={prevPage}
              className="flex items-center"
              aria-label="前のページへ"
            >
              <MdArrowBackIos />
            </button>
          ) : (
            <div className="w-4 h-10"></div>
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

        <div className="px-4 py-4">
          {pageIndex < maxPageIndex ? (
            <button
              onClick={nextPage}
              className="flex items-center"
              aria-label="次のページへ"
            >
              <MdArrowForwardIos />
            </button>
          ) : (
            <div className="w-4 h-10"></div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Activity;
