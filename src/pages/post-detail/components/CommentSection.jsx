import React, { useState } from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const CommentSection = ({ comments, onAddComment, onDeleteComment, currentUserId }) => {
  const [newComment, setNewComment] = useState('');
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyText, setReplyText] = useState('');

  const handleSubmitComment = () => {
    if (newComment?.trim()) {
      onAddComment(newComment);
      setNewComment('');
    }
  };

  const handleSubmitReply = (commentId) => {
    if (replyText?.trim()) {
      onAddComment(replyText, commentId);
      setReplyText('');
      setReplyingTo(null);
    }
  };

  const formatTimeAgo = (date) => {
    const now = new Date();
    const commentDate = new Date(date);
    const diffInMinutes = Math.floor((now - commentDate) / (1000 * 60));

    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  const renderComment = (comment, isReply = false) =>
  <div key={comment?.id} className={`${isReply ? 'ml-8 md:ml-12' : ''}`}>
      <div className="flex space-x-3 md:space-x-4">
        <Image
        src={comment?.author?.avatar}
        alt={comment?.author?.avatarAlt}
        className="w-8 h-8 md:w-10 md:h-10 rounded-full object-cover flex-shrink-0" />

        <div className="flex-1 min-w-0">
          <div className="bg-muted rounded-lg p-3 md:p-4">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-caption font-semibold text-foreground text-sm md:text-base">
                {comment?.author?.name}
              </h4>
              <span className="text-xs font-caption text-muted-foreground data-text">
                {formatTimeAgo(comment?.createdAt)}
              </span>
            </div>
            <p className="text-sm md:text-base text-foreground leading-relaxed">
              {comment?.content}
            </p>
          </div>

          <div className="flex items-center space-x-4 mt-2 ml-2">
            <button className="flex items-center space-x-1 text-muted-foreground hover:text-foreground transition-editorial">
              <Icon name="ThumbsUp" size={16} />
              <span className="text-xs font-caption data-text">{comment?.likes}</span>
            </button>

            {!isReply &&
          <button
            onClick={() => setReplyingTo(comment?.id)}
            className="text-xs font-caption text-muted-foreground hover:text-foreground transition-editorial">

                Reply
              </button>
          }

            {comment?.author?.id === currentUserId &&
          <button
            onClick={() => onDeleteComment(comment?.id)}
            className="text-xs font-caption text-error hover:text-error/80 transition-editorial">

                Delete
              </button>
          }
          </div>

          {replyingTo === comment?.id &&
        <div className="mt-3 flex space-x-2">
              <Input
            type="text"
            placeholder="Write a reply..."
            value={replyText}
            onChange={(e) => setReplyText(e?.target?.value)}
            className="flex-1" />

              <Button
            variant="default"
            size="sm"
            onClick={() => handleSubmitReply(comment?.id)}
            disabled={!replyText?.trim()}>

                Reply
              </Button>
              <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setReplyingTo(null);
              setReplyText('');
            }}>

                Cancel
              </Button>
            </div>
        }

          {comment?.replies && comment?.replies?.length > 0 &&
        <div className="mt-4 space-y-4">
              {comment?.replies?.map((reply) => renderComment(reply, true))}
            </div>
        }
        </div>
      </div>
    </div>;


  return (
    <div className="space-y-6 md:space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl md:text-3xl font-heading font-semibold text-foreground">
          Comments ({comments?.length})
        </h2>
      </div>
      <div className="space-y-4">
        <div className="flex space-x-3 md:space-x-4">
          <Image
            src="https://img.rocket.new/generatedImages/rocket_gen_img_15a0ea664-1763296536479.png"
            alt="Current user profile photo showing professional headshot with neutral background"
            className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover flex-shrink-0" />

          <div className="flex-1">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e?.target?.value)}
              placeholder="Share your thoughts..."
              className="w-full min-h-[100px] md:min-h-[120px] p-3 md:p-4 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none" />

            <div className="flex justify-end mt-2">
              <Button
                variant="default"
                onClick={handleSubmitComment}
                disabled={!newComment?.trim()}
                iconName="Send"
                iconPosition="left">

                Post Comment
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="space-y-6">
        {comments?.map((comment) => renderComment(comment))}
      </div>
    </div>);

};

export default CommentSection;