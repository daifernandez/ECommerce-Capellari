const validations = {
  title: (value) =>
    /\D/.test(value) ? null : "El valor ingresado para title es inválido",

  description: (value) =>
    /\D/.test(value) ? null : "El valor ingresado para description es inválido",

  brand: (value) =>
    /^\D+$/.test(value) ? null : "El valor ingresado para brand es inválido",

  slug: (value) =>
    /\D/.test(value) ? null : "El valor ingresado para slug es inválido",

  price: (value) =>
    !isNaN(Number(value.replace(",", "."))) &&
    Number(value.replace(",", ".")) >= 0
      ? null
      : "El valor ingresado para price es inválido",

  inStock: (value) => {
    const inStockValue = parseInt(value);
    return !isNaN(inStockValue) && inStockValue > 0
      ? null
      : "El valor ingresado para inStock es inválido";
  },

  rating: (value) => {
    const ratingValue = parseInt(value);
    return !isNaN(ratingValue) && ratingValue >= 1 && ratingValue <= 5
      ? null
      : "El valor ingresado para rating es inválido";
  },
};

export default validations;
