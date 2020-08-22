import React from 'react';
import './SidebarOption.css';


const SidebarOption = ({ title, Icon, active }) => {
  return (
    <div className={`sidebarOption ${active && 'sidebarOption--active'}`}>
      <Icon />
      <h2>{title}</h2>
      
    </div>
  );
};

export default SidebarOption;
