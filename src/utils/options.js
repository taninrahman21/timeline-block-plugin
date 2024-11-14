import { __ } from '@wordpress/i18n';

export const options = {
	types: [
		{ label: __('Vertical', 'timeline-block'), value: 'vertical' },
		{ label: __('Horizontal', 'timeline-block'), value: 'horizontal' }
	],
	topBottom: [
		{ label: __('Top', 'timeline-block'), value: 'top' },
		{ label: __('Bottom', 'timeline-block'), value: 'bottom' }
	],
	leftRight: [
		{ label: __('Left', 'timeline-block'), value: 'left' },
		{ label: __('Right', 'timeline-block'), value: 'right' }
	]
};

export const generalStyleTabs = [
	{ name: 'general', title: __('General', 'textdomain') },
	{ name: 'style', title: __('Style', 'textdomain') }
];
