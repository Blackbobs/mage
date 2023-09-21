export const tabItems = document.querySelectorAll(".tab-item");
const tabContentItems = document.querySelectorAll(".tab-content-item");
const sideMenu = document.querySelector(".side-menu");
export const profilePage = document.querySelector(".outer-profile");

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
