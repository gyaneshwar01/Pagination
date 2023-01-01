import { useState, useEffect } from "react";
import "./App.css";

export default function App() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);

  const fetchData = async () => {
    const res = await fetch("https://dummyjson.com/products");
    const data = await res.json();
    setProducts(data.products);
  };

  const pageLimit = products.length / 5;

  function handleIncrement() {
    setPage((prevPage) => (prevPage !== pageLimit ? prevPage + 1 : prevPage));
  }

  function handleDecrement() {
    setPage((prevPage) => (prevPage > 1 ? prevPage - 1 : prevPage));
  }

  useEffect(() => {
    fetchData();
  }, []);

  const ProductsElement =
    products.length > 0
      ? products.map((product) => (
          <section style={{ backgroundColor: "#eee" }} key={product.id}>
            <div className="container py-5">
              <div className="row justify-content-center">
                <div className="col-md-8 col-lg-6 col-xl-4">
                  <div className="card text-black">
                    <img
                      src={product.thumbnail}
                      className="card-img-top"
                      alt="Apple Computer"
                    />
                    <div className="card-body">
                      <div className="text-center">
                        <h5 className="card-title">{product.brand}</h5>
                        <p className="text-muted mb-4">{product.title}</p>
                      </div>
                      <div>
                        <div className="d-flex justify-content-between">
                          <span>Price</span>
                          <span>${product.price}</span>
                        </div>
                        <div className="d-flex justify-content-between">
                          <span>Rating</span>
                          <span>{product.rating}⭐</span>
                        </div>
                        <div className="d-flex justify-content-between">
                          <span>Stock</span>
                          <span>{product.stock}</span>
                        </div>
                        <div className="d-flex justify-content-between">
                          <span>Discount</span>
                          <span>{product.discountPercentage}%</span>
                        </div>
                      </div>
                      <div className="d-flex justify-content-between total font-weight-bold mt-4">
                        <span>Total</span>
                        <span>
                          $
                          {product.price -
                            (product.discountPercentage / 100) * product.price}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        ))
      : "No items to display";

  return (
    <div className="container">
      {ProductsElement.slice(page * 5 - 5, page * 5)}
      <div className="pagination">
        <span onClick={handleDecrement}>⬅️</span>
        <span>{page}</span>
        <span onClick={handleIncrement}>➡️</span>
      </div>
    </div>
  );
}
