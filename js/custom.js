const UPDATE_NOTIFY_INTERVAL = 60000;
const CLOSE_NOTIFY_TIMEOUT = 2500;

const KeyCodes = {
  RIGHT_ARROW: 39,
  LEFT_ARROW: 37,
  HOME: 36,
  END: 35,
};

(function () {
  const tabs = document.querySelectorAll("[role='tab']");
  const tabList = document.querySelector("[role='tablist']");

  let tabFocus = 0;

  tabList.addEventListener("keydown", (event) => {
    const isRightArrow = event.keyCode === KeyCodes.RIGHT_ARROW;
    const isLeftArrow = event.keyCode === KeyCodes.LEFT_ARROW;
    if (isRightArrow || isLeftArrow) {
      tabs[tabFocus].setAttribute("tabindex", -1);
      if (isRightArrow) {
        tabFocus++;
        if (tabFocus >= tabs.length) {
          tabFocus = 0;
        }
      }
      if (isLeftArrow) {
        tabFocus--;
        if (tabFocus < 0) {
          tabFocus = tabs.length - 1;
        }
      }
    }
    tabs[tabFocus].setAttribute("tabindex", 0);
    tabs[tabFocus].focus();
  });
})();

(function () {
  const burger = document.querySelector(".burger");
  const menu = document.querySelector("#" + burger.dataset.target);
  burger.addEventListener("click", function () {
    burger.classList.toggle("is-active");
    menu.classList.toggle("is-active");
  });
})();

document.querySelectorAll("#nav li").forEach(function (navEl) {
  navEl.onclick = function () {
    toggleTab(this.id, this.dataset.target);
  };
});

function toggleTab(selectedNav, targetId) {
  const navEls = document.querySelectorAll("#nav li");

  navEls.forEach(function (navEl) {
    if (navEl.id == selectedNav) {
      navEl.classList.add("is-active");
    } else {
      if (navEl.classList.contains("is-active")) {
        navEl.classList.remove("is-active");
      }
    }
  });

  const tabs = document.querySelectorAll(".tab-pane");

  tabs.forEach(function (tab) {
    if (tab.id == targetId) {
      tab.classList.remove("visually-hidden");
    } else {
      tab.classList.add("visually-hidden");
    }
  });
}

(function renderNavigationList() {
  const listTemplates = [];
  const navigationNode = document.getElementById("skip-navigation");
  const parentNode = document.querySelector(".skip-navigation-list");
  const nodes = document.querySelectorAll("[role='main']");
  nodes.forEach((node) => {
    listTemplates.push(
      `<li><p><a href=#${node.id}>${node.innerText}</a></p></li>`
    );
  });
  if (listTemplates.length) {
    const listNode = document.createElement("ul");
    listNode.innerHTML = listTemplates.join("");

    parentNode.appendChild(listNode);
  }

  const toggleSkipNavigation = (event) => {
    event.preventDefault();
    parentNode.classList.toggle("visually-hidden");
  };

  navigationNode.addEventListener("click", toggleSkipNavigation);

  document.addEventListener("click", (event) => {
    if (event.target !== navigationNode && event.target !== parentNode) {
      parentNode.classList.add("visually-hidden");
    }
    navigationNode.removeEventListener("click", toggleSkipNavigation);
  });
})();

function updatePageNotifier() {
  const alertNode = document.getElementById("alert");
  alertNode.classList.remove("inactive");
  setTimeout(() => {
    alertNode.classList.add("inactive");
  }, CLOSE_NOTIFY_TIMEOUT);
}

setInterval(updatePageNotifier, UPDATE_NOTIFY_INTERVAL);

(function () {
  const administrationControl = document.querySelector(
    "#administration-trigger"
  );
  const administrationList = document.querySelector(
    ".administration-options__list"
  );

  document.addEventListener("click", (event) => {
    if (administrationControl.contains(event.target)) {
      administrationList.classList.toggle("visually-hidden");
    } else {
      administrationList.classList.add("visually-hidden");
    }
  });
})();
