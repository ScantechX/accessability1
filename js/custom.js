(function() {
  var burger = document.querySelector(".burger");
  var menu = document.querySelector("#" + burger.dataset.target);
  burger.addEventListener("click", function() {
    burger.classList.toggle("is-active");
    menu.classList.toggle("is-active");
  });
})();

document.querySelectorAll("#nav li").forEach(function(navEl) {
  navEl.onclick = function() {
    toggleTab(this.id, this.dataset.target);
  };
});

function toggleTab(selectedNav, targetId) {
  var navEls = document.querySelectorAll("#nav li");

  navEls.forEach(function(navEl) {
    if (navEl.id == selectedNav) {
      navEl.classList.add("is-active");
    } else {
      if (navEl.classList.contains("is-active")) {
        navEl.classList.remove("is-active");
      }
    }
  });

  var tabs = document.querySelectorAll(".tab-pane");

  tabs.forEach(function(tab) {
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
  nodes.forEach(node => {
    listTemplates.push(
      `<li><p><a href=#${node.id}>${node.innerText}</a></p></li>`
    );
  });
  if (listTemplates.length) {
    const listNode = document.createElement("ul");
    listNode.innerHTML = listTemplates.join("");

    parentNode.appendChild(listNode);
  }

  const toggleSkipNavigation = event => {
    event.preventDefault();
    parentNode.classList.toggle("visually-hidden");
  };

  navigationNode.addEventListener("click", toggleSkipNavigation);

  document.addEventListener("click", event => {
    if (event.target !== navigationNode && event.target !== parentNode) {
      parentNode.classList.add("visually-hidden");
    }
    navigationNode.removeEventListener("click", toggleSkipNavigation);
  });
})();
