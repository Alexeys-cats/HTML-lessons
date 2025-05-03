const escapeHTML = (str) => {
	return str
	  .replace(/&/g, "&amp;")
	  .replace(/</g, "&lt;")
	  .replace(/>/g, "&gt;")
	  .replace(/"/g, "&quot;")
	  .replace(/'/g, "&#039;");
  };

const renderTags = (tags) => {
  const container = document.getElementById("html-tags-container");

  tags.forEach((tag) => {
    const card = document.createElement("div");
    card.classList.add("boxline");

    const name = document.createElement("h3");
    name.innerHTML = `Тег <code>&lt;${escapeHTML(tag.name)}&gt;</code>`;
    card.appendChild(name);

    const description = document.createElement("p");
    description.innerHTML = `<strong>Описание:</strong>${escapeHTML(tag.description)}`;
    card.appendChild(description);

    const example = document.createElement("p");
    example.innerHTML = `<strong>Пример:</strong> <code>${escapeHTML(tag.example)}</code>`;
    card.appendChild(example);
    const link = document.createElement("a");
    link.href = `https://htmlreference.io/element/${escapeHTML(tag.name)}/`;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.textContent = "Посмотреть пример";
    card.appendChild(link);

    container.appendChild(card);
  });
};

async function loadTags() {
  try {
    const response = await fetch("../assets/json/data-html.json");
    if (!response.ok) {
      throw new Error("Error");
    }
    const tags = await response.json();
    renderTags(tags);
  } catch (error) {
    console.error("Error loading tags:", error);
  }
  console.log(tags);
}

loadTags();
