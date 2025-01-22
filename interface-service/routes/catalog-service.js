const express = require('express');
const axios = require('axios');
const router = express.Router();

// URL del microservicio catalog-service
const CATALOG_SERVICE_URL = 'http://localhost:5003';

// Función auxiliar para manejar solicitudes al microservicio
const fetchFromCatalogService = async (method, url, data = null) => {
    try {
        const config = { method, url, data };
        const response = await axios(config);
        return { success: true, data: response.data };
    } catch (error) {
        console.error(`Error in catalog-service request: ${error.message}`);
        return { success: false, error: error.response?.data || 'Unknown error' };
    }
};

// Ruta para obtener todos los modelos
router.get('/models', async (req, res) => {
    const { success, data, error } = await fetchFromCatalogService('get', `${CATALOG_SERVICE_URL}/models`);
    if (success) {
        res.status(200).json(data);
    } else {
        res.status(500).json({ message: 'Error fetching models', error });
    }
});

// Ruta para agregar un nuevo modelo
router.post('/models', async (req, res) => {
    const { success, data, error } = await fetchFromCatalogService('post', `${CATALOG_SERVICE_URL}/models`, req.body);
    if (success) {
        res.status(201).json(data);
    } else {
        res.status(500).json({ message: 'Error adding model', error });
    }
});

// Ruta para obtener un modelo específico por nombre
router.get('/models/:modelName', async (req, res) => {
    const modelName = req.params.modelName;
    const { success, data, error } = await fetchFromCatalogService('get', `${CATALOG_SERVICE_URL}/models/${modelName}`);
    if (success) {
        res.status(200).json(data);
    } else {
        res.status(404).json({ message: 'Model not found', error });
    }
});

// Ruta para eliminar un modelo
router.delete('/models/:modelName', async (req, res) => {
    const modelName = req.params.modelName;
    const { success, data, error } = await fetchFromCatalogService('delete', `${CATALOG_SERVICE_URL}/models/${modelName}`);
    if (success) {
        res.status(200).json(data);
    } else {
        res.status(404).json({ message: 'Error deleting model', error });
    }
});

module.exports = router;