async function addProductCart(pid) {
  // Hardcode cartId
  const cart = "647cedd1f9a796562080ab13"

  try {
    const res = await fetch(`/api/carts/${cart}/products/${pid}`, {
      method: 'POST'
    })

    if (res.ok) {
      return await res.json(), alert(`Product added to the following cart: ${cart}`)
    } else {
      throw new Error(res.error)
    }
  } catch (error) {
    console.error(error)
  }
}
