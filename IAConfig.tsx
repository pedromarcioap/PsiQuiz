import React, { useState } from 'react';

interface IAConfigProps {
  onApiChange: (api: string) => void;
  onApiKeyChange: (apiKey: string) => void;
  onOpenRouterModelChange: (model: string) => void; // Nova prop
}

const IAConfig: React.FC<IAConfigProps> = ({ onApiChange, onApiKeyChange, onOpenRouterModelChange }) => {
  const [selectedApi, setSelectedApi] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [openRouterModel, setOpenRouterModel] = useState('mistralai/Mistral-7B-Instruct-v0.2'); // Valor padrão

  const handleApiChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedApi(event.target.value);
    onApiChange(event.target.value);
  };

  const handleApiKeyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setApiKey(event.target.value);
    onApiKeyChange(event.target.value);
  };

  const handleOpenRouterModelChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOpenRouterModel(event.target.value);
    onOpenRouterModelChange(event.target.value);
  };

  return (
    
      <label>
        Selecione a API de IA:
        <select value={selectedApi} onChange={handleApiChange}>
          <option value="">Selecione...</option>
          <option value="openrouter">OpenRouter</option>
          <option value="googleai">Google AI Studio</option>
        </select>
      </label>
      
      <label>
        Chave da API:
        <input type="text" value={apiKey} onChange={handleApiKeyChange} />
      </label>
      {selectedApi === 'openrouter' && (
        
          <label>
            Modelo OpenRouter:
            <input
              type="text"
              value={openRouterModel}
              onChange={handleOpenRouterModelChange}
              placeholder="Nome do modelo (e.g., mistralai/Mistral-7B-Instruct-v0.2)"
            />
          </label>
        
      )}
    
  );
};

export default IAConfig;