const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')
const widthScreen = window.screen.availWidth;

const maxRecords = 151
const limit = Math.round(widthScreen / 227);
let offset = 0;

function convertPokemonToLi(pokemon) {
    return `
        <li class="pokemon ${pokemon.type} fade-in" onClick=handleCard("${pokemon.name}","${pokemon.type}","${pokemon.photo}")>
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
}

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml;
    });
    slowlyLoad();
}

function handleCard(pokeName, pokeType, pokePhoto) {
    $('.modal-body').addClass(`${pokeType}`)
    $('.modal-body').html(`
    <div class="card ${pokeType}" style="width: 18rem;border:none;">
        <img class="card-img-top" src="${pokePhoto}" alt="Card image cap">
        <div class="card-body">
        <h5 class="card-title">${pokeName}</h5>
        <p class="card-text">${pokeType}</p>
        <ul>
            <li><strong>Força</strong> ${Math.round(Math.random() * pokeName.length)}</li>
            <li><strong>Defesa</strong> ${Math.round(Math.random() * pokeName.length)}</li>
            <li><strong>Vida</strong> ${Math.round(Math.random() * pokeName.length)}</li>
        </ul>
        </div>
    </div>
    `);
    $('#card-container').modal('show');
}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    loadMoreButton.setAttribute('disabled', true);
    loadMoreButton.style.cursor =
        offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset;
        loadPokemonItens(offset, newLimit);

        loadMoreButton.parentElement.removeChild(loadMoreButton);
    } else {
        loadPokemonItens(offset, limit)
    }
})

document.addEventListener('DOMContentLoaded', function () {
    slowlyLoad();
});

function slowlyLoad() {
    setTimeout(() => {
        document.querySelectorAll('.fade-in').forEach((item) => {
            item.classList.add('loaded');
        });
    }, 200);
}
