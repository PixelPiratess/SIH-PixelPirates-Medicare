import React, { useState } from 'react';
import './DepressionTest.css';

const questions = [
  {
    id: 1,
    text: "Over the last 2 weeks, how often have you been bothered by feeling down, depressed, or hopeless?",
    options: [
      { value: 0, text: "Not at all" },
      { value: 4, text: "Several days" },
      { value: 8, text: "More than half the days" },
      { value: 12, text: "Nearly every day" }
    ]
  },
  {
    id: 2,
    text: "How often have you had little interest or pleasure in doing things you usually enjoy?",
    options: [
      { value: 0, text: "Not at all" },
      { value: 4, text: "Several days" },
      { value: 8, text: "More than half the days" },
      { value: 12, text: "Nearly every day" }
    ]
  },
  {
    id: 3,
    text: "How often have you had trouble falling asleep, staying asleep, or sleeping too much?",
    options: [
      { value: 0, text: "Not at all" },
      { value: 4, text: "Several days" },
      { value: 8, text: "More than half the days" },
      { value: 12, text: "Nearly every day" }
    ]
  },
  {
    id: 4,
    text: "How often have you felt tired or had little energy?",
    options: [
      { value: 0, text: "Not at all" },
      { value: 4, text: "Several days" },
      { value: 8, text: "More than half the days" },
      { value: 12, text: "Nearly every day" }
    ]
  },
  {
    id: 5,
    text: "How often have you had poor appetite or been overeating?",
    options: [
      { value: 0, text: "Not at all" },
      { value: 4, text: "Several days" },
      { value: 8, text: "More than half the days" },
      { value: 12, text: "Nearly every day" }
    ]
  },
  {
    id: 6,
    text: "How often have you felt bad about yourself or that you're a failure or have let yourself or your family down?",
    options: [
      { value: 0, text: "Not at all" },
      { value: 4, text: "Several days" },
      { value: 8, text: "More than half the days" },
      { value: 12, text: "Nearly every day" }
    ]
  },
  {
    id: 7,
    text: "How often have you had trouble concentrating on things, such as reading or watching TV?",
    options: [
      { value: 0, text: "Not at all" },
      { value: 4, text: "Several days" },
      { value: 8, text: "More than half the days" },
      { value: 12, text: "Nearly every day" }
    ]
  },
  {
    id: 8,
    text: "How often have you had thoughts that you would be better off dead or of hurting yourself in some way?",
    options: [
      { value: 0, text: "Not at all" },
      { value: 4, text: "Several days" },
      { value: 8, text: "More than half the days" },
      { value: 12, text: "Nearly every day" }
    ]
  },
  {
    id: 9,
    text: "How difficult have these problems made it for you to do your work, take care of things at home, or get along with other people?",
    options: [
      { value: 0, text: "Not difficult at all" },
      { value: 1, text: "Somewhat difficult" },
      { value: 2, text: "Very difficult" },
      { value: 4, text: "Extremely difficult" }
    ]
  }
];

const DepressionTest = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResult, setShowResult] = useState(false);

  const handleAnswer = (value) => {
    setAnswers({ ...answers, [currentQuestion]: value });
  };

  const handleNext = () => {
    if (answers[currentQuestion] !== undefined) {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        setShowResult(true);
      }
    } else {
      alert("Please select an answer before proceeding.");
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const calculateScore = () => {
    return Object.values(answers).reduce((sum, value) => sum + value, 0);
  };

  const interpretScore = (score) => {
    if (score >= 0 && score <= 20) return "Minimal depression";
    if (score >= 21 && score <= 40) return "Mild depression";
    if (score >= 41 && score <= 60) return "Moderate depression";
    if (score >= 61 && score <= 80) return "Moderately severe depression";
    return "Severe depression";
  };

  const getDetailedAnalysis = (interpretation) => {
    let analysis = "";
    switch (interpretation) {
      case "Minimal depression":
        analysis = "Your symptoms suggest minimal depression. Continue maintaining a healthy lifestyle with regular exercise, balanced diet, and good sleep habits. Stay connected with friends and family for emotional support.";
        break;
      case "Mild depression":
        analysis = "You're experiencing mild depression symptoms. Consider incorporating stress-reduction techniques like meditation or yoga into your routine. Engage in activities you enjoy and maintain a consistent sleep schedule. If symptoms persist, consult a mental health professional.";
        break;
      case "Moderate depression":
        analysis = "Your results indicate moderate depression. It's important to take proactive steps to address your mental health. Consider reaching out to a therapist or counselor for professional support. Establish a daily routine that includes physical activity and social interactions.";
        break;
      case "Moderately severe depression":
      case "Severe depression":
        analysis = "Your symptoms suggest significant depression. It's crucial to seek professional help as soon as possible. Contact a mental health professional or your healthcare provider to discuss treatment options. In the meantime, ensure you're in a safe environment and surrounded by supportive people. Avoid making major life decisions until you've received proper care.\n\n 24x7 Toll-Free Mental Health Rehabilitation Helpline Kiran (1800-599-0019) launched in 13 Languages";
        break;
      default:
        analysis = "Based on your responses, it's recommended to monitor your mood and mental well-being. If you have any concerns, consider discussing them with a healthcare provider or mental health professional.";
    }
    return analysis;
  };

  const renderQuestion = () => {
    const question = questions[currentQuestion];
    return (
      <div className="question-card">
        <div className="progress-bar">
          <div className="progress" style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}></div>
        </div>
        <p className="question-progress">Question {currentQuestion + 1} of {questions.length}</p>
        <h3 className="question-text">{question.text}</h3>
        <div className="answer-options">
          {question.options.map((option, index) => (
            <button
              key={index}
              className={`answer-button ${answers[currentQuestion] === option.value ? 'selected' : ''}`}
              onClick={() => handleAnswer(option.value)}
            >
              {option.text}
            </button>
          ))}
        </div>
      </div>
    );
  };

  const renderResult = () => {
    const score = calculateScore();
    const interpretation = interpretScore(score);
    const analysis = getDetailedAnalysis(interpretation);
    
    return (
      <div className="result-card">
        <h2>Your Depression Test Result</h2>
        <p className="result-score">Score: {score} / 100</p>
        <p className="result-interpretation">Interpretation: {interpretation}</p>
        <h3>Detailed Analysis:</h3>
        <p className="result-analysis">{analysis}</p>
        <p className="disclaimer">Remember, this test is for informational purposes only. If you're concerned about your mental health, consider reaching out to a mental health professional for personalized advice and support.</p>
        <button className="nav-button" onClick={() => window.location.reload()}>Take the test again</button>
      </div>
    );
  };

  return (
    <div className="depression-test-container">
      <h1>Depression Screening Test</h1>
      <p className="test-description">This confidential screening will help evaluate your mood. Please answer each question honestly.</p>
      {!showResult ? (
        <>
          {renderQuestion()}
          <div className="navigation-buttons">
            <button className="nav-button" onClick={handlePrevious} disabled={currentQuestion === 0}>Previous</button>
            <button className="nav-button" onClick={handleNext}>
              {currentQuestion === questions.length - 1 ? 'Submit' : 'Next'}
            </button>
          </div>
        </>
      ) : (
        renderResult()
      )}
    </div>
  );
};

export default DepressionTest;