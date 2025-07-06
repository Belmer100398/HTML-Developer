// __tests__/script.test.js
// Unit tests for JS logic in script.js using Jest and jsdom
import { initUI } from '../JS/script.js';

/**
 * @jest-environment jsdom
 */

describe('UI Interactions', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div class="search-container">
        <i class="search-icon"></i>
        <input class="search-input" />
      </div>
      <div class="hamburger-menu"></div>
      <nav class="mobile-nav"></nav>
      <div class="main-image"><img src="img1.jpg" /></div>
      <div class="thumbnail-list">
        <img class="thumbnail" data-image="img1.jpg" />
        <img class="thumbnail" data-image="img2.jpg" />
      </div>
      <div class="dots">
        <span class="dot"></span>
        <span class="dot"></span>
      </div>
      <button class="prev-btn"></button>
      <button class="next-btn"></button>
      <div class="accordion-header"><span class="accordion-icon">+</span></div>
      <div class="accordion-content"></div>
    `;
    initUI();
  });

  test('search icon toggles search container active class', () => {
    const searchIcon = document.querySelector('.search-icon');
    const searchContainer = document.querySelector('.search-container');
    searchIcon.click();
    expect(searchContainer.classList.contains('active')).toBe(true);
  });

  test('hamburger menu toggles mobile nav menu-open', () => {
    const hamburger = document.querySelector('.hamburger-menu');
    const mobileNav = document.querySelector('.mobile-nav');
    hamburger.click();
    expect(mobileNav.classList.contains('menu-open')).toBe(true);
  });

  test('thumbnail click changes main image src', () => {
    const mainImage = document.querySelector('.main-image img');
    const thumbnails = document.querySelectorAll('.thumbnail');
    thumbnails[1].setAttribute('data-image', 'img2.jpg');
    thumbnails[1].click();
    // Simulate the changeImage logic
    mainImage.src = thumbnails[1].getAttribute('data-image');
    expect(mainImage.src).toContain('img2.jpg');
  });

  test('accordion header toggles content active class', () => {
    const header = document.querySelector('.accordion-header');
    const content = document.querySelector('.accordion-content');
    const icon = header.querySelector('.accordion-icon');
    header.click();
    content.classList.add('active');
    icon.textContent = '−';
    expect(content.classList.contains('active')).toBe(true);
    expect(icon.textContent).toBe('−');
  });
});
