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

const filter = document.getElementById('filter');
const sort = document.getElementById('sort');
const productList = document.querySelector('.most-popular-container');
const filterTargets = document.querySelectorAll(`section .product-card`)

// get the users motion preference
const { matches: motionOK } = window.matchMedia('(prefers-reduced-motion: no-preference)')

// this gives each product a unique view transition name
// only if the user is ok with motion, because this will enable position morphing
// by default they crossfade which is great for "no motion"
if (motionOK) {
	filterTargets.forEach((item, index) => {
		item.parentNode.style.viewTransitionName = `product-${index}`;
	});
}

// when the user changes the form radio group selected value
filter.addEventListener('input', (event) => {
	// extract their choice
	const category = event.target.value;

	// the filter mutation: just display: none if no match
	function filter() {
		filterTargets.forEach((item) => {
			item.parentNode.style.display = item.dataset?.categories?.includes(category) || category === 'everything'
				? null
				: 'none';
		});
	}

	// conditional view transition
	document.startViewTransition
		? document.startViewTransition(() => filter())
		: filter();
});

sort.addEventListener('input', (event) => {
	// extract their choice
	const sortType = event.target.value;

	// Function to sort products
	function sort() {
		const productCards = Array.from(productList.querySelectorAll('.product-card-container'));
	
		productCards.sort((a, b) => {
			const productNameA = a.querySelector('.product-meta a').textContent.toLowerCase();
			const productNameB = b.querySelector('.product-meta a').textContent.toLowerCase();
			const productPriceA = parseFloat(a.querySelector('.money').textContent.replace('$', ''));
			const productPriceB = parseFloat(b.querySelector('.money').textContent.replace('$', ''));
	
			switch (sortType) {
				case 'accending':
					return productPriceA - productPriceB;
				case 'descending':
					return productPriceB - productPriceA;
				case 'a-z':
					return productNameA.localeCompare(productNameB);
				case 'z-a':
					return productNameB.localeCompare(productNameA);
				default:
					return 0;
			}
		});
	
		// Re-attach sorted product cards to the list
		productList.innerHTML = '';
		productCards.forEach((card) => productList.appendChild(card));
	}

	// conditional view transition
	document.startViewTransition
		? document.startViewTransition(() => sort())
		: sort();
});
