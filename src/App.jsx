import { useState, useEffect } from 'react'
import Guitar from './components/Guitar/Guitar'
import Header from './components/Header/Header'
import { db } from './data/db'
function App() {
  const [data, setData] = useState([])
  const [cart, setCart] = useState([])

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

  return (
    <>
      <Header cart={cart} removeFromCart={removeFromCart} increaseQuantity={increaseQuantity} 
      decreaseQuantity={decreaseQuantity} />

      <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">
          {db.map((guitar) => {
            return (
              <Guitar
                key={guitar.id}
                guitar={guitar}
                addToCart= {addToCart}
              />
            )
          })}
        </div>
      </main>

      <footer className="bg-dark mt-5 py-5">
        <div className="container-xl">
          <p className="text-white text-center fs-4 mt-4 m-md-0">
            GuitarLA - Todos los derechos Reservados
          </p>
        </div>
      </footer>
    </>
  )
}

export default App
