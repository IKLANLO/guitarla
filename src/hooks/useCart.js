import { useState, useEffect, useMemo } from "react"
import { db } from "../data/db"

export const useCart = () => {
    const initialStorage = () => {
        const cartStorage = localStorage.getItem('cart')
        return cartStorage ? JSON.parse(cartStorage) : []
      }
      const [data, setData] = useState([])
      const [cart, setCart] = useState(initialStorage())
    
      useEffect(()=>{
        localStorage.setItem('cart', JSON.stringify(cart))
      }, [cart])
    
      useEffect(() => {
        setData(db)
      }, [])
    
      const addToCart = (item) => {
        const itemExists = cart.findIndex(
          (guitar) => guitar.id === item.id
        )
        
        if (itemExists === -1) {
          item.quantity = 1
          setCart(prevCart => [...prevCart, item])
        } else {
          item.quantity++
          setCart(prevCart => [...prevCart])
        }
        
      }
    
      const removeFromCart = (id) => {
        setCart(prevCart => prevCart.filter(guitar => guitar.id !== id))
      }
    
      const increaseQuantity = (item) => {
          item.quantity++
          setCart(prevCart => [...prevCart])
      }
    
      const decreaseQuantity = (item) => {
        if (item.quantity === 1) {
          removeFromCart(item.id)
        } else {
          item.quantity--
          setCart(prevCart => [...prevCart])
        }
      }
    
      const clearCart = () => {
        setCart([])
      }

      const isEmpty = useMemo(() => cart.length === 0, [cart])
      const cartTotal = useMemo(() => cart.reduce((acc, guitar) => acc + guitar.price * guitar.quantity, 0), [cart])

      return {
        data,
        cart,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        clearCart,
        isEmpty,
        cartTotal,
      }
}