import { RichText } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';
import { produce } from 'immer';
import { useEffect, useState } from 'react';

import { usePremiumInEditor } from '../../../../bpl-tools/hooks';
import { timelineConfig } from '../../utils/config';
import Settings from '../Backend/Settings/Settings';
import Styles from '../Common/Styles';
import Theme2 from './Themes/Theme2';

const Edit = props => {
	const { className, attributes, setAttributes, clientId } = props;
	const { timelines, type, labelLocation, startIndex, vigibleItems, moveItem, verticalTrigger, rtlMode, theme } = attributes;

	const [activeIndex, setActiveIndex] = useState(0);

	const id = `tlgbTimeline-${clientId}`;

	const { isPremium } = usePremiumInEditor('tlgbUtils', 'tlgbPipeChecker');

	const [visibleDescriptions, setVisibleDescriptions] = useState({});


	useEffect(() => {
		const timelineEl = document.querySelector(`#${id} .timeline`);
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
	}, [type, labelLocation, verticalTrigger, moveItem, startIndex, vigibleItems, rtlMode, theme, timelines.length]);

	// Change Timeline Data
	const updateTimeline = (index, type, val) => {
		const newTimelines = produce(timelines, draft => {
			draft[index][type] = val;
		});
		setAttributes({ timelines: newTimelines });
		setActiveIndex(index);
	}

	// Remove hidden-animated class for https://wordpress.org/support/topic/timeline-not-loading-on-mobile/
	useEffect(() => {
		const allTimelineItem = document.querySelectorAll(`#${id} .timeline__items .timeline__item`);

		setTimeout(() => {
			allTimelineItem?.forEach(item => {
				item.classList.remove('animated');
				item.classList.remove('hidden-animated');
			});
		}, 500);
	}, [timelines?.length]);


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
		<Settings isPremium={isPremium} attributes={attributes} setAttributes={setAttributes} activeIndex={activeIndex} setActiveIndex={setActiveIndex} updateTimeline={updateTimeline} />

		<div className={className} id={id} >
			{
				theme !== "theme-2" && <Styles attributes={attributes} id={id} />
			}

			{
				(theme === 'default' || theme === "timeline-with-accordion") && <>
					<div className='timeline tlgbTimeline'>
						<div className='timeline__wrap'>
							<div className='timeline__items'>
								{timelines?.map((item, index) => {
									const { label, description } = item;
									const isVisible = visibleDescriptions[index];

									return <div key={index} onClick={() => setActiveIndex(index)} className='timeline__item fadeIn' id={`tlgbTimelineItem-${index}`}>
										<div className={`timeline__content ${index === activeIndex ? 'tlgbNowEditing' : ''}`}>
											<RichText
												tagName='label'
												value={label}
												onChange={val => updateTimeline(index, 'label', val)}
												placeholder={__('Timeline label', 'timeline-block')}
												inlineToolbar
												onClick={() => {
													theme === "timeline-with-accordion" && toggleDescription(index)
												}}
											/>

											<RichText
												tagName='p'
												className={`timeline__description ${theme === "timeline-with-accordion" ? (isVisible ? 'visible' : 'hidden') : "visible"}`}
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
			}

			{
				theme === "theme-2" && <Theme2 id={id} attributes={attributes} setAttributes={setAttributes} activeIndex={activeIndex} setActiveIndex={setActiveIndex} updateTimeline={updateTimeline} clientId={clientId} />
			}
		</div> {/* Timeline Block */}
	</>
};
export default Edit;