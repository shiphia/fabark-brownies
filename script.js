let quantities = {
    fudgy:1
};
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

function addToCart(
    name,
    price,
    product){

    let qty =
        quantities[product];

    cart.push({
        name:name,
        price:price,
        qty:qty
    });

    total +=
        price*qty;

    displayCart();
}
function displayCart(){

    let html="";

    cart.forEach(item=>{

        html +=
            `<p>
            ${item.name}
            x ${item.qty}
            = ₹${item.price*item.qty}
            </p>`;
    });

    document.getElementById(
        "cartItems"
    ).innerHTML=html;

    document.getElementById(
        "total"
    ).innerHTML=total;
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
