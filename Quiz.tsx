import React, { useState, useEffect } from 'react';
import quizData from './quizData.json';
import Pergunta from './Pergunta';
import IAConfig from './IAConfig';
import { generateQuestionOpenRouter, generateQuestionGoogleAI } from './ia-utils';
import JsonEditor from './JsonEditor';

interface Question {
  text: string;
  options: string[];
  answer: number;
  category: string;
  feedback: string;
}

interface QuizData {
  systemPrompt: string;
  agentPrompt: string;
  content: string;
  quizTitle: string;
  questions: Question[];
}

const Quiz: React.FC = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [selectedApi, setSelectedApi] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [openRouterModel, setOpenRouterModel] = useState('mistralai/Mistral-7B-Instruct-v0.2');
  const [newQuestion, setNewQuestion] = useState<Question | null>(null);
  const [systemPrompt, setSystemPrompt] = useState(quizData.systemPrompt);
  const [agentPrompt, setAgentPrompt] = useState(quizData.agentPrompt);
  const [content, setContent] = useState(quizData.content);
  const [quizDataState, setQuizDataState] = useState<QuizData>(() => {
    const storedQuizData = localStorage.getItem('quizData');
    if (storedQuizData) {
      return JSON.parse(storedQuizData);
    }
    return quizData;
  });
  const [showJsonEditor, setShowJsonEditor] = useState(false);
  const [fileContent, setFileContent] = useState('');
  const [questionFormat, setQuestionFormat] = useState('Objetiva');
  const [questionDifficulty, setQuestionDifficulty] = useState('Média');
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState('');

  useEffect(() => {
    setSystemPrompt(quizDataState.systemPrompt);
    setAgentPrompt(quizDataState.agentPrompt);
    setContent(quizDataState.content);
  }, [quizDataState]);

  useEffect(() => {
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

  const handleOpenRouterModelChange = (model: string) => {
    setOpenRouterModel(model);
  };

  const handleSystemPromptChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setSystemPrompt(event.target.value);
  };

  const handleAgentPromptChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setAgentPrompt(event.target.value);
  };

  const handleContentChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(event.target.value);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setFileContent(e.target?.result as string);
        setContent(e.target?.result as string);
      };
      reader.readAsText(file);
    }
  };

  const handleQuestionFormatChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setQuestionFormat(event.target.value);
  };

  const handleQuestionDifficultyChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setQuestionDifficulty(event.target.value);
  };

  const handleSearchTermChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = async () => {
    const results = `Resultados da busca por "${searchTerm}": ... (Simulação de resultados) ...`;
    setSearchResults(results);
    setContent(prevContent => prevContent + '\n' + results);
  };

  const generateNewQuestion = async () => {
    let parsedQuestion = null;

    // Combine prompts and content for a more comprehensive input
    const combinedPrompt = `${agentPrompt}\n${systemPrompt}\nConteúdo:\n${content}\nFormato: ${questionFormat}\nDificuldade: ${questionDifficulty}`;

    if (selectedApi === 'openrouter') {
      parsedQuestion = await generateQuestionOpenRouter(apiKey, combinedPrompt, openRouterModel);
    } else if (selectedApi === 'googleai') {
      parsedQuestion = await generateQuestionGoogleAI(apiKey, combinedPrompt);
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
      setNewQuestion(null);
    }
  };

  const handleJsonSave = (json: string) => {
    try {
      const parsedJson = JSON.parse(json);
      setQuizDataState(parsedJson);
      setShowJsonEditor(false);
    } catch (error) {
      alert('JSON inválido!');
    }
  };

  return (
    
      <h2>{quizDataState.quizTitle}</h2>
      <IAConfig
        onApiChange={handleApiChange}
        onApiKeyChange={handleApiKeyChange}
        onOpenRouterModelChange={handleOpenRouterModelChange}
      />
      
        Prompt do Agente:
        <textarea value={agentPrompt} onChange={handleAgentPromptChange} />
      
      
        Prompt do Sistema:
        <textarea value={systemPrompt} onChange={handleSystemPromptChange} />
      
      
        Conteúdo:
        <textarea value={content} onChange={handleContentChange} />
      
      
        Upload de Conteúdo:
        <input type="file" accept=".txt, .md" onChange={handleFileUpload} />
      
      
        Formato da Pergunta:
        <select value={questionFormat} onChange={handleQuestionFormatChange}>
          <option value="Objetiva">Objetiva</option>
          <option value="Dissertativa">Dissertativa</option>
        </select>
      
      
        Dificuldade da Pergunta:
        <select value={questionDifficulty} onChange={handleQuestionDifficultyChange}>
          <option value="Fácil">Fácil</option>
          <option value="Média">Média</option>
          <option value="Difícil">Difícil</option>
        </select>
      
      
        Termo de Busca:
        <textarea value={searchTerm} onChange={handleSearchTermChange} />
        <button onClick={handleSearch}>Pesquisar</button>
      
      
        Resultados da Busca:
        <textarea value={searchResults} readOnly />
      
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