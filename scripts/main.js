const secaoLivros = document.querySelector("#livros")

async function pegaLivros(botaoEvento){
    secaoLivros.innerHTML = ""
    listaLivros = await fetch(`https://guilhermeonrails.github.io/casadocodigo/livros.json`)
    listaLivrosConvertida = await listaLivros.json()
    const listaSelecionados = listaLivrosConvertida.filter(livro => {
        return botaoEvento === livro.categoria
    })
     listaSelecionados.forEach(livro => {
        if(livro.quantidade >0){
            disponibilidade = ""
        }else{
            disponibilidade = "indisponivel"
        }
         mostraLivro(livro, disponibilidade)
     })   
}

const listaCompleta = document.querySelectorAll(".btn")
listaCompleta.forEach(botao => {
    botao.addEventListener('click', (e) => {
        pegaLivros(e.target.value)
        })
});

 const listaLivrosOrdenados = document.querySelector("#btnOrdenarPorPreco")
 listaLivrosOrdenados.addEventListener('click', () => {
    ordenaLivros()
    
 })

 const listaLivrosDisponiveis = document.querySelector("#btnLivrosDisponiveis")
 listaLivrosDisponiveis.addEventListener('click', () => {
    livrosDisponiveis()
 })

async function ordenaLivros(){
    secaoLivros.innerHTML = ""
    listaLivros = await fetch(`https://guilhermeonrails.github.io/casadocodigo/livros.json`)
    listaLivrosConvertida = await listaLivros.json()
    const listaOrdenada = listaLivrosConvertida.sort((livro1, livro2) => {
        return livro1.preco - livro2.preco
    })
     listaOrdenada.forEach(livro => {
        if(livro.quantidade >0){
            disponibilidade = ""
        }else{
            disponibilidade = "indisponivel"
        }
         mostraLivro(livro, disponibilidade)
     })    
}

async function livrosDisponiveis(){
    secaoLivros.innerHTML = ""
    listaLivros = await fetch(`https://guilhermeonrails.github.io/casadocodigo/livros.json`)
    listaLivrosConvertida = await listaLivros.json()
    const livrosDisponiveis = listaLivrosConvertida.filter((livro) => {
        return livro.quantidade > 0
    })
     disponibilidade = ""
     livrosDisponiveis.forEach(livro => {
         mostraLivro(livro, disponibilidade)
     })    
    
     let totalSomaDisponiveis = livrosDisponiveis.reduce((totalSomaDisponiveis, livro2) => {
        return totalSomaDisponiveis + livro2.preco
     }, 0)
    let secaoValorTotal = document.querySelector("#valor_total_livros_disponiveis")
    secaoValorTotal.innerHTML += `<div class="livros__disponiveis">
    <p>Todos os livros disponíveis por R$ <span id="valor">${totalSomaDisponiveis}</span></p>
  </div>`
}


function mostraLivro(livro, disponibilidade){
    secaoLivros.innerHTML += `<div class="livro">
    <img class="livro__imagens ${disponibilidade}" src="${livro.imagem}" alt="${livro.alt}" />
    <h2 class="livro__titulo"> ${livro.titulo}</h2>
    <p class="livro__descricao">${livro.autor}</p>
    <p class="livro__preco" id="preco">${livro.preco}</p>
    <div class="tags">
      <span class="tag">${livro.categoria}</span>
    </div>
  </div>`
}