"use client"


export type Item = {
    id: string;
    quantity: number;
    priceUnit: number;
    name: string;
    description: string;
    priceTotal: number | null;
    image: string;
}

export type Cart = {
    idStore: number;
    items: Item[];
};



export function getCart(): Cart | null {
    try {
        const cart = localStorage.getItem("cart");
        
        return cart ? JSON.parse(cart) : null;
    } catch (error) {
        console.error("Error al obtener el carrito:", error);
        return null;
    }
}

export function setCart(cart: Cart) {
    try {
        localStorage.setItem("cart", JSON.stringify(cart));
    } catch (error) {
        console.error("Error al guardar el carrito:", error);
    }
}

export function clearCart() {
    try {
        localStorage.removeItem("cart");
    } catch (error) {
        console.error("Error al limpiar el carrito:", error);
    }
}


export function addToCart( idStore: number,  item: Item):Cart {
    const cart = getCart() || {idStore,  items: [] };
    const index = cart.items.findIndex((i) => i.id === item.id);

    if (index !== -1) {
        cart.items[index].quantity += 1;
        cart.items[index].priceTotal = cart.items[index].priceUnit * cart.items[index].quantity;
    } else {
        cart.items.push({
            ...item,
            priceTotal: item.priceUnit * item.quantity,
        });
    }

    setCart(cart);

    return cart

}

export function removeFromCart( idStore: number, item: Item):Cart {
    const cart = getCart() || { idStore,  items: [] };
    
    const index = cart.items.findIndex((i) => i.id === item.id);

    if (index !== -1) {
        if (cart.items[index].quantity > 1) {
            cart.items[index].quantity -= 1;
            cart.items[index].priceTotal = cart.items[index].priceUnit * cart.items[index].quantity;
        }
        setCart(cart);
    }

    return cart
}

export function removeOneElementFromTheCart(idStore: number, item: Item):Cart {
    const cart = getCart() || { idStore, items: [] };
    const index = cart.items.findIndex((i) => i.id === item.id);

    if (index !== -1) {
        cart.items.splice(index, 1);
        setCart(cart);
    }

    return cart
}


