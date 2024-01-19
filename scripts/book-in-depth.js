// REFERENCES
const addressBar = new URLSearchParams(location.search);
const bookId = addressBar.get("bookId");

const row = document.getElementById("row");

// FUNCTIONS

// ON-GOING

fetch(`https://striveschool-api.herokuapp.com/api/product/${bookId}`, {
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
    console.log(book);
    const newCol = document.createElement("div");
    newCol.classList.add("col-12");
    newCol.classList.add("col-md-10");
    newCol.classList.add("col-lg-8");
    newCol.innerHTML = `
            <h1 class="my-3 text-center">${book.name}</h1>
            <div class="d-flex justify-content-center">
                <img class="img-fluid text-center" src="${book.imageUrl}" alt="${book.name}" />
            </div>
            <p class="my-3">
              ${book.description}
            </p>
            <p>Prezzo: ${book.price}€</p>
            <div class="d-flex justify-content-evenly">
              <a class="btn btn-dark w-50" href="./back-office.html?bookId=${book._id}">Modifica</a>
            </div>`;
    row.appendChild(newCol);
  })
  .catch((err) => {
    alert("Oops... something went wrong", err);
  });
