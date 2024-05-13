
const pokeApi = {}

function convertPokeApiDetailToPokemonDetail(pokemonDetails){
    const pokemon = new PokemonDetails()

    pokemon.number = pokemonDetails.id
    pokemon.name = pokemonDetails.name

    const types = pokemonDetails.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types 

    pokemon.types = types
    pokemon.type = type

    pokemon.photo = pokemonDetails.sprites.other.home.front_default

    pokemon.weight = pokemonDetails.weight
    pokemon.height = pokemonDetails.height

    pokemon.abilities = pokemonDetails.abilities.map((skill) => skill.ability.name)

    pokemon.stats = pokemonDetails.stats.map((stats) => [stats.stat.name, stats.base_stat])

    return pokemon;
}

function convertPokeApiDetailToPokemon(pokeDetail){
    const pokemon = new Pokemon()

    pokemon.number = pokeDetail.id
    pokemon.name = pokeDetail.name

    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types 

    pokemon.types = types
    pokemon.type = type

    pokemon.photo = pokeDetail.sprites.other.home.front_default

    return pokemon
}

pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
                .then((response) => response.json())
                .then(convertPokeApiDetailToPokemon)
}

pokeApi.getPokemons = (offset, limit) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`

    return fetch(url)
        .then((response) => response.json())
        .then((jsonBody) =>  jsonBody.results)
        .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
        .then((detailRequests) => Promise.all(detailRequests))
        .then((pokemonDetails) => pokemonDetails)
}

pokeApi.getPokemonDescription = (id) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`

    return fetch(url)
        .then((response) => response.json())
        .then(convertPokeApiDetailToPokemonDetail)
}