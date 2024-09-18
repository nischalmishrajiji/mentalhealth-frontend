// src/components/DailyLogForm.js
import React, { useState } from 'react';
import { saveDailyLog } from '../api';
import { useNavigate } from 'react-router-dom';
import guestRedirect from '../middleware/guestRedirect';

const DailyLogForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    userId: localStorage.getItem('userId'),
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
    <div className="container mt-5">
      <form  onSubmit={handleSubmit} className="needs-validation row" noValidate>
        <div className="col-md-3 mb-3">
          <label htmlFor="date" className="form-label">Date</label>
          <input 
            type="date" 
            className="form-control" 
            name="date" 
            onChange={handleChange} 
            required 
          />
        </div>
        <div className="col-md-3 mb-3">
          <label htmlFor="moodRatings" className="form-label">Mood (1-10)</label>
          <input 
            type="number" 
            className="form-control" 
            name="moodRatings" 
            placeholder="Mood (1-10)" 
            onChange={handleChange} 
            required 
          />
        </div>
        <div className="col-md-3 mb-3">
          <label htmlFor="anxietyLevels" className="form-label">Anxiety Levels (1-10)</label>
          <input 
            type="number" 
            className="form-control" 
            name="anxietyLevels" 
            placeholder="Anxiety Levels (1-10)" 
            onChange={handleChange} 
            required 
          />
        </div>
        <div className="col-md-3 mb-3">
          <label htmlFor="stressLevels" className="form-label">Stress Levels (1-10)</label>
          <input 
            type="number" 
            className="form-control" 
            name="stressLevels" 
            placeholder="Stress Levels (1-10)" 
            onChange={handleChange} 
            required 
          />
        </div>
        <div className="  mb-3">
          <label htmlFor="sleepPatterns" className="form-label">Sleep Patterns</label>
          <input 
            type="text" 
            className="form-control" 
            name="sleepPatterns" 
            placeholder="Sleep Patterns" 
            onChange={handleChange} 
            required 
          />
        </div>
        <div className="mb-3">
          <label htmlFor="physicalActivity" className="form-label">Physical Activity</label>
          <input 
            type="text" 
            className="form-control" 
            name="physicalActivity" 
            placeholder="Physical Activity" 
            onChange={handleChange} 
            required 
          />
        </div>
        <div className="mb-3">
          <label htmlFor="socialInteractions" className="form-label">Social Interactions</label>
          <input 
            type="text" 
            className="form-control" 
            name="socialInteractions" 
            placeholder="Social Interactions" 
            onChange={handleChange} 
            required 
          />
        </div>
        
        <div className="mb-3">
          <label htmlFor="symptomsOrDepressionOrAnxiety" className="form-label">Symptoms</label>
          <textarea 
            className="form-control" 
            name="symptomsOrDepressionOrAnxiety" 
            placeholder="Symptoms" 
            onChange={handleChange}
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary col-md-2 p-2 m-auto">Save</button>
      </form>
    </div>
  );
};

export default guestRedirect(DailyLogForm);
