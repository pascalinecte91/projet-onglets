// Sélectionne tous les éléments avec la classe 'tab' et 'tab-content' et les convertit en tableaux
const tabs = [...document.querySelectorAll(".tab")];
const tabContents = [...document.querySelectorAll(".tab-content")];

// Définit des constantes pour les codes des touches flèches
const RIGHT_ARROW = 39;
const LEFT_ARROW = 37;

// Variable pour suivre l'onglet actuellement focalisé lors de la navigation au clavier
let tabFocus = 0;

/**
 * Fonction pour activer ou désactiver un onglet et son contenu
 * @param {HTMLElement} tab - L'élément bouton de l'onglet
 * @param {HTMLElement} content - L'élément de contenu de l'onglet
 * @param {boolean} isActive - Indique si l'onglet doit être activé ou désactivé
 */
function toggleTab(tab, content, isActive) {
  // Ajoute ou supprime la classe 'active-tab' selon isActive
  tab.classList.toggle("active-tab", isActive);
  // Met à jour l'attribut 'aria-selected' pour l'accessibilité
  tab.setAttribute("aria-selected", isActive);
  // Met à jour le tabindex pour la navigation au clavier
  tab.setAttribute("tabindex", isActive ? "0" : "-1");
  // Ajoute ou supprime la classe 'active-tab-content' selon isActive
  content.classList.toggle("active-tab-content", isActive);
}

/**
 * Fonction pour gérer l'animation des onglets lors du clic
 * @param {Event} e - L'événement de clic
 */
function tabsAnimation(e) {
  // Trouve l'index de l'onglet actuellement actif
  const activeIndex = tabs.findIndex((tab) => tab.classList.contains("active-tab"));
  // Trouve l'index de l'onglet cliqué
  const newActiveIndex = tabs.indexOf(e.target);

  // Désactive l'onglet précédemment actif
  toggleTab(tabs[activeIndex], tabContents[activeIndex], false);
  // Active le nouvel onglet
  toggleTab(tabs[newActiveIndex], tabContents[newActiveIndex], true);
}

/**
 * Fonction pour gérer la navigation au clavier entre les onglets
 * @param {KeyboardEvent} e - L'événement clavier
 */
function arrowNavigation(e) {
  if (e.keyCode === RIGHT_ARROW || e.keyCode === LEFT_ARROW) {
    // Retire le focus de l'onglet actuel
    tabs[tabFocus].setAttribute("tabindex", -1);

    // Détermine la direction de navigation (1 pour droite, -1 pour gauche)
    const direction = e.keyCode === RIGHT_ARROW ? 1 : -1;
    // Met à jour l'index de focus, en bouclant si nécessaire
    tabFocus = (tabFocus + tabs.length + direction) % tabs.length;

    // Met le focus sur le nouvel onglet
    tabs[tabFocus].setAttribute("tabindex", 0);
    tabs[tabFocus].focus();
  }
}

// Ajoute les écouteurs d'événements à chaque onglet
tabs.forEach((tab) => {
  // Gère le clic sur l'onglet
  tab.addEventListener("click", tabsAnimation);
  // Gère la navigation au clavier
  tab.addEventListener("keydown", arrowNavigation);
});
