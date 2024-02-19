import React, { useState } from 'react';
import axios from 'axios';

const AddForm = () => {
  const [nome, setNome] = useState('');
  const [idade, setIdade] = useState('');
  const [motivo, setMotivo] = useState('');

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {
      await axios.post('http://localhost:5000/items', { nome, idade, motivo });
      setNome('');
      setIdade('');
      setMotivo('');
    } catch (err) {
      console.error(err);
    }
  };

  return (

    <form onSubmit={handleSubmit}>
    <span>Nome:</span>
      <input
        type="text"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
      />

    <span>Idade:</span>
      <input
        type="number"
        value={idade}
        onChange={(e) => setIdade(e.target.value)}
      />

    <span>Causa da morte:</span>
      <input
        type="text"
        value={motivo}
        onChange={(e) => setMotivo(e.target.value)}
      />
      <button type="submit">Add Item</button>

    </form>
  );
};

export default AddForm;
