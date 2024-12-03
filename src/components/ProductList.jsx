import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const ProductList = () => {
  const location = useLocation();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    // Fetch all products
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://fakestoreapi.com/products");
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    // Extract query parameters
    const queryParams = new URLSearchParams(location.search);
    console.log(queryParams);
    
    const category = queryParams.get("category");
    console.log(category);
    
    // Filter products by category
    if (category) {
    //   const filtered = products.filter((product) =>
    //     product.category.includes(category)
    //   );
      const filtered = products.filter((product) => product.category === category);

      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(products);
    }
  }, [location.search, products]);

  return (
    <div>
      <h1>Product List</h1>
      {filteredProducts.length > 0 ? (
        <ul>
          {filteredProducts.map((product) => (
            <li key={product.id}>
              <h3>{product.title}</h3>
              <p>Category: {product.category}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No products found.</p>
      )}
    </div>
  );
};

export default ProductList;
