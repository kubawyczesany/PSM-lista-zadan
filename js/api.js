let addButtonElement = document.querySelector(".js-button-addTask");

addButtonElement.addEventListener("click", () => {
  vibrate(1000);
})

function vibrate (ms) {
  navigator.vibrate(ms);
}

function vibratePattern () {
  navigator.vibrate([400, 100, 400, 100, 400]);
}
                    
