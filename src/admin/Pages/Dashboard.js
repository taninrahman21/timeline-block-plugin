import React, { useState } from 'react';
import accordionImage from '../../../assets/images/demoTimeline/accordionImage.png';
import defaultImage from '../../../assets/images/demoTimeline/defaultVertical.png';
import defaultVerticalImage from '../../../assets/images/demoTimeline/defautlVerticalImage.png';
import imageHorizontalTimeline from '../../../assets/images/demoTimeline/ImageTimelineHorizontalBottom.png';
import imageTimelineVerticalBoth from '../../../assets/images/demoTimeline/imageTimelineVertcalBoth.png';
import { FiCornerLeftDown, FaList } from '../../utils/icons';
import { proFeatures } from '../../utils/options';
import Layout from '../Layout/Layout';
import UpgradeBtn from './UpgradeBtn';

const Dashboard = ({ version }) => {
  const [theme, setTheme] = useState('default');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [clickedImage, setClickedImage] = useState(null);

  const openModal = (imageSrc) => {
    setClickedImage(imageSrc); // Store the clicked image's URL
    setIsModalOpen(true);      // Open the modal
  };

  const closeModal = () => {
    setIsModalOpen(false);    // Close the modal
    setClickedImage(null);    // Clear the clicked image
  };

  const tabs = [
    { id: 'default', label: 'Default', icon: <FaList />, isPro: false },
    { id: 'theme-1', label: 'Theme 1', icon: <FaList />, isPro: true },
    { id: 'theme-2', label: 'Theme 2', icon: <FaList />, isPro: true }
  ];

  const tabContents = [
    {
      name: "default",
      images: [{ header: "Default Vertical Timeline", image: defaultImage }, { header: "Default Vertical Timeline With Image", image: defaultVerticalImage }]
    },
    {
      name: "theme-1",
      images: [{ header: "Accordion Timeline with Image", image: accordionImage }]
    },
    {
      name: "theme-2",
      images: [
        { header: "Vertical Timeline Both Side", image: imageTimelineVerticalBoth },
        { header: "Horizontal Timeline", image: imageHorizontalTimeline }
      ]
    }
  ]

  return (
    <Layout version={version}>
      <div className="feature-section">
        {/* Demo Section */}
        <div className='tab-section'>
          <div className='dashboard-header-main-section'>
            <div className="dashboard-header-section">
              <h1>Thank you for installing the <span className='blockName'>Timeline Block Plugin!</span></h1>
              <div className='premium-head'>
                <FiCornerLeftDown className="leftDownIcon" />
                <h3>Check out some of our amazing premium themes below.</h3>
              </div>
            </div>
            <div>
              <UpgradeBtn />
            </div>
          </div>
          <div className="tab-container">
            <nav className="tabs">
              <h2 className='ul-head'>Amazing themes:</h2>
              <ul className="tab-list">
                {tabs.map(tab => (
                  <li
                    key={tab.id}
                    className={`tab-item ${theme === tab.id ? 'active' : ''}`}
                    onClick={() => setTheme(tab.id)}
                  >
                    <div className="tab-content">
                      {tab.icon}
                      <span className="tab-label">{tab.label}</span>
                      {tab.isPro && <span className="pro-badge">Pro</span>}
                    </div>
                  </li>
                ))}
              </ul>
            </nav>
            <main className="content">
              {/* Render the dynamic theme content */}
              {
                tabContents.map((tabContent, index) => (
                  theme === tabContent.name && (
                    <div key={index} className="theme-content">
                      {tabContent.images.map((image, imgIndex) => (
                        <div key={imgIndex}>
                          <h2>{image.header}</h2>
                          {/* Pass the image URL to openModal */}
                          <img onClick={() => openModal(image.image)} src={image.image} alt={image.header} />
                        </div>
                      ))}
                    </div>
                  )
                ))
              }

              {isModalOpen && (
                <div className="modal-overlay" onClick={closeModal}>
                  <div className="modal-content" style={{ backgroundImage: `url(${clickedImage})` }} onClick={(e) => e.stopPropagation()}>
                    <button className="close-button" onClick={closeModal}>×</button>
                  </div>
                </div>
              )}
            </main>
          </div>
        </div>

        {/* Pro features */}
        <div className="feature-container">
          <div className="feature-grid">
            <div className="feature-content">
              <p className="section-heading">Awesome Premium Features</p>
              <p className="section-description">
                Expand your plugin with some awesome some premium features that will give you a better experience.
              </p>

              {/* Premium Feature List */}
              <div className="feature-list">
                {proFeatures.map((feature) => (
                  <div key={feature.name} className="feature-item">
                    <div className="feature-name">
                      {feature.name}
                    </div>
                    <div className="feature-description">{feature.description}</div>
                  </div>
                ))}
              </div>

              <div className="upgrade-btn">
                <UpgradeBtn />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;