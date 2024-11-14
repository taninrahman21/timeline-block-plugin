import React, { useEffect } from 'react';
import { timelineConfig } from '../../utils/config';

const Timeline = ({ attributes }) => {
  const { timelines } = attributes;


  useEffect(() => {
    const timelineEl = document.querySelector(`.timeline`);

    if (timelineEl) {
      timeline([timelineEl], timelineConfig(attributes));
    }
  }, [timelines]);


  return <div className="timeline tlgbTimeline">
    <div className="timeline__wrap">
      <div className="timeline__items">
        {
          timelines.map((timeline, index) => {
            const { label, description } = timeline;
            return (
              <div key={index} className='timeline__item fadeIn' id={`tlgbTimelineItem-${index}`}>
                <div className='timeline__content'>
                  <label>{label}</label>
                  <p>{description}</p>
                </div>
              </div>
            )
          })
        }
      </div>
    </div>
  </div>
};

export default Timeline;