// CIAO STEFANO, HO FATTO UNA SORTA DI CONTROLLO CON PASSWORD CHE SALVA IN SESSION.STORAGE (FOLLIA!!!) PERO' E' L'UNICO MODO
// CHE HO TROVATO PER EMULARE UN ACCESSO COME ADMIN, LA PASSWORD E' OVVIAMENTE "admin"

// REFERENCES

const myKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWFhMzdjOTE4N2U1YzAwMTgxNGM1ZmQiLCJpYXQiOjE3MDU2NTQyMTcsImV4cCI6MTcwNjg2MzgxN30.dwlmOm09uoZE4RvELUaMpRhXoe-u0AVgL8XR5weQz9k";

const row = document.getElementById("row");

const password = document.getElementById("password");
const greenCircle = document.getElementById("green-circle");

// FUNCTION

const generateCard = function () {
  fetch("https://striveschool-api.herokuapp.com/api/product/", {
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWFhMzdjOTE4N2U1YzAwMTgxNGM1ZmQiLCJpYXQiOjE3MDU2NTQyMTcsImV4cCI6MTcwNjg2MzgxN30.dwlmOm09uoZE4RvELUaMpRhXoe-u0AVgL8XR5weQz9k",
    },
  })
    .then((response) => {
      if (response.ok) {
        console.log(response);
        return response.json();
      } else {
        throw new Error();
      }
    })
    .then((data) => {
      console.log(data);

      //   CREAZIONE DELLE CARD
      data.forEach((book) => {
        const newCol = document.createElement("div");
        newCol.classList.add("col");
        newCol.innerHTML = `
        <div class="card h-100 shadow">
        <img src="${book.imageUrl}" class="card-img-top" alt="${book.name}" />
        <div class="card-body d-flex flex-column justify-content-between">
        <div>
          <h5 class="card-title mb-2">${book.name}</h5>
          <p class="card-text mb-1">Editore: ${book.brand}</p>
        </div>
        <div>
          <p class="card-text text-end">${book.price}€</p>
          <a href="./book-in-depth.html?bookId=${book._id}" class="btn btn-dark w-100">Scopri di Più</a>
        </div>
        </div>
      </div>`;
        row.appendChild(newCol);
      });
    })
    .catch((err) => {
      alert("Oops... something went wrong", err);
    });
};

const isAdmin = function () {
  if (sessionStorage.getItem("password") === "admin") {
    greenCircle.classList.toggle("d-none");
  }
};

const saveAdmin = function () {
  sessionStorage.setItem("password", password.value);
  isAdmin();
};

// ON-GOING

window.onload = generateCard();

if (sessionStorage.getItem("password") === "admin") {
  greenCircle.classList.toggle("d-none");
}
