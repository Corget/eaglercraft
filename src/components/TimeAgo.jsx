
import React, { useState, useEffect } from 'react';

const TimeAgo = ({ date }) => {
  const [timeAgo, setTimeAgo] = useState('');

  useEffect(() => {
    const calculateTimeAgo = () => {
      const now = new Date("2025-05-16T00:00:00Z"); 
      const pastDate = new Date(date);
      const seconds = Math.floor((now - pastDate) / 1000);

      if (seconds < 0) {
        setTimeAgo("(in the future)");
        return;
      }
      if (seconds < 60) {
        setTimeAgo(`(released just now)`);
        return;
      }
      
      let interval = Math.floor(seconds / 31536000);
      if (interval >= 1) {
        setTimeAgo(`(released ${interval} year${interval === 1 ? '' : 's'} ago)`);
        return;
      }
      interval = Math.floor(seconds / 2592000);
      if (interval >= 1) {
        setTimeAgo(`(released ${interval} month${interval === 1 ? '' : 's'} ago)`);
        return;
      }
      interval = Math.floor(seconds / 86400);
      if (interval >= 1) {
        setTimeAgo(`(released ${interval} day${interval === 1 ? '' : 's'} ago)`);
        return;
      }
      interval = Math.floor(seconds / 3600);
      if (interval >= 1) {
        setTimeAgo(`(released ${interval} hour${interval === 1 ? '' : 's'} ago)`);
        return;
      }
      interval = Math.floor(seconds / 60);
      if (interval >= 1) {
        setTimeAgo(`(released ${interval} minute${interval === 1 ? '' : 's'} ago)`);
        return;
      }
      setTimeAgo(`(released just now)`);
    };

    calculateTimeAgo();
    const timer = setInterval(calculateTimeAgo, 60000); 

    return () => clearInterval(timer);
  }, [date]);

  return <span className="text-xs text-muted-foreground ml-1">{timeAgo}</span>;
};

export default TimeAgo;
