import React from 'react';
import { getBackgroundCSS, getBorderCSS, getTypoCSS } from '../../../../bpl-tools/utils/getCSS';

const Theme2Style = ({ attributes, id }) => {
  const { barBackground, iconStyles, itemBorder, labelTypo, itemTypo, labelColor, itemColor, dateStyles, horizontalDatePosition, theme } = attributes;
  const { iconColor, iconColorHover, background, borderControl, iconSize, iconContainerSize } = iconStyles;

  const mainSl = `#${id}`;
  const timelineContainer = `${mainSl} .timeline-container`;
  const timelineBar = `${timelineContainer} .timeline-bar`;
  const carouselBtn = `${timelineContainer} .carousel-button`;
  const timelineItemsContainer = `${mainSl} .timeline-items`;
  const timelineItem = `${timelineItemsContainer} .timeline-item`;
  const timelineIcon = `${timelineItem} .timeline-icon`;
  const timelineContent = `${timelineItem} .timeline-content`;
  const timelineDate = `${timelineItem} .timeline-date`;

  return (
    <style>
      {`
        ${getTypoCSS("", labelTypo)?.googleFontLink}
        ${getTypoCSS(`${timelineContent} label`, labelTypo).styles}

        ${getTypoCSS("", itemTypo)?.googleFontLink}
        ${getTypoCSS(`${timelineContent} p`, itemTypo).styles}

        ${getTypoCSS("", dateStyles.dateTypo)?.googleFontLink}
	    	${getTypoCSS(`${timelineDate}`, dateStyles.dateTypo).styles}


        ${timelineContainer}.horizontal {
          ${horizontalDatePosition === "top" ? "padding-top: 150px" : "padding-bottom: 150px"}
        }
        ${timelineContainer}.horizontal .timeline-icon {
          ${horizontalDatePosition === "top" && (theme === "theme-2") ? "top: -100px;" : "bottom: -100px;"}
        }
        ${timelineBar} {
          ${horizontalDatePosition === "top" ? "top: 76px;" : "bottom: 76px;"}
          background-color: ${barBackground};
        }
        ${timelineContent} {
          border: ${itemBorder.width} solid ${itemBorder.color};
        }
        ${timelineContent} label{
          color: ${labelColor};
          display: block;
          margin-bottom: 0;
        }
        ${timelineContent} p{
          color: ${itemColor};
        }
        ${timelineIcon} {
          ${getBorderCSS(borderControl)}
          width: ${iconContainerSize}px;
          height: ${iconContainerSize}px;
          ${getBackgroundCSS(background.normal)}
        }
        ${timelineIcon} svg {
          fill: ${iconColor};
          width: ${iconSize}px;
          height: ${iconSize}px;
        }
        ${timelineIcon}:hover {
          color: ${iconColorHover};
        }

        ${timelineItem}:hover .timeline-icon {
          ${getBackgroundCSS(background.hover)}
        }
        ${timelineItem}:hover .timeline-icon svg{
          fill: ${iconColorHover};
        }
        ${timelineDate} {
          color: ${dateStyles.dateColor};
          ${horizontalDatePosition === "top" ? "top: -145px;" : "bottom: -145px;"}
        }
        ${carouselBtn} {
          ${horizontalDatePosition === "top" ? "top: 65px;" : "bottom: 65px;"}
        }
      `}
    </style>
  );
};

export default Theme2Style;