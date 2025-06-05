# Projeto Quiz com Geração de Perguntas por IA

Este projeto é um Quiz interativo desenvolvido em React que permite gerar novas perguntas usando Inteligência Artificial (IA), editar o conteúdo do Quiz diretamente através de uma interface JSON e salvar as alterações localmente no navegador.

## Funcionalidades

*   **Geração de Perguntas por IA:** Utilize OpenRouter ou Google AI Studio para gerar novas perguntas com base em um prompt editável.
*   **Prompt do Sistema Editável:** Personalize o prompt usado para direcionar a geração de perguntas pela IA.
*   **Interface de Edição JSON Simplificada:** Edite o arquivo `quizData.json` diretamente na interface para modificar perguntas, respostas e configurações.
*   **Persistência dos Dados:** As alterações são salvas no `localStorage` do navegador, garantindo que os dados não sejam perdidos ao recarregar a página.
*   **Adicionar Perguntas Geradas ao Quiz:** Inclua as perguntas geradas pela IA ao conjunto de perguntas existentes no Quiz.
*   **Lógica do Quiz:** Responda às perguntas, calcule a pontuação e veja o resultado final.

## Tecnologias Utilizadas

*   **React:** Biblioteca JavaScript para construir interfaces de usuário.
*   **OpenAI API (via OpenRouter):** Plataforma para gerar texto com modelos de linguagem.
*   **Google AI Studio (PaLM API):** Plataforma para gerar texto com modelos de linguagem do Google.
*   **openai (Node.js library):** Biblioteca para interagir com a API da OpenAI (OpenRouter).
*   **@google-ai/generativelanguage (Node.js library):** Biblioteca para interagir com a Google AI Studio (PaLM API).

## Pré-requisitos

*   **Node.js:** Garanta que o Node.js esteja instalado em sua máquina. Você pode baixá-lo em [https://nodejs.org/](https://nodejs.org/).
*   **npm (Node Package Manager):** O npm é instalado automaticamente com o Node.js.
*   **Chaves de API:**
    *   **OpenRouter API Key:** Obtenha uma chave em [https://openrouter.ai/](https://openrouter.ai/).
    *   **Google AI Studio API Key:** Obtenha uma chave em [https://makersuite.google.com/app/apikey](https://makersuite.google.com/app/apikey).

## Configuração e Execução

1.  **Clone o Repositório:**

    ```bash
    git clone [URL do seu repositório]
    cd [nome do seu repositório]
    ```

2.  **Instale as Dependências:**

    ```bash
    npm install
    npm install openai @google-ai/generativelanguage
    ```

3.  **Configure as Chaves de API:**

    *   No arquivo `Quiz.tsx`, localize os componentes `<IAConfig>` e insira suas chaves de API nos campos correspondentes na interface do usuário.

4.  **Execute o Projeto:**

    ```bash
    npm start
    ```

    O projeto será aberto automaticamente no seu navegador (geralmente em `http://localhost:3000`).

## Estrutura de Arquivos

*   **`src/Quiz.tsx`:** Componente principal do Quiz, responsável por controlar o estado do Quiz, exibir as perguntas, lidar com as respostas e gerar novas perguntas com IA.
*   **`src/Pergunta.tsx`:** Componente para exibir cada pergunta individualmente, com as opções de resposta.
*   **`src/IAConfig.tsx`:** Componente para configurar a API de IA (OpenRouter ou Google AI Studio) e inserir a chave da API.
*   **`src/JsonEditor.tsx`:** Componente simples para editar o arquivo `quizData.json` diretamente na interface.
*   **`src/ia-utils.ts`:** Funções para interagir com as APIs de IA (OpenRouter e Google AI Studio).
*   **`src/quizData.json`:** Arquivo JSON que contém as perguntas, respostas e configurações do Quiz.
*   **`public/index.html`:** Arquivo HTML principal que renderiza o aplicativo React.

## Utilização

1.  **Respondendo ao Quiz:**
    *   Leia a pergunta e selecione a resposta correta.
    *   Clique no botão "Próxima Pergunta" para avançar.
    *   Ao final, clique em "Finalizar Quiz" para ver sua pontuação.

2.  **Gerando Novas Perguntas com IA:**
    *   Selecione a API de IA desejada (OpenRouter ou Google AI Studio) no componente `<IAConfig>`.
    *   Insira sua chave de API no campo correspondente.
    *   Edite o "Prompt do Sistema" para direcionar a geração de perguntas.
    *   Clique no botão "Gerar Nova Pergunta".
    *   Se a pergunta for gerada com sucesso, ela será exibida na tela.
    *   Clique no botão "Adicionar Pergunta ao Quiz" para adicionar a pergunta ao conjunto de perguntas existentes.

3.  **Editando o JSON do Quiz:**
    *   Clique no botão "Editar JSON" para abrir o editor JSON.
    *   Edite o JSON diretamente no campo de texto.
    *   Clique no botão "Salvar JSON" para salvar as alterações.
    *   **Cuidado:** Certifique-se de que o JSON seja válido antes de salvar.

## Considerações Finais

Este projeto é um ponto de partida para criar um Quiz interativo e personalizável com geração de perguntas por IA. Você pode expandir este projeto adicionando mais recursos, como:

*   Opções de configuração avançadas para as APIs de IA (seleção de modelo, número máximo de tokens, etc.).
*   Um sistema para salvar as perguntas geradas pela IA em um banco de dados.
*   Uma interface de usuário mais amigável para editar o JSON do Quiz.
*   Suporte para diferentes tipos de perguntas (múltipla escolha, verdadeiro/falso, etc.).

Lembre-se de monitorar o uso das APIs de IA e implementar medidas para evitar o uso abusivo ou não autorizado.

**Data de Criação:** 2025-06-05 20:20:22 (UTC)
**Usuário:** pedromarcioap