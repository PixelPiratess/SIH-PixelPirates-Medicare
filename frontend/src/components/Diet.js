import React, { useState } from 'react';
import { User, Calendar, Weight, Ruler, Target, Utensils, Activity } from 'lucide-react';
import './Diet.css';

const Diet = () => {
  const [userInfo, setUserInfo] = useState({
    name: '',
    age: '',
    weight: '',
    height: '',
    goal: 'lose weight'
  });

  const [showPlan, setShowPlan] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowPlan(true);
  };

  const getMealPlan = (goal) => {
    switch (goal) {
      case 'lose weight':
        return [
          { meal: 'Breakfast', food: 'Egg white omelet with spinach and whole grain toast' },
          { meal: 'Snack', food: 'Greek yogurt with berries' },
          { meal: 'Lunch', food: 'Grilled chicken salad with mixed vegetables and light dressing' },
          { meal: 'Snack', food: 'Carrot sticks with hummus' },
          { meal: 'Dinner', food: 'Baked salmon with quinoa and steamed broccoli' }
        ];
      case 'gain weight':
        return [
          { meal: 'Breakfast', food: 'Whole eggs omelet with cheese, avocado, and whole grain toast' },
          { meal: 'Snack', food: 'Protein shake with banana and peanut butter' },
          { meal: 'Lunch', food: 'Grilled chicken breast with brown rice and mixed vegetables' },
          { meal: 'Snack', food: 'Trail mix with nuts and dried fruits' },
          { meal: 'Dinner', food: 'Lean beef steak with sweet potato and asparagus' }
        ];
      case 'maintain weight':
        return [
          { meal: 'Breakfast', food: 'Oatmeal with fruits and nuts' },
          { meal: 'Snack', food: 'Apple slices with almond butter' },
          { meal: 'Lunch', food: 'Turkey sandwich on whole grain bread with side salad' },
          { meal: 'Snack', food: 'Greek yogurt with honey' },
          { meal: 'Dinner', food: 'Grilled fish with quinoa and roasted vegetables' }
        ];
      default:
        return [];
    }
  };

  const getExercisePlan = (goal) => {
    switch (goal) {
      case 'lose weight':
        return [
          { day: 'Monday', exercise: '45 minutes cardio (running or cycling), 15 minutes HIIT' },
          { day: 'Tuesday', exercise: '30 minutes strength training, 30 minutes yoga' },
          { day: 'Wednesday', exercise: '45 minutes swimming or water aerobics' },
          { day: 'Thursday', exercise: '40 minutes cardio, 20 minutes core exercises' },
          { day: 'Friday', exercise: '30 minutes strength training, 30 minutes brisk walking' },
          { day: 'Saturday', exercise: '60 minutes hiking or cycling' },
          { day: 'Sunday', exercise: 'Rest day or light stretching' }
        ];
      case 'gain weight':
        return [
          { day: 'Monday', exercise: '45 minutes heavy weight training (focus on legs and back)' },
          { day: 'Tuesday', exercise: '30 minutes light cardio, 30 minutes core exercises' },
          { day: 'Wednesday', exercise: '45 minutes heavy weight training (focus on chest and arms)' },
          { day: 'Thursday', exercise: 'Rest day' },
          { day: 'Friday', exercise: '45 minutes heavy weight training (full body workout)' },
          { day: 'Saturday', exercise: '30 minutes HIIT, 30 minutes flexibility training' },
          { day: 'Sunday', exercise: 'Active recovery (light walking or swimming)' }
        ];
      case 'maintain weight':
        return [
          { day: 'Monday', exercise: '30 minutes cardio, 30 minutes strength training' },
          { day: 'Tuesday', exercise: '45 minutes yoga or Pilates' },
          { day: 'Wednesday', exercise: '45 minutes mixed cardio (running, cycling, or swimming)' },
          { day: 'Thursday', exercise: '30 minutes strength training, 30 minutes flexibility exercises' },
          { day: 'Friday', exercise: '45 minutes cardio of choice' },
          { day: 'Saturday', exercise: '60 minutes outdoor activity (hiking, cycling, or team sports)' },
          { day: 'Sunday', exercise: 'Rest day or light stretching' }
        ];
      default:
        return [];
    }
  };

  return (
    <div className="diet-container">
      <div className="diet-content-wrapper">
        <h1 className="diet-title">Personalized Health & Diet Plan</h1>
        <div className="diet-hero">
          <div className="diet-hero-content">
            <p>Empower your well-being with a personalized health solution tailored just for you. Start your journey to a healthier, happier life today!</p>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="diet-form">
          <div className="diet-form-group">
            <User size={20} />
            <input
              type="text"
              name="name"
              value={userInfo.name}
              onChange={handleChange}
              placeholder="Your Name"
              required
            />
          </div>
          <div className="diet-form-group">
            <Calendar size={20} />
            <input
              type="number"
              name="age"
              value={userInfo.age}
              onChange={handleChange}
              placeholder="Age"
              required
            />
          </div>
          <div className="diet-form-group">
            <Weight size={20} />
            <input
              type="number"
              name="weight"
              value={userInfo.weight}
              onChange={handleChange}
              placeholder="Weight (kg)"
              required
            />
          </div>
          <div className="diet-form-group">
            <Ruler size={20} />
            <input
              type="number"
              name="height"
              value={userInfo.height}
              onChange={handleChange}
              placeholder="Height (cm)"
              required
            />
          </div>
          <div className="diet-form-group">
            <Target size={20} />
            <select name="goal" value={userInfo.goal} onChange={handleChange}>
              <option value="lose weight">Lose Weight</option>
              <option value="gain weight">Gain Weight</option>
              <option value="maintain weight">Maintain Weight</option>
            </select>
          </div>
          <button type="submit" className="diet-cta-button">Generate Plan</button>
        </form>

        {showPlan && (
          <div className="diet-plan">
            <h2>Your Personalized Diet Plan</h2>
            <p>Hello {userInfo.name}, here's your customized plan to {userInfo.goal}:</p>
            <div className="diet-plan-content">
              <div className="diet-meal-plan">
                <h3><Utensils size={20} /> Daily Meal Plan</h3>
                <ul>
                  {getMealPlan(userInfo.goal).map((meal, index) => (
                    <li key={index}><strong>{meal.meal}:</strong> {meal.food}</li>
                  ))}
                </ul>
              </div>
              <div className="diet-exercise-plan">
                <h3><Activity size={20} /> Weekly Exercise Plan</h3>
                <ul>
                  {getExercisePlan(userInfo.goal).map((exercise, index) => (
                    <li key={index}><strong>{exercise.day}:</strong> {exercise.exercise}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Diet;