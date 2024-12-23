import { Button, Dashicon, PanelBody, PanelRow, RangeControl, SelectControl, TextareaControl, TextControl, ToggleControl, __experimentalUnitControl as UnitControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import React from 'react';
import { BtnGroup, IconLibrary, Label } from '../../../../../../bpl-tools/Components';
import { BControlPro, SelectControlPro } from '../../../../../../bpl-tools/ProControls';
import { gearIcon } from '../../../../../../bpl-tools/utils/icons';
import { perUnit, pxUnit } from '../../../../../../bpl-tools/utils/options';
import { options, themeOptions } from '../../../../utils/options';
import { Tab } from '../../../Panel/Tab/Tab';
import { TinyEditor } from '../../../Panel/TinyEditor/TinyEditor';
const { types, topBottom, leftRight } = options;


const General = ({ attributes, setAttributes, removeTimeline, activeIndex, addTimeline, duplicateTimeline, updateTimeline, premiumProps }) => {
  const { timelines, type, labelLocation, startIndex, vigibleItems, moveItem, verticalTrigger, rtlMode, theme, itemPosition, horizontalDatePosition } = attributes;

  const { label = '', description = '', isAddTinyEditor = false, date = "", icon = { class: "fa-solid fa-star" } } = timelines[activeIndex] || {};


  return (
    <>
      <PanelBody className='bPlPanelBody addRemoveItems' title={__('Add or Remove timelines', 'timeline-block')}>
        <SelectControlPro
          label={__("Theme:", "timeline-block")}
          labelPosition='left'
          value={theme} // This sets the initial value
          options={themeOptions}
          onChange={value => {
            setAttributes({ theme: value, type: 'vertical' })
          }}
          {...premiumProps}
          proValues={['timeline-with-accordion', 'theme-2']}
        />

        {null !== activeIndex && <>
          <h3 className='bplItemTitle'>{__(`Timeline No ${activeIndex + 1}:`, 'timeline-block')}</h3>

          <PanelRow>
            <Label className=''>{__('Label:', 'timeline-block')}</Label>
            <TextControl value={label} onChange={val => updateTimeline(activeIndex, 'label', val)} />
          </PanelRow>

          {
            theme === "theme-2" && <>
              <PanelRow>
                <Label className=''>{__('Story Date', 'timeline-block')}</Label>
                <TextControl value={date} onChange={val => updateTimeline(activeIndex, 'date', val)} />
              </PanelRow>
              <IconLibrary
                className='mt10'
                label='Story Icon'
                value={icon}
                onChange={val => updateTimeline(activeIndex, 'icon', val)}
              />
            </>
          }



          {/* Add Photos and Other Stuff */}
          <BControlPro
            className='mt10'
            label={__('Add Tiny Editor For Description', 'custom-html')}
            checked={isAddTinyEditor}
            onChange={isAddTinyEditor => updateTimeline(activeIndex, 'isAddTinyEditor', isAddTinyEditor)}
            Component={ToggleControl}
            {...premiumProps}
          />

          {
            isAddTinyEditor ?
              <TinyEditor className="mt10" value={description} onChange={val => updateTimeline(activeIndex, 'description', val)} /> : <>
                <Label>{__('Description:', 'timeline-block')}</Label>
                <TextareaControl value={description} onChange={val => updateTimeline(activeIndex, 'description', val)} rows={6} />
                <small>{__('Can write html code.', 'timeline-block')}</small>
              </>
          }

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
        {
          (theme === 'timeline-with-accordion' === false) && <PanelRow>
            <Label className=''>{__('Type:', 'timeline-block')}</Label>
            <BtnGroup value={type} onChange={val => setAttributes({ type: val, labelLocation: 'vertical' === val ? 'right' : 'top', })} options={types} />
          </PanelRow>
        }
        {
          (!(theme === 'timeline-with-accordion') && !(theme === "theme-2")) && (
            <>
              <PanelRow className='mt20'>
                <Label className=''>{__('Label Location:', 'timeline-block')}</Label>
                <BtnGroup
                  value={labelLocation}
                  onChange={val => setAttributes({ labelLocation: val })}
                  options={'vertical' === type ? leftRight : topBottom}
                />
              </PanelRow>
              <small>{__('Label Location will be changed! When type will be changed', 'timeline-block')}</small>
            </>
          )
        }


        {
          (("theme-2" === theme) && (type === "horizontal")) && <>
            <p className='mt20'>Icon and Date Position</p>
            <Tab
              value={horizontalDatePosition}
              options={[
                { label: "Top", value: "top" },
                { label: "Bottom", value: "bottom" }
              ]}
              onChange={val => setAttributes({ horizontalDatePosition: val })}
            />
          </>
        }

        {
          (("theme-2" === theme) && (type === "vertical")) && <>
            <p className='mt20'>Content Position</p>
            <Tab
              value={itemPosition}
              options={[
                { label: "Left", value: "left" },
                { label: "Both", value: "both-side" },
                { label: "Right", value: "right" }
              ]}
              onChange={val => setAttributes({ itemPosition: val })}
            />
          </>
        }

        {(('vertical' === type) && (theme === "default")) && <UnitControl className='mt20' label={__('Space in Bottom:', 'timeline-block')} labelPosition='left' value={verticalTrigger} onChange={val => setAttributes({ verticalTrigger: val })} units={[pxUnit(), perUnit()]} />}

        {('horizontal' === type && theme === "default") && <>
          <Label>{__('Start Index:', 'timeline-block')}</Label>
          <RangeControl value={startIndex} onChange={val => setAttributes({ startIndex: val })} min={1} max={80} step={1} />

          <Label>{__('Visible Items:', 'timeline-block')}</Label>
          <RangeControl value={vigibleItems} onChange={val => setAttributes({ vigibleItems: val })} />

          <Label>{__('Move Item:', 'timeline-block')}</Label>
          <RangeControl value={moveItem} onChange={val => setAttributes({ moveItem: val })} />

          <ToggleControl label='RTL Mode' checked={rtlMode} onChange={val => setAttributes({ rtlMode: val })} />
        </>}
      </PanelBody>

      {/* <PanelBody className='bPlPanelBody' title={__('Timeline Themes', 'timeline-block')} initialOpen={false}>
        <SelectControl
          label={__('Themes', 'timeline-block')}
          labelPosition='left'
          value={theme}
          options={themeOptions}
          onChange={value => {
            setAttributes({ theme: value, type: 'vertical' })
          }}
        />
      </PanelBody> */}
    </>
  );
};

export default General;