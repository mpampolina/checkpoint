Array.from(document.querySelectorAll(".dismissable--button")).forEach(
  (button) => {
    button.addEventListener("click", () => {
      button.parentElement.remove();
    });
  }
);