function pesquisar() {


    // Obtém a seção HTML onde os resultados serão exibidos
    let section = document.getElementById("resultados-pesquisa");

    let campoPesquisa = document.getElementById("campo-pesquisa").value;
    
    // Normalizar a palavra-chave e os dados
    const palavraChaveNormalizada = campoPesquisa.toLowerCase();

    if (!campoPesquisa) {
        
        section.innerHTML="<h2>Nenhuma palavra digitada</h2>"       

        //utilizo o return como se fosse finalizar o codigo, pois quando o código entra nesta condição, ele impede de dar continuidade na utilização
        return
    }

    const apenasLetras = /^[a-zA-Z]+$/;
    if (!apenasLetras.test(campoPesquisa)) {
        section.innerHTML = "<h2>Por favor, digite apenas letras</h2>";
        return;
    }

    // Inicializa uma string vazia para armazenar os resultados
    let resultados = "";
    
    // Obter o elemento de resultados
    const resultadoSuave = document.getElementById('resultados-pesquisa');
    // Rolar suavemente até o elemento
    resultadoSuave.scrollIntoView({ behavior: 'smooth' });

    for (let dado of dados) {
        const tituloNormalizado = dado.titulo.toLowerCase();
        const ingredientesNormalizados = dado.ingredientes.map(ingrediente => ingrediente.toLowerCase());
        const tagsNormalizados = dado.tags.toLowerCase();


        // Utilizar expressão regular para encontrar correspondências mais flexíveis
        const regex = new RegExp(palavraChaveNormalizada, 'i');
        if (tituloNormalizado.match(regex) || ingredientesNormalizados.some(ingrediente => ingrediente.match(regex)) || tagsNormalizados.match(regex)) {
            // Cria um novo elemento HTML para cada resultado
            resultados += `
             <div class="item-resultado">
                <h2>
                    <p>${dado.titulo}</p>
                </h2>
                    <table>
                        <thead>
                            <tr>
                                <th>Ingredientes</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${dado.ingredientes.map(ingrediente => `<tr><td>${ingrediente}</td></tr>`).join('')}
                        </tbody>
                    </table>
                    <table>
                        <thead>
                            <tr>
                                <th>Modo de preparo</th>
                            </tr>
                        </thead>
                        <tbody>
                             ${dado.preparo.map(preparo => `<tr><td>${preparo}</td></tr>`).join('')}
                        </tbody>
                    </table>
                    <a href=${dado.link} target="_blank">Postagem oficial</a>
                 </div>`;          
        }
    }

    if(!resultados){
        resultados = "<h2 class=semreceita>Nenhuma receita foi encontrada com este nome ou ingrediente, mas você pode ser o primeiro a criá-la</h2>"       

    }
    // Atribui os resultados gerados à seção HTML
    section.innerHTML = resultados;
}





