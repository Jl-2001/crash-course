import { create } from "zustand";

export const useProductStore = create((set) => ({
  products: [],
  setProducts: (products) => set({ products }),
  createProduct: async (newProduct) => {
    if (!newProduct.name || !newProduct.price || !newProduct.image) {
      return { success: false, message: "please fill all fields." };
    }
    const res = await fetch("/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newProduct)
    });
    const data = await res.json();
    set((state) => ({ products: [...state.products, data.data] }));
    return {
      success: true,
      message: "Product was created, thank you for filling this out"
    };
  }
}));
// this global state is from zustand and helps export our functions
//we sill pass a mew product into this function so that it will be created in the database
