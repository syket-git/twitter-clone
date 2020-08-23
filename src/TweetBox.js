import React, { useState } from 'react';
import './TweetBox.css';
import { Avatar, Button } from '@material-ui/core';
import WallpaperIcon from '@material-ui/icons/Wallpaper';
import { useAuth } from './useAuth';
import { storage, db } from './firebase';
import firebase from 'firebase';
const TweetBox = () => {
  const [text, setText] = useState('');
  const [image, setImage] = useState(null);
  const [progress, setProgress] = useState(0);
  const [openProgress, setOpenProgress] = useState(false);

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleClick = () => {
    setOpenProgress(true);
    const uploadTask = storage.ref(`images/${image.name}`).put(image);
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      (error) => {
        alert(error.message);
      },
      () => {
        storage
          .ref('images')
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            db.collection('posts').add({
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
              avatar: auth.user.photoURL,
              displayName: auth.user.displayName,
              username:
                '@' + auth.user.displayName.replace(/\s/g, '').toLowerCase(),
              verified: true,
              text: text,
              image: url,
            });

            setTimeout(() => {
              setOpenProgress(false);
              setImage(null);
              setText('');
            }, 2000);
          });
      }
    );
  };

  const auth = useAuth();
  return (
    <div className="tweetBox">
      <form>
        <div className="tweetBox__input">
          <Avatar src={auth.user?.photoURL} alt={auth.user?.displayName} />
          {/* <input type="text" /> */}
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="What's happening?"
            cols="30"
            rows="2"
          ></textarea>
        </div>

        <div className="tweetBox__upload">
          <div className="custom-file">
            <input
              type="file"
              className="custom-file-input"
              id="customFileLang"
              lang="pl-Pl"
              onChange={handleChange}
            />
            <label className="custom-file-label" htmlFor="customFileLang">
              <WallpaperIcon />
            </label>
          </div>

          <Button
            onClick={handleClick}
            disabled={!text}
            className="tweetBox__tweetButton "
          >
            Tweet
          </Button>
        </div>
        {openProgress && (
          <progress className="progress" value={progress} max="100" />
        )}
      </form>
    </div>
  );
};

export default TweetBox;
