const filter = document.getElementById("filter");
const sort = document.getElementById("sort");
const productList = document.querySelector(".most-popular-container");
const filterTargets = document.querySelectorAll(`section .product-card`);

// get the users motion preference
const { matches: motionOK } = window.matchMedia("(prefers-reduced-motion: no-preference)");

// when the user changes the form radio group selected value
filter.addEventListener("input", async (event) => {
	// extract their choice
	const category = event.target.value;

	// this gives each product a unique view transition name
	// only if the user is ok with motion, because this will enable position morphing
	// by default they crossfade which is great for "no motion"
	if (motionOK) {
		filterTargets.forEach((item, index) => {
			item.parentNode.style.viewTransitionName = `product-${index}`;
		});
	}

	// the filter mutation: just display: none if no match
	function filter() {
		filterTargets.forEach((item) => {
			item.parentNode.style.display =
				item.dataset?.categories?.includes(category) || category === "everything" ? null : "none";
		});
	}

	let vt;
	// conditional view transition
	document.startViewTransition ? (vt = document.startViewTransition(() => filter())) : filter();
	if (!vt) return;
	await vt.finished;
	if (motionOK) {
		filterTargets.forEach((item, index) => {
			item.parentNode.style.viewTransitionName = "";
		});
	}
});

sort.addEventListener("input", async (event) => {
	// extract their choice
	const sortType = event.target.value;

	const productCardContainers = Array.from(productList.querySelectorAll(".product-card-container"));

	// this gives each product a unique view transition name
	// only if the user is ok with motion, because this will enable position morphing
	// by default they crossfade which is great for "no motion"
	if (motionOK) {
		productCardContainers.forEach((productCardContainer, index) => {
			productCardContainer.style.viewTransitionName = `product-${index}`;
		});
	}

	// Function to sort products
	function sort() {
		productCardContainers.sort((a, b) => {
			const productNameA = a.querySelector(".product-meta a").textContent.toLowerCase();
			const productNameB = b.querySelector(".product-meta a").textContent.toLowerCase();
			const productPriceA = parseFloat(a.querySelector(".money").textContent.replace("$", ""));
			const productPriceB = parseFloat(b.querySelector(".money").textContent.replace("$", ""));

			switch (sortType) {
				case "accending":
					return productPriceA - productPriceB;
				case "descending":
					return productPriceB - productPriceA;
				case "a-z":
					return productNameA.localeCompare(productNameB);
				case "z-a":
					return productNameB.localeCompare(productNameA);
				default:
					return 0;
			}
		});

		// Re-attach sorted product cards to the list
		productList.innerHTML = "";
		productCardContainers.forEach((card) => productList.appendChild(card));
	}

	let vt;
	// conditional view transition
	document.startViewTransition ? (vt = document.startViewTransition(() => sort())) : sort();
	if (!vt) return;
	await vt.finished;
	if (motionOK) {
		productCardContainers.forEach((productCardContainer, index) => {
			productCardContainer.parentNode.style.viewTransitionName = "";
		});
	}
});
