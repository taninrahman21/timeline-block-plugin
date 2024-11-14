import { registerBlockType } from '@wordpress/blocks';

import metadata from './block.json';
import Edit from './Components/Backend/Edit';
import './editor.scss';

import { timelineIcon } from './utils/icons';

registerBlockType(metadata, {
	icon: timelineIcon,

	// Build in Functions
	edit: Edit,

	save: () => null,
});
