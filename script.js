let blockInput = document.querySelector(".blockInput");

blockInput.addEventListener("keypress", (event) => {
  if (event.key == "Enter") {
    createTask();
  }
});

// Создаем новую задачу
let createTask = () => {
  // Создаем блок с задачей
  let addedBlock = document.createElement("div");
  addedBlock.classList.add("added_block");
  addedBlock.classList.add("block");

  // Создаем текст задачи и привязываем к нему событие при потере фокуса, чтобы текст нельзя было редактировать
  // (Редактировать можно только при следующем двойном клике по полю с текстом)
  let cantChangeMeaning = document.createElement("input");
  cantChangeMeaning.classList.add("cantChangeMeaning");
  cantChangeMeaning.type = "text";
  cantChangeMeaning.value = blockInput.firstElementChild.value;
  blockInput.firstElementChild.value = null;
  cantChangeMeaning.disabled = true;

  addedBlock.appendChild(cantChangeMeaning);
  cantChangeMeaning.addEventListener("blur", () => {
    cantChangeMeaning.disabled = true;
    cantChangeMeaning.className = "cantChangeMeaning";
  });

  // Создаем чекбокс и привязываем к нему событие зачеркивания текста при checked
  let inputComplete = document.createElement("input");
  inputComplete.type = "checkbox";
  inputComplete.classList.add("complete");
  addedBlock.insertBefore(inputComplete, cantChangeMeaning);

  inputComplete.addEventListener("change", () => {
    cantChangeMeaning.style.textDecoration = "line-through";
    inputComplete.style.visibility = "hidden";
  });

  // Создаем крестик и привязываем событие удаления блока с задачей при клике по нему
  let cross = document.createElement("img");
  cross.src =
    "https://kartinkin.net/uploads/posts/2022-03/thumbs/1648003732_2-kartinkin-net-p-krestik-kartinki-2.png";
  cross.alt = "cross";
  addedBlock.appendChild(cross);

  cross.addEventListener("click", () => {
    addedBlock.remove();
  });

  // Добавление  блока с задачей в разментку и привязка события к полю с текстом через делегирование(чтобы текст можно было изменять при dblclick)
  blockInput.parentElement.appendChild(addedBlock);
  addedBlock.addEventListener("dblclick", (event) => {
    event.target.closest("input").disabled = false;
    cantChangeMeaning.className = "changeMeaning";
    cantChangeMeaning.focus();
  });
};

