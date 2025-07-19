async function loadCssProperties() {
  try {
    const response = await fetch("../assets/json/data-css.json");
    if (!response.ok) {
      throw new Error("Error loading CSS properties");
    }
    const cssProperties = await response.json();
    renderCssProperties(cssProperties);
  } catch (error) {
    console.error("Error loading CSS properties:", error);
  }
}

const renderCssProperties = (properties) => {
  const container = document.getElementById("css-properties-container");
  if (!container) {
    console.error("Container not found");
    return;
  }

  container.innerHTML = "";

  Object.entries(properties).forEach(([property, details]) => {
    const card = document.createElement("div");
    card.classList.add("boxline");

    card.innerHTML = `
      <h3>Свойство: <code>${property}</code></h3>
      <p><strong>Начальное значение:</strong> ${details.initial}</p>
      <p><strong>Поддержка Webkit:</strong> ${details.webkit ? "Да" : "Нет"}</p>
      <p><strong>Поддержка Mozilla:</strong> ${details.moz ? "Да" : "Нет"}</p>
      <p><strong>Синтаксис:</strong> <code>${details.syntax}</code></p>
      <p><strong>Возможные значения:</strong></p>
      <ul>
        ${details.values
          .map((value) => `<li><code>${value}</code></li>`)
          .join("")}
      </ul>
      <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/${property}" 
         target="_blank" 
         rel="noopener noreferrer">
         Посмотреть пример
      </a>
    `;

    container.appendChild(card);
  });
};

document.addEventListener("DOMContentLoaded", loadCssProperties);
