import { BlockControls, InspectorControls } from '@wordpress/block-editor';
import { TabPanel, ToolbarButton, ToolbarGroup } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { useState } from "react";

// Settings Components
import { tabController } from '../../../../../Components/utils/functions';

import { BBlocksAds } from '../../../../../bpl-tools/Components';
import { AboutProModal } from '../../../../../bpl-tools/ProControls';
import { generalStyleTabs } from '../../../utils/options';
import General from './General/General';
import Styles from './Styles/Styles';

const Settings = ({ attributes, setAttributes, activeIndex, setActiveIndex, updateTimeline, isPremium }) => {
  const { timelines } = attributes;
  const [isProModalOpen, setIsProModalOpen] = useState(false);



  const premiumProps = {
    isPremium,
    setIsProModalOpen
  }


  const addTimeline = () => {
    setAttributes({
      timelines: [
        ...timelines,
        {
          date: "02-02-2002",
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
      {
        !isPremium && <BBlocksAds />
      }

      <TabPanel className='bPlTabPanel' activeClass='activeTab' tabs={generalStyleTabs} onSelect={tabController}>{tab => <>
        {'general' === tab.name && <General attributes={attributes} setAttributes={setAttributes} addTimeline={addTimeline} duplicateTimeline={addTimeline} updateTimeline={updateTimeline} removeTimeline={removeTimeline} activeIndex={activeIndex} premiumProps={premiumProps} />}


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

    <AboutProModal isProModalOpen={isProModalOpen} setIsProModalOpen={setIsProModalOpen} link='https://bplugins.com/products/advance-custom-html/#pricing'>
      <li>&emsp;<strong>{__('Added 2 Beautiful Themes: ', 'custom-html')}</strong>{__('Extend your plugin with these 2 themes. By using this timeline you can create a lot of themes.', 'timeline-block')}</li>
      <li>&emsp;<strong>{__('Horizontal / Vertical Option in every themes: ', 'timeline-block')}</strong>{__("Customize your timeline like horizontal or vertical in every theme as a option. It's easy and beautiful to customize.", 'timeline-block')}</li>
      <li>&emsp;<strong>{__('Added Classic Editor: ', 'timeline-block')}</strong>{__('As Timeline content you can use classic editor. You can add image and edit your content on your own.', 'timeline-block')}</li>
      <li>&emsp;<strong>{__('Add Icon to your every story: ', 'timeline-block')}</strong>{__('Add and edit your story icon on your own.', 'timeline-block')}</li>
      <li>&emsp;<strong>{__('Change Icon and Story Date Position: ', 'timeline-block')}</strong>{__('Change language for different language syntax.', 'custom - html')}</li>
      <li>&emsp;<strong>{__('Change Icon and Story Date Position: ', 'timeline-block')}</strong>{__("You can change icon position when you're on horizontal timeline", 'timeline-block')}</li>
    </AboutProModal>
  </>;
};
export default Settings;