import React from 'react';
import { IoIosSettings } from "react-icons/io";
import HelpfulLinks from '../Pages/HelpfulLinks';
import Content from '../Parts/Content';
import Header from '../Parts/Header';

const Layout = ({ children, version }) => {
  const navigation = [
    { name: 'Dashboard', href: '/dashboard' },
    { name: "Support", href: '/support'}
  ]


  return (
    <>
      <div className="bplContainer">
        <Header navigation={navigation} version={version} />
        <Content>{children}</Content>
      </div>
    </>
  )
}

export default Layout;