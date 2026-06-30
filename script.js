let cart=[];
let total=0;

function addToCart(name,price){

    cart.push({
        name:name,
        price:price
    });

    total+=price;

    displayCart();
}

function displayCart(){

    let html="";

    cart.forEach(item=>{
        html += `<p>${item.name} - ₹${item.price}</p>`;
    });

    document.getElementById("cartItems").innerHTML=html;
    document.getElementById("total").innerHTML=total;
}

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
            "• "+item.name+
            " - ₹"+item.price+"%0A";
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
