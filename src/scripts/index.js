import "../styles/styles.scss";
import logo from "../images/logo.svg";
import hamburgerMenu from "../images/icon-hamburger.svg";
import axios from "axios";

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

//Implementacion citas axios

const apiBaseURL = "http://localhost:3000";

async function renderAppointments() {
  try {
    const response = await axios.get(`${apiBaseURL}/appointments`);
    const appointments = response.data;

    const tableBody = document.getElementById("appointments-table");

    tableBody.innerHTML = "";

    appointments.forEach((appointment) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${appointment.id}</td>
        <td>${appointment.name}</td>
        <td>${appointment.date}</td>
        <td>${appointment.time}</td>
        <td>
          <button onclick = "deleteAppointment(${appointment.id})">Cancelar</button>
        </td>
  `;
      tableBody.appendChild(row);
    });
  } catch (error) {
    console.error("error al obtener citas", error);
  }
}

window.deleteAppointment = async (id) => {
  try {
    await axios.delete(`${apiBaseURL}/appointments/${id}`);
    renderAppointments();
  } catch (e) {
    console.error("Error deleting appointment", e);
  }
};
// Inicializar la tabla al cargar la página

document.addEventListener("DOMContentLoaded", renderAppointments);
