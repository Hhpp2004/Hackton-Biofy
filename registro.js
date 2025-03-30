const { DataTypes } = require('sequelize');
const express = require('express');
const { Sequelize } = require('sequelize');
require('dotenv').config();

// Correção: Remova a linha com app.router e use express.Router() se necessário
const app = express();
app.use(express.json());

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
    app.listen(3000, () => {
      console.log('Servidor rodando em http://localhost:3000');
    });
  })
  .catch(error => {
    console.error('Erro ao conectar ao banco de dados:', error);
  });