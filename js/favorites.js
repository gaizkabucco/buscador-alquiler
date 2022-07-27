// ---------------------------------------------------------------
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
// ---------------------------------------------------------------

const favoritesContainer = document.querySelector("[data-favorites-container]");

const getFavorites = () => {
	const storedItems = JSON.parse(localStorage.getItem("favorites"));
	const favorites = storedItems.filter(elem => elem.favorite);
	return favorites;
};

const displayFavorites = () => {
	const favorites = getFavorites();

	if (favorites.length <= 0) {
		favoritesContainer.innerHTML = `<p>No tienes favoritos aun</p>`;
	} else {
		favorites.forEach(element => {
			const outputContainer = document.createElement("div");
			outputContainer.classList.add("apt-container");

			outputContainer.innerHTML = `
		   <div class="flex bg-white rounded-md w-[80vw] md:w-[60vw] mb-10">
            <div class="img-container rounded-l-md w-1/3">
               <img src=.${element.img[0]} class="object-cover h-full w-full rounded-l-md cursor-pointer" data-details data-id=${element.id}>
            </div>
            <div class="apt-description ml-10 my-4">
						<p>Ubicacion: ${element.city}</p>
						<p>Metros cuadrados: ${element.squareMtr}</p>
						<p>Habitaciones: ${element.bedrooms}</p>
						<p>Baños: ${element.bathrooms}</p>
						<p>Precio: ${element.price}€</p>
               <button data-favorite data-id=${element.id} class="bg-orange-100 rounded-md px-3 py-2 hover:bg-orange-200">${favoriteTrue}</button>
            </div>
         </div>
		   `;
			favoritesContainer.append(outputContainer);
		});
	}
};

displayFavorites();

const deleteFavorites = () => {
	const apartments = JSON.parse(localStorage.getItem("favorites"));
	const favoriteButtons = document.querySelectorAll("[data-favorite]");

	favoriteButtons.forEach(button => {
		button.addEventListener("click", e => {
			let favoriteId = e.target.getAttribute("data-id");
			let selectedApt = apartments.find(({ id }) => id == favoriteId);
			selectedApt.favorite = false;
			localStorage.setItem("favorites", JSON.stringify(apartments));
			favoritesContainer.innerHTML = "";
			displayFavorites();
			deleteFavorites();
			Toastify({
				text: "Elemento eliminado de favoritos",
				duration: 1500,
				position: "left",
			}).showToast();
		});
	});
};

deleteFavorites();

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
					(picturesHTML += `<img class="w-full" src=".${picture}" alt="">`)
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
			favoritesContainer.append(modal);
			const closeButton = document.querySelector("[data-close-modal]");
			closeButton.addEventListener("click", () => {
				favoritesContainer.removeChild(modal);
			});
		});
	});
};

showDetails();
