# PsiQuiz - Quiz Interativo de Psicologia com Geração de Perguntas por IA

**Um quiz de psicologia dinâmico e personalizável, agora facilmente acessível como um aplicativo web!**

## Visão Geral

O PsiQuiz foi projetado para ser uma ferramenta envolvente e educacional para qualquer pessoa interessada em psicologia. Ele apresenta geração de perguntas alimentada por IA, conteúdo personalizável por meio de edição JSON e persistência de dados local. Esta versão é otimizada para fácil implantação e acesso via GitHub Pages.

## Funcionalidades Principais

*   **Geração de Perguntas por IA:** Usa OpenRouter ou Google AI Studio para criar novas perguntas de quiz dinamicamente.
*   **Conteúdo Personalizável:** Modifique facilmente o conteúdo do quiz (perguntas, respostas, feedback) editando o arquivo `quizData.json`.
*   **Editor JSON Simplificado:** Uma interface amigável permite a modificação direta do arquivo `quizData.json`.
*   **Persistência de Dados Local:** As alterações são salvas no `localStorage` do navegador.
*   **Interface de Quiz Interativa:** Formato de quiz envolvente com rastreamento de progresso e feedback imediato.
*   **Implantação Simples:** Otimizado para fácil implantação no GitHub Pages (ou hospedagem estática similar).

## Demonstração ao Vivo

[https://opedromarcio.github.io/PsiQuiz/](https://opedromarcio.github.io/PsiQuiz/) (Substitua pelo seu URL real após a implantação)

## Tecnologias Utilizadas

*   React
*   API OpenAI (via OpenRouter) ou Google AI Studio (API PaLM)

## Pré-requisitos

*   Nenhum! Esta versão foi projetada para ser usada diretamente em um navegador web, sem nenhuma instalação local. Você precisará de chaves de API para os serviços de IA.

## Primeiros Passos

1.  **Clone o Repositório:**

    ```bash
    git clone [URL do seu repositório]
    cd [nome do seu repositório]
    ```

2.  **Configure as Chaves de API:**

    *   **AVISO DE SEGURANÇA IMPORTANTE:** Este aplicativo é apenas do lado do cliente. **NÃO coloque suas chaves de API diretamente no repositório.** Insira manualmente suas chaves de API OpenRouter ou Google AI Studio nos campos de entrada fornecidos na interface do aplicativo. Esteja ciente de que expor chaves de API em aplicativos do lado do cliente representa um risco de segurança.

3.  **Construa o Aplicativo:**

    ```bash
    npm install
    npm run build
    ```

4.  **Implante no GitHub Pages:**

    *   Vá para as configurações do seu repositório no GitHub.
    *   Role para baixo até a seção "GitHub Pages".
    *   Em "Source", selecione a pasta `build` no branch `main` ou `master`.
    *   **Importante:** Adicione `"homepage": "https://<seu-nome-de-usuário>.github.io/<seu-nome-de-repositório>/"` ao seu arquivo `package.json`.
    *   O GitHub Pages fornecerá um URL para seu site implantado.

## Uso

1.  Acesse o quiz implantado através do seu URL do GitHub Pages (por exemplo, `https://opedromarcio.github.io/PsiQuiz/`).
2.  Insira sua chave de API OpenRouter ou Google AI Studio nas configurações.
3.  Comece a fazer o quiz! Gere novas perguntas, edite o JSON e personalize sua experiência.

## Contribuindo

[Adicione as diretrizes de contribuição aqui se quiser que outros contribuam]

## Licença

[Adicione informações sobre a licença aqui]