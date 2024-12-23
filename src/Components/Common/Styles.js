import React from 'react';
import { getTypoCSS } from '../../../../Components/utils/getCSS';

const Styles = ({ attributes, id }) => {
	const { barBackground, barDotColor, itemBg, itemColor, itemTypo, itemBorder, labelTypo, labelColor, theme } = attributes;

	const contentCl = '.timeline__content';
	const mainSl = `#${id}`;
	const timelineSl = `${mainSl} .timeline`;
	const contentSl = `${timelineSl} ${contentCl}`;
	const itemSl = `${mainSl} .timeline__item`;


	return <style dangerouslySetInnerHTML={{
		__html: `
		${getTypoCSS("", labelTypo)?.googleFontLink}
		${getTypoCSS(`${contentSl} label`, labelTypo, false).styles}
		${getTypoCSS("", itemTypo)?.googleFontLink}
		${getTypoCSS(`${contentSl} p`, itemTypo).styles}

		${contentSl}{
			background: ${itemBg};
			border: ${itemBorder.width} solid ${itemBorder.color};
			${theme === 'timeline-with-accordion' ? 'border-radius: 0;' : 'border-radius: 10px;'}
			${theme === 'timeline-with-accordion' ? 'padding: 1rem;' : 'padding: 1.25rem;'}
		}
		${contentSl} label{
			color: ${labelColor};
			display: block;
			margin-bottom: 0;
		}
		${contentSl} p{
			color: ${itemColor};
		}
		${contentSl} .timeline__description {
			display: none;
			overflow: hidden;
			transition: max-height 0.3s ease-in-out;
		}
		${contentSl} .timeline__description.visible {
		  display: block;
			transition: max-height 0.4s ease-in-out;
		}

		${itemSl} {
		  ${theme === 'timeline-with-accordion' ? 'width: 100%;' : 'width: 50%'}
		}
		${itemSl}::after {
			background-color: ${itemBg};
			border: 5px solid ${barDotColor};
		}
		${timelineSl}--horizontal .timeline-divider, 
		${timelineSl}:not(.timeline--horizontal)::before {
			background-color: ${barBackground};
			${theme === 'timeline-with-accordion' && 'left: 0;'}
		}

		${itemSl}.timeline__item--left ${contentCl}::before {
			border-left: 11px solid ${itemBorder.color}}

		${itemSl}.timeline__item--right ${contentCl}::before {
			border-right: 12px solid ${itemBorder.color};
		}
		${itemSl}.timeline__item--left ${contentCl}::after {
		  border-left: 11px solid ${itemBg};
		}
		${itemSl}.timeline__item--right {
			${theme === 'timeline-with-accordion' ? 'left: 0;' : 'left: 50%'}
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
		${timelineSl} .timeline__wrap {
		  	${theme === 'timeline-with-accordion' ? 'overflow: unset;' : 'overflow: hidden;'}
		}
		
		`.replace(/\s+/g, ' ')
	}} />
}
export default Styles;