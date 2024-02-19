import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";

const ListNome = () => {

    const [dados, setDados] = useState([]);
    const [editDados, setEditDados] = useState(null);
    const [editNome, setEditNome] = useState('');
    const [editIdade, setEditIdade] = useState('');
    const [editMotivo, setEditMotivo] = useState('');

    useEffect (() => {

        const fetchDados = async () => {

            try {
                const response = await axios.get('http://localhost:5000/items');
                setDados(response.data);
            } catch (error) {
                console.log(error)
            }
        }
        fetchDados();

    }, []);

    const handleDelete = async (id) => {

        try {
            await axios.delete(`http://localhost:5000/items/${id}`);
            setDados(dados.filter(item => item._id !== id));
        } catch (error) {
            console.log(error);
        }
    }

    const handleEdit = (item) => {
        
      setEditDados(item._id);
      setEditNome(item.nome);
      setEditIdade(item.idade);
      setEditMotivo(item.motivo);

    }

    const handleSave = async () => {

        try {
            await axios.put(`http://localhost:5000/items/${editDados}`,
             {nome: editNome, idade: editIdade, motivo: editMotivo}
            )

            setEditDados(null);

            setDados(dados.map(item => item._id === editDados ? {...item, nome: editNome, idade: editIdade, motivo: editMotivo} : item));

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
            <h1>
                Lista de nomes
            </h1>
            <ul>
                {dados.map((item) => (
                    <li key={item._id}>
                        {editDados === item._id ? (
                            <>
                                <input
                                    type="text"
                                    placeholder="Nome"
                                    value={editNome}
                                    onChange={(e) => setEditNome(e.target.value)}
                                />

                                <input
                                    type="number"
                                    placeholder="Idade"
                                    value={editIdade}
                                    onChange={(e) => setEditIdade(e.target.value)}
                                />

                                <input
                                    type="text"
                                    placeholder="Causa da morte"
                                    value={editMotivo}
                                    onChange={(e) => setEditMotivo(e.target.value)}
                                />

                                <button onClick={handleSave}>
                                    Salvar
                                </button>
                            </>
                        ) : (
                            <>
                                <div>
                                    '{item.nome} - {item.idade}' -- '{item.motivo}'
                                </div>

                                <button onClick={() => handleDelete(item._id)}>
                                    Deletar
                                </button>

                                <button onClick={() => handleEdit(item)}>
                                    Editar
                                </button>
                        
                            </>
                        )} 
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default ListNome;