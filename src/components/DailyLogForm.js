// src/components/DailyLogForm.js
import React, { useState } from 'react';
import { saveDailyLog } from '../api';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const DailyLogForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    userId : localStorage.getItem('userId'),
    date: '',
    moodRatings: '',
    anxietyLevels: '',
    sleepPatterns: '',
    physicalActivity: '',
    socialInteractions: '',
    stressLevels: '',
    symptomsOrDepressionOrAnxiety: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await saveDailyLog(formData);
        alert('Daily log saved!');
        navigate('/view-logs');
        console.log(response);
    } catch (error) {
      console.error(error);
      alert('Failed to save daily log.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Daily Log</h2>
      <input type="date" name="date" onChange={handleChange} required />
      <input type="number" name="moodRatings" placeholder="Mood (1-10)" onChange={handleChange} required />
      <input type="number" name="anxietyLevels" placeholder="Anxiety Levels (1-10)" onChange={handleChange} required />
      <input type="text" name="sleepPatterns" placeholder="Sleep Patterns" onChange={handleChange} required />
      <input type="text" name="physicalActivity" placeholder="Physical Activity" onChange={handleChange} required />
      <input type="text" name="socialInteractions" placeholder="Social Interactions" onChange={handleChange} required />
      <input type="number" name="stressLevels" placeholder="Stress Levels (1-10)" onChange={handleChange} required />
      <textarea name="symptomsOrDepressionOrAnxiety" placeholder="Symptoms" onChange={handleChange}></textarea>
      <button type="submit">Save Log</button>
    </form>
  );
};

export default DailyLogForm;
