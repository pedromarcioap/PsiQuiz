import React, { useState, useEffect } from 'react';

// Dados do quiz, incluindo perguntas, opções e respostas corretas.
// As citações e referências textuais foram incorporadas diretamente nos enunciados das questões.
const quizData = [
  {
    discipline: "Teoria e Sistemas",
    questions: [
      {
        text: 'A Psicologia é um campo de conhecimento caracterizado por sua "multifacetada e multideterminada condição", abrigando diversas correntes de pensamento e formas de conceber seu objeto de estudo e campo de atuação. Essa descrição implica que:',
        options: [
          'A) A Psicologia possui um único objeto de estudo universalmente aceito por todas as escolas.',
          'B) A diversidade de pensamentos na Psicologia a torna uma disciplina sem coerência interna.',
          'C) É mais apropriado falar em "psicologias" e "objetos de estudos psicológicos" devido à sua amplitude.',
          'D) O campo psicológico é rigidamente dogmático, sem espaço para diferentes teorias.',
          'E) A Psicologia se restringe a métodos quantitativos, excluindo abordagens qualitativas.'
        ],
        correctAnswer: 'C'
      },
      {
        text: 'A história da Psicologia, desde suas raízes, está permeada por discussões filosóficas que antecedem sua formalização como ciência.... Um conceito filosófico marcante é o Dualismo Cartesiano, que ressoou nas práticas psicológicas e médicas.... Qual a principal característica desse dualismo?',
        options: [
          'A) A valorização da experiência única do sujeito como inseparável do ambiente.',
          'B) A busca por um método seguro para alcançar a verdade através da observação e experimentação.',
          'C) A concepção do corpo e da mente como inseparáveis e interdependentes, em uma perspectiva holística.',
          'D) A divisão fundamental entre a res cogitans (substância pensante, a mente/alma) e a res extensa (substância material, o corpo).',
          'E) A ênfase nos processos mentais como comportamento observável e mensurável.'
        ],
        correctAnswer: 'D'
      },
      {
        text: 'No campo psicológico, a organização se dá em diferentes matrizes de pensamento, sendo as principais as matrizes cientificistas e as matrizes românticas e pós-românticas.... As matrizes cientificistas, especificamente, adotam os modos das ciências naturais e buscam:',
        options: [
          'A) Compreender as formas expressivas e ampliar a capacidade de comunicação entre os homens.',
          'B) Centrar o objeto de estudo nos atos e vivências do sujeito, dotados de valor e significado.',
          'C) Identificar forças biológicas e ambientais que causam, produzem e controlam o comportamento, visando à sua reprodução.',
          'D) Enfatizar a subjetividade, a singularidade da experiência e a compreensão em oposição à explicação causal.',
          'E) Suspender os juízos prévios para apreender o fenômeno em sua pureza, sem a pretensão de uma teoria acabada.'
        ],
        correctAnswer: 'C'
      },
      {
        text: 'Em oposição às matrizes cientificistas, as matrizes românticas e pós-românticas se destacam no campo psicológico.... Qual das alternativas abaixo melhor descreve a abordagem dessas matrizes?',
        options: [
          'A) Adoção da abordagem nomotética, buscando leis gerais e universais para o comportamento.',
          'B) Primazia da quantificação e da mensuração de variáveis psíquicas.',
          'C) Ênfase em um objeto de estudo centrado nos atos e vivências do sujeito, dotados de valor e significado, opondo-se à primazia da quantificação.',
          'D) Imitação de modelos de práticas das ciências médicas, exatas e naturais para conceber o objeto de estudo.',
          'E) Visão do sujeito como um objeto de estudo que pode ser reproduzido e controlado.'
        ],
        correctAnswer: 'C'
      },
      {
        text: 'Um marco inaugural para a Psicologia como ciência independente foi a criação do laboratório de pesquisa científica em Psicofisiologia em Leipzig, Alemanha.... Este evento é amplamente associado a:',
        options: [
          'A) Sigmund Freud, pai da Psicanálise.',
          'B) B.F. Skinner, expoente do behaviorismo radical.',
          'C) William James, desenvolvedor do Funcionalismo.',
          'D) Wilhelm Wundt, considerado o "pai" da psicologia científica.',
          'E) John B. Watson, organizador do Behaviorismo.'
        ],
        correctAnswer: 'D'
      },
      {
        text: 'As primeiras abordagens ou escolas de pensamento psicológico surgiram principalmente nos Estados Unidos. Entre elas, o Estruturalismo, associado a Wundt e Titchener..., direcionou seus esforços para:',
        options: [
          'A) A função da consciência na adaptação do homem ao meio ambiente.',
          'B) A análise do comportamento observável e suas interações objetivas com o ambiente.',
          'C) A investigação dos aspectos estruturais da consciência, utilizando o introspeccionismo experimental.',
          'D) A superação da fragmentação dos processos humanos e o estudo da percepção.',
          'E) A aprendizagem por meio da formação de associações entre estímulos e respostas.'
        ],
        correctAnswer: 'C'
      },
      {
        text: 'O Funcionalismo, desenvolvido por William James, é considerado a primeira abordagem genuinamente americana e focou na função da consciência para a adaptação do homem ao meio.... Qual era o principal objetivo do Funcionalismo?',
        options: [
          'A) Descrever os elementos básicos constituintes da mente, como sensações e sentimentos.',
          'B) Mensurar o tempo de reação dos processos mentais.',
          'C) Compreender as relações entre estímulo e resposta no sistema nervoso.',
          'D) Entender como os processos mentais auxiliam o indivíduo a se adaptar ao ambiente.',
          'E) Investigar o inconsciente e seus mecanismos de defesa.'
        ],
        correctAnswer: 'D'
      },
      {
        text: 'O Associacionismo, com ideias que tiveram grande influência, é considerado um precursor do Behaviorismo científico.... O Behaviorismo, em oposição a concepções internalistas do fenômeno psíquico, tem como foco central a:',
        options: [
          'A) Análise do inconsciente e seus impactos na subjetividade.',
          'B) Investigação da experiência consciente imediata através da introspecção.',
          'C) Análise do comportamento e suas interações objetivas com o ambiente, buscando origens e consequências.',
          'D) Compreensão da subjetividade humana através de atos e vivências dotados de significado.',
          'E) Superação da fragmentação dos processos humanos pela análise fenomenológica.'
        ],
        correctAnswer: 'C'
      },
      {
        text: 'A multiplicidade teórica é inerente ao campo psicológico, mas é fundamental que os profissionais evitem o dogmatismo e o ecletismo indiscriminado.... O dogmatismo é caracterizado por:',
        options: [
          'A) A busca contínua pela elaboração de novos conhecimentos e a articulação entre teoria e prática.',
          'B) A adesão rígida e acrítica a uma única linha teórica, desconsiderando as contribuições de outras.',
          'C) A adoção indiscriminada de várias teorias que se contradizem sem uma base coerente.',
          'D) O estabelecimento de diálogos e o questionamento das indicações teóricas e metodológicas.',
          'E) Um olhar amplo para as epistemologias e teorias que sustentam cada perspectiva de prática.'
        ],
        correctAnswer: 'B'
      },
      {
        text: 'A Psicologia é um campo de conhecimento que, apesar de sua diversidade, tem como "matéria-prima" o ser humano em todas as suas expressões, visíveis (comportamento) e invisíveis (sentimentos), singulares e genéricas, que juntas sintetizam o termo subjetividade. Diante dessa complexidade, o texto argumenta que é mais razoável falar em:',
        options: [
          'A) Um objeto de estudo único e inquestionável que unifica todas as abordagens da Psicologia.',
          'B) A Psicologia como uma ciência puramente natural, focada apenas no comportamento observável.',
          'C) "Psicologias" e "objetos de estudos psicológicos", reconhecendo a pluralidade de enfoques.',
          'D) A necessidade de que todas as correntes psicológicas se fundam em uma única grande teoria.',
          'E) Uma disciplina que se desenvolveu isoladamente, sem intersecções com outros saberes.'
        ],
        correctAnswer: 'C'
      }
    ]
  },
  {
    discipline: "Ciência e Profissão",
    questions: [
      {
        text: 'A Psicologia como ciência e profissão resulta da compreensão histórica da necessidade de associar um corpo de conhecimento científico a um projeto de intervenção profissional. Nesse contexto, a Psicologia é classificada como uma ciência pura e aplicada, onde a teoria e a prática são indissociáveis. Isso significa que:',
        options: [
          'A) A teoria é secundária, e a prática profissional não precisa de fundamentação científica.',
          'B) O conhecimento científico é produzido independentemente da realidade prática e não o influencia.',
          'C) A pesquisa e os achados científicos são o alicerce para a atuação do psicólogo, e a prática gera novas demandas de pesquisa.',
          'D) A atuação profissional é baseada apenas no senso comum, sem a necessidade de conhecimento validado.',
          'E) A Psicologia se limita ao estudo teórico, sem aplicação em contextos sociais.'
        ],
        correctAnswer: 'C'
      },
      {
        text: 'A regulamentação da profissão do psicólogo no Brasil é um marco importante em sua constituição. A Lei que foi o marco legal para a regulamentação da profissão no país é a:',
        options: [
          'A) Lei nº 5.766/1971, que criou o Conselho Federal de Psicologia.',
          'B) Lei nº 4.119, de 27 de agosto de 1962, que regulamentou a profissão de psicólogo.',
          'C) Resolução CFP nº 010/2005, que instituiu o Código de Ética Profissional do Psicólogo.',
          'D) Resolução CNE/CES nº 5, de 15 de março de 2011, que estabelece as Diretrizes Curriculares Nacionais.',
          'E) Lei do Efeito, de Edward Thorndike, que influenciou o Behaviorismo.'
        ],
        correctAnswer: 'B'
      },
      {
        text: 'O Conselho Federal de Psicologia (CFP) e os Conselhos Regionais de Psicologia (CRPs) são órgãos essenciais para a profissão.... Entre as atribuições do CFP, destacam-se:',
        options: [
          'A) Emitir registros e carteiras profissionais, e julgar denúncias éticas em primeira instância em nível regional.',
          'B) Fiscalizar diretamente o exercício profissional em suas respectivas regiões.',
          'C) Orientar, disciplinar e fiscalizar o exercício da profissão em âmbito nacional, além de elaborar e aprovar o Código de Ética Profissional.',
          'D) Aplicar e orientar as normas do CFP em âmbito regional.',
          'E) Atuar em grau de recurso e casos relevantes de processos éticos em primeira instância.'
        ],
        correctAnswer: 'C'
      },
      {
        text: 'A Psicologia é uma área do conhecimento "altamente intersecional com outras áreas e saberes", com grande expertise de produzir conhecimentos e práticas profissionais conjuntamente.... Os textos apresentam diversas especialidades aprovadas pelo Conselho Federal de Psicologia (CFP).... Qual das opções a seguir apresenta uma especialidade da Psicologia que NÃO foi mencionada nos textos fornecidos?',
        options: [
          'A) Neuropsicologia.',
          'B) Psicologia Educacional.',
          'C) Psicologia Organizacional e do Trabalho.',
          'D) Psicologia de Trânsito.',
          'E) Astrologia Psicológica.'
        ],
        correctAnswer: 'E'
      },
      {
        text: 'A ética na Psicologia é um pilar fundamental, e o Código de Ética Profissional do Psicólogo (Resolução CFP nº 010/2005) é o instrumento que norteia a prática profissional.... Um dos seus princípios fundamentais estabelece que o psicólogo deve:',
        options: [
          'A) Priorizar o lucro e a rentabilidade em detrimento do bem-estar dos indivíduos.',
          'B) Agir de forma imparcial, desconsiderando qualquer valor ou princípio pessoal .',
          'C) Respeitar e promover a liberdade, dignidade, igualdade e integridade do ser humano, baseando sua atuação nos Direitos Humanos.',
          'D) Manter o sigilo profissional apenas quando for conveniente para o profissional.',
          'E) Restringir o acesso à informação sobre a Psicologia para evitar equívocos.'
        ],
        correctAnswer: 'C'
      },
      {
        text: 'As Diretrizes Curriculares Nacionais (DCNs) para a Psicologia, por meio da Resolução n. 5, buscam a padronização do currículo em um núcleo comum e a oferta de pelo menos duas ênfases curriculares para aprofundamento. O principal objetivo das DCNs é:',
        options: [
          'A) Reduzir a carga horária de estágios e disciplinas metodológicas.',
          'B) Garantir uma formação puramente teórica, desvinculada da prática.',
          'C) Promover uma formação generalista, crítica, reflexiva e ética, preparando o profissional para atuar em diferentes contextos.',
          'D) Enfatizar exclusivamente as áreas tradicionais, como a clínica, no currículo.',
          'E) Desestimular a articulação entre ensino, pesquisa e extensão na formação.'
        ],
        correctAnswer: 'C'
      },
      {
        text: 'A produção de conhecimento em Psicologia está diretamente relacionada às atividades de pesquisa.... Qual a importância dos achados das investigações científicas para a atuação profissional do psicólogo?',
        options: [
          'A) Os achados científicos servem apenas para alimentar a produção acadêmica, sem aplicação prática.',
          'B) Eles desestimulam o surgimento de novas demandas sociopolíticas a serem investigadas.',
          'C) Eles potencializam as intervenções profissionais, alimentando o desenvolvimento e a aplicação de princípios científicos em diferentes contextos.',
          'D) Eles são irrelevantes para a atuação do psicólogo, que se baseia apenas na experiência empírica.',
          'E) Eles tornam o campo da Psicologia estático, sem a necessidade de aprimoramento contínuo.'
        ],
        correctAnswer: 'C'
      },
      {
        text: 'Os conhecimentos científicos em Psicologia são construídos de maneira programada, controlada e sistematizada, diferenciando-se do senso comum, que é um conhecimento espontâneo e assistemático.... A principal vantagem do conhecimento científico para a atuação profissional é que ele:',
        options: [
          'A) É sempre subjetivo e baseado em "achismos" do cotidiano.',
          'B) É impreciso e não validado pela academia.',
          'C) É fidedigno, racional e potencializa intervenções profissionais assertivas.',
          'D) Não necessita de metodologias reconhecidas por filósofos e cientistas.',
          'E) Despreza a compreensão das crenças e experiências cotidianas dos clientes.'
        ],
        correctAnswer: 'C'
      },
      {
        text: '"No campo da Psicologia, tanto como ciência quanto como profissão, é fundamental compreender que a produção de conhecimento não ocorre em um vácuo neutro. Todo saber é gerado dentro de um contexto histórico, social e político". Essa afirmação implica que:',
        options: [
          'A) As intervenções psicológicas devem ser padronizadas, sem considerar as particularidades dos contextos.',
          'B) A Psicologia é uma ciência que se mantém totalmente à parte das relações de poder na sociedade.',
          'C) Cada teoria, diagnóstico e intervenção psicológica carrega valores e ideologias, mesmo quando não declaradas explicitamente.',
          'D) A responsabilidade social e política do psicólogo é secundária em sua atuação.',
          'E) O psicólogo deve buscar a neutralidade absoluta, ignorando as influências externas.'
        ],
        correctAnswer: 'C'
      },
      {
        text: 'A ética na Psicologia diz respeito ao compromisso ético nas relações profissionais e ao comportamento ético buscado nas atividades de pesquisa e exercício profissional.... O Código de Ética Profissional do Psicólogo (Resolução CFP nº 010/2005) é caracterizado por:',
        options: [
          'A) Uma lista exaustiva de condutas proibidas para cada situação específica.',
          'B) Seus princípios fundamentais serem de caráter generalista, exigindo reflexão ampla e a consideração dos valores e princípios do profissional.',
          'C) A exclusão de qualquer reflexão sobre relações de poder nos contextos de atuação .',
          'D) A permissão para o dogmatismo e o ecletismo indiscriminado na prática.',
          'E) A desconsideração da necessidade de aprimoramento profissional contínuo.'
        ],
        correctAnswer: 'B'
      }
    ]
  }
];

