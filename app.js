/* Key Takeaways:
 - <slot> HTML elements are placeholders in the template
 element and can enable us to nest HTML elements within our
 webcomponents. <slot>'s are bound to the real elements 
 in the DOM that they are the placeholding for through a
 shared "slot" attribute. These real elements can be standard
 HTML elements like <div> or <p> but can also be web
 components themselves.
 - If <slot>'s are not used, child HTML elements will not
 nest properly within their parent element
 - A single <slot> element in the parent web component
 template can house multiple child elements (as long as
 they all share the same "slot" attribute) 
 - When dealing with nested web components through slotting,
 the parent web component's styles do not inherit downwards
 (as should be the case with web components). However, if
 there are any constraints placed on the parent, these
 will cascade downwards (i.e. the child HTML element will
 expand to fill only the parent).
 */

const boardTemplate = document.createElement("template");
boardTemplate.innerHTML = `
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/css/all.min.css" integrity="sha512-+4zCK9k+qNFUR5X+cKL9EIR+ZOhtIloNl9GIKS57V1MyNsYpYcUrUeQc9vNfzsWfV28IaLL3i96P9sdNyeRssA==" crossorigin="anonymous" />
  <style>
    * {
      margin: 0px 0px;
      padding: 0px 0px;
      box-sizing: border-box
    }

    .board {
      display: flex;
      flex-direction: column;
      width: 700px;
      margin: 10px auto;
      border: 1px solid var(--dark-grey);
      border-radius: 15px;
      /* locate shadow x: -5px, y: 5px, 0px blur*/
      box-shadow: -5px 5px 0px var(--light-blue);
    }
    
    .board-header {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
    }
    
    .board-header h3 {
      margin: 10px 20px;
    }
    
    .board-header i {
      margin: 16px 20px;
    }
    
    .board-related-actions {
      background-color: white;
      border: none;
      border-radius: 15px;
      cursor: pointer;
    }
    
    .board-related-actions:focus {
      outline: none;
      /* No distance x, y, No blur, 1px of spread */
      box-shadow: 0 0 0 1px var(--dark-grey);
    }
  </style>

  <div class="board">
    <div class="board-header">
      <h3>Programming & JavaScript</h3>
      <button class="board-related-actions">
        <i class="fas fa-ellipsis-v"></i>
      </button>
    </div>
    <slot name="link-line"></slot>
    <slot name="add-link-section"></slot>
  </div>
`;

const linkTemplate = document.createElement("template");
linkTemplate.innerHTML = `
  <style>
    * {
      margin: 0px 0px;
      padding: 0px 0px;
      box-sizing: border-box
    }

    .flexV {
      display: flex;
      flex-direction: column;
    }

    .link-line {
      background-color: var(--grey-white);
      margin: 10px 10px;
      padding: 10px 10px;
      border-radius: 10px;
      display: grid;
      grid-template-columns: 5fr 1fr;
      align-items: center;
    }
    
    .link-url {
      font-size: 1rem;
      color: var(--dark-grey)
    }
    
    .link-line-actions--control button {
      font-family: "Nunito", sans-serif;
      color: var(--dark-grey);
      font-size: 1.5rem;
      font-weight: 300;
      background-color: none;
      border: none;
      cursor: pointer;
    }
    
    .link-line-actions--control a {
      font-family: "Nunito", sans-serif;
      color: var(--dark-grey);
      font-size: 1.5rem;
      font-weight: 300;
      text-decoration: none;
    }
  </style>

  <div class="link-line">
    <div class="flexV">
      <h4>CSS box-shadow Property</h4>
      <p class="link-url">https://www.w3schools.com/cssref/css3_pr_box-shadow.asp</p>
    </div>
    <div class="link-line-actions--control">
      <a href="#" target="_blank" rel="noopener norefferer">open</a>
      <button>delete</button>
    </div>
  </div>
`;

