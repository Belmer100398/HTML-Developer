export function initUI() {
    const searchIcon = document.querySelector('.search-icon');
    const searchInput = document.querySelector('.search-input');
    const searchContainer = document.querySelector('.search-container');

    if (searchIcon && searchInput && searchContainer) {
        searchIcon.addEventListener('click', (event) => {
            event.stopPropagation(); 
            searchContainer.classList.toggle('active');
            searchInput.focus();
        });

        document.addEventListener('click', (event) => {
            if (!searchContainer.contains(event.target)) {
                searchContainer.classList.remove('active');
            }
        });
    }

    document.querySelector('.hamburger-menu')?.addEventListener('click', () => {
        console.log("✅ Hamburger click detected");
    });

    // Hamburger menu and mobile nav logic (moved out of nested DOMContentLoaded)
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const mobileNav = document.querySelector('.mobile-nav');

    if (hamburgerMenu && mobileNav) {
        hamburgerMenu.addEventListener('click', (event) => {
            console.log("✅ Hamburger click detected");
            mobileNav.classList.toggle('menu-open');
        });

        document.addEventListener('click', (event) => {
            if (!mobileNav.contains(event.target) && !hamburgerMenu.contains(event.target)) {
                mobileNav.classList.remove('menu-open');
            }
        });
    } else {
        console.log("❌ Menu elements not found");
    }

    const mainImage = document.querySelector('.main-image img');
    const thumbnails = document.querySelectorAll('.thumbnails img');
    const dots = document.querySelectorAll('.dots .dot');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    let currentImageIndex = 0;

    if (mainImage && thumbnails.length) {
        const changeImage = (index) => {
            mainImage.src = thumbnails[index].getAttribute('data-image');
            document.querySelector('.active-thumb')?.classList.remove('active-thumb');
            thumbnails[index].classList.add('active-thumb');
            document.querySelector('.active-dot')?.classList.remove('active-dot');
            dots[index].classList.add('active-dot');
            currentImageIndex = index;
        };

        thumbnails.forEach((thumb, index) => {
            thumb.addEventListener('click', () => changeImage(index));
        });

        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => changeImage(index));
        });

        if (prevBtn && nextBtn) {
            prevBtn.addEventListener('click', () => {
                currentImageIndex = (currentImageIndex - 1 + thumbnails.length) % thumbnails.length;
                changeImage(currentImageIndex);
            });

            nextBtn.addEventListener('click', () => {
                currentImageIndex = (currentImageIndex + 1) % thumbnails.length;
                changeImage(currentImageIndex);
            });
        }
    }

    const flavorRadios = document.querySelectorAll('input[name="flavor"]');
    const purchaseRadios = document.querySelectorAll('input[name="purchase"]');
    const addToCartLink = document.querySelector('.add-to-cart');

    if (flavorRadios.length && purchaseRadios.length && addToCartLink) {
        const updateAddToCartLink = () => {
            const selectedFlavor = document.querySelector('input[name="flavor"]:checked')?.value || 'Default Flavor';
            const selectedPurchase = document.querySelector('input[name="purchase"]:checked')?.value || 'Default Option';
            addToCartLink.textContent = `Add to Cart - ${selectedFlavor}, ${selectedPurchase}`;
            addToCartLink.href = `#${selectedFlavor}-${selectedPurchase}`;
        };

        flavorRadios.forEach(radio => radio.addEventListener('change', updateAddToCartLink));
        purchaseRadios.forEach(radio => radio.addEventListener('change', updateAddToCartLink));
        updateAddToCartLink(); 
    }

    const percentageSections = document.querySelectorAll('.percentage .count');

    const debounce = (func, wait = 50) => {
        let timeout;
        return (...args) => {
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(this, args), wait);
        };
    };

    const startCountUp = (element) => {
        if (element.dataset.counted) return;
        element.dataset.counted = true;

        const target = parseInt(element.getAttribute('data-target'), 10);
        let current = 0;
        const step = Math.ceil(target / 100);

        const updateCount = () => {
            if (current < target) {
                current += step;
                element.textContent = current;
                requestAnimationFrame(updateCount);
            } else {
                element.textContent = target;
            }
        };

        updateCount();
    };

    const isElementInViewport = (element) => {
        const rect = element.getBoundingClientRect();
        return rect.top <= window.innerHeight && rect.bottom >= 0;
    };

    const handleScroll = debounce(() => {
        percentageSections.forEach(section => {
            if (isElementInViewport(section) && !section.dataset.counted) {
                startCountUp(section);
            }
        });
    }, 100);

    window.addEventListener('scroll', handleScroll);
    handleScroll(); 

    document.querySelectorAll(".accordion-header").forEach(item => {
        item.addEventListener("click", function () {
            const content = this.nextElementSibling;
            const icon = this.querySelector(".accordion-icon");

            document.querySelectorAll(".accordion-content").forEach(el => {
                if (el !== content) {
                    el.style.maxHeight = null;
                    el.classList.remove("active");
                    el.previousElementSibling.querySelector(".accordion-icon").textContent = "+";
                }
            });

            if (content.classList.contains("active")) {
                content.style.maxHeight = null;
                content.classList.remove("active");
                icon.textContent = "+";
            } else {
                content.classList.add("active");
                content.style.maxHeight = content.scrollHeight + "px";
                icon.textContent = "−"; 
            }
        });
    });
}

if (typeof window !== "undefined") {
    document.addEventListener('DOMContentLoaded', initUI);
}
