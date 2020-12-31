import { boardTemplate, linkTemplate, addLinkSectionTemplate } from './components.js'

class LinkBoard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    const sr = this.shadowRoot
    sr.appendChild(boardTemplate.content.cloneNode(true));
    sr.querySelector("h3").innerText = this.getAttribute("title");
    const toggleRelatedActionsArr = [
      sr.querySelector(".board-related-actions"),
      sr.querySelector(".cancel-ra-btn")
    ]
    const dropdownContent = sr.querySelector(".dropdown-content")
    toggleRelatedActionsArr.forEach((element) => {
      element.addEventListener("click", () =>{
        dropdownContent.classList.toggle("hide-elem")
      })
    })

    /* HIDE AND SHOW DELETE LINK BUTTONS */
    const toggleDeleteLinksBtn = sr.querySelector(".ra-toggle-delete-btn")
    toggleDeleteLinksBtn.addEventListener("click", () => {
      /* Toggle hiding and showing the delete links button
      for each link-link */
      const linkLines = Array.from(this.querySelectorAll("link-line"))
      linkLines.forEach((linkLine) => {
        const deleteLinkBtn = linkLine.shadowRoot.querySelector(".delete-link-btn")
        deleteLinkBtn.classList.toggle("hide-elem")
      })
      
      /* Change the delete links toggle text */
      toggleDeleteLinksBtn.innerText === "Show Delete Buttons" ? 
        toggleDeleteLinksBtn.innerText = "Hide Delete Buttons": 
        toggleDeleteLinksBtn.innerText = "Show Delete Buttons"
    })
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
