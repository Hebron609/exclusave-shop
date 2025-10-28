<template>
  <div class="min-h-screen bg-gray-50 font-montserrat">
    <!-- Header -->
    <header class="p-6 bg-white shadow-md">
      <h1 class="text-3xl font-bold text-gray-800">ExcluSave Store</h1>
    </header>

    <!-- Page Title -->
    <main class="p-6 max-w-[1440px] mx-auto">
      <h2 class="mb-6 text-3xl font-semibold text-gray-900">All Products</h2>

      <!-- Loading Spinner -->
      <div v-if="loading" class="mt-10 text-center text-gray-500">
        Loading products...
      </div>

      <!-- No Products -->
      <div
        v-else-if="products.length === 0"
        class="mt-10 text-center text-gray-500"
      >
        No products found.
      </div>

      <!-- Product Grid -->
      <div
        v-else
        class="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
      >
        <div
          v-for="product in products"
          :key="product.id"
          class="overflow-hidden transition-shadow duration-300 bg-white shadow-md cursor-pointer rounded-2xl hover:shadow-lg"
          @click="openProduct(product)"
        >
          <!-- Product Image -->
          <div
            class="relative flex items-center justify-center h-56 bg-gray-100"
          >
            <img
              :src="product.images?.[0] || product.image || placeholder"
              :alt="product.name"
              class="object-contain w-full h-full p-4"
            />
          </div>

          <!-- Product Details -->
          <div class="p-4">
            <h3 class="text-lg font-semibold text-gray-800 truncate">
              {{ product.name }}
            </h3>
            <p class="mt-1 text-sm text-gray-600 line-clamp-2">
              {{ product.description }}
            </p>
            <div class="flex items-center justify-between mt-3">
              <span class="font-bold text-indigo-600">
                {{ formatPrice(product.price) }}
              </span>
              <span
                class="px-3 py-1 text-xs text-indigo-600 bg-indigo-100 rounded-full"
              >
                {{ product.category }}
              </span>
            </div>

            <button
              @click.stop="deleteProduct(product.id)"
              class="mt-2 text-sm text-red-600 hover:underline"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </main>

    <!-- Product Modal -->
    <ProductModal
      v-if="selectedProduct"
      :isOpen="!!selectedProduct"
      :product="selectedProduct"
      :phoneNumber="phoneNumber"
      @close="closeProduct"
    />

    <!-- Footer -->
    <footer class="p-6 text-center text-gray-500 bg-white shadow-md mt-[550px]">
      &copy; 2025 ExcluSave. All rights reserved.
    </footer>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "@/firebase"; // Ensure path is correct for MPA
import ProductModal from "@/components/ProductModal.vue";

import { doc, deleteDoc, updateDoc } from "firebase/firestore";

const products = ref([]);
const loading = ref(true);
const selectedProduct = ref(null);
const phoneNumber = "233591063119";

// Placeholder image
const placeholder = "https://via.placeholder.com/300x300?text=No+Image";

// Fetch products from Firestore
const fetchProducts = async () => {
  try {
    const q = query(collection(db, "products"), orderBy("createdAt", "desc"));
    const snapshot = await getDocs(q);
    products.value = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    console.log("Products loaded:", products.value);
  } catch (error) {
    console.error("Error fetching products:", error);
  } finally {
    loading.value = false;
  }
};

// Price formatting
const formatPrice = (price) => {
  if (typeof price === "number") return "$" + price.toFixed(2);
  return price;
};

// Product modal
const openProduct = (product) => (selectedProduct.value = product);
const closeProduct = () => (selectedProduct.value = null);

onMounted(() => {
  fetchProducts();
});

const deleteProduct = async (id) => {
  if (!confirm("Are you sure you want to delete this product?")) return;
  try {
    await deleteDoc(doc(db, "products", id));
    products.value = products.value.filter((p) => p.id !== id); // remove from local list
    alert("Product deleted successfully!");
  } catch (error) {
    console.error("Error deleting product:", error);
    alert("Failed to delete product");
  }
};
</script>

<style scoped>
.font-montserrat {
  font-family: "Montserrat", sans-serif;
}
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
