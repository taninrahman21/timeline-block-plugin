import React, { useEffect, useState } from 'react';
import { BiArrowBack } from 'react-icons/bi';
import { IoArrowForward } from 'react-icons/io5';
import '../../style.scss';
import { timelineConfig } from '../../utils/config';
import Styles from '../Common/Styles';
import Theme2Style from '../Common/Theme2Style';


const Timeline = ({ attributes, id }) => {
  const { timelines, theme, itemPosition, type } = attributes;
  const [visibleDescriptions, setVisibleDescriptions] = useState({});
  const [inView, setInView] = useState(Array(timelines.length).fill(false));
  const [activeIndex, setActiveIndex] = useState(0);


  useEffect(() => {
    const timelineEl = document.querySelector(`.timeline`);
    const timelineItems = document.querySelectorAll(`.timeline__item`);

    if (timelineEl) {
      timeline([timelineEl], timelineConfig(attributes));
    }

    if (timelineItems.length > 0) {
      if (theme === "timeline-with-accordion") {
        timelineItems.forEach(item => {
          item.classList.remove("timeline__item--left");
          item.classList.add("timeline__item--right");
        });
      }
    }
  }, [timelines]);

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

  const getClassForItem = (index) => {
    if (itemPosition === "both-side") {
      return index % 2 === 0 ? "right" : "left";
    } else if (itemPosition === "right") {
      return "left";
    }
    return "right";
  };

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


  return (
    <>
      {
        (theme === "default" || theme === "timeline-with-accordion") && <Styles attributes={attributes} id={id} />
      }

      {
        (theme === "theme-2") && <Theme2Style attributes={attributes} id={id} />
      }


      {
        (theme === "default" || theme === "timeline-with-accordion") && <div className="timeline tlgbTimeline">
          <div className="timeline__wrap">
            <div className="timeline__items">
              {
                timelines.map((timeline, index) => {
                  const { label, description } = timeline;
                  const isVisible = visibleDescriptions[index];
                  return (
                    <div key={index} className='timeline__item fadeIn' id={`tlgbTimelineItem-${index}`}>
                      <div className='timeline__content'>
                        {
                          theme === "timeline-with-accordion" ? (<>
                            <label onClick={() => toggleDescription(index)} dangerouslySetInnerHTML={{ __html: label.replace(/\n/g, '<br />') }}></label>
                            <p
                              className={`timeline__description ${isVisible ? 'visible' : 'hidden'}`}
                              dangerouslySetInnerHTML={{ __html: description.replace(/\n/g, '<br />') }}></p>
                          </>) : (
                            <>
                              <label dangerouslySetInnerHTML={{ __html: label.replace(/\n/g, '<br />') }}></label>
                                <p dangerouslySetInnerHTML={{ __html: description.replace(/\n/g, '<br />') }}></p>
                            </>
                          )
                        }
                      </div>
                    </div>
                  )
                })
              }
            </div>
          </div>
        </div>
      }

      {
        theme === "theme-2" && <div className={`timeline-container ${type === "horizontal" ? "horizontal" : "vertical"}`} >

          <button className="carousel-button prev" onClick={handlePrev}>
            <BiArrowBack />
          </button>

          <div className="timeline-bar"></div>
          <div className="timeline-items" style={{ transform: `translateX(${translateValue}%)` }} >
            {timelines.map((event, index) => (
              <div key={index} className={`timeline-item ${getClassForItem(index)} ${inView[index] ? "in-view" : ""}`}>
                <div className="timeline-date">{event.date}</div>
                <div className="timeline-icon" dangerouslySetInnerHTML={{ __html: event.icon }}></div>
                <div className="timeline-content">
                  <label className="timeline-title" dangerouslySetInnerHTML={{ __html: event.label }}></label>
                  <p className="timeline-description" dangerouslySetInnerHTML={{ __html: event.description }}></p>
                </div>
              </div>
            ))}
          </div>

          <button className="carousel-button next" onClick={handleNext}>
            <IoArrowForward />
          </button>
        </div>
      }
    </>
  )
};

export default Timeline;