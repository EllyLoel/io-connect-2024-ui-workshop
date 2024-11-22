// Copyright 2024 Google LLC

// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at

//     https://www.apache.org/licenses/LICENSE-2.0

// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

// Get the cart button
const cartButton = document.querySelector('button[aria-label="Cart"]');

// Get all add to cart buttons
const addToCartButtons = document.querySelectorAll('button[id^="add-to-cart-"]');

let cartItemCount = 0; // Initialize cart item count

addToCartButtons.forEach(async (button) => {
    button.addEventListener('click', async (event) => {
        cartItemCount++; // Increment cart item count

        // Update cart count
        cartButton.dataset.count = cartItemCount;

        const productCardContainer = button.parentElement.parentElement.parentElement;
        const viewTransitionName = getComputedStyle(productCardContainer).getPropertyValue('view-transition-name');

        const viewTransition = document?.startViewTransition(() => {
            productCardContainer.style.viewTransitionName = 'none';
            cartButton.lastElementChild.style.viewTransitionName = viewTransitionName;
        });

        await viewTransition.finished;

        productCardContainer.style.viewTransitionName = viewTransitionName;
        cartButton.lastElementChild.style.viewTransitionName = 'none';
    });
});
