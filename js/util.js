const formatCurrency = (currency) =>
	`R$${new Intl.NumberFormat("pt-BR").format(currency / 100)}`;