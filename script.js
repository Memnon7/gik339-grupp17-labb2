// b-Upp 7: Vänta på att hela DOM:en har laddats innan fetchData-funktionen körs

document.addEventListener("DOMContentLoaded", () => {
  fetchData();
});

// Upp 7: Hämta in data ifrån servern samt logga resultatet
async function fetchData() {
  const url = "http://localhost:3000/users";

  // Användes fetch API så att hämta datan
  fetch(url)
    .then((response) => response.json())
    .then((users) => {
      console.log("Användararray:", users);
    })
    .catch((error) => {
      console.error("Fel vid hämtning av data:", error);
    });

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Något gick fel med förfrågan: " + response.statusText);
  }
  const users = await response.json();
  createUsersList(users);
}
// s-Upp 7: Skapas en lista med användare samt lägger till den i DOM:en
function createUsersList(users) {
  const ul = document.createElement("ul");
  ul.className = "user-list";

  users.forEach((user) => {
    const li = document.createElement("li");

    // Antag att varje user-objekt har egenskaperna firstName, lastName och username
    li.textContent = `${user.firstName} ${user.lastName} - ${user.username}`;
    li.style.backgroundColor = user.color;
    li.style.color = "white"; // För vit textfärg om bakgrunden är mörk
    ul.appendChild(li);
  });

  document.getElementById("userList").appendChild(ul);
}
