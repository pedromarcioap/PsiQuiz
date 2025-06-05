import React, { useState } from 'react';

interface IAConfigProps {
  onApiChange: (api: string) => void;
  onApiKeyChange: (apiKey: string) => void;
}

const IAConfig: React.FC<IAConfigProps> = ({ onApiChange, onApiKeyChange }) => {
  const [selectedApi, setSelectedApi] = useState('');
  const [apiKey, setApiKey] = useState('');

  const handleApiChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedApi(event.target.value);
    onApiChange(event.target.value);
  };

  const handleApiKeyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setApiKey(event.target.value);
    onApiKeyChange(event.target.value);
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
    
  );
};

export default IAConfig;