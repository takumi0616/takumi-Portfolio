import React from 'react';
import ThreeJsComponentBack from './ThreeJsComponentBack';
import Works from './Works';

export default function SubView() {
  return (
    <div>
        <div className="sticky top-0 w-full h-full">
          <ThreeJsComponentBack />
        </div>
        <div className="relative w-full h-full overflow-hidden">
          <Works />
        </div>
    </div>
  );
}
