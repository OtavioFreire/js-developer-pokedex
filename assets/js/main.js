
const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')

let lastListPokemon;

const pokemon =document.get
const maxRecord = 154
const limit = 5
let offset = 0


function loadPokemonList(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {   
        pokemonList.innerHTML += pokemons.map((pokemon) => `
                <li id="${pokemon.number}" class="pokemon ${pokemon.type}">
                    <span class="number">#${pokemon.number}</span>
                    <span class="name">${pokemon.name}</span>
                    
                    <div class="detail">
                        <ol class="types">
                            ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                        </ol>
    
                        <img src="${pokemon.photo}"
                             alt="${pokemon.name}">
                    </div>
                </li>
        `
    ).join('')
    pokemons.map((pokemon) => MoreDetails(pokemon.number));
    })
}
    
loadPokemonList(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRegistroNextPage = offset + limit  

    if(qtdRegistroNextPage >= maxRecord){
        const newLimit = maxRecord - offset
        loadPokemonList(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    }else {
        loadPokemonList(offset, limit)  
    }
})

function constroiDetalhesPokemon(pokemon)
{
    lastListPokemon = pokemonList.innerHTML;

    console.log(offset)

    pokemonList.innerHTML = `
            <li id="${pokemon.number}" class="pokemon ${pokemon.type}">
                <div>
                    <p id='voltar'>voltar</p>
                </div>
                <span class="name">${pokemon.name}</span>
                <span>Nº Pokedex: ${pokemon.number}</span>

                <div class="detail">
                    <ol class="types">
                        ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                    </ol>

                    <img src="${pokemon.photo}"
                        alt="${pokemon.name}">
                </div>
                
                <div>
                    <p>
                        Caracteristicas Fisicas
                    </p>
                    <ol>
                        Altura: ${pokemon.weight} Cm
                    </ol>
                    <ol>
                        Altura: ${pokemon.height} Cm
                    </ol>
                </div>

                <div>
                    <p>Ataques</p>
                    ${pokemon.abilities.map((skill, index) => `<ol>${index + 1} - ${skill}</ol>`).join('')}
                </div>

                <div>
                    <p>Atributos</p>
                    ${pokemon.stats.map((s) => `<ol>${s.join(': ')}</ol>`).join('')}
                </div>
            </li>`
                
    voltarButton = document.getElementById('voltar')
    voltarButton.addEventListener(('click'), () =>{
        pokemonList.innerHTML = ""
        loadPokemonList(0, offset + limit)
    })
}


function MoreDetails(id){
    var item = document.getElementById(id)

        item.addEventListener('click', () => {
            pokeApi.getPokemonDescription(id)
                .then(constroiDetalhesPokemon)
        });
}