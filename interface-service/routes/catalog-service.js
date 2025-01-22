const express = require('express');
const axios = require('axios');
const router = express.Router();

// URL del microservicio catalog-service (Puerto 5003)
const CATALOG_SERVICE_URL = 'http://localhost:5003';

// Ruta para obtener todos los modelos
router.get('/models', async (req, res) => {
    try {
        const response = await axios.get(`${CATALOG_SERVICE_URL}/models`);
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching models:', error);
        res.status(500).json({ message: 'Error fetching models' });
    }
});

// Ruta para agregar un nuevo modelo
router.post('/models', async (req, res) => {
    try {
        const response = await axios.post(`${CATALOG_SERVICE_URL}/models`, req.body);
        res.status(201).json(response.data);
    } catch (error) {
        console.error('Error adding model:', error);
        res.status(500).json({ message: 'Error adding model' });
    }
});

// Ruta para obtener un modelo específico por nombre
router.get('/models/:modelName', async (req, res) => {
    const modelName = req.params.modelName;
    try {
        const response = await axios.get(`${CATALOG_SERVICE_URL}/models/${modelName}`);
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching model:', error);
        res.status(404).json({ message: 'Model not found' });
    }
});

// Ruta para eliminar un modelo
router.delete('/models/:modelName', async (req, res) => {
    const modelName = req.params.modelName;
    try {
        const response = await axios.delete(`${CATALOG_SERVICE_URL}/models/${modelName}`);
        res.json(response.data);
    } catch (error) {
        console.error('Error deleting model:', error);
        res.status(404).json({ message: 'Error deleting model' });
    }
});

module.exports = router;