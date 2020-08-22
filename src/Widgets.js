import React from 'react';
import './Widgets.css';
import {
  TwitterTimelineEmbed,
  TwitterShareButton,
  TwitterTweetEmbed,
} from 'react-twitter-embed';
import SearchIcon from '@material-ui/icons/Search';

const Widgets = () => {
  return (
    <div className="widgets">
      <div className="widgets__input">
        <SearchIcon />
        <input type="text" placeholder="Search Twitter" />
      </div>
      <div className="widgets__container">
        <h2>What's happening?</h2>
        <TwitterTweetEmbed tweetId='1265332514761179136' />
        <TwitterTimelineEmbed
          className="widgets__timeline__embed"
          sourceType="profile"
          screenName="syketb_twt"
          options={{ height: 400 }}
        />
        <div className="shareButton">
          <TwitterShareButton
            url={'https://facebook.com/syketb'}
            options={{ text: '#reactjs is outstanding', via: 'syketb_twt' }}
          />
        </div>
      </div>
    </div>
  );
};

export default Widgets;
