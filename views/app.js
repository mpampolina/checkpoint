import {
  boardTemplate,
  linkTemplate,
  addLinkSectionTemplate,
  errorTemplate,
} from "./components.js";

/* FUNCTION - Set multiple attributes for an HTML object. */
const attributeSetter = (element, attributes) => {
  for (const key of Object.keys(attributes)) {
    element.setAttribute(key, attributes[key]);
  }
};

class LinkBoard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  toggleDelete() {
    /* toggle hiding and showing the delete links button
    for each link-line */
    const linkLines = Array.from(this.querySelectorAll("link-line"));
    linkLines.forEach((linkLine) => {
      const deleteLinkBtn = linkLine.shadowRoot.querySelector(
        ".delete-link-btn"
      );
      deleteLinkBtn.classList.toggle("hide-elem");
    });
  }

  async deleteBoard() {
    /* delete board */
    const boardId = this.getAttribute("_id");

    const options = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    };

    const res = await fetch(`/api/${boardId}`, options);
    const { success } = await res.json();

    if (success) {
      this.remove();
    } else {
      addErrorCard();
    }
  }

  connectedCallback() {
    const sr = this.shadowRoot;
    sr.appendChild(boardTemplate.content.cloneNode(true));
    sr.querySelector("h3").innerText = this.getAttribute("title");

    /* == hide and show related-actions dropdown ==  */
    const toggleRelatedActionsArr = [
      sr.querySelector(".board-related-actions"),
      sr.querySelector(".cancel-ra-btn"),
    ];
    const dropdownContent = sr.querySelector(".dropdown-content");
    toggleRelatedActionsArr.forEach((element) => {
      element.addEventListener("click", () => {
        dropdownContent.classList.toggle("hide-elem");
      });
    });

    /* == hide and show delete-links buttons == */
    const toggleDeleteLinksBtn = sr.querySelector(".ra-toggle-delete-btn");
    toggleDeleteLinksBtn.addEventListener("click", () => {
      this.toggleDelete();
      /* Change the delete links toggle text */
      toggleDeleteLinksBtn.innerText === "Show Delete Buttons"
        ? (toggleDeleteLinksBtn.innerText = "Hide Delete Buttons")
        : (toggleDeleteLinksBtn.innerText = "Show Delete Buttons");
    });

    /* == delete board button == */
    const deleteBoardBtn = sr.querySelector(".delete-ra-btn");
    deleteBoardBtn.addEventListener("click", async () => {
      await this.deleteBoard();
    });
  }
}

class LinkLine extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  async deleteLink() {
    const linkId = this.getAttribute("_id");
    const boardId = this.parentElement.getAttribute("_id");

    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        link_id: linkId,
        board_id: boardId,
      }),
    };

    const res = await fetch("/api/delete", options);
    const { success } = await res.json();

    if (success) {
      this.remove();
    } else {
      addErrorCard();
    }
  }

  connectedCallback() {
    const sr = this.shadowRoot;
    sr.appendChild(linkTemplate.content.cloneNode(true));
    sr.querySelector("h4").innerText = this.getAttribute("linkTitle");
    sr.querySelector("p").innerText = this.getAttribute("linkUrl");
    sr.querySelector("a").href = this.getAttribute("linkUrl");

    const deleteLinkBtn = sr.querySelector(".delete-link-btn");
    deleteLinkBtn.addEventListener("click", async () => {
      await this.deleteLink();
    });
  }
}

class AddLinkSection extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  async addLink(sr) {
    const linkBoardId = this.parentElement.getAttribute("_id");
    const linkUrlInput = sr.querySelector(".link-url-input");
    const linkTitleInput = sr.querySelector(".link-title-input");

    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        link_title: linkTitleInput.value,
        url: linkUrlInput.value,
        board_id: linkBoardId,
      }),
    };

    const res = await fetch("/api/add", options);
    const { success, _id } = await res.json();

    if (success) {
      const newLinkLine = document.createElement("link-line");
      const attrSetup = {
        _id: _id,
        slot: "link-line",
        linkTitle: linkTitleInput.value,
        linkUrl: linkUrlInput.value,
      };
      attributeSetter(newLinkLine, attrSetup);

      this.parentElement.insertBefore(newLinkLine, this);

      /* == ensure the new link's delete button is visible if the 
      sibling links have their delete buttons visible == */
      const toggleDeleteBtn = this.parentElement.shadowRoot.querySelector(
        ".ra-toggle-delete-btn"
      );
      const newDeleteLinkBtn = newLinkLine.shadowRoot.querySelector(
        ".delete-link-btn"
      );
      if (toggleDeleteBtn.innerText === "Hide Delete Buttons") {
        newDeleteLinkBtn.classList.remove("hide-elem");
      }

      /* == clear the form inputs == */
      linkTitleInput.value = "";
      linkUrlInput.value = "";
    } else {
      addErrorCard();
    }
  }

  connectedCallback() {
    const sr = this.shadowRoot;
    sr.appendChild(addLinkSectionTemplate.content.cloneNode(true));

    /* == toggle opening and closing the add-link-form == */
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

    /* == add link to board == */
    addLinkForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      await this.addLink(sr);
    });
  }
}

class ErrorCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    const sr = this.shadowRoot;
    sr.appendChild(errorTemplate.content.cloneNode(true));
    sr.querySelector(".dismissable--button").addEventListener("click", () => {
      this.remove();
    });
  }
}

/* adds an error card to the top of the dashboard in the
event of an API request failure. Will only add one error
card in the case of multiple errors. */
const addErrorCard = () => {
  const errorCard = document.querySelector("error-card");
  const contentWrap = document.getElementById("content-wrap");
  const addBoardSection = document.getElementById("add-board-section");
  /* if the errorCard query === null, add a new error card */
  if (!errorCard) {
    const newErrorCard = document.createElement("error-card");
    contentWrap.insertBefore(newErrorCard, addBoardSection);
  }
};

window.customElements.define("link-board", LinkBoard);
window.customElements.define("link-line", LinkLine);
window.customElements.define("add-link-section", AddLinkSection);
window.customElements.define("error-card", ErrorCard);

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

const boardList = document.getElementById("board-list");
const addBoardForm = document.querySelector("#add-board-btn--form form");
addBoardForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const addBoardBtnInput = document.getElementById("add-board-btn--input");
  if (addBoardBtnInput.value) {
    const board_title = addBoardBtnInput.value;

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        board_title: board_title,
      }),
    };

    const res = await fetch("/api", options);
    const { success, _id } = await res.json();
    if (success) {
      const newBoard = document.createElement("link-board");
      const newAddLinkSection = document.createElement("add-link-section");
      newBoard.setAttribute("_id", _id);
      newBoard.setAttribute("title", board_title);
      newAddLinkSection.setAttribute("slot", "add-link-section");
      newBoard.appendChild(newAddLinkSection);
      boardList.appendChild(newBoard);
      addBoardBtnInput.value = "";
    } else {
      addErrorCard();
    }
  }
});

/* filter visible boards by a user-defined search value. */
const searchbar = document.getElementById("search");

searchbar.addEventListener("keyup", (e) => {
  const searchbar_value = e.target.value.toLowerCase();
  Array.from(document.querySelectorAll("link-board")).forEach((board) => {
    /* Show boards whose titles match either a user-provided letter 
    or string. .indexOf() will return the index number of the first letter
    of the provided string in the title and -1 otherwise.  */
    if (
      board
        .getAttribute("title")
        .toLowerCase()
        .indexOf(searchbar_value) != -1
    ) {
      board.style.display = "block";
    } else {
      board.style.display = "none";
    }
  });
});
