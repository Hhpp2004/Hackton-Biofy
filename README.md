# Biofy - Backend com Node.js, Sequelize, MySQL2 e Docker

Este projeto backend foi desenvolvido utilizando Node.js e tem como objetivo fornecer uma API para um frontend React, integrando-se com a API da NVIDIA para inteligência artificial através do Langflow.

## Tecnologias Utilizadas

- **Node.js:** Ambiente de execução JavaScript para o backend.
- **Sequelize:** ORM (Object-Relational Mapper) para facilitar a interação com o banco de dados.
- **MySQL2:** Driver MySQL otimizado para Node.js.
- **Docker:** Plataforma de containerização para facilitar a implantação e o gerenciamento do banco de dados MySQL.
- **React:** Biblioteca JavaScript para construir a interface do usuário (frontend).
- **Langflow:** Ferramenta para criar fluxos de inteligência artificial, integrando-se com a API da NVIDIA.

## Pré-requisitos

- Node.js e npm instalados.
- Docker e Docker Compose instalados.
- uv e python 3 para o LangFlow

## Configuração

1.  **Clonar o repositório:**

    ```bash
    git clone https://github.com/Hhpp2004/Hackton-Biofy.git
    cd Hackton-Biofy
    ```

2.  **Configurar as variáveis de ambiente:**

    Crie um arquivo `.env` na raiz do projeto e configure as variáveis de ambiente necessárias:

    ```
    DB_DATABASE=biofy
    DB_USER=root
    DB_PASSWORD=senha
    DB_HOST=localhost
    DB_PORT=3307
    API_KEY=sua_api_key_nvidia
    ```

3.  **Instalar as dependências:**

    ```bash
    npm install
    ```

## Configuração do Docker

1.  **Criar e iniciar os containers Docker:**

    ```bash
    docker-compose up -d
    ```

    Este comando irá construir e iniciar os containers definidos no arquivo `docker-compose.yml`. Certifique-se de que o arquivo está configurado corretamente para o seu ambiente.

## Executando a aplicação

1.  **Iniciar o servidor:**

    ```bash
    npm run dev
    ```

    Este comando irá iniciar o servidor Node.js utilizando o script `dev` definido no arquivo `package.json`.

## Rotas da API

- `POST /cadastrar`: Endpoint para cadastrar novos dados no banco de dados.
  Corpo da requisição:

  ```json
  {
    "city": "São Paulo",
    "investment_type": "Marketing",
    "target_audience": "Jovens"
  }
  ```

- `GET /lista`: Endpoint para listar todos os dados cadastrados no banco de dados.

- `POST /chat`: Endpoint para interagir com a API da NVIDIA através do Langflow.
  Corpo da requisição:

  ```json
  {
    "message": "Sua mensagem para a IA"
  }
  ```

## Integração com o Frontend React

O frontend React deve ser configurado para fazer requisições para a API backend. Certifique-se de que a URL da API está configurada corretamente no frontend.

## Considerações de Segurança

- A chave da API da NVIDIA (`API_KEY`) deve ser armazenada de forma segura, preferencialmente utilizando variáveis de ambiente e evitando o armazenamento direto no código.
- Valide e sanitize os dados recebidos nas requisições para evitar ataques de injeção de SQL e outros tipos de vulnerabilidades.

## Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues e pull requests para melhorar este projeto.
