document.addEventListener("DOMContentLoaded", () => {
    console.log("Website is ready!");

    // Smooth scrolling for internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener("click", function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute("href")).scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
        });
    });

    // Subscription button logic
    const subscriptionButtons = document.querySelectorAll(".subscription-options button");
    subscriptionButtons.forEach(button => {
        button.addEventListener("click", () => {
            const siblingButtons = button.parentElement.querySelectorAll("button");
            siblingButtons.forEach(btn => btn.classList.remove("active"));
            button.classList.add("active");

            const frequency = button.dataset.frequency;
            const itemName = button.closest(".item-card").querySelector("h4").textContent;
            console.log(`Selected ${frequency} subscription for ${itemName}`);
        });
    });

    // Contact form handling
    const contactForm = document.getElementById("contact-form");
    if (contactForm) {
        contactForm.addEventListener("submit", function (e) {
            e.preventDefault();
            const success = true;
            const feedback = document.getElementById("form-feedback");
            if (feedback) {
                feedback.textContent = success ? "Bedankt voor je bericht! We nemen spoedig contact met je op." : "Oeps! Er ging iets mis. Probeer het opnieuw.";
                feedback.className = success ? "success" : "error";
                feedback.style.display = "block";
                setTimeout(() => feedback.style.display = "none", 5000);
            }
            if (success) contactForm.reset();
        });
    }

    // Product search
    const products = [
        { name: 'Product 1', description: 'Description of Product 1' },
        { name: 'Product 2', description: 'Description of Product 2' },
    ];
    function searchProducts() {
        const query = document.getElementById('searchBar').value.toLowerCase();
        const results = products.filter(product => product.name.toLowerCase().includes(query));
        console.log('Search Results:', results);
    }

    // Cart functionality
    let cart = [];
    function addToCart(productName) {
        const itemIndex = cart.findIndex(item => item.name === productName);
        if (itemIndex > -1) {
            cart[itemIndex].quantity += 1;
        } else {
            cart.push({ name: productName, quantity: 1 });
        }
        updateCartCount();
        console.log(`${productName} added to cart.`);
    }
    function updateCartCount() {
        const itemCount = cart.reduce((total, item) => total + item.quantity, 0);
        const cartCountElement = document.getElementById('cartCount');
        if (cartCountElement) {
            cartCountElement.innerText = itemCount;
        }
    }
    function toggleCart() {
        const cartElement = document.getElementById('cart');
        if (cartElement) {
            cartElement.classList.toggle('hidden');
            displayCartItems();
        }
    }
    function displayCartItems() {
        const cartItemsElement = document.getElementById('cartItems');
        if (cartItemsElement) {
            cartItemsElement.innerHTML = '';
            cart.forEach(item => {
                const listItem = document.createElement('li');
                listItem.textContent = `${item.name} (x${item.quantity})`;
                cartItemsElement.appendChild(listItem);
            });
        }
    }

    // Dropdown language selector
    const translations = { /* Same as your translation data */ };
    function switchLanguage(lang) { /* Same as your switchLanguage function */ }
    window.onload = function() {
        const savedLang = localStorage.getItem("selectedLang") || "nl";
        switchLanguage(savedLang);
    };

    // Form validation
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function (event) {
            if (!validateForm(form)) event.preventDefault();
        });
    });
    function validateForm(form) {
        let isValid = true;
        const inputs = form.querySelectorAll('input[required], textarea[required]');
        inputs.forEach(input => {
            if (!input.value.trim()) {
                isValid = false;
                input.classList.add('error');
            } else {
                input.classList.remove('error');
            }
        });
        return isValid;
    }

    // Dynamic content loading
    document.querySelectorAll('.load-content').forEach(button => {
        button.addEventListener('click', function () {
            fetch(this.getAttribute('data-url'))
                .then(response => response.text())
                .then(data => document.querySelector('#content').innerHTML = data)
                .catch(error => console.error('Error loading content:', error));
        });
    });

    // Image slider
    const sliders = document.querySelectorAll('.image-slider');
    sliders.forEach(slider => {
        let currentIndex = 0;
        const images = slider.querySelectorAll('img');
        slider.querySelector('.next').addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % images.length;
            showImage(images, currentIndex);
        });
        slider.querySelector('.prev').addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + images.length) % images.length;
            showImage(images, currentIndex);
        });
        function showImage(images, index) {
            images.forEach((img, i) => img.style.display = i === index ? 'block' : 'none');
        }
        showImage(images, currentIndex);
    });

    // Modal pop-ups
    document.querySelectorAll('[data-modal]').forEach(trigger => {
        trigger.addEventListener('click', function () {
            const modal = document.getElementById(this.getAttribute('data-modal'));
            if (modal) {
                modal.style.display = 'block';
                modal.querySelector('.close').addEventListener('click', () => modal.style.display = 'none');
            }
        });
    });

    // Responsive design enhancements
    function adjustLayout() {
        const navigation = document.querySelector('nav');
        navigation.classList.toggle('mobile', window.innerWidth < 768);
    }
    window.addEventListener('resize', adjustLayout);
    adjustLayout();

    // Input sanitization
    document.querySelectorAll('input, textarea').forEach(input => {
        input.addEventListener('input', function () {
            const temp = document.createElement('div');
            temp.textContent = this.value;
            this.value = temp.innerHTML;
        });
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const languageDropdown = document.getElementById("languageDropdown");
    const languageMenu = document.getElementById("languageMenu");
    const dropdownItems = document.querySelectorAll(".dropdown-item");
    const selectedLanguage = document.getElementById("selectedLanguage");

    // Toggle dropdown visibility
    languageDropdown.addEventListener("click", (event) => {
        event.stopPropagation(); // Prevent click from propagating to document
        languageMenu.classList.toggle("show");
    });

    // Handle language selection
    dropdownItems.forEach(item => {
        item.addEventListener("click", (event) => {
            event.preventDefault(); // Prevent the default link behavior
            const lang = item.getAttribute("data-lang");
            const langText = item.textContent.trim();
            selectedLanguage.textContent = langText;

            // Update page content to selected language
            changeLanguage(lang);

            // Close dropdown
            languageMenu.classList.remove("show");
        });
    });

    // Close dropdown when clicking outside
    document.addEventListener("click", () => {
        languageMenu.classList.remove("show");
    });
});
