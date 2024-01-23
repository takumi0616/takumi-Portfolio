import React from 'react';
import './subview.css';
import ThreeJsComponentBack from './ThreeJsComponentBack';
import Works from './Works';

export default function SubView() {
  return (
    <div>
      <div className="subview-background">
        <ThreeJsComponentBack />
        <div className="subview-container">
          <Works />
        </div>
      </div>
    </div>
  );
}
