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
    
    .boardHeader {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
    }
    
    .boardHeader h3 {
      margin: 10px 20px;
    }
    
    .boardHeader i {
      margin: 16px 20px;
    }
    
    .board-ra {
      background-color: white;
      border: none;
      border-radius: 15px;
    }
    
    .board-ra:focus {
      outline: none;
      /* No distance x, y, No blur, 1px of spread */
      box-shadow: 0 0 0 1px var(--dark-grey);
    }
  </style>

  <div class="board">
    <div class="boardHeader">
      <h3>Programming & JavaScript</h3>
      <button class="board-ra">
        <i class="fas fa-ellipsis-v"></i>
      </button>
    </div>
    <slot name="linkLine"></slot>
  </div>
`

const linkTemplate = document.createElement("template")

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

    .linkLine {
      background-color: var(--grey-white);
      margin: 10px 10px;
      padding: 10px 10px;
      border-radius: 10px;
      display: grid;
      grid-template-columns: 5fr 1fr;
      align-items: center;
    }
    
    .linkUrl {
      font-size: 1rem;
      color: var(--dark-grey)
    }
    
    .linkControl button {
      font-family: "Nunito", sans-serif;
      color: var(--dark-grey);
      font-size: 1.5rem;
      font-weight: 300;
      background-color: none;
      border: none;
    }
    
    .linkControl a {
      font-family: "Nunito", sans-serif;
      color: var(--dark-grey);
      font-size: 1.5rem;
      font-weight: 300;
      text-decoration: none;
    }
  </style>

  <div class="linkLine">
    <div class="flexV">
      <h4 class="linkTitle">CSS box-shadow Property</h4>
      <p class="linkUrl">https://www.w3schools.com/cssref/css3_pr_box-shadow.asp</p>
    </div>
    <div class="linkControl">
      <a href="#" target="_blank" rel="noopener norefferer">open</a>
      <button>delete</button>
    </div>
  </div>
`

class LinkBoard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(boardTemplate.content.cloneNode(true))
    this.shadowRoot.querySelector("h3").innerText = this.getAttribute("title")
  }
}

class LinkLine extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(linkTemplate.content.cloneNode(true))
    this.shadowRoot.querySelector("h4").innerText = this.getAttribute("linkTitle")
    this.shadowRoot.querySelector("p").innerText = this.getAttribute("linkUrl")
    this.shadowRoot.querySelector("a").href = this.getAttribute("linkUrl")
  }
}

window.customElements.define("link-board", LinkBoard);
window.customElements.define("link-line", LinkLine);

const addBoardBtn = document.querySelector("#add-board-btn")
const addBoardForm = document.querySelector('#add-board-btn--form')
const addLinkBtn = document.querySelector(".add-link-btn")
const addLinkForm = document.querySelector(".add-link-form")
const addBoardBtnCancel = document.querySelector("#add-board-btn--cancel")
const cancelBtn = document.querySelector(".cancel-btn")

function show() {
  addLinkForm.classList.toggle('hide-elem');
}

function show2() {
  addBoardForm.classList.toggle('hide-elem')
}

addLinkBtn.addEventListener("click", (e) => {
  show();
})

cancelBtn.addEventListener("click", (e) => {
  show();
})

addBoardBtn.addEventListener("click", (e) => {
  show2();
})

addBoardBtnCancel.addEventListener("click", (e) => {
  show2();
})