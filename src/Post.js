import React, { useState, useEffect } from 'react';
import './Post.css';
import { Avatar, Button } from '@material-ui/core';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import RepeatIcon from '@material-ui/icons/Repeat';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import PublishIcon from '@material-ui/icons/Publish';
import Moment from 'react-moment';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { useAuth } from './useAuth';
import { db } from './firebase';

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: '70vw !important',
    height: '90vh',
    overflow: 'scroll',
    paddingLeft: '10px !important',
    backgroundColor: theme.palette.background.paper,
    border: '2px solid var(--twitter-color)',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const Post = ({
  displayName,
  username,
  verified,
  text,
  image,
  timestamp,
  avatar,
  postId,
}) => {
  const [replayTweet, setReplayTweet] = useState('');
  const [love, setLove] = useState(false);
  const auth = useAuth();
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);
  const [totalComments, setTotalComments] = useState(null);
  const [loves, setLoves] = useState();

  useEffect(() => {
    if (postId) {
      db.collection('posts')
        .doc(postId)
        .collection('comments')
        .onSnapshot((snapshot) => {
          setTotalComments(
            snapshot.docs.map((doc) => ({ id: doc.id, comment: doc.data() }))
          );
        });
    }
  }, [postId]);

  useEffect(() => {
    if (postId) {
      db.collection('posts')
        .doc(postId)
        .collection('loves')
        .onSnapshot((snapshot) => {
          setLoves(
            snapshot.docs.map((doc) => ({ id: doc.id, love: doc.data() }))
          );
        });
    }
  }, [postId]);

  useEffect(() => {
    const isLove = loves?.find(({ id, love }) => love.uid === auth.user?.uid);

    if (isLove !== undefined) {
      setLove(true);
    }
  }, [auth.user.uid, loves]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const addComments = () => {
    db.collection('posts').doc(postId).collection('comments').add({
      replayTweet: replayTweet,
      avatar: auth.user?.photoURL,
      displayName: auth.user?.displayName,
    });
    setReplayTweet('');
    setOpen(false);
  };

  const inLoves = () => {
    db.collection('posts').doc(postId).collection('loves').add({
      uid: auth.user?.uid,
    });
  };
  const outLoves = (id) => {
    db.collection('posts').doc(postId).collection('loves').doc(id).delete();
  };

  const outLove = () => {
    setLove(false);

    const isLove = loves?.find(({ id, love }) => love.uid === auth.user?.uid);

    if (isLove !== undefined) {
      outLoves(isLove.id);
    }
  };
  const inLove = () => {
    setLove(true);
    inLoves();
  };

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <div>
        <div>
          <span
            style={{
              fontSize: '21px',
              fontWeight: 'bold',
              width: '100%',
              textAlign: 'right',
              float: 'right',
              cursor: 'pointer',
            }}
            onClick={() => setOpen(false)}
          >
            x
          </span>
        </div>
        {totalComments?.map(({ id, comment }) => (
          <div style={{ display: 'flex', alignItems: 'flex-start' }}>
            <Avatar src={comment.avatar} alt={comment.displayName} />
            <div style={{ marginLeft: '10px' }}>
              <span style={{ color: 'var(--twitter-color' }}>
                {comment.displayName}
              </span>
              <p style={{ fontWeight: 'bold' }}>{comment.replayTweet}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="post">
        <Avatar src={avatar} alt={displayName} />
        <div className="post__main__body">
          <div className="post__header">
            <h4>{displayName}</h4>
            {verified === true && <VerifiedUserIcon />}
          </div>
          <div className="post__body">
            <p>{text}</p>
            <p>
              Replaying to{' '}
              <span style={{ color: 'var(--twitter-color)' }}>{username}</span>
            </p>
          </div>
        </div>
      </div>
      <div
        className="tweetBox__input"
        style={{
          display: 'flex !important',
          alighItems: 'flex-start !important',
          padding: '6px !important'
        }}
      >
        <Avatar src={auth.user?.photoURL} alt={auth.user?.displayName} />
        {/* <input type="text" /> */}
        <textarea
          placeholder="Tweet your replay"
          value={replayTweet}
          onChange={(e) => setReplayTweet(e.target.value)}
          cols="30"
          rows="4"
        ></textarea>
      </div>
      <div className="tweetBox__upload">
        <Button
          onClick={addComments}
          disabled={!replayTweet}
          className="tweetBox__tweetButton "
        >
          Tweet
        </Button>
      </div>
    </div>
  );

  return (
    <div className="post">
      <Avatar src={avatar} alt={displayName} />
      <div className="post__main__body">
        <div className="post__header">
          <h4>{displayName}</h4>
          {verified === true && <VerifiedUserIcon />}
          <p>{username}</p>
          <span>.</span>
          <p>
            <Moment format="D MMM YYYY" withTitle>
              {timestamp !== null
                ? new Date(timestamp.seconds * 1000).toLocaleDateString('en-US')
                : null}
            </Moment>
          </p>
        </div>
        <div className="post__body">
          <p>{text}</p>
          <img src={image} alt={displayName} />
        </div>
        <div className="post__footer">
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <ChatBubbleOutlineIcon onClick={handleOpen} fontSize="small" />
            <span
              style={{ marginLeft: '5px', fontSize: '16px', fontWeight: '600' }}
            >
              {totalComments?.length}
            </span>
          </div>
          <RepeatIcon fontSize="small" />
          {love ? (
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <FavoriteIcon
                onClick={outLove}
                style={{ color: 'red' }}
                fontSize="small"
              />

              <span
                style={{
                  marginLeft: '5px',
                  fontSize: '16px',
                  fontWeight: '600',
                }}
              >
                {loves?.length}
              </span>
            </div>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <FavoriteBorderIcon
                onClick={inLove}
                style={{ color: 'red' }}
                fontSize="small"
              />
              <span
                style={{
                  marginLeft: '5px',
                  fontSize: '16px',
                  fontWeight: '600',
                }}
              >
                {loves?.length}
              </span>
            </div>
          )}
          <PublishIcon fontSize="small" />
        </div>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
};

export default Post;
