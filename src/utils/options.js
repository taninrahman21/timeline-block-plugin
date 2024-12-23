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

export const themeOptions = [
	{ label: 'Default', value: "default" },
	{ label: "Timeline with Accordion", value: "timeline-with-accordion" },
	{ label: "Timeline with Icon and Date", value: "theme-2" }
]
export const itemPositionOptions = [
	{ label: 'Both Side', value: "both-side" },
	{ label: "Right Side", value: "right" },
	{ label: "Left Side", value: "left" }
];


export const proFeatures = [
	{
		name: "Added 2 Beautiful Themes",
		description:
			"Extend your plugin with these 2 themes. By using this timeline you can create a lot of themes."
	},
	{
		name: "Horizontal / Vertical Option in every themes",
		description:
			"Customize your timeline like horizontal or vertical in every theme as a option. It's easy and beautiful to customize."
	},
	{
		name: "Added Tiny Editor",
		description:
			"As Timeline content you can use tiny editor. You can add image and edit your content on your own."
	},
	{
		name: "Add Icon to your every story.",
		description:
			"Add and edit your story icon on your own."
	},
	{
		name: "Change Icon and Story Date Position",
		description:
			"You can change icon position when you're on horizontal timeline."
	}
];

export const helpfulLinks = [
	{
		title: 'Need any Assistance?',
		description: 'Our Expert Support Team is always ready to help you out promptly.',
		iconClass: 'fa fa-life-ring',
		link: 'https://bplugins.com/support',
		linkText: 'Contact Support'
	},
	{
		title: 'Looking for Documentation?',
		description: 'We have detailed documentation on every aspects of the plugin.',
		iconClass: 'fa fa-file-text',
		link: 'https://ctb.bplugins.com/docs',
		linkText: 'Documentation'
	},
	{
		title: 'Liked This Plugin?',
		description: 'Glad to know that, you can support us by leaving a 5 &#11088; rating.',
		iconClass: 'fa fa-thumbs-up',
		link: 'https://wordpress.org/support/plugin/icon-list-block/reviews/',
		linkText: 'Rate the Plugin'
	}
];