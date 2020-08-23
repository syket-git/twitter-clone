import React from 'react';
import './Sidebar.css';
import SidebarOption from './SidebarOption';
import HomeIcon from '@material-ui/icons/Home';
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import ListAltIcon from '@material-ui/icons/ListAlt';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import ExploreIcon from '@material-ui/icons/Explore';
import TwitterIcon from '@material-ui/icons/Twitter';
import { Button, Avatar } from '@material-ui/core';
import { useAuth } from './useAuth';
import MenuIcon from '@material-ui/icons/Menu';

const Sidebar = () => {
  const auth = useAuth();
  const handleOpen = () => {
    document.querySelector('.sidebar').classList.toggle('open');
  };
  return (
    <>
      <MenuIcon onClick={handleOpen} className="menu" />
      <div className="sidebar">
        <TwitterIcon className="sidebar__twitter" />
        <SidebarOption active title="Home" Icon={HomeIcon} />
        <SidebarOption title="Explore" Icon={ExploreIcon} />
        <SidebarOption title="Notifications" Icon={NotificationsNoneIcon} />
        <SidebarOption title="Messages" Icon={MailOutlineIcon} />
        <SidebarOption title="Bookmarks" Icon={BookmarkBorderIcon} />
        <SidebarOption title="Lists" Icon={ListAltIcon} />
        <SidebarOption title="Profile" Icon={PersonOutlineIcon} />
        <SidebarOption title="More" Icon={MoreHorizIcon} />
        <Button variant="outlined" fullWidth className="sidebar__button">
          Tweet
        </Button>
        <div className="sidebar__profileInfo">
          <Avatar src={auth.user?.photoURL} alt={auth.user?.displayName} />
          <div>
            <h4 className="sidebar__profileInfo__displayName">
              {auth.user?.displayName}
            </h4>
            <p className="sidebar__profileInfo__username">
              {'@' + auth.user?.displayName.replace(/\s/g, '').toLowerCase()}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
