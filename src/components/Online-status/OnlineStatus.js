import { Alert } from 'antd';
import React, { useEffect, useState } from 'react';

export default function OnlineStatus() {
  const [online, setOnline] = useState(true);
  useEffect(() => {
    function onlineHandler() {
      setOnline(true);
    }
    function offilineHandler() {
      setOnline(false);
    }
    window.addEventListener('online', onlineHandler);
    window.addEventListener('offline', offilineHandler);
  }, []);
  if (!online) {
    return (
      <Alert
        type="error"
        message="NO internet connection"
        style={{
          fontSize: 20,
          display: 'inline-block',
        }}
        showIcon
      >
        No available movies
      </Alert>
    );
  }
}
