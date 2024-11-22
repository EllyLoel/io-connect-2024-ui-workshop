// Get the cart button
const cartButton = document.querySelector('button[aria-label="Cart"]');

// Get all add to cart buttons
const addToCartButtons = document.querySelectorAll('button[id^="add-to-cart-"]');

let cartItemCount = 0; // Initialize cart item count

addToCartButtons.forEach(async (button) => {
	button.addEventListener("click", async (event) => {
		cartItemCount++; // Increment cart item count

		// Update cart count
		cartButton.dataset.count = cartItemCount;

		const productCardContainer = button.parentElement.parentElement.parentElement;
		const viewTransitionName = getComputedStyle(productCardContainer).getPropertyValue("view-transition-name");

		const viewTransition = document?.startViewTransition(() => {
			productCardContainer.style.viewTransitionName = "none";
			cartButton.lastElementChild.style.viewTransitionName = viewTransitionName;
		});

		await viewTransition.finished;

		productCardContainer.style.viewTransitionName = viewTransitionName;
		cartButton.lastElementChild.style.viewTransitionName = "none";
	});
});
