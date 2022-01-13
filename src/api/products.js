export const fetchProducts = async () => {
    const response = await fetch('/api/products/fetch', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        }
    })
    const result = await response.json();

    return result;
}

export const addProduct = async (data) => {
    const response = await fetch('/api/products/add', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data }),
    })
    const result = await response.json();

    return result;
}

export const updateProduct = async (data) => {
    const response = await fetch('/api/products/update', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data }),
    })
    const result = await response.json();

    return result;
}

export const deleteProduct = async (data) => {
    const response = await fetch('/api/products/delete', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data }),
    })
    const result = await response.json();

    return result;
}
