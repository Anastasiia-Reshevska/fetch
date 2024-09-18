(function () {
  fetch("https://jsonplaceholder.typicode.com/posts")
    .then((response) => response.json())
    .then((json) => {
      json.forEach((element) => {
        createCard(element);
      });
      addClick();
    });

  fetch("https://jsonplaceholder.typicode.com/posts/1", {
    method: "PATCH",
    body: JSON.stringify({
      title: "foo",
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((response) => response.json())
    .then((json) => alert('В первом элементе успешно обновился title'));

  fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    body: JSON.stringify({
      title: "foo",
      body: "bar",
      userId: 1,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((response) => response.json())
    .then((json) => alert('Добавился 101 элемент'));

  function createCard(item) {
    const colSm4 = document.createElement("div");
    const row = document.getElementById("row");
    const card = document.createElement("div");
    const cardBody = document.createElement("div");
    const cardTitle = document.createElement("div");
    const cardText = document.createElement("div");
    const cardButton = document.createElement("div");

    colSm4.className = "col-sm-4";
    card.className = "card";
    cardBody.className = "card-body";
    cardTitle.className = "card-title";
    cardText.className = "card-text";
    cardButton.className = "btn btn-danger";
    cardButton.dataset.id = item.id;

    cardTitle.innerHTML = item.title;
    cardText.innerHTML = item.body;
    cardButton.innerHTML = "delete";

    row.append(colSm4);
    colSm4.append(card);
    card.append(cardBody);
    cardBody.append(cardTitle);
    cardBody.append(cardText);
    cardBody.append(cardButton);
  }

  function addClick() {
    const allButtons = document.querySelectorAll(`[data-id]`);
    if (!allButtons || allButtons.length === 0) return null;

    allButtons.forEach((button) => {
      button.addEventListener("click", function (e) {
        fetch("https://jsonplaceholder.typicode.com/posts/1", {
          method: "DELETE",
        })
        .then((json) => {
          const col = e.target.closest(".col-sm-4");
          col.remove();
        });
      });
    });
  }
})();
