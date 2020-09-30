

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
// ----------------------------------------->
// Handle Change events on update input
itemList.onchange = function(e) {
    if (e.target && e.target.classList.contains('update')) {
        const name = e.target.dataset.name
        const qty = parseInt(e.target.value)
        updateCart(name, qty)
    }
}

// ----------------------------------------->
// Buttons
const all_items_button = Array.from(document.querySelectorAll("button"))
console.log(all_items_button)

all_items_button.forEach(elt => elt.addEventListener('click', () => {
    addItem(elt.getAttribute('id'), elt.getAttribute('data-price'))
    showItems()
  }))

itemList.onclick = function(e) {
    if (e.target && e.target.classList.contains('remove')) {
        const name = e.target.dataset.name
        removeItem(name)
    }
    else if (e.target && e.target.classList.contains('add-1')) {
        const name = e.target.dataset.name
        addItem(name)
    }
    else if (e.target && e.target.classList.contains('minus-1')) {
        const name = e.target.dataset.name
        removeItem(name, 1)
    }
}

const cart = []
// ----------------------------------------------->
// Add item
function addItem(name, price) {
    for (let i = 0; i < cart.length; i += 1) {
        if (cart[i].name === name) {
            cart[i].qty += 1
            showItems()
            return
        }
        

    }

    const item = { name, price, qty: 1 }
    cart.push(item)
}

// ----------------------------------------------->
// Show items
function showItems() {
    const qty = getQty()
    cartQty.innerHTML = `You have <span class="emph">${qty}</span> 
    item(s) in your cart!`

    let itemStr = ''
    for (let i = 0; i < cart.length; i += 1) {
        const { name, price, qty } = cart[i]

        itemStr += `<li>
        <span class="item-emph">${name}</span>
        <br>$${price} x ${qty} =
        $${qty * price} 
        </li>
        <li>
        <button class="remove" data-name="${name}">Remove</button>
        <button class="minus-1" data-name="${name}"> - </button>
        <button class="add-1" data-name="${name}"> + </button>
        <input class="update" type="number" data-name="${name}">
        </li> `
    }
    itemList.innerHTML = itemStr

    cartTotal.innerHTML = `Total in cart: 
    <span class="emph">$${getTotal()}</span>`
}

// ----------------------------------------------->
// Get qty
function getQty() {
    let qty = 0
    for(let i = 0; i < cart.length; i += 1) {
        qty += cart[i].qty
    }
    return qty
}

// ----------------------------------------------->
// Get total
function getTotal() {
    let total = 0
    for (let i = 0; i < cart.length; i += 1) {
        total += cart[i].price * cart[i].qty
    }

    return total.toFixed(2)

}

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
            showItems()
            return
        }
    }
}

// ------------------------------------------------>
// Update Cart Function
function updateCart(name, qty) {
    for (let i = 0; i < cart.length; i += 1) {
        if (cart[i].name === name) {
            if (qty < 1) {
                removeItem(name)
                return
            }
            cart[i].qty = qty
            showItems()
            return
        }
    }
}

showItems()

