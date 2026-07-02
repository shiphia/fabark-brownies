const sheetURL =
"https://docs.google.com/spreadsheets/d/e/2PACX-1vRoAMNzXmiaJV0KcdTlTQDqSKmDe_gwmV7QvIzFx0UYxTQOY71pa7dEStsg2mRyBKoJoG8sfHSHaQjb/pub?gid=0&single=true&output=csv";
let quantities = {};
let cart=[];
let total=0;

function changeQty(product,value){

    quantities[product]+=value;

    if(quantities[product]<1)
        quantities[product]=1;

    document.getElementById(
        product+"Qty"
    ).innerHTML=
        quantities[product];
}

function addToCart(name,price,product){

    let qty = quantities[product];

    let existing =
        cart.find(
            item =>
            item.name === name
        );

    if(existing){

        existing.qty += qty;

    }else{

        cart.push({
            name:name,
            price:price,
            qty:qty
        });

    }

    total = 0;

    cart.forEach(item=>{
        total +=
            item.price * item.qty;
    });
    quantities[product] = 1;

document.getElementById(
    product + "Qty"
).innerHTML = 1;

    displayCart();
}

function displayCart(){

    let html = "";

    cart.forEach((item,index)=>{

        html += `
            <p>
                ${item.name}
                × ${item.qty}
                = ₹${item.price * item.qty}

                <button
                onclick="removeFromCart(${index})">
                    x
                </button>
            </p>
        `;
    });

    if(html===""){
        html = "No items added yet.";
    }

    document.getElementById(
        "cartItems"
    ).innerHTML = html;

    document.getElementById(
        "total"
    ).innerHTML = total;
}
function removeFromCart(index){

    cart.splice(index,1);

    total = 0;

    cart.forEach(item=>{
        total += item.price * item.qty;
    });

    displayCart();
}
function clearCart(){

    if(confirm(
        "Are you sure you want to clear your cart?"
    )){

        cart = [];

        total = 0;

        displayCart();
    }
}
async function loadProducts(){

    const response = await fetch(sheetURL);
    const csv = await response.text();

    const rows =
        csv.split("\n")
           .slice(1);

    let categories = {};

    rows.forEach(row => {

        const cols = row.split(",");

        if(cols.length < 8)
            return;

        const name =
            cols[0].trim();

        const price =
            cols[1].trim();

        const image =
            cols[2].trim();

        const category =
            cols[3].trim();

        const badge =
            cols[4].trim();

        const description =
            cols[5].trim();

        const available =
            cols[6].trim()
                   .toUpperCase();

        const productId =
            cols[7].trim();

        if(!quantities[productId]){
            quantities[productId] = 1;
        }

        if(available !== "TRUE")
            return;

        if(!categories[category]){
            categories[category] = [];
        }

        categories[category].push(`

            <div class="product-card">

                <img src="images/${image}">

                ${badge ?
                `<div class="badge ${badge.toLowerCase()}">
                    ${badge}
                </div>`
                : ""}

                <h3>${name}</h3>

                <p>${description}</p>

                <h4>₹${price}</h4>

                <div class="quantity">

                    <button onclick="changeQty('${productId}',-1)">
                        −
                    </button>

                    <span id="${productId}Qty">
                        1
                    </span>

                    <button onclick="changeQty('${productId}',1)">
                        +
                    </button>

                </div>

                <button
                    class="add-cart-btn"
                    onclick="addToCart(
                    '${name}',
                    ${price},
                    '${productId}')">

                    Add to Cart

                </button>

            </div>

        `);

    });

    let html = "";

    Object.keys(categories).forEach(category => {

        html += `

            <div class="category-section">

                <h2 class="category-title">
                    ${category}
                </h2>

                <div class="category-products">

                    ${categories[category].join("")}

                </div>

            </div>

        `;
    });

    document.getElementById(
        "productsContainer"
    ).innerHTML = html;
}
loadProducts();
function sendWhatsApp(){

    let name=
        document.getElementById("name").value;

    let phone=
        document.getElementById("phone").value;

    let address=
        document.getElementById("address").value;

    let message=
        "Hello FabARK!%0A%0AI would like to order:%0A";

    cart.forEach(item=>{

    message +=
        "• " +
        item.name +
        " × " +
        item.qty +
        " = ₹" +
        (item.price * item.qty) +
        "%0A";
});

    message +=
        "%0ATotal: ₹"+total+
        "%0A%0AName: "+name+
        "%0APhone: "+phone+
        "%0AAddress: "+address+
        "%0ABangalore delivery.";

    window.open(
        "https://wa.me/918921274668?text="+message,
        "_blank"
    );
}
