import { __ } from '@wordpress/i18n';
import { InspectorControls, BlockControls } from '@wordpress/block-editor';
import { TabPanel, ToolbarGroup, ToolbarButton } from '@wordpress/components';

// Settings Components
import { tabController } from '../../../../../Components/utils/functions';

import { generalStyleTabs } from '../../../utils/options';
import Styles from './Styles/Styles';
import General from './General/General';

const Settings = ({ attributes, setAttributes, activeIndex, setActiveIndex, updateTimeline }) => {
  const { timelines } = attributes;

  const addTimeline = () => {
    setAttributes({
      timelines: [
        ...timelines,
        {
          label: 'January',
          description: 'Note of the january month'
        }
      ]
    });
    setActiveIndex(timelines.length);
  };


  const duplicateTimeline = () => {
    setAttributes({ timelines: [...timelines.slice(0, activeIndex), { ...timelines[activeIndex] }, ...timelines.slice(activeIndex)] });

    setActiveIndex(activeIndex + 1);
  }

  const removeTimeline = () => {
    setAttributes({ timelines: [...timelines.slice(0, activeIndex), ...timelines.slice(activeIndex + 1)] });

    setActiveIndex(0 === activeIndex ? 0 : activeIndex - 1);
  }

  return <>
    <InspectorControls>
      <div className='bBlocksInspectorInfo'>
        Need more block like this? Checkout the bundle ➡ <a href='https://wordpress.org/plugins/b-blocks' target='_blank' rel='noopener noreferrer'>B Blocks</a>
      </div>

      <TabPanel className='bPlTabPanel' activeClass='activeTab' tabs={generalStyleTabs} onSelect={tabController}>{tab => <>
        {'general' === tab.name && <General attributes={attributes} setAttributes={setAttributes} addTimeline={addTimeline} duplicateTimeline={addTimeline} updateTimeline={updateTimeline} removeTimeline={removeTimeline} activeIndex={activeIndex} />}


        {'style' === tab.name && <Styles attributes={attributes} setAttributes={setAttributes} />}
      </>}</TabPanel>
    </InspectorControls>


    <BlockControls>
      <ToolbarGroup className='bPlToolbar'>
        <ToolbarButton icon='trash' label={__(`Remove Timeline No ${activeIndex + 1}`, 'timeline-block')} onClick={removeTimeline} />

        <ToolbarButton icon={<svg xmlns='http://www.w3.org/2000/svg' height='24' width='24' viewBox='0 0 48 48'>
          <path d='M9 43.95q-1.2 0-2.1-.9-.9-.9-.9-2.1V10.8h3v30.15h23.7v3Zm6-6q-1.2 0-2.1-.9-.9-.9-.9-2.1v-28q0-1.2.9-2.1.9-.9 2.1-.9h22q1.2 0 2.1.9.9.9.9 2.1v28q0 1.2-.9 2.1-.9.9-2.1.9Zm0-3h22v-28H15v28Zm0 0v-28 28Z' />
        </svg>} label={__(`Copy Timeline No ${activeIndex + 1}`, 'timeline-block')} onClick={duplicateTimeline} />

        <ToolbarButton icon='plus' label={__('Add Timeline', 'timeline-block')} onClick={addTimeline} />
      </ToolbarGroup>
    </BlockControls>
  </>;
};
export default Settings;