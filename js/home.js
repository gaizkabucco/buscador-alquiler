// ---------------------------------------
const db = "https://my-json-server.typicode.com/gaizkabucco/json-db/apartments";
const getData = async () => {
	if (!localStorage.getItem("favorites")) {
		try {
			const res = await fetch(db);
			const data = await res.json();
			localStorage.setItem("favorites", JSON.stringify(data));
		} catch (error) {
			console.error(error);
		}
	}
};

const getStoredItems = async () => {
	await getData();
	return JSON.parse(localStorage.getItem("favorites"));
};
// ---------------------------------------

const favorites = [];
const selectList = document.querySelector("[data-select]");
const searchButton = document.querySelector("[data-search-button]");

const getCities = async () => {
	const cities = [];
	const data = await getStoredItems();
	data.forEach(elem => {
		cities.push(elem.city);
	});
	const displayCities = [...new Set(cities)];
	displayCities.forEach(city => {
		selectList.innerHTML += `
      <option value="${city}">${city}</option>
      `;
	});
};

getCities();

searchButton.addEventListener("click", e => {
	e.preventDefault();
	resultContainer.innerHTML = "";
	let searchValue = document.querySelector("[data-select]").value;
	filterResults(searchValue);
});

const filterResults = async value => {
	const result = await getStoredItems();
	const filteredResults = result.filter(item => item.city === value);
	return displayResults(filteredResults);
};

const displayResults = arr => {
	arr.forEach(element => {
		const outputContainer = document.createElement("div");
		outputContainer.classList.add("apt-container");
		const elementFavorite = element.favorite ? favoriteTrue : favoriteFalse;

		outputContainer.innerHTML = `
		<div class="flex bg-white rounded-md w-[80vw] md:w-[60vw] mb-10">
         <div class="img-container rounded-l-md w-1/3">
            <img src=${element.img[0]} class="object-cover h-full w-full rounded-l-md cursor-pointer" data-details data-id=${element.id}>
         </div>
         <div class="apt-description ml-10 my-4">
				<p>Ubicacion: ${element.city}</p>
            <p>Metros cuadrados: ${element.squareMtr}</p>
            <p>Habitaciones: ${element.bedrooms}</p>
            <p>Baños: ${element.bathrooms}</p>
            <p>Precio: ${element.price}€</p>
            <button data-favorite data-id=${element.id} class="bg-orange-100 rounded-md px-3 py-2 hover:bg-orange-200">${elementFavorite}</button>
         </div>
      </div>
		`;

		resultContainer.append(outputContainer);
	});
	addToFavorites();
	showDetails();
};

const addToFavorites = async () => {
	const apartments = await getStoredItems();
	const addFavoriteButtons = document.querySelectorAll("[data-favorite]");
	addFavoriteButtons.forEach(button => {
		button.addEventListener("click", e => {
			let favoriteId = e.target.getAttribute("data-id");
			let selectedApt = apartments.find(({ id }) => id == favoriteId);
			if (!selectedApt.favorite) {
				selectedApt.favorite = true;
				localStorage.setItem("favorites", JSON.stringify(apartments));
				button.innerHTML = favoriteTrue;
				Toastify({
					text: "Elemento agregado a favoritos",
					duration: 1500,
					position: "left",
				}).showToast();
			} else {
				selectedApt.favorite = false;
				localStorage.setItem("favorites", JSON.stringify(apartments));
				button.innerHTML = favoriteFalse;
				Toastify({
					text: "Elemento eliminado de favoritos",
					duration: 1500,
					position: "left",
				}).showToast();
			}
		});
	});
};

const showDetails = async () => {
	const apartments = await getStoredItems();
	const detailsButtons = document.querySelectorAll("[data-details]");

	detailsButtons.forEach(button => {
		button.addEventListener("click", e => {
			let detailId = e.target.getAttribute("data-id");
			let selectedApt = apartments.find(({ id }) => id == detailId);
			let picturesHTML = "";
			selectedApt.img.forEach(
				picture =>
					(picturesHTML += `<img class="w-full" src="${picture}" alt="">`)
			);
			const modal = document.createElement("div");
			modal.classList.add(
				"bg-black",
				"bg-opacity-60",
				"fixed",
				"top-0",
				"bottom-0",
				"left-0",
				"right-0"
			);
			modal.innerHTML = `
				<div
					class="bg-white fixed w-4/5 max-w-4xl h-4/5 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 overflow-hidden">
					<button class="fixed top-2 right-7 bg-orange-500 py-2 px-3 rounded-md" data-close-modal >X</button>
					<div class="max-h-full overflow-y-scroll">
						${picturesHTML}
					</div>
				</div>
      
			`;
			resultContainer.append(modal);
			const closeButton = document.querySelector("[data-close-modal]");
			closeButton.addEventListener("click", () => {
				resultContainer.removeChild(modal);
			});
		});
	});
};
