import {
  selectItem,
  tabItems,
  displayMenu,
  displayProfile,
  profilePage,
} from "./utilities.js";
import { login, loginForm, signUp, signupForm } from "./signup.js";

const productDom = document.querySelector(".product-case");
const cartTotal = document.querySelector(".cart-total");
const cartBtn = document.querySelector(".fa-cart-plus");
const cartOverlay = document.querySelector(".cart-overlay");
const closeBtn = document.querySelectorAll(".fa-times-circle");
const profileBtn = document.querySelectorAll(".fa-user-circle");
const cartDisplay = document.querySelector(".cart-display");
const clearCartBtn = document.querySelector(".clear-cart-btn");
const closeMenu = document.querySelector(".close-menu");
const barMenu = document.querySelector(".fa-bars-staggered");
const profileIcon = document.querySelector(".profile-link");
const search = document.querySelector(".search");
const checkoutBtn = document.querySelector(".checkout-btn");

signupForm.addEventListener("submit", signUp);
loginForm.addEventListener("submit", login);

checkoutBtn.addEventListener("click", () => {
  console.log(123);
});
// Event Listeners
barMenu.addEventListener("click", displayMenu);

closeMenu.addEventListener("click", displayMenu);

tabItems.forEach((item) => item.addEventListener("click", selectItem));

cartBtn.addEventListener("click", () => {
  cartOverlay.classList.toggle("show");
});

closeBtn.forEach((btn) =>
  btn.addEventListener("click", (e) => {
    close = e.target.parentElement.parentElement;
    close.classList.remove("show");
  })
);

profileBtn.forEach((btn) => btn.addEventListener("click", displayProfile));

profileIcon.addEventListener("click", () => {
  profilePage.classList.add("show");
  displayMenu();
});

// Cart array
let cart = [];
// add to cart btn
let buttonsDom = [];

// fetch products
class Products {
  async getProducts(searchText) {
    try {
      let result = await fetch("products.json");
      let data = await result.json();
      let products = data.items;
      products = products.map((item) => {
        const title = item.name_d;
        const price = item.price;
        const id = item.id;
        return { title, price, id };
      });
      return products;
    } catch (error) {}
  }
}

class UI {
  // Display the products to the Dom
  displayProducts(products) {
    let result = "";
    products.forEach((product) => {
      result += `
          <div class="item">
                <img src="./images/5eaf615122919-1.png" alt="charcoal protraits"/>
                <div class="grp">
                  <h4 class="name">John Doe</h4>
                  <h4 class="categories">Abstract</h4>
                </div>
                <small class="title">${product.title}</small>
                <div class="check">
                  <small class="price">$${product.price}</small>
                  <button href="#!" class="plus-cart" data-id=${product.id}>add to cart</button>

                </div>
          </div>
      `;
    });
    productDom.innerHTML = result;
  }

  searchProducts(products) {
    search.addEventListener("input", (e) => {
      const searchText = e.target.value;

      let matches = products.filter((product) => {
        const regex = new RegExp(`^${searchText}`, "gi");
        return product.title.match(regex);
      });

      if (searchText.length === 0) {
        this.displayProducts(products);
      }

      this.outputSearch(matches);
    });
  }

  outputSearch(matches) {
    this.displayProducts(matches);
    this.getBagButtons();
  }

  // Addd to cartBtn functionality
  getBagButtons() {
    const buttons = [...document.querySelectorAll(".plus-cart")];
    buttonsDom = buttons;
    buttons.forEach((button) => {
      let id = button.dataset.id;
      let inCart = cart.find((item) => item.id === id);
      if (inCart) {
        button.innerText = "In cart";
        button.disabled = true;
      }
      button.addEventListener("click", (e) => {
        e.target.innerText = "In Cart";
        e.target.disabled = true;

        // Add item to the cart
        let cartItem = { ...Storage.getProducts(id) };
        cart = [...cart, cartItem];

        // Save cart in storage
        Storage.saveCart(cart);

        // Set cart total values
        this.setCartValues(cart);
        // Add Item to the cart Dom
        this.addCartItem(cartItem);
      });
    });
  }

  // Cart Math
  setCartValues(cart) {
    let tempTotal = 0;
    cart.map((item) => {
      tempTotal += parseFloat(item.price);
    });
    cartTotal.innerText = `${tempTotal}`;
  }

  // Display the item to the Dom
  addCartItem(item) {
    const div = document.createElement("div");
    div.classList.add("cart-items");
    div.innerHTML = `
    <img src="./images/5eaf615122919-1.png" alt="" />
            <div class="cart-info">
              <h2 class="author">john doe</h2>

              <p class="title">${item.title}</p>
              <h4>$${item.price}</h4>
              <small class="description"
                >Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Eveniet provident vitae nihil. Inventore accusamus odit tenetur
                ullam, doloremque totam animi.</small
              >
              <a href="#!" class="remove-item" data-id="${item.id}">remove</a>
            </div>
    `;
    cartDisplay.appendChild(div);
  }

  // Setup the UI and funtionality on DomContentLoaded
  setupAPP() {
    cart = Storage.getCart();
    this.setCartValues(cart);
    this.populateCart(cart);
  }

  // Add every item in the cart to the cartDom
  populateCart(cart) {
    cart.forEach((item) => this.addCartItem(item));
  }

  // cart funtionality
  cartLogic() {
    // eventListener to clear cart
    clearCartBtn.addEventListener("click", () => {
      this.clearCart();
    });

    // remove individual item from the Dom
    cartDisplay.addEventListener("click", (e) => {
      if (e.target.classList.contains("remove-item")) {
        let removeItem = e.target;
        let id = removeItem.dataset.id;
        cartDisplay.removeChild(removeItem.parentElement.parentElement);
        this.removeItem(id);
      }
    });
  }

  // Clear cart logic
  clearCart() {
    let cartItems = cart.map((item) => item.id);
    cartItems.forEach((id) => this.removeItem(id));

    while (cartDisplay.children.length > 0) {
      cartDisplay.removeChild(cartDisplay.children[0]);
    }
  }

  // Remove item from the cart
  removeItem(id) {
    // filter the target id from cart storage
    cart = cart.filter((item) => item.id !== id);
    this.setCartValues(cart);
    Storage.saveCart(cart);
    // reset the add to cartBtn
    let button = this.getSingleButton(id);
    button.disabled = false;
    button.innerHTML = "add to cart";
  }

  getSingleButton(id) {
    return buttonsDom.find((button) => button.dataset.id === id);
  }
}

export class Storage {
  // Save products in the storage
  static saveProduct(products) {
    localStorage.setItem("products", JSON.stringify(products));
  }

  // Get products from the storage
  static getProducts(id) {
    let products = JSON.parse(localStorage.getItem("products"));
    return products.find((product) => product.id === id);
  }

  // save the cart into the storage
  static saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
  }

  // Get items in the cart from storage
  static getCart() {
    return localStorage.getItem("cart")
      ? JSON.parse(localStorage.getItem("cart"))
      : [];
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const ui = new UI();
  const products = new Products();

  ui.setupAPP();

  products
    .getProducts()
    .then((products) => {
      ui.displayProducts(products);
      ui.searchProducts(products);
      Storage.saveProduct(products);
    })
    .then(() => {
      ui.getBagButtons();
      ui.cartLogic();
    });
});
