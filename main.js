(function () {
    const url = "https://jsonplaceholder.typicode.com/";
    fetch(url + "posts")
    .then((response) => response.json())
    .then((json) => {
      json.forEach((element) => {
        createCard(element);
      });
      addClick();
    })
    .catch((error) => {
        alert(error)
      });

  fetch(url + "posts/1", {
    method: "PATCH",
    body: JSON.stringify({
      title: "foo",
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((response) => response.json())
    .then((json) => alert("В первом элементе успешно обновился title"))
    .catch((error) => {
        alert(error)
      });

  fetch(url, {
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
    .then((json) => alert("Добавился 101 элемент"))
    .catch((error) => {
        alert(error)
      });

  function createCard(item) {
    const cardWrapper = document.createElement("div");
    const row = document.getElementById("row");
    if (!row) return null;

    const card = document.createElement("div");
    const cardBody = document.createElement("div");
    const cardTitle = document.createElement("h4");
    const cardText = document.createElement("p");
    const cardButton = document.createElement("button");

    cardWrapper.className = "col-sm-4";
    card.className = "card";
    cardBody.className = "card-body";
    cardTitle.className = "card-title";
    cardText.className = "card-text";
    cardButton.className = "btn btn-danger";
    cardButton.dataset.id = item.id;

    cardTitle.innerHTML = item.title || '';
    cardText.innerHTML = item.body || '';
    cardButton.innerHTML = "delete";

    row.append(cardWrapper);
    cardWrapper.append(card);
    card.append(cardBody);
    cardBody.append(cardTitle);
    cardBody.append(cardText);
    cardBody.append(cardButton);
  }

  function addClick() {
    const allButtons = document.querySelector(`[data-id]`);
    // console.log(allButtons);
    if (!allButtons || allButtons.length === 0) return null;

    allButtons.forEach((button) => {
      button.addEventListener("click", function (e) {
        fetch(url + "posts/" + e.target.dataset.id, {
          method: "DELETE",
        })
        .then((json) => {
          const col = e.target.closest(".col-sm-4");
          col.remove()
          .catch((error) => {
        alert(error)
      });
        });
      });
    });
  }
})();
