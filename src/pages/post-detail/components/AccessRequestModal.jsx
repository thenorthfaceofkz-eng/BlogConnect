import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const AccessRequestModal = ({ isOpen, onClose, onSubmit, authorName }) => {
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    await onSubmit(message);
    setIsSubmitting(false);
    setMessage('');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-background/80 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-card border border-border rounded-lg shadow-warm-xl max-w-md w-full p-6 md:p-8">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-md hover:bg-muted transition-editorial"
          aria-label="Close modal"
        >
          <Icon name="X" size={20} />
        </button>

        <div className="mb-6">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
            <Icon name="Lock" size={24} color="var(--color-primary)" />
          </div>
          <h2 className="text-2xl font-heading font-semibold text-foreground mb-2">
            Request Access
          </h2>
          <p className="text-muted-foreground font-caption">
            This is a private post. Send a request to {authorName} to gain access to this content.
          </p>
        </div>

        <div className="space-y-4">
          <Input
            label="Message (Optional)"
            type="text"
            placeholder="Tell the author why you'd like access..."
            value={message}
            onChange={(e) => setMessage(e?.target?.value)}
            description="A brief message can help the author understand your interest"
          />

          <div className="flex space-x-3">
            <Button
              variant="outline"
              fullWidth
              onClick={onClose}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              variant="default"
              fullWidth
              onClick={handleSubmit}
              loading={isSubmitting}
              iconName="Send"
              iconPosition="left"
            >
              Send Request
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccessRequestModal;