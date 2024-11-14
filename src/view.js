import { createRoot } from 'react-dom/client';

import './style.scss';
import Styles from './Components/Common/Styles';
import Timeline from './Components/Frontend/Timeline';

document.addEventListener('DOMContentLoaded', () => {
	const timelineBlockEls = document.querySelectorAll('.wp-block-tlgb-b-timeline-block');
	timelineBlockEls.forEach(timelineBlockEl => {
		const attributes = JSON.parse(timelineBlockEl.dataset.attributes);

		createRoot(timelineBlockEl).render(<>
			<Styles attributes={attributes} id={timelineBlockEl.id} />

			<Timeline attributes={attributes} id={timelineBlockEl.id} />
		</>);

		timelineBlockEl?.removeAttribute('data-attributes');
	});
});