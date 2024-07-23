import "../styles/styles.scss";
import logo from "../images/logo.svg";
import hamburgerMenu from "../images/icon-hamburger.svg";

document.addEventListener("DOMContentLoaded", () => {
  const figureElement = document.querySelector("header nav figure");
  const ulElement = document.querySelector("header ul");

  const logoElement = document.createElement("img");
  logoElement.src = logo;
  logoElement.alt = "Logo Insure";

  figureElement.appendChild(logoElement);

  const hamburgerMenuElement = document.createElement("img");
  hamburgerMenuElement.src = hamburgerMenu;
  hamburgerMenuElement.alt = "Hamburger Menu";
  hamburgerMenuElement.className = "header__item header__item--mobile";

  ulElement.appendChild(hamburgerMenuElement);
});
