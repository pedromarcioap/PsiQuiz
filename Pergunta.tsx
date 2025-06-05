import React, { useState } from 'react';

interface PerguntaProps {
  text: string;
  options: string[];
  answer: number;
  onAnswer: (answerIndex: number) => void;
  feedback: string;
  correctAnswer: number;
}

const Pergunta: React.FC<PerguntaProps> = ({ text, options, onAnswer, feedback, correctAnswer }) => {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);

  const handleAnswer = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
    setShowFeedback(true);
    onAnswer(answerIndex);
  };

  return (
    
      <p>{text}</p>
      <ul>
        {options.map((option, index) => (
          <li key={index}>
            <button onClick={() => handleAnswer(index)} disabled={showFeedback}>{option}</button>
          </li>
        ))}
      </ul>
      {showFeedback && (
        
          {selectedAnswer === correctAnswer ? (
            <p>Resposta Correta! {feedback}</p>
          ) : (
            <p>Resposta Incorreta! {feedback}</p>
          )}
        
      )}
    
  );
};

export default Pergunta;