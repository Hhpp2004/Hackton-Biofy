const { DataTypes } = require('sequelize');
const express = require('express');
const cors = require("cors");
const router = express.Router();
const fetch = require("node-fetch");
const { Sequelize } = require('sequelize');
require('dotenv').config();

// Correção: Remova a linha com app.router e use express.Router() se necessário
const app = express();
app.use(express.json());
app.use(cors());

const API_URL = "http://172.19.0.1:7860/api/v1/run/ac325ffc-2462-42ff-aa33-292f0c33b66b?stream=false";
const API_KEY = "sk-hUK8esEVoCbgrs1JLIW9a2UmYakz-Tg6xfTapYpyL3k"; // Mova para um .env por segurança

// API LangFlow
const langflowRoutes = require("./routes/langflow");
app.use("/api/langflow", langflowRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));

// Proxy Segurança
router.post("/chat", async (req, res) => {
    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-api-key": API_KEY
            },
            body: JSON.stringify({
                input_value: req.body.message,
                output_type: "chat",
                input_type: "chat",
                tweaks: {
                    "Agent-2KW2O": {},
                    "ChatInput-6v3mV": {},
                    "PythonFunction-FcmS4": {},
                    "PythonFunction-T0TgC": {},
                    "NVIDIAEmbeddingsComponent-JJW34": {},
                    "Chroma-ujg9M": {},
                    "ChatOutput-uuXRz": {}
                }
            })
        });

        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Erro ao conectar com LangFlow" });
    }
});

module.exports = router;

// Configuração do Sequelize
const sequelize = new Sequelize({
  username: process.env.DB_USER,
  port: process.env.DB_PORT,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  host: process.env.DB_HOST,
  dialect: 'mysql'
});

// Definição do modelo
const Dados = sequelize.define('dados', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: true
  },
  city: {
    type: DataTypes.STRING,
    allowNull: true
  },
  investement_type: {
    type: DataTypes.STRING,
    allowNull: true
  },
  target_audience: {
    type: DataTypes.STRING,
    allowNull: true
  },
  created_at: {
    type: DataTypes.DATE,
    allowNull: true,
    defaultValue: DataTypes.NOW
  }
});

// Rotas diretamente no app (sem usar app.router)
app.post("/cadastrar", async (req, res) => {
  try {
    const dadosBody = req.body;
    if (!dadosBody) {
      return res.status(400).json({ error: "Dados não fornecidos" });
    }
    
    const newData = await Dados.create(dadosBody);
    res.status(201).json({ 
      message: "Dados criados com sucesso", 
      data: newData 
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/lista", async (req, res) => {
  try {
    const lista = await Dados.findAll();
    res.json(lista);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Se precisar de rotas separadas, crie um router corretamente:
// const router = express.Router();
// router.get('/rota', handler);
// app.use(router);

// Inicialização do servidor
sequelize.sync()
  .then(() => {
    app.listen(3001, () => {
      console.log('Servidor rodando em http://localhost:3000');
    });
  })
  .catch(error => {
    console.error('Erro ao conectar ao banco de dados:', error);
  });