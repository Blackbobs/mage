export const tabItems = document.querySelectorAll(".tab-item");
const tabContentItems = document.querySelectorAll(".tab-content-item");
const sideMenu = document.querySelector(".side-menu");
export const profilePage = document.querySelector(".outer-profile");
const mainPage = document.querySelectorAll(".main-page");
const signUpBtn = document.querySelector(".signup-btn");
const loginBtn = document.querySelector(".login-btn");
const loginPage = document.querySelector(".alpha");
const signupPage = document.querySelector(".beta");
export const galleryPage = document.querySelector(".delta");

// Switch between tabs
export function selectItem(e) {
  removeBorder();
  removeShow();
  this.classList.add("current");
  const tabContentItem = document.querySelector(`#${this.id}-content`);
  tabContentItem.classList.add("show");
}

// remove border from each tab
export function removeBorder() {
  tabItems.forEach((item) => item.classList.remove("current"));
}

// remove the show class from each tab
export function removeShow() {
  tabContentItems.forEach((item) => item.classList.remove("show"));
}
// display menu
export function displayMenu() {
  sideMenu.classList.toggle("show");
}

// display the profile page
export function displayProfile() {
  profilePage.classList.add("show");
}

export function displayPage(e) {
  displayNone();
  const target = e.target;
  if (target == signUpBtn) {
    signupPage.classList.add("show");
  } else if (target == loginBtn) {
    loginPage.classList.add("show");
  }
}

export function displayNone() {
  mainPage.forEach((page) => page.classList.remove("show"));
}

signUpBtn.addEventListener("click", displayPage);
loginBtn.addEventListener("click", displayPage);
