import React, { useState } from 'react';
import { X, CheckCircle } from 'lucide-react';
import './Education.css';

export const QuizModal = ({ courseId, quiz, answers, score, onAnswer, onSubmit, onClose }) => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    onSubmit(courseId);
    setSubmitted(true);
    setTimeout(() => {
      onClose();
    }, 3000);
  };

  if (!quiz) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h3>Course Quiz</h3>
          <button onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="modal-body">
          {submitted ? (
            <div className="quiz-result">
              <CheckCircle size={48} />
              <h4>Quiz Completed!</h4>
              <p className="score">Your Score: {score}%</p>
              {score >= 70 ? (
                <p className="success">Congratulations! You passed the quiz.</p>
              ) : (
                <p className="fail">You need 70% to pass. Try again!</p>
              )}
            </div>
          ) : (
            <>
              {quiz.map((q, index) => (
                <div key={index} className="quiz-question">
                  <h4>Question {index + 1}</h4>
                  <p>{q.question}</p>
                  <div className="quiz-options">
                    {q.options.map((option, optIndex) => (
                      <label key={optIndex} className="quiz-option">
                        <input
                          type="radio"
                          name={`q${index}`}
                          value={optIndex}
                          checked={answers[index] === optIndex}
                          onChange={() => onAnswer(index, optIndex)}
                        />
                        <span>{option}</span>
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </>
          )}
        </div>

        {!submitted && (
          <div className="modal-footer">
            <button className="cancel-btn" onClick={onClose}>
              Cancel
            </button>
            <button
              className="submit-btn"
              onClick={handleSubmit}
              disabled={Object.keys(answers).length !== quiz.length}
            >
              Submit Quiz
            </button>
          </div>
        )}
      </div>
    </div>
  );
};