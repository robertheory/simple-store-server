#!/bin/bash

# Verifica se cada projeto possui suas dependências instaladas
check_dependencies() {
    echo "Verificando as dependências de cada projeto..."

    projects=("customer" "orders" "products")

    for project in "${projects[@]}"; do
        cd "$project"

        if ! yarn check --silent; then
            echo "Erro: As dependências do projeto $project não estão instaladas."
            echo "Use o script de setup para preparar o ambiente e tente novamente."
            exit 1
        fi

        cd ..
    done

    echo "Todas as dependências estão instaladas."
}

# Verifica se os containers do docker-compose estão rodando
check_containers() {
    echo "Verificando se os containers do docker-compose estão rodando..."

    if ! docker-compose ps --services | grep "customers" ||
       ! docker-compose ps --services | grep "orders" ||
       ! docker-compose ps --services | grep "products"; then
        echo "Erro: Nem todos os containers do docker-compose estão rodando."
        echo "Use o script de setup para preparar o ambiente e tente novamente."
        exit 1
    fi

    echo "Todos os containers estão rodando."
}

# Inicia cada um dos 3 projetos simultaneamente
start_projects() {
    echo "Iniciando os projetos..."

    projects=("customer" "orders" "products")

    for project in "${projects[@]}"; do
        cd "$project"
        nohup yarn dev > /dev/null 2>&1 &
        cd ..
    done

    echo "Projetos iniciados com sucesso."
}

stop_projects() {
    echo "Parando os projetos..."

    projects=("customer" "orders" "products")

    for project in "${projects[@]}"; do
        pkill -f "yarn dev.*$project"
    done

    echo "Projetos parados com sucesso."
}

# Executa as verificações e inicia os projetos
# check_dependencies
check_containers
start_projects

# Loop infinito para manter o script em execução até que seja interrompido
while true; do
    # Aguarda um comando do usuário para parar a execução dos projetos
    read -p "Pressione 'q' e Enter para parar a execução dos projetos: " input

    # Verifica se o usuário digitou 'q' para parar a execução dos projetos
    if [[ $input == "q" ]]; then
        stop_projects
        break
    fi
done
