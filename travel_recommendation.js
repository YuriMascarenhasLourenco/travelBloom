function navigate(route) {
    const inputbar = document.querySelector(".search-bar");
    if (route === "/") {
        inputbar.classList.remove("hidden");
    } else if (route === "/about" || route === "/contact") {
        inputbar.classList.add("hidden");
    }
    history.pushState({}, "", route);
}
  
// Selecionando elementos do DOM
const searchInput = document.querySelector(".search-bar input");
const searchButton = document.getElementById("search");
const clearButton = document.getElementById("clear");
const recommendationList = document.getElementById("recommendation-list");

// Caminho do JSON
const DATA_URL = "travel_recommendation_api.json";

// Função para buscar dados do JSON (Task 6)
async function fetchData() {
  try {
    const response = await fetch(DATA_URL);
    if (!response.ok) throw new Error("Erro ao carregar JSON");
    const data = await response.json();
    console.log("JSON carregado com sucesso:", data); // debug
    return data;
  } catch (error) {
    console.error("Erro:", error);
  }
}

// Função para exibir recomendações (Task 8)
function displayRecommendations(items) {
  // Limpa lista antes de adicionar resultados
  recommendationList.innerHTML = "";

  if (!items || items.length === 0) {
    recommendationList.innerHTML = "<p>No results found.</p>";
    return;
  }
  console.log("Exibindo recomendações:", items); // debug
  items.forEach(item => {
    const li = document.createElement("li");
    li.innerHTML = `
      <div class="card">
        <img src="${item.imageUrl}" alt="${item.name}" />
        <h3>${item.name}</h3>
        <p>${item.description}</p>
      </div>
    `;
    console.log("Adicionando item:", li); // debug
    recommendationList.appendChild(li);
  });
}

// Função de pesquisa (Task 7)
async function handleSearch() {
  const keyword = searchInput.value.trim().toLowerCase(); // normaliza

  if (!keyword) return;

  const data = await fetchData();

  let results = [];

  if (keyword.includes("beach") || keyword.includes("beaches")) {
    results = data.beaches;
  } else if (keyword.includes("temple") || keyword.includes("temples")) {
    results = data.temples;
  } else if (keyword.includes("country") || keyword.includes("countries")) {
    results = data.countries;
  }
  displayRecommendations(results);
}

// Função para limpar resultados (Task 9)
function clearResults() {
  searchInput.value = "";
  recommendationList.innerHTML = "";
}

// Event Listeners

searchButton.addEventListener("click", handleSearch);
clearButton.addEventListener("click", clearResults);
