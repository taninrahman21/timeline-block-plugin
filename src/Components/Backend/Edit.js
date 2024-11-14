import { RichText } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';
import { produce } from 'immer';
import { useEffect, useState } from 'react';

import { timelineConfig } from '../../utils/config';
import Settings from '../Backend/Settings/Settings';
import Styles from '../Common/Styles';

const Edit = props => {
	const { className, attributes, setAttributes, clientId } = props;
	const { timelines, type, labelLocation, startIndex, vigibleItems, moveItem, verticalTrigger, rtlMode } = attributes;

	const [activeIndex, setActiveIndex] = useState(0);

	const id = `tlgbTimeline-${clientId}`;

	useEffect(() => {
		const timelineEl = document.querySelector(`#${id} .timeline`);

		if (timelineEl) {
			timeline([timelineEl], timelineConfig(attributes));
		}
	}, [type, labelLocation, verticalTrigger, moveItem, startIndex, vigibleItems, rtlMode]);

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

	return <>
		<Settings attributes={attributes} setAttributes={setAttributes} activeIndex={activeIndex} setActiveIndex={setActiveIndex} updateTimeline={updateTimeline} />

		<div className={className} id={id}>
		<Styles attributes={attributes} id={id} />
			<div className='timeline tlgbTimeline'>
				<div className='timeline__wrap'>
					<div className='timeline__items'>
						{timelines?.map((item, index) => {
							const { label, description } = item;

							return <div key={index} onClick={() => setActiveIndex(index)} className='timeline__item fadeIn' id={`tlgbTimelineItem-${index}`}>
								<div className={`timeline__content ${index === activeIndex ? 'tlgbNowEditing' : ''}`}>
									<RichText tagName='label' value={label} onChange={val => updateTimeline(index, 'label', val)} placeholder={__('Timeline label', 'timeline-block')} inlineToolbar />

									<RichText tagName='p' value={description} onChange={val => updateTimeline(index, 'description', val)} placeholder={__('Timeline description', 'timeline-block')} inlineToolbar />
								</div>
							</div> // Timeline Item
						})}
					</div> {/* Timeline Items */}
				</div> {/* Timeline Wrap */}
			</div> {/* Timeline */}
		</div> {/* Timeline Block */}
	</>
};
export default Edit;