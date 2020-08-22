import React, { useState, useEffect } from 'react';
import './Feed.css';
import TweetBox from './TweetBox';
import Post from './Post';
import {db} from './firebase';


const Feed = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    db.collection('posts').orderBy('timestamp', 'desc').onSnapshot((snapshot) => {
      setPosts(snapshot.docs.map((doc) => ({ id: doc.id, post: doc.data() })));
    });
  }, []);
  return (
    <div className="feed">
      <div className="feed__header">
        <h1>Home</h1>
      </div>
      <TweetBox />
      {posts.map(({id, post}) => (
        <Post
          key={id}
          postId={id}
          displayName={post.displayName}
          username={post.username}
          verified={post.verified}
          text={post.text}
          image={post.image}
          timestamp={post.timestamp}
          avatar={post.avatar}
        />
      ))}
    </div>
  );
};

export default Feed;
