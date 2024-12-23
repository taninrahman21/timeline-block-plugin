import { createRoot } from 'react-dom/client';

import Timeline from './Components/Frontend/Timeline';
import './style.scss';

document.addEventListener('DOMContentLoaded', () => {
	const timelineBlockEls = document.querySelectorAll('.wp-block-tlgb-b-timeline-block');
	timelineBlockEls.forEach(timelineBlockEl => {
		const attributes = JSON.parse(timelineBlockEl.dataset.attributes);

		createRoot(timelineBlockEl).render(<>
			<Timeline attributes={attributes} id={timelineBlockEl.id} />
		</>);

		timelineBlockEl?.removeAttribute('data-attributes');
	});
});