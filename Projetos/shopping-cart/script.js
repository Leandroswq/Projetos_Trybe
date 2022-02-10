function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}

function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
}

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

async function cartTotalPrice() {
  const cart = document.getElementsByClassName('cart__items')[0];
  const cartItems = Array.prototype.slice.call(cart.children);
  let totalPrice = cartItems.reduce((acc, curl) => {
    let price = curl.querySelector('.cart_item_description').innerText;
    price = price.split('Price: ');
    price = Number(price[price.length - 1]);
    return price + acc;
  }, 0);
  totalPrice = totalPrice.toFixed(2);
  const totalPriceElement = document.getElementsByClassName('total-price')[0];
  totalPriceElement.innerText = totalPrice;
  saveCartItems(cart);
}

function cartItemClickListener(event) {
  // coloque seu código aqui
  if (event.target.classList.contains('cart__item')) {
    event.target.remove();
  } else {
    console.log(event.target.closest('.cart__item'));
    event.target.closest('.cart__item').remove();
  }
  cartTotalPrice();
}

function createCartItemElement({ sku, name, salePrice, image }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.appendChild(createProductImageElement(image));
  const descrition = `${name}
  
  Price: ${salePrice}`;
  const itemDescrition = createCustomElement('div', 'cart_item_description', descrition);
  li.appendChild(itemDescrition);
  li.appendChild(createCustomElement('span', 'item__sku', sku));
  li.addEventListener('click', cartItemClickListener);
  return li;
}

async function addItemToCart(event) {
  const id = getSkuFromProductItem(event.target.parentNode);
  const response = await fetchItem(id);
  const { title, price, thumbnail } = response;
  const objItem = {
    sku: id,
    name: title,
    salePrice: price.toFixed(2),
    image: thumbnail,
  };
  const item = createCartItemElement(objItem);
  const cart = document.getElementsByClassName('cart__items')[0];
  cart.appendChild(item);
  cartTotalPrice();
  saveCartItems(cart);
}

function createProductItemElement({ sku, name, image, salePrice }) {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('span', 'item__price', salePrice));
  const itemAddButton = createCustomElement('button', 'item__add', 'Adicionar ao carrinho!');
  itemAddButton.addEventListener('click', addItemToCart);
  section.appendChild(itemAddButton);

  return section;
}

function noFilledProductItems() {
  const items = document.querySelector('.items');
  if (items.children.length === 0) {
    const div = createCustomElement('div', 'search_fail_container', '');
    const text = 'Infelizmente não encontramos seu item';
    div.appendChild(createCustomElement('spam', 'search_fail', text));
    items.appendChild(div);
  }
}

async function fillProductItems(item) {
  const response = await fetchProducts(item);
  const products = await response.results;
  const section = document.getElementsByClassName('items')[0];
  section.innerHTML = '';
  products.forEach((element) => {
    const { id, title, thumbnail, price } = element;
    const itemObject = {
      sku: id,
      name: title,
      image: thumbnail,
      salePrice: 'R$ '.concat(price.toFixed(2)),
    };
    const elementItem = createProductItemElement(itemObject);
    section.appendChild(elementItem);
  });
  noFilledProductItems();
}

async function loadCartItem(id) {
  const item = await fetchItem(id);
  const { title, price, thumbnail } = item;
  const objItem = {
    sku: id,
    name: title,
    salePrice: price.toFixed(2),
    image: thumbnail,
  };
  return createCartItemElement(objItem);
}

async function loadCart() {
  const cart = document.getElementsByClassName('cart__items')[0];
  const items = JSON.parse(getSavedCartItems());
  if (items !== ''
    && (typeof items === 'object' && items.length !== 0)) {
    items.forEach(async (id) => {
      const item = await loadCartItem(id);
      cart.appendChild(item);
      cartTotalPrice();
    });
  } else {
    const totalPriceElement = document.getElementsByClassName('total-price')[0];
    totalPriceElement.innerText = '0.00';
  }
}

async function clearCart() {
  const cart = document.getElementsByClassName('cart__items')[0];
  const items = Array.prototype.slice.call(cart.children);
  items.forEach((item) => {
    item.remove();
  });
  saveCartItems(cart);
  cartTotalPrice();
}

function addEventoToClearCartButtom() {
  const clearButtton = document.querySelector('button.empty-cart');
  clearButtton.addEventListener('click', clearCart);
}

function searchButtonEvent() {
  const searchInput = document.getElementsByClassName('search_input')[0];
  if (searchInput.value !== '') {
    const search = searchInput.value;
    fillProductItems(search);
    searchInput.value = '';
  }
}

function searchInputEvent(event) {
  const searchInput = event.target;
  if (searchInput.value !== ''
    && event.keyCode === 13) {
    const search = searchInput.value;
    fillProductItems(search);
    searchInput.value = '';
  }
}

window.onload = () => {
  loadCart();
  addEventoToClearCartButtom();
  const searchButton = document.querySelector('.search_button');
  searchButton.addEventListener('click', searchButtonEvent);
  const searchInput = document.querySelector('.search_button');
  searchInput.addEventListener('keyup', searchInputEvent);
};
