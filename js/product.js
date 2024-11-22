const handleViewTransition = async (event) => {
	const productCard = document.querySelector(".product-card");
	const image = productCard.querySelector("img");
	const name = productCard.querySelector(".product-meta a");
	const type = productCard.querySelector(".product-meta small");
	const note = productCard.querySelector(".product-cost span:not([class])");
	const price = productCard.querySelector(".product-cost .money");
	const button = productCard.querySelector("button");
	const buttonInner = productCard.querySelector("button div");

	image.style.viewTransitionName = "image";
	name.style.viewTransitionName = "name";
	type.style.viewTransitionName = "type";
	note.style.viewTransitionName = "note";
	price.style.viewTransitionName = "price";
	button.style.viewTransitionName = "button";
	buttonInner.style.viewTransitionName = "button-inner";

	event.viewTransition.finished.then(() => {
		image.style.viewTransitionName = "";
		name.style.viewTransitionName = "";
		type.style.viewTransitionName = "";
		note.style.viewTransitionName = "";
		price.style.viewTransitionName = "";
		button.style.viewTransitionName = "";
		buttonInner.style.viewTransitionName = "";
	});
};

window.addEventListener("pagereveal", handleViewTransition);
window.addEventListener("pageswap", handleViewTransition);
