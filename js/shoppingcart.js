let mobileMenu = ()=> {
    var menu = document.querySelector('.mobile-menu')
    var bt = document.querySelector('.bt')

    let toggleMenu = ()=>{
        menu.classList.toggle('hidden')
        menu.classList.toggle('flex')
    }

    bt.addEventListener('click', toggleMenu)
    menu.addEventListener('click', toggleMenu)
}

document.addEventListener('DOMContentLoaded', mobileMenu)

let allProducts = [
    { id: 1, title: 'Football Ball', price: 66, img: '../img/product 1.jpg', count: 1 },
    { id: 2, title: 'Volleyball Ball', price: 59, img: '../img/product 2.jpg', count: 1 },
    { id: 3, title: 'Basketball', price: 57.42, img: '../img/product 3.jpg', count: 1 },
    { id: 4, title: 'Ping Pong Racket', price: 86, img: '../img/product 4.jpg', count: 1 },
    { id: 5, title: 'Tennis Racket', price: 95, img: '../img/product 5.jpg', count: 1 },
    { id: 6, title: 'Badminton Racket', price: 38, img: '../img/product 6.jpg', count: 1 },
    { id: 7, title: 'Billiard Cue', price: 23, img: '../img/product 7.jpg', count: 1 },
    { id: 8, title: 'Golf Stick', price: 28, img: '../img/product 8.jpg', count: 1 },
    { id: 9, title: 'Bowling Ball', price: 40, img: '../img/product 9.jpg', count: 1 }
]

let userBasket = []

let $ = document
const shopItemsContainer = $.querySelector('.shop-items')
const bastekProductsContainer = $.querySelector('.cart-items')
const removeAllProductsBtn = $.querySelector('#remove-all-products')
const cartTotalPriceElem = $.querySelector('.cart-total-price')

let productsFragment = $.createDocumentFragment()

allProducts.forEach(function (product) {
    let productContainer = $.createElement('div')
    productContainer.className = 'mx-7 my-8 border-teal-400 border-4 rounded-md bg-green-400 bg-opacity-60 p-5'

    let productTitleP = $.createElement('p')
    productTitleP.className = 'sm:text-xl text-l text-center mb-5 dark:text-white'
    productTitleP.innerHTML = product.title

    let productImageElem = $.createElement('img')
    productImageElem.className = 'sm:size-80 size-48 rounded-lg'
    productImageElem.setAttribute('src', product.img)

    let productDetailsContainer = $.createElement('div')
    productDetailsContainer.className = 'flex justify-between mt-3'

    let productPriceP = $.createElement('p')
    productPriceP.innerHTML = '$' + product.price
    productPriceP.className = 'sm:text-xl text-l dark:text-white'

    let prodcutAddButton = $.createElement('button')
    prodcutAddButton.innerHTML = 'Add to cart'
    prodcutAddButton.className = 'sm:text-xl text-l p-3 rounded-md text-black hover:text-white bg-blue-400 hover:bg-blue-800 dark:text-white dark:hover:text-black dark:hover:bg-blue-400 dark:bg-blue-800'
    prodcutAddButton.addEventListener('click', function () {
        addProductToBasketArray(product.id)
    })

    productDetailsContainer.append(productPriceP, prodcutAddButton)
    productContainer.append(productTitleP, productImageElem, productDetailsContainer)

    productsFragment.append(productContainer)

})

shopItemsContainer.append(productsFragment)

function addProductToBasketArray(productId) {

    let mainProduct = allProducts.find(function (product) {
        return product.id === productId
    })

    userBasket.push(mainProduct)

    basketProductsGenerator(userBasket)
    calcTotalPrice(userBasket)
}

function basketProductsGenerator(userBasketArray) {
    bastekProductsContainer.innerHTML = ''

    userBasketArray.forEach(function (product) {

        let basketProductContainer = $.createElement('div')
        basketProductContainer.className = 'flex flex-row justify-around place-content-center text-center mt-5 py-5'

        let basketProductDetailsContainer = $.createElement('div')
        basketProductDetailsContainer.className = 'flex flex-row basis-4/12 place-content-center border-4 rounded-md bg-orange-400 bg-opacity-80 p-5 dark:text-white'

        let basketProductImg = $.createElement('img')
        basketProductImg.setAttribute('src', product.img)
        basketProductImg.className = 'size-16 rounded-md'

        let basketProductTitleSpan = $.createElement('span')
        basketProductTitleSpan.className = 'ml-4 mt-5 sm:text-lg text-md'
        basketProductTitleSpan.innerHTML = product.title

        basketProductDetailsContainer.append(basketProductImg, basketProductTitleSpan)

        let basketProductPriceSpan = $.createElement('span')
        basketProductPriceSpan.className = 'basis-2/12 sm:text-lg text-md border-4 rounded-md bg-orange-400 bg-opacity-80 p-5 content-center dark:text-white'
        basketProductPriceSpan.innerHTML = '$' + product.price

        let basketProductInputsContainer = $.createElement('div')
        basketProductInputsContainer.className = 'basis-3/12 border-4 rounded-md bg-orange-400 bg-opacity-80 p-5 content-center'

        let basketProductInput = $.createElement('input')
        basketProductInput.className = 'cart-quantity-input'
        basketProductInput.value = product.count
        basketProductInput.setAttribute('type', 'number')
        basketProductInput.className = 'size-10 rounded-md pl-2'
        basketProductInput.addEventListener('change', function () {
            updateProductCount(product.id, basketProductInput.value)
        })

        let basketProductRemoveBtn = $.createElement('button')
        basketProductRemoveBtn.className = 'ml-5 mt-5 sm:text-lg text-md p-4 bg-red-400 hover:bg-red-600 hover:text-white dark:hover:bg-red-400 dark:bg-red-600 dark:hover:text-black dark:text-white rounded-lg'
        basketProductRemoveBtn.innerHTML = 'Remove'
        basketProductRemoveBtn.addEventListener('click', function () {
            removeProductFromBasket(product.id)
            updateProductCount(product.id, basketProductInput.value)
        })

        basketProductInputsContainer.append(basketProductInput, basketProductRemoveBtn)

        basketProductContainer.append(basketProductDetailsContainer, basketProductPriceSpan, basketProductInputsContainer)

        bastekProductsContainer.append(basketProductContainer)

    })
}

function removeProductFromBasket(productId) {

    userBasket = userBasket.filter(function (product) {
        return product.id !== productId
    })

    basketProductsGenerator(userBasket)
}

removeAllProductsBtn.addEventListener('click', function () {
    userBasket = []
    basketProductsGenerator(userBasket)
    cartTotalPriceElem.innerHTML = '$0'
})

function calcTotalPrice(userBasketArray) {
    let totalPriceValue = 0

    userBasketArray.forEach(function (product) {
        totalPriceValue += product.count * product.price
    })

    cartTotalPriceElem.innerHTML = '$' + totalPriceValue
}

function updateProductCount(productId, newCount) {
    userBasket.forEach(function (product) {
        if (product.id === productId) {
            product.count = newCount
        }
    })
    calcTotalPrice(userBasket)
}