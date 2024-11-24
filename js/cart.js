// Get the cart button
const cartButton = document.querySelector('button[aria-label="Cart"]');

// Get all add to cart buttons
const addToCartButtons = document.querySelectorAll("button.add-to-cart");

let cartItemCount = 0;

addToCartButtons.forEach(async (button) => {
	button.addEventListener("click", async (event) => {
		cartButton.dataset.count = ++cartItemCount;

		const productCardContainer = button.parentElement.parentElement.parentElement;
		const viewTransitionName = "product";
		productCardContainer.style.viewTransitionName = viewTransitionName;

		const viewTransition = document?.startViewTransition(() => {
			productCardContainer.style.viewTransitionName = "";
			cartButton.lastElementChild.style.viewTransitionName = viewTransitionName;
		});

		await viewTransition.finished;

		cartButton.lastElementChild.style.viewTransitionName = "";
	});
});
