const API_URL = 'http://localhost:3000/cart';


export async function getCart(userId: number) {
    const response = await fetch(`${API_URL}/${userId}`);
    if (!response.ok) {
        throw new Error('Failed to get cart');
    }
    return response.json();
}

export async function addToCart(userId: number, productId: number, quantity = 1) {
    const response = await fetch(`${API_URL}/add`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, productId, quantity }),
    });
    if (!response.ok) {
        throw new Error('Failed to add to cart');
    }
}

