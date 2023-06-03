#!/bin/bash

# Função para executar comandos em segundo plano
run_command_background() {
  command=$@
  $command >/dev/null 2>&1 &
  bg_pid=$!
  echo "Executando em segundo plano: $command"
}

# Executar o docker-compose em segundo plano
run_command_background docker-compose up

# Aguardar até que todos os containers estejam em execução
echo "Aguardando a inicialização dos containers..."
while ! docker-compose ps | grep -q "Up"; do
  sleep 2
done
echo "Todos os containers estão em execução!"


# Função para entrar em uma pasta, instalar dependências e executar yarn generate
run_project() {
  project_name=$1
  cd "$project_name"
  echo "Instalando dependências para $project_name..."
  yarn install
  echo "Executando yarn generate para $project_name..."
  yarn generate
  echo "Executando yarn migrate para $project_name..."
  yarn migrate
  cd ..
}

# Entrar na pasta de cada projeto, instalar dependências, executar yarn generate e executar yarn migrate
run_project "customer"
run_project "orders"
run_project "products"

echo "Script concluído com sucesso!"
