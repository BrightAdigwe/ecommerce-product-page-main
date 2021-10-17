/* Handle product cart */

const buttonMinus = document.querySelector(".button-minus")
const buttonPlus = document.querySelector(".button-plus");
const cart = document.querySelector(".cart");
const cartLink = document.querySelector(".cart-link");
const cartBadge = document.querySelector(".badge");
const addToCartButton = document.querySelector(".add-to-cart-btn");
const costWrapper = document.querySelector(".cost-wrapper");
const deleteProduct = document.querySelector(".delete-product");

let productCountSpan = document.querySelector(".product-count");
let productCount = +productCountSpan.innerText;
let itemsIncart = 0;
let productPrice = +document.querySelector(".product-price").innerText.replace("$", "");


const disabledOrEnableButtonMinus = () => {
    if(productCount == 0 || productCount < 0) {
        addToCartButton.classList.add('disabled')
        buttonMinus.classList.add('disabled')
    }else {
        buttonMinus.classList.remove('disabled')
        addToCartButton.classList.remove('disabled')
    }
}

disabledOrEnableButtonMinus();

const updateProductCountSpan = () => {
    productCountSpan.innerText = productCount;
}

const updateCartBadge = () => {
    itemsIncart = productCount;
    if(itemsIncart == 0) {
        cartBadge.innerText = "";
    }else {
        cartBadge.innerText = itemsIncart;
    }
    updateCart();
}


const updateCart = () => {
    if (itemsIncart > 0) {
        cart.classList.remove("empty");
        costWrapper.innerHTML = `$${productPrice}.00 x ${itemsIncart} <b>$${productPrice * itemsIncart}.00</b>`
        
    }else {
        cart.classList.add("empty")
    }
}

buttonMinus.onclick = () => {
    if(productCount !== 0 || productCount > 0) {
        productCount--;
    }
    if(itemsIncart > 0) {
        updateCartBadge();
    }
    disabledOrEnableButtonMinus();
    updateProductCountSpan();
}

buttonPlus.onclick = () => {
    productCount++;
    if(itemsIncart > 0) {
        updateCartBadge();
    }
    disabledOrEnableButtonMinus();
    updateProductCountSpan();
}

addToCartButton.onclick = () => {
    updateCartBadge();
}

cartLink.onclick= () => {
    cart.classList.toggle("show");
}

deleteProduct.onclick = () => {
    itemsIncart = 0;
    productCount = 0;
    updateCartBadge();
    disabledOrEnableButtonMinus();
    updateProductCountSpan();
}

/* Handle modal and sliders */

const productImages = document.querySelectorAll(".product-image");

const imageOptionWrappers = document.querySelectorAll(".image-option-wrapper");
const imageOptions = document.querySelectorAll(".image-option");
const productImage = document.querySelector(".product-image");
const productModal = document.querySelector(".product-modal");
const closeProductModal = document.querySelector(".close-product-modal");

const prevButtons = document.querySelectorAll(".prev");
const nextButtons = document.querySelectorAll(".next");
const totalImages = imageOptionWrappers.length;
const totalIndexes = totalImages - 1;
let imageIndex = 0;

prevButtons.forEach(prevButton => {
    prevButton.onclick = () => {
        if(imageIndex  > 0){
            imageIndex --;
        }else {
            imageIndex = totalIndexes;
        }
        setProductImage(imageOptions[imageIndex]);
    }
})

nextButtons.forEach(nextButton => {
    nextButton.onclick = () => {
        if(imageIndex  < totalIndexes){
            imageIndex ++;
        }else {
            imageIndex = 0;
        }
        setProductImage(imageOptions[imageIndex]);
    }
})

productImages[0].onclick = () => {
    if(window.screen.width > 375) {
        productModal.classList.add("show");
    }
}

closeProductModal.onclick = () => {
    productModal.classList.remove("show");
}

const setProductImage = (el) => {
    imageOptionWrappers.forEach(imageOptionWrapper => {
        imageOptionWrapper.classList.remove("active");
    });
    let imageSelected = el;
    let imageSelectedAbsolutePath = imageSelected.src;
    let imageRelativePath = `./images${imageSelectedAbsolutePath.split("/images").pop()}`;
    
    let imageSelectedOptions = document.querySelectorAll(`[src="${imageRelativePath}"]`)
    imageSelectedOptions.forEach(imageSelectedOption => {
        imageSelectedOption.parentElement.classList.add("active");
    })
    
    let productImagePath = imageRelativePath.replace("-thumbnail", "");
    
    productImages.forEach(productImage => {
        productImage.src = productImagePath; 
    });
}


imageOptions.forEach(imageOption => {
    imageOption.onclick = (el) => {
        setProductImage(el.target);
    }
})



const mobileMenu = document.querySelector(".mobile-menu");
const mobileMenuHamburger = document.querySelector(".mobile-menu-hamburger");
const mobileMenuClose = document.querySelector(".mobile-menu-close");

mobileMenuHamburger.onclick = () => {
    mobileMenu.classList.add("show");
}

mobileMenuClose.onclick = () => {
    mobileMenu.classList.remove("show");
}