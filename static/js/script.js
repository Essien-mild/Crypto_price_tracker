const API_URL = "https://mild.pythonanywhere.com/prices/?coins=bitcoin,ethereum,cardano,dogecoin,solana,xrp,polkadot,tron,polygon,litecoin,avalanche,chainlink,stellar";
let allCoins = []; // store all coins for filtering

async function fetchPrices() {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    allCoins = data;
    renderTable(allCoins);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

function renderTable(coins) {
  const tbody = document.querySelector("#crypto-table tbody");
  tbody.innerHTML = "";

  coins.forEach(coin => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td><a href="coin.html?coin=${coin.id}">${coin.name} (${coin.symbol.toUpperCase()})</a></td>
      <td>$${coin.current_price.toLocaleString()}</td>
      <td style="color:${coin.price_change_percentage_24h >= 0 ? 'green' : 'red'}">
        ${coin.price_change_percentage_24h.toFixed(2)}%
      </td>
      <td>$${coin.market_cap.toLocaleString()}</td>
    `;

    tbody.appendChild(row);
  });
}

// 🔎 Search filter
document.getElementById("search-bar").addEventListener("input", (e) => {
  const term = e.target.value.toLowerCase();
  const filtered = allCoins.filter(coin =>
    coin.name.toLowerCase().includes(term) ||
    coin.symbol.toLowerCase().includes(term)
  );
  renderTable(filtered);
});



// Refresh every 10s
fetchPrices();
setInterval(fetchPrices, 100000);