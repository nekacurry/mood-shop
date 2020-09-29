

const itemList = document.getElementById('item-list')
const cartQty = document.getElementById('cart-qty')
const cartTotal = document.getElementById('cart-total')
const itemsContainer = document.getElementById('items')

import data from './data.js'

for (let i=0; i<data.length; ++i) {
    // create a new div element and give it a class name
    let newDiv = document.createElement('div');
    newDiv.className = 'item'

    // create an image element
    let img = document.createElement('img');
    // this will change each time we go through the loop.
    img.src = data[i].image
    img.width = 300
    img.height = 300
     // Add the image to the div
    newDiv.appendChild(img)

    let desc = document.createElement('P')
    desc.innerText =data[i].desc
    newDiv.appendChild(desc)

    let price = document.createElement('P')
    price.innerText =data[i].price
    newDiv.appendChild(price)

    let button = document.createElement('button')
    button.id = data[i].name
    button.dataset.price = data[i].price
    button.innerHTML = "Add to Cart"
    newDiv.appendChild(button)
    button.className = 'buttons'

    itemsContainer.appendChild(newDiv)
}

const all_items_button = Array.from(document.querySelectorAll("button"))
console.log(all_items_button)

all_items_button.forEach(elt => elt.addEventListener('click', () => {
    addItem(elt.getAttribute('id'), elt.getAttribute('data-price'))
    showItems()
  }))

const cart = []

// ----------------------------------------------->
// Add item
function addItem(name, price) {
    for (let i = 0; i < cart.length; i += 1) {
        if (cart[i].name === name) {
            cart[i].qty += 1
            return
        }

    }

    const item = { name, price, qty: 1 }
    cart.push(item)
}

// <-----------------------------------------------

// ----------------------------------------------->
// Show items
function showItems() {
    const qty = getQty()
    cartQty.innerHTML = `You have ${qty} items in your cart!`

    let itemStr = ''
    for (let i = 0; i < cart.length; i += 1) {
        const { name, price, qty } = cart[i]

        itemStr += `<li>
        ${name} 
        $${price} x ${qty} =
        ${qty * price} 
        </li> `
    }
    itemList.innerHTML = itemStr

    cartTotal.innerHTML = `Total in cart: $${getTotal()}`
}

// <-----------------------------------------------

// ----------------------------------------------->
// Get qty
function getQty() {
    let qty = 0
    for(let i = 0; i < cart.length; i += 1) {
        qty += cart[i].qty
    }
    return qty
}

// <-----------------------------------------------

// ----------------------------------------------->
// Get total
function getTotal() {
    let total = 0
    for (let i = 0; i < cart.length; i += 1) {
        total += cart[i].price * cart[i].qty
    }

    return total.toFixed(2)

}

// <-----------------------------------------------

// ----------------------------------------------->
// Remove item
function removeItem(name, qty = 0) {
    for (let i = 0; i < cart.length; i += 1) {
        if (cart[i].name === name) {
            if (qty > 0) {
                cart[i].qty -= 1
            }
            if (cart[i].qty < 1 || qty === 0) {
                cart.splice(i, 1)
            }
            return
        }
    }
}

// <-----------------------------------------------

addItem('Happy', 0.99)
addItem('Angry', 2.49)
addItem('Curiousity', 1.99)
addItem('Tears', 5.99)
addItem('Happy', 0.99)
addItem('Happy', 0.99)
addItem('Curiousity', 1.99)
addItem('Angry', 2.49)

showItems()

removeItem('Happy', 1)
removeItem('Tears')

showItems()