// Componente para exibir uma única questão
const Question = ({ question, selectedOption, onOptionChange, showResult }) => {
  const getOptionClass = (option) => {
    let classes = 'p-3 border rounded-lg cursor-pointer transition-all duration-200 ';
    if (showResult) {
      if (option.startsWith(question.correctAnswer + ')')) {
        classes += 'bg-green-200 border-green-500 '; // Resposta correta
      } else if (selectedOption === option && selectedOption !== question.correctAnswer + ')') {
        classes += 'bg-red-200 border-red-500 '; // Resposta incorreta selecionada
      } else {
        classes += 'bg-gray-100 border-gray-300 hover:bg-gray-200 ';
      }
    } else {
      classes += 'bg-gray-100 border-gray-300 hover:bg-gray-200 ';
      if (selectedOption === option) {
        classes += 'ring-2 ring-blue-500 border-blue-500 '; // Opção selecionada
      }
    }
    return classes;
  };

  return (
    <div className="mb-6 p-4 bg-white rounded-lg shadow-md">
      <p className="font-semibold text-lg mb-4 text-gray-800">{question.text}</p>
      <div className="grid grid-cols-1 gap-3">
        {question.options.map((option, index) => (
          <div
            key={index}
            className={getOptionClass(option)}
            onClick={() => !showResult && onOptionChange(option)}
          >
            <input
              type="radio"
              name={`question-${question.text}`}
              value={option}
              checked={selectedOption === option}
              onChange={() => onOptionChange(option)}
              className="mr-2 hidden" // Esconde o rádio padrão, pois o div é clicável
              disabled={showResult}
            />
            <span>{option}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

// Componente principal do aplicativo Quiz
const App = () => {
  const [currentDisciplineIndex, setCurrentDisciplineIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({}); // { disciplineIndex: { questionIndex: selectedOption } }
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  // Função para lidar com a seleção de uma opção
  const handleOptionChange = (questionIndex, option) => {
    setUserAnswers(prevAnswers => ({
      ...prevAnswers,
      [currentDisciplineIndex]: {
        ...(prevAnswers[currentDisciplineIndex] || {}),
        [questionIndex]: option
      }
    }));
  };

  // Função para verificar as respostas e calcular a pontuação
  const checkAnswers = () => {
    let correctCount = 0;
    const currentDisciplineQuestions = quizData[currentDisciplineIndex].questions;
    const disciplineUserAnswers = userAnswers[currentDisciplineIndex] || {};

    // Verifica se todas as perguntas da disciplina atual foram respondidas
    const allAnswered = currentDisciplineQuestions.every((_, qIndex) => disciplineUserAnswers[qIndex] !== undefined);

    if (!allAnswered) {
      setModalMessage('Por favor, responda a todas as perguntas antes de verificar as respostas.');
      setShowModal(true);
      return;
    }

    currentDisciplineQuestions.forEach((question, index) => {
      const selectedOption = disciplineUserAnswers[index];
      if (selectedOption && selectedOption.startsWith(question.correctAnswer + ')')) {
        correctCount++;
      }
    });
    setScore(correctCount);
    setShowResults(true);
  };

  // Função para reiniciar o quiz para a disciplina atual
  const resetQuiz = () => {
    setUserAnswers(prevAnswers => {
      const newAnswers = { ...prevAnswers };
      delete newAnswers[currentDisciplineIndex]; // Remove as respostas da disciplina atual
      return newAnswers;
    });
    setShowResults(false);
    setScore(0);
  };

  // Função para ir para a próxima disciplina
  const goToNextDiscipline = () => {
    if (currentDisciplineIndex < quizData.length - 1) {
      setCurrentDisciplineIndex(prevIndex => prevIndex + 1);
      setShowResults(false); // Reseta a exibição dos resultados para a nova disciplina
      setScore(0);
    }
  };

  // Função para ir para a disciplina anterior
  const goToPreviousDiscipline = () => {
    if (currentDisciplineIndex > 0) {
      setCurrentDisciplineIndex(prevIndex => prevIndex - 1);
      setShowResults(false); // Reseta a exibição dos resultados para a nova disciplina
      setScore(0);
    }
  };

  const currentDiscipline = quizData[currentDisciplineIndex];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 font-inter p-4 sm:p-6 lg:p-8 flex flex-col items-center">
      <div className="w-full max-w-3xl bg-white rounded-xl shadow-2xl p-6 sm:p-8 lg:p-10">
        <h1 className="text-3xl sm:text-4xl font-bold text-center text-gray-800 mb-8">
          Quiz de Psicologia
        </h1>

        <div className="mb-6 text-center">
          <h2 className="text-2xl font-semibold text-blue-700 mb-4">
            Disciplina: {currentDiscipline.discipline}
          </h2>
          <div className="flex justify-center space-x-2 mb-4">
            {quizData.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrentDisciplineIndex(index);
                  setShowResults(false);
                  setScore(0);
                }}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                  currentDisciplineIndex === index
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-gray-200 text-gray-700 hover:bg-blue-200'
                }`}
              >
                {quizData[index].discipline}
              </button>
            ))}
          </div>
        </div>

        {currentDiscipline.questions.map((question, qIndex) => (
          <Question
            key={qIndex}
            question={question}
            selectedOption={userAnswers[currentDisciplineIndex]?.[qIndex]}
            onOptionChange={(option) => handleOptionChange(qIndex, option)}
            showResult={showResults}
          />
        ))}

        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
          {!showResults && (
            <button
              onClick={checkAnswers}
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-green-300"
            >
              Verificar Respostas
            </button>
          )}
          {showResults && (
            <>
              <button
                onClick={resetQuiz}
                className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-yellow-300"
              >
                Refazer Quiz
              </button>
              <div className="bg-blue-500 text-white font-bold py-3 px-6 rounded-lg shadow-lg flex items-center justify-center">
                Pontuação: {score} / {currentDiscipline.questions.length}
              </div>
            </>
          )}
        </div>

        <div className="flex justify-between mt-6">
          <button
            onClick={goToPreviousDiscipline}
            disabled={currentDisciplineIndex === 0}
            className={`py-2 px-4 rounded-lg font-semibold transition-colors duration-200 ${
              currentDisciplineIndex === 0
                ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
                : 'bg-blue-500 hover:bg-blue-600 text-white shadow-md'
            }`}
          >
            Anterior
          </button>
          <button
            onClick={goToNextDiscipline}
            disabled={currentDisciplineIndex === quizData.length - 1}
            className={`py-2 px-4 rounded-lg font-semibold transition-colors duration-200 ${
              currentDisciplineIndex === quizData.length - 1
                ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
                : 'bg-blue-500 hover:bg-blue-600 text-white shadow-md'
            }`}
          >
            Próximo
          </button>
        </div>
      </div>

      {/* Modal de Mensagem */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-sm w-full text-center">
            <p className="text-lg font-semibold mb-4">{modalMessage}</p>
            <button
              onClick={() => setShowModal(false)}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-200"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
