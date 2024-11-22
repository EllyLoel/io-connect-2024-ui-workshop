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

const handleViewTransition = async (event) => {
	debugger;
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

	await event.viewTransition.finished;

	image.style.viewTransitionName = "";
	name.style.viewTransitionName = "";
	type.style.viewTransitionName = "";
	note.style.viewTransitionName = "";
	price.style.viewTransitionName = "";
	button.style.viewTransitionName = "";
	buttonInner.style.viewTransitionName = "";
};

window.addEventListener("pagereveal", handleViewTransition);
window.addEventListener("pageswap", handleViewTransition);
