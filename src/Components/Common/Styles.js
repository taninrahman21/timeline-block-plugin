import React from 'react';
import { getTypoCSS } from '../../../../Components/utils/getCSS';

const Styles = ({ attributes, id}) => {
  const { barBackground, barDotColor, itemBg, itemColor, itemTypo, itemBorder, labelTypo, labelColor } = attributes;

  const contentCl = '.timeline__content';
  const mainSl = `#${id}`;
  const timelineSl = `${mainSl} .timeline`;
  const contentSl = `${timelineSl} ${contentCl}`;
  const itemSl = `${mainSl} .timeline__item`;

  return <style dangerouslySetInnerHTML={{
    __html: `
		${getTypoCSS(`${contentSl} label`, labelTypo, false).styles}
		${getTypoCSS(`${contentSl} p`, itemTypo, false).styles}

		${contentSl}{
			background: ${itemBg};
			border: ${itemBorder.width} solid ${itemBorder.color};
		}
		${contentSl} label{
			color: ${labelColor};
		}
		${contentSl} p{
			color: ${itemColor};
		}

		${itemSl}::after {
			background-color: ${itemBg};
			border: 5px solid ${barDotColor};
		}
		${timelineSl}--horizontal .timeline-divider, 
		${timelineSl}:not(.timeline--horizontal)::before {
			background-color: ${barBackground};
		}

		${itemSl}.timeline__item--left ${contentCl}::before {
			border-left: 11px solid ${itemBorder.color}}

		${itemSl}.timeline__item--right ${contentCl}::before {
				border-right: 12px solid ${itemBorder.color};
		}
		${itemSl}.timeline__item--left ${contentCl}::after {
		border-left: 11px solid ${itemBg};}

		${itemSl}.timeline__item--right ${contentCl}::after {
			border-right: 12px solid ${itemBg};
		}

		${itemSl}.timeline__item--top ${contentCl}::before {
			border-top: 14px solid ${itemBorder.color} !important;
		}
		${itemSl}.timeline__item--bottom ${contentCl}::before {
			border-bottom: 14px solid ${itemBorder.color}!important;
			border-top: none;
		}
		${itemSl}--top ${contentCl}::after {
		border-top: 12px solid ${itemBg};
		border-bottom:none;
		}
		${itemSl}--bottom ${contentCl}::after {
			border-bottom: 12px solid ${itemBg};
			border-top: none;
		}
		${timelineSl}--mobile .timeline__item ${contentCl}::before {
			border-left: none;
			border-right: 12px solid ${itemBorder.color};
		}
		${timelineSl}--mobile .timeline__item ${contentCl}::after {
			border-left: none;
			border-right: 12px solid ${itemBg};
		}

		${timelineSl}-nav-button {
			background-color: #fff;
			border: 2px solid ${barBackground};
		}
		`.replace(/\s+/g, ' ')
  }} />
}
export default Styles;