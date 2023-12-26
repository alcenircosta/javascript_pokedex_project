const pokeapi = {};

function convertPokeAPIDetailToPokemon(pokeDetail) {
    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name);
    const pokemon = new Pokemon(
        pokeDetail.order,
        pokeDetail.name,
        types[0],
        types,
        pokeDetail.sprites.front_default
    );
    return pokemon;
}

pokeapi.getPokemonDetails = (pokemons) => {
    return pokemons.map((pokemon) =>
        fetch(pokemon.url)
            .then((response) => response.json())
            .then(convertPokeAPIDetailToPokemon)
    );
};

pokeapi.getPokemons = async (offset = 0, limit = 10) => {
    const url = `https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limit}`;
    return await fetch(url)
        .then((response) => response.json())
        .then((response) => response.results)
        .then((pokemons) => pokeapi.getPokemonDetails(pokemons))
        .then((detailsRequest) => Promise.all(detailsRequest))
        .catch((error) => console.log(error));
};