const addLinkSectionTemplate = document.createElement("template");
addLinkSectionTemplate.innerHTML = `
  <style>
    /* Add Link Button Styling */

    * {
      margin: 0px 0px;
      padding: 0px 0px;
      box-sizing: border-box
    }

    .add-link-form {
      display: flex;
      flex-direction: column;
    }

    .add-link-btn--container {
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
    
    .add-link-btn {
      margin: 10px auto;
      padding: 10px 20px 5px 20px;
      font-family: "Nunito", sans-serif;
      font-weight: 300;
      font-size: 1rem;
      background-color: white;
      color: var(--dark-grey);
      border: none;
      border-bottom: 2px solid white;
      cursor: pointer;
    }

    .add-link-btn:hover {
      border-bottom: 2px solid var(--light-blue);
    }

    .add-link-btn:focus {
      outline: none;
    }
    
    .add-link-btn--container .hide-elem {
      display: none;
    }

    /* Form Styling */

    .form {
      margin: 10px 10px;
      padding: 10px 20px;
      background-color: var(--grey-white);
      color: var(--dark-grey);
      border-radius: 10px;
    }
    
    .input {
      font-family: "Nunito", sans-serif;
      font-size: 1.2rem;
      background-color: var(--grey-white);
      color: var(--dark-grey);
      border: none;
      border-bottom: 2px solid var(--dark-grey);
      margin: 10px 0px;
    }
    
    .input:focus {
      outline: none;
    }
    
    .btn-control {
      display: flex;
      flex-direction: row;
      justify-content: flex-end;
    }
    
    .form-btn {
      padding: 10px 5px 0px 5px;
      margin: 5px 5px;
      font-family: "Nunito", sans-serif;
      font-weight: 300;
      font-size: 1.5rem;
      background-color: none;
      color: var(--dark-grey);
      border: none;
      border-bottom: 2px solid var(--grey-white);
      cursor: pointer;
    }
    
    .form-btn:hover {
      border-bottom: 2px solid var(--light-blue)
    }
    
    .form-btn:focus {
      outline: none;
    }
  </style>

  <div class="add-link-btn--container">
    <button class="add-link-btn">
      <h4>-- Add New Link --</h4>
    </button>
    <form action="" class="add-link-form hide-elem form">
      <label for="link-url-input">Link URL</label>
      <input class="input" type="text" name="link-url-input" placeholder="http:// ...">
      <label for="link-title-input">Link Title</label>
      <input class="input" type="text" name="link-title-input" placeholder="insert awesome website here">
      <div class="btn-control">
        <button class="form-btn" type="submit">save</button>
        <button class="form-btn cancel-btn" type="button">cancel</button>
      </div>
    </form>
  </div>
`;

class LinkBoard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(boardTemplate.content.cloneNode(true));
    this.shadowRoot.querySelector("h3").innerText = this.getAttribute("title");
  }
}

class LinkLine extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(linkTemplate.content.cloneNode(true));
    this.shadowRoot.querySelector("h4").innerText = this.getAttribute(
      "linkTitle"
    );
    this.shadowRoot.querySelector("p").innerText = this.getAttribute("linkUrl");
    this.shadowRoot.querySelector("a").href = this.getAttribute("linkUrl");
  }
}

class AddLinkSection extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    const sr = this.shadowRoot;
    sr.appendChild(addLinkSectionTemplate.content.cloneNode(true));

    /* Enable opening and closing the add-link-form */
    const toggleLinkFormArr = [
      sr.querySelector(".add-link-btn"),
      sr.querySelector(".cancel-btn"),
    ];
    const addLinkForm = sr.querySelector(".add-link-form");
    toggleLinkFormArr.forEach((element) => {
      element.addEventListener("click", () => {
        addLinkForm.classList.toggle("hide-elem");
      });
    });
  }
}

window.customElements.define("link-board", LinkBoard);
window.customElements.define("link-line", LinkLine);
window.customElements.define("add-link-section", AddLinkSection);

const addBoardBtnForm = document.querySelector("#add-board-btn--form");
const toggleBoardFormArr = [
  document.querySelector("#add-board-btn"),
  document.querySelector("#add-board-btn--cancel"),
];

toggleBoardFormArr.forEach((element) => {
  element.addEventListener("click", () => {
    addBoardBtnForm.classList.toggle("hide-elem");
  });
});
