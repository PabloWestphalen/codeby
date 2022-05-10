const cart = new Cart();
const products = db.items;

initializeProductSelectScreen();

function initializeProductSelectScreen() {
	const body = document.querySelector("body");
	const product_select = document.getElementById("product-select");

	const getProductElement = (product) => {
		const product_template = `
			                     <header>
			                         <h2>${product.name}</h2>
			                         <p class="from-price">De <span class="original-price">${formatCurrency(
																	product.price
																)}</span></p>
			                     </header>
			                     <main>
			                         <img class="product-image" src="${
																	product.imageUrl
																}" alt="Fotografia do produto ${
			product.name
		}" />
			                     </main>
			                     <footer>
			                         <div class="offer-price">
			                             <div class="price-for">Por <span>${formatCurrency(
																			product.sellingPrice
																		)}</span></div>
			                             <div class="buy-button">Comprar</div>
			                         </div>
			                         <div class="quantity-select">
			                             <input type="button" class="quantity increase" name="more" value="➕" title="Adicionar quantidade" />
			                             <input type="text" name="quantidade" value="1" />
			                             <input type="button" class="quantity decrease" name="less" value="➖" title="Diminuir quantidade" />
			                         </div>
			                     </footer>
			             `;

		const productElement = document.createElement("article");
		productElement.dataset.product_id = product.id;
		productElement.classList.add("product");
		productElement.innerHTML = product_template;
		return productElement;
	};

	products.forEach((product) => {
		product_select.appendChild(getProductElement(product));
	});

	body.addEventListener("click", function (e) {
		let product = null;
		let footer = null;

		if (e.target.classList.contains("buy-button")) {
			footer = e.target.parentNode.parentNode;
		}

		if (e.target.classList.contains("offer-price")) {
			footer = e.target.parentNode;
		}

		if (footer) {
			const productContainer = footer.parentNode;
			const productId = productContainer.dataset.product_id;
			const product = products.find((p) => p.id === productId);
			cart.addProductToCart(product, 1);
			footer.querySelector(".quantity-select").classList.add("visible");
		}
	});

	body.addEventListener("click", function (e) {
		if (e.target.classList.contains("quantity")) {
			const parent = e.target.parentNode;
			const productContainer = parent.parentNode.parentNode;
			const productId = productContainer.dataset.product_id;
			const product = products.find((p) => p.id === productId);
			const quantityInput = parent.querySelector('input[type="text"');
			let quantity = parseInt(quantityInput.value);
			if (e.target.classList.contains("increase")) {
				quantity += 1;
				quantityInput.value = quantity;
				cart.addProductToCart(product, 1);
			} else {
				cart.decreaseProductQuantityFromCart(product, 1);
				if (quantity - 1 >= 1) {
					quantity -= 1;
					quantityInput.value = quantity;
				} else {
					parent.classList.remove("visible");
				}
			}
		}
	});
}

window.addEventListener("cartHasContent", () => {
	document.getElementById("view-cart-wrapper").classList.remove("hidden");
});

window.addEventListener("cartIsEmpty", () => {
	document.getElementById("view-cart-wrapper").classList.add("hidden");
});

document.querySelector("body").addEventListener("click", function (e) {
	if (e.target.classList.contains("btn-view-cart")) {
		document.querySelector(".screen-product-select").classList.add("hidden");
		document.querySelector(".screen-cart").classList.remove("hidden");

		initializeCartScreen();
	}
});

document.querySelector("body").addEventListener("click", function (e) {
	if (e.target.classList.contains("btn-return")) {
		document.querySelector(".screen-product-select").classList.remove("hidden");
		document.querySelector(".screen-cart").classList.add("hidden");

		initializeCartScreen();
	}
});

function initializeCartScreen() {
	const cartProductList = document.getElementById("cart-product-list");
	cartProductList.innerHTML = "";

	const getProductElement = (product) => {
		const product_template = `
                        <header>
                            <img
                                class="product-image"
                                src="${product.imageUrl}"
                                alt="Fotografia do produto ${product.name}"
                            />
                        </header>
                        <main>
                            <h2>${product.name}</h2>
                            <p class="from-price">${formatCurrency(
															product.price
														)}</p>
                            <div class="price-for">${formatCurrency(
															product.sellingPrice
														)}</div>
                            <div class="quantity">Quantidade: ${
															product.quantity
														}</div>
                            <div class="subtotal">Subtotal: ${formatCurrency(
															product.sellingPrice * product.quantity
														)}</div>
                        </main>
                `;

		const productElement = document.createElement("article");
		productElement.dataset.product_id = product.id;
		productElement.classList.add("product");
		productElement.innerHTML = product_template;
		return productElement;
	};

	cart.cart.forEach((product) => {
		cartProductList.appendChild(getProductElement(product));
	});

	const cartTotal = cart.getTotal();

	if (cartTotal / 100 >= 10) {
		document.querySelector(".free-shipping-alert").classList.remove("hidden");
	} else {
		document.querySelector(".free-shipping-alert").classList.add("hidden");
	}

	const formattedCartTotal = formatCurrency(cartTotal);
	document.querySelector(".cart-total").textContent = formattedCartTotal;
}

initializeCartScreen();

document.querySelector('input[type="submit"').addEventListener("click", () => {
	alert("Função não implementada.");
});
