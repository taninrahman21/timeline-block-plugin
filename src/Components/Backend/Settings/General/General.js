import { Button, Dashicon, PanelBody, PanelRow, RangeControl, TextareaControl, TextControl, ToggleControl, __experimentalUnitControl as UnitControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import React from 'react';
import { BtnGroup, Label } from '../../../../../../bpl-tools/Components';
import { gearIcon } from '../../../../../../bpl-tools/utils/icons';
import { perUnit, pxUnit } from '../../../../../../bpl-tools/utils/options';
import { options } from '../../../../utils/options';
const { types, topBottom, leftRight } = options;


const General = ({ attributes, setAttributes, removeTimeline, activeIndex, addTimeline, duplicateTimeline, updateTimeline }) => {
  const { timelines, type, labelLocation, startIndex, vigibleItems, moveItem, verticalTrigger, rtlMode } = attributes;

  const { label = '', description = '' } = timelines[activeIndex] || {};


  return (
    <>
      <PanelBody className='bPlPanelBody addRemoveItems' title={__('Add or Remove timelines', 'timeline-block')}>
        {null !== activeIndex && <>
          <h3 className='bplItemTitle'>{__(`Timeline No ${activeIndex + 1}:`, 'timeline-block')}</h3>

          <PanelRow>
            <Label className=''>{__('Label:', 'timeline-block')}</Label>
            <TextControl value={label} onChange={val => updateTimeline(activeIndex, 'label', val)} />
          </PanelRow>

          <Label>{__('Description:', 'timeline-block')}</Label>
          <TextareaControl value={description} onChange={val => updateTimeline(activeIndex, 'description', val)} rows={6} />
          <small>{__('Can write html code.', 'timeline-block')}</small>

          <PanelRow className='itemAction mt20 mb15'>
            {1 < timelines?.length && <Button className='removeItem' label={__('Remove', 'timeline-block')} onClick={removeTimeline} ><Dashicon icon='no' />{__('Remove', 'timeline-block')}</Button>}

            <Button className='duplicateItem' label={__('Duplicate', 'timeline-block')} onClick={duplicateTimeline} >{gearIcon}{__('Duplicate', 'timeline-block')}</Button>
          </PanelRow>
        </>}

        <div className='addItem'>
          <Button label={__('Add New Timeline', 'timeline-block')} onClick={addTimeline}><Dashicon icon='plus' />{__('Add New Timeline', 'timeline-block')}</Button>
        </div>
      </PanelBody>


      <PanelBody className='bPlPanelBody' title={__('Timeline Settings', 'timeline-block')}>
        <PanelRow>
          <Label className=''>{__('Type:', 'timeline-block')}</Label>
          <BtnGroup value={type} onChange={val => setAttributes({ type: val, labelLocation: 'vertical' === val ? 'right' : 'top', })} options={types} />
        </PanelRow>

        <PanelRow className='mt20'>
          <Label className=''>{__('Label Location:', 'timeline-block')}</Label>

          <BtnGroup value={labelLocation} onChange={val => setAttributes({ labelLocation: val })} options={'vertical' === type ? leftRight : topBottom} />
        </PanelRow>
        <small>{__('Label Location will be changed! When type will be changed', 'timeline-block')}</small>

        {'vertical' === type && <UnitControl className='mt20' label={__('Space in Bottom:', 'timeline-block')} labelPosition='left' value={verticalTrigger} onChange={val => setAttributes({ verticalTrigger: val })} units={[pxUnit(), perUnit()]} />}

        {'horizontal' === type && <>
          <Label>{__('Start Index:', 'timeline-block')}</Label>
          <RangeControl value={startIndex} onChange={val => setAttributes({ startIndex: val })} min={1} max={80} step={1} />

          <Label>{__('Visible Items:', 'timeline-block')}</Label>
          <RangeControl value={vigibleItems} onChange={val => setAttributes({ vigibleItems: val })} />

          <Label>{__('Move Item:', 'timeline-block')}</Label>
          <RangeControl value={moveItem} onChange={val => setAttributes({ moveItem: val })} />

          <ToggleControl label='RTL Mode' checked={rtlMode} onChange={val => setAttributes({ rtlMode: val })} />
        </>}
      </PanelBody>

    </>
  );
};

export default General;