const db = "https://my-json-server.typicode.com/gaizkabucco/json-db/apartments";
const resultContainer = document.querySelector("[data-result-container]");
const favoriteTrue = `<svg version="1.0" xmlns="http://www.w3.org/2000/svg"   width="25px" height="25px" viewBox="0 0 512 512"  pointer-events="none">
            <g transform="translate(0,512) scale(0.1,-0.1)" fill="red">
               <path
                  d="M1140 4665 c-574 -95 -988 -493 -1112 -1069 -32 -147 -31 -417 1 -566 42 -197 129 -392 259 -580 99 -144 172 -230 342 -404 229 -234 457 -432 959 -831 145 -115 423 -337 618 -493 l354 -282 222 178 c122 98 389 310 592 472 636 505 874 709 1125 966 343 352 520 644 591 974 30 140 33 409 5 545 -59 297 -194 548 -400 743 -182 171 -401 284 -661 338 -125 26 -414 27 -533 1 -354 -78 -652 -289 -874 -621 -33 -50 -64 -91 -68 -91 -4 0 -35 41 -69 92 -219 328 -517 540 -866 618 -100 23 -377 28 -485 10z" />
            </g>
         </svg>`;
const favoriteFalse = `<svg version="1.0" xmlns="http://www.w3.org/2000/svg" width="25px" height="25px" viewBox="0 0 512 512" pointer-events="none">
            <g transform="translate(0,512) scale(0.1,-0.1)" fill="#000" stroke="none">
               <path
                  d="M1195 4673 c-242 -31 -477 -123 -657 -258 -266 -200 -447 -493 -515 -832 -24 -122 -24 -394 0 -516 81 -406 338 -789 830 -1234 219 -200 385 -337 867 -722 245 -195 534 -426 642 -513 l197 -158 478 380 c657 523 883 706 1058 856 193 165 498 470 605 604 219 275 344 523 397 787 24 122 24 394 0 516 -84 421 -347 772 -712 951 -193 95 -342 133 -556 143 -299 13 -554 -56 -795 -217   -116 -77 -322 -291 -404 -418 -36 -56 -67 -101 -70 -101 -3 0 -34 45 -70 100 -78 121 -249 305 -364 390 -96 72 -291 170 -396 199 -152 42 -392 61 -535 43z m420 -323 c301 -81 551 -303 718 -637 35 -70 69 -143 75 -161 l11 -33 142 3 141 3 22 55 c165 405 443 679 781 770 112 30 308 37 437 16 496 -81 847 -475 875 -982 26 -477 -233 -887 -952 -1508 -152 -131 -1277 -1033 -1298 -1042 -7-2 -73 44 -147 103 -74 60 -288 229 -475 378 -367 291 -650 523 -785 644 -509 455 -741 765 -831 1116 -33 127 -33 368 -1 498 106 424 417 718 840 793 115 20 345 12 447 -16z" />
            </g>
         </svg>`;

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
