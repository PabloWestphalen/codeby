class Cart {
	constructor() {
		this.cart = [];
	}

	addProductToCart(product, quantity) {
		const productIndex = this.cart.findIndex((p) => {
			
			return p.id === product.id;
		});
		if (productIndex > -1) {
			!this.cart[productIndex]?.quantity
				? (this.cart[productIndex].quantity = 1)
				: (this.cart[productIndex].quantity += quantity);
		} else {
			const thingToPush = {
				...product,
				quantity,
			};

			this.cart.push(thingToPush);
		}
		window.dispatchEvent(new Event("cartHasContent"));
	}

	decreaseProductQuantityFromCart(product, quantity) {
		const productIndex = this.cart.findIndex((p) => p.id === product.id);
		const newQuantityEqualsZero =
			this.cart[productIndex].quantity - quantity === 0;
		if (productIndex > -1 && !newQuantityEqualsZero) {
			this.cart[productIndex].quantity -= quantity;
		} else {
			this.cart.splice(productIndex, 1);
		}
		if (!this.cart.length) {
			window.dispatchEvent(new Event("cartIsEmpty"));
		}
	}

	getTotal() {
		return this.cart.reduce((carry, p) => {
			return (carry += p.sellingPrice * p.quantity);
		}, 0);
	}
}
