# Projeto Simple Store

Este repositório contém três projetos NodeJS: customer, orders e products. Cada projeto possui sua própria pasta e dependências.

## Requisitos

Certifique-se de ter os seguintes requisitos instalados no seu ambiente de desenvolvimento:

- NodeJS LTS
- Yarn
- Docker e Docker Compose
- Extensão Thunder Client no Visual Studio Code (VSC)

## Importando a Collection do Thunder Client

1. Para importar a coleção de requests do Thunder Client, localize o arquivo `thunder-collection_simple-store` na pasta raiz do repositório.

2. No Visual Studio Code, abra a extensão Thunder Client.

3. Clique no ícone do Thunder Client na barra lateral esquerda para abrir o painel de gerenciamento de coleções.

4. Clique no botão "Import" e selecione a opção "File" para importar a coleção.

5. Navegue até o arquivo `thunder-collection_simple-store` e selecione-o.

6. A coleção será importada para o Thunder Client e estará disponível para uso.

## Configuração do Ambiente

Para cada projeto (customer, orders e products), crie um arquivo `.env` na pasta correspondente com as seguintes variáveis de ambiente:

- DATABASE_URL=<URL_DO_BANCO_DE_DADOS>
- KAFKA_USERNAME=<USUÁRIO_DO_KAFKA>
- KAFKA_PASSWORD=<SENHA_DO_KAFKA>
- PORT=<PORTA_DO_PROJETO>

## Preparando o Ambiente

Existe um script chamado `setup.sh` que automatiza a preparação do ambiente. Este script verifica se todos os requisitos do projeto são atendidos, inicia o banco de dados de cada projeto, instala as dependências e executa as migrações necessárias. Para executar o script, utilize o seguinte comando:

```bash
./setup.sh
```

## Execução contínua dos projetos

1. Verifique se todos os requisitos estão instalados.
2. Execute o script `start.sh` na pasta raiz do repositório.
3. Os projetos serão iniciados simultaneamente em segundo plano.
4. Para interromper a execução dos projetos, pressione "q" e Enter.

## Observação

- O arquivo `start.sh` é um script que verifica as dependências, os containers do Docker Compose e inicia os projetos simultaneamente em segundo plano.
- O script permanecerá em execução até que seja interrompido pelo usuário.
