const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    try{

    } catch (err) {
        console.log('erro em get')
    }
})

router.post('/', async (req, res) => {

    const { nome, idade, motivo} = req.body;

    try{

        const novoUsuario = new usuario({
            nome,
            idade,
            motivo
        });

    } catch (err) {
        console.log('erro em post')
    }
})

router.patch('/:id', async (req, res) => {
    try{

    } catch (err) {
        console.log('erro em patch')
    }
})

router.delete('/:id', async (req, res) => {
    try{

    } catch (err) {
        console.log('erro em delete')
    }
})

module.exports = router;