import { RichText } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';
import React, { useEffect, useState } from 'react';
import { BiArrowBack } from 'react-icons/bi';
import { IoArrowForward } from 'react-icons/io5';
import '../../../style.scss';
import { updateData } from '../../../utils/functions';
import Theme2Style from '../../Common/Theme2Style';


const Theme2 = ({ attributes, id, setAttributes, activeIndex, setActiveIndex }) => {
  const { timelines, theme, itemPosition, type } = attributes;
  const [inView, setInView] = useState(Array(timelines.length).fill(false));
  const [timelineHeight, setTimelineHeight] = useState(0);



  const observerOptions = {
    threshold: 1,
  };

  const observerCallback = (entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setInView((prev) => {
          const newState = [...prev];
          newState[index] = true; // Mark the item as in view
          return newState;
        });
      }
    });
  };


  useEffect(() => {
    const observer = new IntersectionObserver(observerCallback, observerOptions);
    const timelineItems = document.querySelectorAll(".timeline-item");
    timelineItems.forEach((item) => observer.observe(item));

    return () => {
      observer.disconnect(); // Cleanup observer on unmount
    };
  }, []);


  const handleNext = () => {
    if (activeIndex < timelines.length - 2) {
      setActiveIndex(activeIndex + 1);
    }
  };

  const handlePrev = () => {
    if (activeIndex > 0) {
      setActiveIndex(activeIndex - 1);
    }
  };


  const translateValue = -(activeIndex * (100 / 2));

  useEffect(() => {
    const timelineContent = document.querySelector('.timeline-items');
    if (timelineContent) {
      const height = timelineContent.offsetHeigh;
      setTimelineHeight(height);
    }
  }, []);

  const getClassForItem = (index) => {
    if (itemPosition === "both-side") {
      return index % 2 === 0 ? "right" : "left";
    } else if (itemPosition === "right") {
      return "left";
    }
    return "right";
  };



  return (
    <>
      <Theme2Style attributes={attributes} id={id} timelineHeight={timelineHeight} translateValue={translateValue} />

      <div className={`timeline-container ${type === "horizontal" ? "horizontal" : "vertical"}`} >

        <button className="carousel-button prev" onClick={handlePrev}>
          <BiArrowBack />
        </button>

        <div className="timeline-bar"></div>
        <div className="timeline-items" style={{ transform: `translateX(${type === "horizontal" ? translateValue + "%" : "0%"})` }} >
          {timelines.map((event, index) => (
            <div
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`timeline-item ${getClassForItem(index)} ${inView[index] ? "in-view" : ""}`}>
              <div className="timeline-date">{event.date}</div>
              <div className="timeline-icon" dangerouslySetInnerHTML={{ __html: event.icon }}></div>
              <div className="timeline-content">
                <RichText tagName='label' value={event.label} onChange={val => setAttributes({ timelines: updateData(timelines, val, activeIndex, "label") })} placeholder={__('Timeline label', 'timeline-block')} inlineToolbar />

                <RichText tagName='p' value={event.description} onChange={val => setAttributes({ timelines: updateData(timelines, val, activeIndex, "description") })} placeholder={__('Timeline description', 'timeline-block')} inlineToolbar />
              </div>
            </div>
          ))}
        </div>

        <button className="carousel-button next" onClick={handleNext}>
          <IoArrowForward />
        </button>
      </div>
    </>
  );
};

export default Theme2;