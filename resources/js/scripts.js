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

const cart = [ ]

function addItem(name, price) {
    const item = { name: name, price: price, qty: 1 }
    cart.push(item)
}

function showItems() {
    console.log(`You have ${cart.length} items in your cart!`)
}

addItem("Happy", 0.99)
addItem("Angry", 2.49)
addItem("Curiousity", 1.99)
addItem("Tears", 5.99)

showItems()

