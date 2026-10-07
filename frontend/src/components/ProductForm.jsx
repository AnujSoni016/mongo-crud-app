import { useEffect, useState } from "react";

const emptyForm = { name: "", description: "", price: "", quantity: "" };

export default function ProductForm({ editingProduct, onSubmit, onCancel }) {
  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    if (editingProduct) {
      setForm({
        name: editingProduct.name ?? "",
        description: editingProduct.description ?? "",
        price: editingProduct.price ?? "",
        quantity: editingProduct.quantity ?? "",
      });
    } else {
      setForm(emptyForm);
    }
  }, [editingProduct]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      name: form.name,
      description: form.description,
      price: Number(form.price),
      quantity: Number(form.quantity),
    });
    setForm(emptyForm);
  };

  return (
    <form className="product-form" onSubmit={handleSubmit}>
      <h2>{editingProduct ? "Update Product" : "Create Product"}</h2>

      <label>
        Name
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          required
        />
      </label>

      <label>
        Description
        <input
          type="text"
          name="description"
          value={form.description}
          onChange={handleChange}
        />
      </label>

      <label>
        Price
        <input
          type="number"
          name="price"
          min="0"
          step="0.01"
          value={form.price}
          onChange={handleChange}
          required
        />
      </label>

      <label>
        Quantity
        <input
          type="number"
          name="quantity"
          min="0"
          value={form.quantity}
          onChange={handleChange}
          required
        />
      </label>

      <div className="form-actions">
        <button type="submit">{editingProduct ? "Save Changes" : "Add Product"}</button>
        {editingProduct && (
          <button type="button" className="secondary" onClick={onCancel}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
