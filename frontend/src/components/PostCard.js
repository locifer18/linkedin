import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment'; // For easy date formatting

const PostCard = ({ post }) => {
  const authorName = post.user ? post.user.name : 'Unknown User';
  const authorId = post.user ? post.user._id : '#';

  return (
    <div className="card mb-3 border-0 shadow-sm">
      <div className="card-body p-3">
        <div className="d-flex align-items-start mb-3">
          <div className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center me-3" style={{ width: '48px', height: '48px', fontSize: '1.2rem', fontWeight: 'bold' }}>
            {authorName.charAt(0).toUpperCase()}
          </div>
          <div className="flex-grow-1">
            <div className="d-flex align-items-center">
              <Link to={`/profile/${authorId}`} className="text-dark text-decoration-none fw-semibold me-2" style={{fontSize: '15px'}}>
                {authorName}
              </Link>
              <span className="text-muted" style={{ fontSize: '13px' }}>
                • {moment(post.createdAt).fromNow()}
              </span>
            </div>
            <p className="text-muted mb-0" style={{ fontSize: '13px' }}>
              {post.user?.bio || 'Professional'}
            </p>
          </div>
        </div>
        <p className="mb-3" style={{ whiteSpace: 'pre-wrap', fontSize: '15px', lineHeight: '1.4' }}>
          {post.content}
        </p>
        <hr className="my-2" style={{opacity: '0.3'}} />
        <div className="d-flex justify-content-around">
          <button className="btn text-muted p-2 border-0" style={{fontSize: '14px'}}>
            👍 Like
          </button>
          <button className="btn text-muted p-2 border-0" style={{fontSize: '14px'}}>
            💬 Comment
          </button>
          <button className="btn text-muted p-2 border-0" style={{fontSize: '14px'}}>
            🔄 Share
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostCard;