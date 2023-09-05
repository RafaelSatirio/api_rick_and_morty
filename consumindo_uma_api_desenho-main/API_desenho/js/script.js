        // Função para buscar todos os personagens
        function buscarTodos() {
            const itemTable = document.getElementById("itemTable").getElementsByTagName('tbody')[0];
            itemTable.innerHTML = ""; // Limpa a tabela antes de preenchê-la novamente

            const genderFilter = document.getElementById("gender").value;
            const statusFilter = document.getElementById("status").value;

            // Função para buscar personagens de uma página específica com filtros aplicados
            function buscarPersonagensPagina(url) {
                fetch(url)
                    .then(response => response.json())
                    .then(data => {
                        console.log(data.results);

                        // Preenche a tabela com os personagens da página atual que atendem aos filtros
                        data.results.forEach(character => {
                            if ((genderFilter === "" || character.gender === genderFilter) &&
                                (statusFilter === "" || character.status === statusFilter)) {
                                const newRow = itemTable.insertRow();
                                const idCell = newRow.insertCell(0);
                                const nomeCell = newRow.insertCell(1);
                                const statusCell = newRow.insertCell(2);
                                const generoCell = newRow.insertCell(3);
                                const especieCell = newRow.insertCell(4);
                                const imagemCell = newRow.insertCell(5);

                                idCell.innerHTML = character.id;
                                nomeCell.innerHTML = character.name;
                                statusCell.innerHTML = character.status;
                                generoCell.innerHTML = character.gender;
                                especieCell.innerHTML = character.species;

                                if (character.image) {
                                    const imagem = document.createElement("img");
                                    imagem.src = character.image;
                                    imagemCell.appendChild(imagem);
                                }
                            }
                        });

                        // Verifica se há mais páginas e busca a próxima página se existir
                        if (data.info.next) {
                            buscarPersonagensPagina(data.info.next);
                        }
                    })
                    .catch(error => {
                        console.error("Erro na requisição:", error);
                    });
            }

            // Inicia a busca a partir da primeira página com filtros aplicados
            buscarPersonagensPagina("https://rickandmortyapi.com/api/character/");
        }

        // Função para buscar por ID
        function buscarPorId() {
            const id = document.getElementById("id").value;
            const itemTable = document.getElementById("itemTable").getElementsByTagName('tbody')[0];
            itemTable.innerHTML = ""; // Limpa a tabela antes de preenchê-la novamente

            // Fazer a requisição HTTP para um personagem específico
            fetch("https://rickandmortyapi.com/api/character/" + id)
                .then(response => response.json())
                .then(character => {
                    console.log(character);

                    // Preenche a tabela com o personagem encontrado
                    const newRow = itemTable.insertRow();
                    const idCell = newRow.insertCell(0);
                    const nomeCell = newRow.insertCell(1);
                    const statusCell = newRow.insertCell(2);
                    const generoCell = newRow.insertCell(3);
                    const especieCell = newRow.insertCell(4);
                    const imagemCell = newRow.insertCell(5);

                    idCell.innerHTML = character.id;
                    nomeCell.innerHTML = character.name;
                    statusCell.innerHTML = character.status;
                    generoCell.innerHTML = character.gender;
                    especieCell.innerHTML = character.species;

                    if (character.image) {
                        const imagem = document.createElement("img");
                        imagem.src = character.image;
                        imagemCell.appendChild(imagem);
                    }
                })
                .catch(error => {
                    console.error("Erro na requisição:", error);
                });
        }

        // Função para aplicar o filtro quando houver mudança nos menus suspensos
        function aplicarFiltro() {
            // Recupere os valores selecionados nos menus suspensos
            const genderFilter = document.getElementById("gender").value;
            const statusFilter = document.getElementById("status").value;

            // Chame uma função para buscar personagens com base nos filtros selecionados
            buscarTodos();
        }

        // Chama a função para buscar todos os personagens ao carregar a página
        buscarTodos();