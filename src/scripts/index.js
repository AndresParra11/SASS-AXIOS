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
          <button onclick = "deleteAppointment('${appointment.id}')">Cancelar</button>
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

// Función para agregar una nueva cita
document
  .getElementById("add-appointment-form")
  .addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("patient-name").value;
    const date = document.getElementById("appointment-date").value;
    const time = document.getElementById("appointment-time").value;

    try {
      await axios.post(`${apiBaseURL}/appointments`, { name, date, time });
      renderAppointments();
      document.getElementById("add-appointment-form").reset();
    } catch (error) {
      console.error("Error al agregar cita", error);
    }
  });

//Reprogramacion de cita

document
  .getElementById("update-appointment-form")
  .addEventListener("submit", async (event) => {
    event.preventDefault();
    const id = document.getElementById("update-appointment-id").value;
    const nuevaDate = document.getElementById("new-appointment-date").value;
    const nuevaTime = document.getElementById("new-appointment-time").value;

    try {
      const response = await axios.get(`${apiBaseURL}/appointments/${id}`);
      const appointment = response.data;
      await axios.put(`${apiBaseURL}/appointments/${id}`, {
        name: appointment.name,
        date: nuevaDate,
        time: nuevaTime,
      });
      renderAppointments();
    } catch (error) {
      console.error("error al reprogramar", error);
    }
    document.getElementById("update-appointment-form").reset();
  });

// Inicializar la tabla al cargar la página

document.addEventListener("DOMContentLoaded", renderAppointments);
