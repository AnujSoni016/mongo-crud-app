import { useEffect, useState } from "react";
import ProductForm from "./components/ProductForm";
import ProductTable from "./components/ProductTable";
import { createProduct, deleteProduct, getProducts, updateProduct } from "./api";
import "./App.css";

function App() {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const data = await getProducts();
      setProducts(data);
      setError("");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleSubmit = async (product) => {
    try {
      if (editingProduct) {
        await updateProduct(editingProduct._id, product);
        setEditingProduct(null);
      } else {
        await createProduct(product);
      }
      await loadProducts();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this product?")) return;
    try {
      await deleteProduct(id);
      await loadProducts();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="container">
      <h1>MongoDB CRUD Demo</h1>
      <p className="subtitle">Products collection &mdash; Create, Read, Update, Delete</p>

      {error && <div className="error-banner">{error}</div>}

      <ProductForm
        editingProduct={editingProduct}
        onSubmit={handleSubmit}
        onCancel={() => setEditingProduct(null)}
      />

      <h2>Products</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ProductTable
          products={products}
          onEdit={setEditingProduct}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
}

export default App;
