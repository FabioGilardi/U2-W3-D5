// REFERENCES

const myKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWFhMzdjOTE4N2U1YzAwMTgxNGM1ZmQiLCJpYXQiOjE3MDU2NTQyMTcsImV4cCI6MTcwNjg2MzgxN30.dwlmOm09uoZE4RvELUaMpRhXoe-u0AVgL8XR5weQz9k";

const nameInput = document.getElementById("name");
const descriptionInput = document.getElementById("description");
const brandInput = document.getElementById("brand");
const priceInput = document.getElementById("price");
const imageUrlInput = document.getElementById("imageUrl");
const form = document.getElementsByTagName("form")[0];

const addressBar = new URLSearchParams(location.search);
const bookId = addressBar.get("bookId");
const title = document.getElementById("title");
const delButton = document.getElementById("delButton");

let myURL;
let usedMethod;

if (sessionStorage.getItem("password") !== "admin") {
  alert(
    "EHI! Non hai il permesso di accedere qui, devi prima fare il login come admin!"
  );
  location.assign("./index.html");
}

const deleteBook = function () {
  fetch(`https://striveschool-api.herokuapp.com/api/product/${bookId}`, {
    method: "DELETE",
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWFhMzdjOTE4N2U1YzAwMTgxNGM1ZmQiLCJpYXQiOjE3MDU2NTQyMTcsImV4cCI6MTcwNjg2MzgxN30.dwlmOm09uoZE4RvELUaMpRhXoe-u0AVgL8XR5weQz9k",
    },
  })
    .then((response) => {
      if (response.ok) {
        alert("Libro eliminato correttamente");
        location.assign("./index.html");
      } else {
        throw new Error();
      }
    })
    .catch((err) => {
      alert("Oops... something went wrong", err);
    });
};

if (bookId) {
  myURL = `https://striveschool-api.herokuapp.com/api/product/${bookId}`;
  usedMethod = "PUT";
} else {
  myURL = "https://striveschool-api.herokuapp.com/api/product/";
  usedMethod = "POST";
}

// FUNCTIONS

const clearForm = function () {
  nameInput.value = "";
  brandInput.value = "";
  descriptionInput.value = "";
  priceInput.value = "";
  imageUrlInput.value = "";
};

const uploadBook = function (e) {
  e.preventDefault();

  const bookInfo = {
    name: nameInput.value,
    description: descriptionInput.value,
    brand: brandInput.value,
    price: parseInt(priceInput.value),
    imageUrl: imageUrlInput.value,
  };

  console.log(bookInfo);

  fetch(myURL, {
    method: usedMethod,
    body: JSON.stringify(bookInfo),
    headers: {
      "Content-Type": "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWFhMzdjOTE4N2U1YzAwMTgxNGM1ZmQiLCJpYXQiOjE3MDU2NTQyMTcsImV4cCI6MTcwNjg2MzgxN30.dwlmOm09uoZE4RvELUaMpRhXoe-u0AVgL8XR5weQz9k",
    },
  })
    .then((response) => {
      if (response.ok) {
        console.log(response);
        alert("Libro aggiunto correttamente");
      } else {
        throw new Error();
      }

      nameInput.value = "";
      brandInput.value = "";
      descriptionInput.value = "";
      priceInput.value = "";
      imageUrlInput.value = "";
    })
    .catch((err) => {
      alert("Oops... something went wrong", err);
    });
};

// ON-GOING

form.addEventListener("submit", uploadBook);

if (bookId) {
  myURL = `https://striveschool-api.herokuapp.com/api/product/${bookId}`;
  usedMethod = "PUT";
  title.innerText = "Modifica/Elimina libro in elenco:";
  delButton.classList.toggle("d-none");

  fetch(`https://striveschool-api.herokuapp.com/api/product/${bookId}`, {
    method: "GET",
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWFhMzdjOTE4N2U1YzAwMTgxNGM1ZmQiLCJpYXQiOjE3MDU2NTQyMTcsImV4cCI6MTcwNjg2MzgxN30.dwlmOm09uoZE4RvELUaMpRhXoe-u0AVgL8XR5weQz9k",
    },
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error();
      }
    })
    .then((book) => {
      nameInput.value = `${book.name}`;
      descriptionInput.value = `${book.description}`;
      brandInput.value = `${book.brand}`;
      priceInput.value = `${book.price}`;
      imageUrlInput.value = `${book.imageUrl}`;
    })
    .catch((err) => {
      alert("Oops... something went wrong", err);
    });
} else {
  myURL = "https://striveschool-api.herokuapp.com/api/product/";
  usedMethod = "POST";
}
