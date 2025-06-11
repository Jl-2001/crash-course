import { create } from "zustand";

export const useProductStore = create((set) => ({
  products: [],
  // this is the starting value, an empty list of products
  setProducts: (products) => set({ products }),
  //this function lets you update the product list
  createProduct: async (newProduct) => {
    if (!newProduct.name || !newProduct.price || !newProduct.image) {
      return { success: false, message: "please fill all fields." };
    } //creating a async function, that takes in a new product object and tried to add it to the server and the store
    // also checks if it has trhe name, price and image input in the fields once submitted
    const res = await fetch("/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      }, // sending data to the server
      body: JSON.stringify(newProduct)
    });
    const data = await res.json();
    // this handles server response that turns it into a javascript object
    set((state) => ({ products: [...state.products, data.data] }));
    // this adds new products to the existing list in the store while also keeping the old products
    return {
      success: true,
      message: "Product was created, thank you for filling this out"
    };
  }
}));
// useProductStore: this global state is from zustand and helps export our functions
//we sill pass a mew product into this function so that it will be created in the database
