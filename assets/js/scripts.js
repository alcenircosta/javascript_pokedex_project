const loadMoreButton = document.getElementById("loadMoreButton");
const loadLessButton = document.getElementById("loadLessButton");
const limit = 5;
let offset = 0;

loadPokemonItens(offset, limit);

function loadPokemonItens(offset, limit) {
    pokeapi.getPokemons(offset, limit).then((pokemons = []) => {
        const pokemon_list_filled = pokemons
            .map((pokemon) => {
                return `<li class="pokemon ${pokemon.type}">
                <span class="number">#${pokemon.number}</span>
                <span class="name">${pokemon.name}</span>
                <div class="detail">
                    <ol class="types">
                    ${pokemon.types
                        .map((type) => `<li class="type ${type}">${type}</li>`)
                        .join("")}
                    </ol>
                    <img
                        src="${pokemon.photo}"
                        alt="${pokemon.name}"
                    />
                </div>
            </li>`;
            })
            .join("");

        const pokemon_list = document.getElementById("pokemon_list");
        pokemon_list.innerHTML += pokemon_list_filled;
    });
}

function limpaListaDePokemons() {
    document.getElementById("pokemon_list").innerHTML = "";
}

loadMoreButton.addEventListener("click", () => {
    offset += limit;
    loadPokemonItens(offset, limit);
});
