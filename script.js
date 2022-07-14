const ol = document.querySelector('.cart__items');
const total = document.querySelector('.total-price');
const buttonClear = document.querySelector('.empty-cart');

const createProductImageElement = (imageSource) => {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
};

const createCustomElement = (element, className, innerText) => {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
};

const createProductItemElement = ({
  id: sku,
  title: name,
  thumbnail: image,
  price: salePrice,
}) => {
  const section = document.createElement('section');
  section.className = 'item';
  
  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createCustomElement('span', 'item__price', `R$ ${salePrice}`));
  section.appendChild(
    createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'),
    );

  return section;
};

const subtractsTotalAmount = (element) => {
  console.log(element);
  const position = element.indexOf('$') + 1;
  let number = '';
  for (let i = position; i < element.length; i += 1) {
    number += element[i];
  }
  
  const numberTotal = total.innerHTML;
  if (numberTotal === '0,00' || numberTotal === '0') {
    return total.innerHTML;
  }

  total.innerHTML = (numberTotal - parseFloat(number)).toFixed(2);
};

const sumTotalAmount = (price) => {
  const numberTotal = total.innerHTML;
  if (typeof price === 'string') {
    const position = price.indexOf('$') + 1;
    let number = '';
    for (let i = position; i < price.length; i += 1) {
      number += price[i];
    }
    
    total.innerHTML = (parseFloat(numberTotal) + parseFloat(number)).toFixed(2);
    return total.innerHTML;
  }

  total.innerHTML = (parseFloat(numberTotal) + price).toFixed(2);
};

const getSkuFromProductItem = (item) =>
  item.querySelector('span.item__sku').innerText;

const cartItemClickListener = (event) => {
  const string = event.target.parentElement.nextElementSibling;
  subtractsTotalAmount(string.innerHTML);
  
  event.target.parentElement.remove();
  string.remove();
  saveCartItems(ol.innerHTML);
};

const createCartItemElement = ({ title: name, price: salePrice, thumbnail: image }) => {
  const section = document.createElement('section');
  section.className = 'cart-section';
  const sectionPrice = document.createElement('section'); 
  sectionPrice.classList.add('cart-price');
  const img = createProductImageElement(image);
  img.classList.remove('item__image');
  img.classList.add('image__cart');
  
  const buttonCart = createCustomElement('button', 'remove__cart', 'x');
  buttonCart.addEventListener('click', cartItemClickListener);
  
  ol.appendChild(section);
  ol.appendChild(sectionPrice);
  sectionPrice.appendChild(createCustomElement('span', 'price__cart', `R$ ${salePrice}`));
  section.appendChild(img);
  section.appendChild(createCustomElement('li', 'name__cart', name));
  section.appendChild(buttonCart);
  sumTotalAmount(salePrice);
};

const getFetchAndAdd = async () => {
  const section = document.querySelector('.items');
  const { results } = await fetchProducts('computador');
  results.forEach((item) => {
    section.appendChild(createProductItemElement(item));
  });
};

const addEventForButtons = async () => {
  const allButtons = document.querySelectorAll('.item__add');
  const allSpanId = document.querySelectorAll('.item__sku');
  
  allButtons.forEach((items, index) => {
    items.addEventListener('click', async () => {
      const products = await fetchItem(allSpanId[index].innerHTML);
      createCartItemElement(products);
      saveCartItems(ol.innerHTML);
    });
  });
};

buttonClear.addEventListener('click', () => {
  ol.innerHTML = '';
  saveCartItems(ol.innerHTML);
  total.innerHTML = '0.00';
});

const loading = (father) => {
  const p = document.createElement('p');
  p.classList.add('loading');
  p.innerHTML = 'Carregando...';

  father.appendChild(p);
};

const finishedLoading = (father) => {
  father.removeChild(father.firstChild);
};

window.onload = async () => {
  const section = document.querySelector('.items');
  
  loading(section);
  await getFetchAndAdd();
  finishedLoading(section);
  await addEventForButtons();
  
  if (getSavedCartItems()) {
    ol.innerHTML = getSavedCartItems();
    const priceCart = document.querySelectorAll('.price__cart');
    const buttonCart = document.querySelectorAll('.remove__cart');
    priceCart.forEach((price) => {
      sumTotalAmount(price.innerHTML);
    });
    buttonCart.forEach((button) => {
      button.addEventListener('click', cartItemClickListener);
    });
  }
};
