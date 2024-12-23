import React from 'react';
import { helpfulLinks } from '../../utils/options';

const HelpfulLinks = () => {
  return <>
    <div className='header box'>
      <h1 className='heading'>Helpful Links</h1>
    </div>
    <div className='body'>
      <div className='features col-3 col-tab-2 col-mob-1'>
        {helpfulLinks.map((feature, index) => <HelpfulLink key={index} feature={feature} />)}
      </div>
    </div>
  </>
};

export default HelpfulLinks;

const HelpfulLink = ({ feature }) => {
  const { title, description, iconClass, link, linkText } = feature;
  console.log(iconClass);

  return <div className='feature box'>
    <i className={iconClass}></i>
    <h3 dangerouslySetInnerHTML={{ __html: title }} />
    <p dangerouslySetInnerHTML={{ __html: description }} />
    <a href={link} target='_blank' rel='noreferrer' className='button button-primary' dangerouslySetInnerHTML={{ __html: linkText }} />
  </div>
}