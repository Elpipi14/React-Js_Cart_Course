import Headers from "./components/Header";
import Product from "./components/Products";
import useCart from "./hooks/useCart.js";


function App() {

  const {data, cart, addToCart, removeCart, cleanCart, decreaseQuantity, increaseQuantity, isEmpty,cartTotal} = useCart()

  return (
    <>
      <Headers
        cart={cart}
        removeCart={removeCart}
        increaseQuantity={increaseQuantity}
        decreaseQuantity={decreaseQuantity}
        cleanCart={cleanCart}
        isEmpty={isEmpty}
        cartTotal={cartTotal}
      />

      <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>
        <div className="row mt-5">
          {data.map((guitar) => (
            <Product key={guitar.id} guitar={guitar} addToCart={addToCart} />
          ))}
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
  );
}

export default App;
