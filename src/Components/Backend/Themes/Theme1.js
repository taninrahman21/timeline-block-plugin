import { RichText } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';
import React, { useEffect, useState } from 'react';
import { timelineConfig } from '../../../utils/config';

const Theme1 = ({ attributes, activeIndex, setActiveIndex, updateTimeline, clientId }) => {
  const { timelines, type, labelLocation, startIndex, vigibleItems, moveItem, verticalTrigger, rtlMode, theme } = attributes;

  const id = `tlgbTimeline-${clientId}`;

  const [visibleDescriptions, setVisibleDescriptions] = useState({});

  useEffect(() => {
    const timelineEl = document.querySelector(`#${id} .timeline`);

    if (timelineEl) {
      timeline([timelineEl], timelineConfig(attributes));
    }
  }, [type, labelLocation, verticalTrigger, moveItem, startIndex, vigibleItems, rtlMode, theme, timelines.length]);


  // Toggle description visibility
  const toggleDescription = (index) => {
    const descriptionElement = document.querySelector(`#tlgbTimelineItem-${index} .timeline__description`);

    if (descriptionElement) {
      const isVisible = visibleDescriptions[index];
      const height = isVisible ? 0 : descriptionElement.scrollHeight; // Collapse or expand

      // Apply the height dynamically for smooth transitions
      descriptionElement.style.maxHeight = `${height}px`;

      setVisibleDescriptions(prevState => ({
        ...prevState,
        [index]: !isVisible, // Toggle visibility state
      }));
    }
  };

  useEffect(() => {
    Object.keys(visibleDescriptions).forEach(index => {
      const descriptionElement = document.querySelector(`#tlgbTimelineItem-${index} .timeline__description`);

      if (descriptionElement) {
        if (visibleDescriptions[index]) {
          descriptionElement.style.maxHeight = `${descriptionElement.scrollHeight}px`; // Expand smoothly
        } else {
          descriptionElement.style.maxHeight = '0'; // Collapse smoothly
        }
      }
    });
  }, [visibleDescriptions, timelines]);


  return <>
    <div className='timeline tlgbTimeline'>
      <div className='timeline__wrap'>
        <div className='timeline__items'>
          {timelines?.map((item, index) => {
            const { label, description } = item;
            const isVisible = visibleDescriptions[index];

            return <div key={index} onClick={() => setActiveIndex(index)} className='timeline__item fadeIn' id={`tlgbTimelineItem-${index}`}>
              <div className={`timeline__content ${index === activeIndex ? 'tlgbNowEditing' : ''}`} >

                <RichText
                  tagName='label'
                  value={label}
                  onChange={val => updateTimeline(index, 'label', val)}
                  placeholder={__('Timeline label', 'timeline-block')}
                  inlineToolbar
                  onClick={() => toggleDescription(index)}
                />

                <RichText
                  className={`timeline__description ${isVisible ? 'visible' : 'hidden'}`}
                  tagName='p'
                  value={description}
                  onChange={val => updateTimeline(index, 'description', val)}
                  placeholder={__('Timeline description', 'timeline-block')}
                  inlineToolbar
                />
              </div>
            </div> // Timeline Item
          })}
        </div> {/* Timeline Items */}
      </div> {/* Timeline Wrap */}
    </div> {/* Timeline */}
  </>
};

export default Theme1;