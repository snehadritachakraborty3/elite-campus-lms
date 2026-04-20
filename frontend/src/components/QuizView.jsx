import React, { useState } from 'react';
import { HelpCircle, CheckCircle2, XCircle, ChevronRight, Trophy } from 'lucide-react';

const QuizView = ({ quiz, onComplete }) => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [showResults, setShowResults] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);
    const [isAnswered, setIsAnswered] = useState(false);

    // Mock questions for the demo
    const questions = [
        {
            text: "What is the primary principle behind " + quiz.title + "?",
            options: ["Thermodynamic Equilibrium", "Structural Integrity", "Algorithmic Efficiency", "Signal Modulation"],
            correct: 0
        },
        {
            text: "Which of the following is most critical for engineering success in this field?",
            options: ["Iterative Testing", "Cost Minimization", "Safety Compliance", "All of the above"],
            correct: 3
        },
        {
            text: "In the context of technical implementation, what does 'Scale' refer to?",
            options: ["Hardware size", "System load capacity", "Database weight", "User count"],
            correct: 1
        }
    ];

    const handleOptionSelect = (idx) => {
        if (isAnswered) return;
        setSelectedOption(idx);
        setIsAnswered(true);
        if (idx === questions[currentQuestion].correct) {
            setScore(score + 1);
        }
    };

    const nextQuestion = () => {
        if (currentQuestion + 1 < questions.length) {
            setCurrentQuestion(currentQuestion + 1);
            setSelectedOption(null);
            setIsAnswered(false);
        } else {
            setShowResults(true);
        }
    };

    if (showResults) {
        return (
            <div className="quiz-results animate-fade">
                <Trophy size={64} className="trophy-icon" />
                <h1>Quiz Completed!</h1>
                <p>Your performance in {quiz.title}:</p>
                <div className="score-display">
                    <span className="score-num">{score}</span>
                    <span className="score-total">/ {questions.length}</span>
                </div>
                <div className="score-percent">
                    {Math.round((score / questions.length) * 100)}% Accurate
                </div>
                <button className="btn btn-primary" onClick={onComplete}>Return to Lessons</button>
            </div>
        );
    }

    return (
        <div className="quiz-container animate-fade">
            <div className="quiz-header">
                <HelpCircle size={24} />
                <div className="quiz-info">
                    <h3>{quiz.title}</h3>
                    <span>Question {currentQuestion + 1} of {questions.length}</span>
                </div>
            </div>

            <div className="progress-bar-bg" style={{ height: '4px', marginBottom: '2rem' }}>
                <div className="progress-bar-fill" style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}></div>
            </div>

            <h2 className="question-text">{questions[currentQuestion].text}</h2>

            <div className="options-list">
                {questions[currentQuestion].options.map((option, idx) => {
                    let stateClass = '';
                    if (isAnswered) {
                        if (idx === questions[currentQuestion].correct) stateClass = 'correct';
                        else if (idx === selectedOption) stateClass = 'incorrect';
                    } else if (idx === selectedOption) {
                        stateClass = 'selected';
                    }

                    return (
                        <div 
                            key={idx} 
                            className={`option-card ${stateClass}`}
                            onClick={() => handleOptionSelect(idx)}
                        >
                            <span className="option-letter">{String.fromCharCode(65 + idx)}</span>
                            <span className="option-body">{option}</span>
                            {isAnswered && idx === questions[currentQuestion].correct && <CheckCircle2 size={20} className="status-icon" />}
                            {isAnswered && idx === selectedOption && idx !== questions[currentQuestion].correct && <XCircle size={20} className="status-icon" />}
                        </div>
                    );
                })}
            </div>

            <div className="quiz-footer">
                <button className="btn btn-primary" disabled={!isAnswered} onClick={nextQuestion}>
                    {currentQuestion + 1 === questions.length ? 'Show Results' : 'Next Question'} <ChevronRight size={20} />
                </button>
            </div>
        </div>
    );
};

export default QuizView;
