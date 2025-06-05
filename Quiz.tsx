import React, { useState, useEffect } from 'react';
import quizData from './quizData.json';
import Pergunta from './Pergunta';
import IAConfig from './IAConfig';
import { generateQuestionOpenRouter, generateQuestionGoogleAI } from './ia-utils';
import JsonEditor from './JsonEditor'; // Importe o JsonEditor

interface Question {
  text: string;
  options: string[];
  answer: number;
  category: string;
  feedback: string;
}

interface QuizData {
  systemPrompt: string;
  quizTitle: string;
  questions: Question[];
}

const Quiz: React.FC = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [selectedApi, setSelectedApi] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [newQuestion, setNewQuestion] = useState<Question | null>(null);
  const [systemPrompt, setSystemPrompt] = useState(quizData.systemPrompt);
  const [quizDataState, setQuizDataState] = useState<QuizData>(() => {
    // Tenta obter os dados do localStorage
    const storedQuizData = localStorage.getItem('quizData');
    if (storedQuizData) {
      return JSON.parse(storedQuizData);
    }
    return quizData; // Se não houver dados no localStorage, usa os dados padrão
  });
  const [showJsonEditor, setShowJsonEditor] = useState(false);

  useEffect(() => {
    // Garante que o systemPrompt seja atualizado quando quizData for alterado
    setSystemPrompt(quizDataState.systemPrompt);
  }, [quizDataState]);

  useEffect(() => {
    // Salva os dados no localStorage sempre que quizDataState for alterado
    localStorage.setItem('quizData', JSON.stringify(quizDataState));
  }, [quizDataState]);

  const handleAnswer = (answerIndex: number) => {
    setAnswers([...answers, answerIndex]);
  };

  const nextQuestion = () => {
    setCurrentQuestion(currentQuestion + 1);
  };

  const calculateScore = () => {
    let score = 0;
    for (let i = 0; i < quizDataState.questions.length; i++) {
      if (answers[i] === quizDataState.questions[i].answer) {
        score++;
      }
    }
    return score;
  };

  const finishQuiz = () => {
    setShowResult(true);
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setShowResult(false);
  };

  const handleApiChange = (api: string) => {
    setSelectedApi(api);
  };

  const handleApiKeyChange = (key: string) => {
    setApiKey(key);
  };

  const handleSystemPromptChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setSystemPrompt(event.target.value);
  };

  const generateNewQuestion = async () => {
    let parsedQuestion = null;

    if (selectedApi === 'openrouter') {
      parsedQuestion = await generateQuestionOpenRouter(apiKey, systemPrompt);
    } else if (selectedApi === 'googleai') {
      parsedQuestion = await generateQuestionGoogleAI(apiKey, systemPrompt);
    }

    if (parsedQuestion) {
      setNewQuestion({
        text: parsedQuestion.text,
        options: parsedQuestion.options,
        answer: parsedQuestion.answer,
        category: 'IA',
        feedback: 'Feedback da IA',
      });
    } else {
      alert('Erro ao gerar pergunta. Verifique a API e o prompt.');
    }
  };

  const addGeneratedQuestion = () => {
    if (newQuestion) {
      const updatedQuizData = {
        ...quizDataState,
        questions: [...quizDataState.questions, newQuestion],
      };
      setQuizDataState(updatedQuizData);
      setNewQuestion(null); // Limpa a pergunta gerada
    }
  };

  const handleJsonSave = (json: string) => {
    try {
      const parsedJson = JSON.parse(json);
      setQuizDataState(parsedJson);
      setShowJsonEditor(false); // Fecha o editor
    } catch (error) {
      alert('JSON inválido!');
    }
  };

  return (
    
      <h2>{quizDataState.quizTitle}</h2>
      <IAConfig onApiChange={handleApiChange} onApiKeyChange={handleApiKeyChange} />
      
        Prompt do Sistema:
        <textarea value={systemPrompt} onChange={handleSystemPromptChange} />
      
      <button onClick={generateNewQuestion}>Gerar Nova Pergunta</button>
      {newQuestion && (
        
          <h3>Nova Pergunta Gerada pela IA:</h3>
          <Pergunta
            text={newQuestion.text}
            options={newQuestion.options}
            onAnswer={handleAnswer}
            feedback={newQuestion.feedback}
            correctAnswer={newQuestion.answer}
          />
          <button onClick={addGeneratedQuestion}>Adicionar Pergunta ao Quiz</button>
        
      )}
      <button onClick={() => setShowJsonEditor(true)}>Editar JSON</button>
      {showJsonEditor && (
        <JsonEditor initialJson={JSON.stringify(quizDataState, null, 2)} onSave={handleJsonSave} />
      )}
      {showResult ? (
        
          <h3>Resultado:</h3>
          <p>
            Você acertou {calculateScore()} de {quizDataState.questions.length} perguntas.
          </p>
          <button onClick={resetQuiz}>Refazer Quiz</button>
        
      ) : currentQuestion < quizDataState.questions.length ? (
        
          <Pergunta
            text={quizDataState.questions[currentQuestion].text}
            options={quizDataState.questions[currentQuestion].options}
            onAnswer={handleAnswer}
            feedback={quizDataState.questions[currentQuestion].feedback}
            correctAnswer={quizDataState.questions[currentQuestion].answer}
          />
          <button onClick={nextQuestion}>Próxima Pergunta</button>
        
      ) : (
        <button onClick={finishQuiz}>Finalizar Quiz</button>
      )}
    
  );
};

export default Quiz;