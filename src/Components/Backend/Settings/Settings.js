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
      <li>&emsp;<strong>{__('Embed The Code: ', 'custom-html')}</strong>{__('Embed the code to frontend.', 'custom-html')}</li>
      <li>&emsp;<strong>{__('Set Editor Height and Width: ', 'custom-html')}</strong>{__('By adding this feature you can customize height and width of the editor.', 'custom-html')}</li>
      <li>&emsp;<strong>{__('Edit Tab Size: ', 'custom-html')}</strong>{__('Increase tab size.', 'custom-html')}</li>
      <li>&emsp;<strong>{__('Change Editor Theme: ', 'custom-html')}</strong>{__('There have 45 themes that you can change.', 'custom-html')}</li>
      <li>&emsp;<strong>{__('Different language for syntax: ', 'custom-html')}</strong>{__('Change language for different language syntax.', 'custom - html')}</li>
      <li>&emsp;<strong>{__('Display Heading: ', 'custom-html')}</strong>{__('Display heading and edit this a very beautiful way.', 'custom-html')}</li>
      <li>&emsp;<strong>{__('Display copy button: ', 'custom-html')}</strong>{__('Display copy button for copy the code by one click and set position and you change its type like text of icon and style this.', 'custom-html')}</li>
      <li>&emsp;<strong>{__('Line numbers: ', 'custom-html')}</strong>{__('Show/hide line numbers with your need.', 'custom-html')}</li>
      <li>&emsp;<strong>{__('Highlight active line: ', 'custom-html')}</strong>{__('Show/hide highlight active line.', 'custom-html')}</li>
      <li>&emsp;<strong>{__('Fold Gutter: ', 'custom-html')}</strong>{__('Enable/disable fold gutter option.', 'custom-html')}</li>
      <li>&emsp;<strong>{__('Enable Autocompletion: ', 'custom-html')}</strong>{__('Off/on autocompletion.', 'custom-html')}</li>
      <li>&emsp;<strong>{__('Wrap Enabled: ', 'custom-html')}</strong>{__('Enable wrap system.', 'custom-html')}</li>
    </AboutProModal>
  </>;
};
export default Settings;