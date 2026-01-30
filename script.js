const mainContainer = document.querySelector(".mainContainer");
const searchBtn = document.querySelector(".searchBtn");
const secondaryContainer = document.querySelector(".secondaryContainer")

fetch("https://www.themealdb.com/api/json/v1/1/search.php?f=a")
    .then(res => res.json())
    .then(data => {
        searchBtn.addEventListener("click", () => {
            const searchBar = document.querySelector(".searchBar");
            const asked = searchBar.value.trim().toLowerCase();
            const newData = data.meals.filter(meal => meal.strMeal.toLowerCase().includes(asked));
            mainContainer.innerHTML = "";
            main(newData);
        });
    })

const main = (data) => {
    if (data.length === 0) {
        mainContainer.html = "";
        const p = document.createElement("p");
        p.innerText = "No Meal Found";
        p.classList.add("fw-bold", "mt-5", "text-center");
        mainContainer.appendChild(p);
        return;
    }
    data.forEach((meal) => {
        mainContainer.html = "";
        const div = document.createElement("div");

        div.classList.add("col-12", "col-sm-6", "col-md-4", "col-lg-3");
        div.innerHTML = `<div class="card h-100">
  <img src=${meal.strMealThumb} class="card-img-top img-fluid" alt="...">
  <div class="card-body">
    <h6 class="card-title">${meal.strMeal}</h6>
    <button class="btn btn-primary detailsBtn">Details</button>
    
  </div>
</div>`;

        div.querySelector(".detailsBtn").addEventListener("click", () => {
            display(meal);
        })
        mainContainer.appendChild(div);
    })
}

const display = (meal) => {
    secondaryContainer.innerHTML = "";

    let ingredients = "";

    for (let i = 1; i <= 20; i++) {
        const item = meal[`strIngredient${i}`];
        if (item && item.trim() !== "")
            ingredients += `<li>${item}</li>`
    }
    const div = document.createElement("div");
    div.classList.add("mx-auto");
    div.innerHTML = `<div class="card h-100">
  <img src=${meal.strMealThumb} class="card-img-top img-fluid" alt="...">
  <div class="card-body">
    <h6 class="card-title">${meal.strMeal}</h6>

    <ul>${ingredients}</ul>
    
  </div>
</div>`;

secondaryContainer.appendChild(div);
}