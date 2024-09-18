// src/components/DailyLogView.js
import React, { useEffect, useState } from 'react';
import { getDailyLogs } from '../api';

const DailyLogView = () => {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const response = await getDailyLogs();
        setLogs(response.data);
      } catch (error) {
        console.error(error);
        alert('Failed to fetch daily logs.');
      }
    };

    fetchLogs();
  }, []);

  return (
    <div>
      <h2>Daily Logs</h2>
      <ul>
        {logs.map(log => (
          <li key={log.id}>
            <strong>Date:</strong> {log.date} | <strong>Mood:</strong> {log.moodRatings} | <strong>Anxiety:</strong> {log.anxietyLevels}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DailyLogView;
