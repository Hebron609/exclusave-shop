<template>
  <div>
    <Header />

    <!-- Shop Banner -->
    <section
      class="bg-[#eeeaf3] mx-3 py-16 sm:py-24 rounded-3xl text-center font-montserrat max-w-[1440px] lg:mx-auto mt-20 px-4 sm:px-6"
    >
      <span
        class="px-3 py-1 text-xs font-medium text-gray-700 bg-gray-100 rounded-full shadow-sm sm:text-sm sm:px-4"
      >
        Shop
      </span>

      <h1
        class="mt-4 text-3xl font-semibold leading-tight text-gray-900 sm:mt-6 sm:text-4xl md:text-5xl"
      >
        Discover Exclusive Deals<br />
        and Top Products in One Place.
      </h1>

      <p
        class="max-w-xl mx-auto mt-4 text-base text-gray-600 sm:max-w-2xl sm:mt-6 sm:text-lg"
      >
        Shop smarter with ExcluSave — where quality meets affordability. Explore all
        categories and enjoy premium shopping experiences designed just for you.
      </p>
    </section>

    <!-- Category Filter + Product Grid -->
    <section
      class="max-w-[1440px] mx-auto px-6 py-16 font-inter grid grid-cols-1 md:grid-cols-4 gap-8"
    >
      <!-- Sidebar -->
      <aside
        class="p-6 bg-white shadow md:col-span-1 rounded-2xl h-fit md:sticky md:top-28"
      >
        <h3 class="mb-4 text-xl font-semibold">Categories</h3>
        <ul class="space-y-3 text-gray-700">
          <li v-for="category in categories" :key="category">
            <button
              @click="setActiveCategory(category)"
              :class="[
                'w-full text-left px-3 py-2 rounded-lg transition-all duration-300',
                activeCategory === category
                  ? 'bg-black text-white font-semibold shadow-sm scale-[1.02]'
                  : 'hover:bg-gray-100'
              ]"
            >
              {{ category }}
            </button>
          </li>
        </ul>
      </aside>

      <!-- Products -->
      <div
        class="grid grid-cols-1 gap-8 md:col-span-3 sm:grid-cols-2 lg:grid-cols-3"
      >
        <div
          v-for="product in filteredProducts"
          :key="product.id"
          class="relative p-6 transition cursor-pointer bg-gray-50 rounded-2xl hover:shadow-lg"
          @click="openProduct(product)"
        >
          <!-- Product Image -->
          <div class="relative">
            <img
              :src="getCurrentImage(product)"
              :alt="product.name"
              class="object-contain w-full h-56 mb-4 rounded-2xl"
            />
            <!-- Image dots -->
            <div
              v-if="product.images && product.images.length > 1"
              class="absolute flex gap-1 transform -translate-x-1/2 bottom-3 left-1/2"
            >
              <span
                v-for="(img, i) in product.images"
                :key="i"
                class="w-2 h-2 rounded-full"
                :class="i === currentImageIndex[product.id] ? 'bg-black' : 'bg-gray-300'"
              ></span>
            </div>
          </div>

          <!-- Product Info -->
          <h3 class="text-lg font-semibold text-gray-900">{{ product.name }}</h3>
          <p class="text-sm text-gray-600">{{ product.category }}</p>
          <p class="font-medium text-gray-800">{{ product.price }}</p>
          <p class="mt-1 text-xs text-gray-500">Click for details</p>
        </div>
      </div>
    </section>

    <!-- ✅ Reusable Product Modal -->
    <ProductModal
      v-if="selectedProduct"
      :isOpen="!!selectedProduct"
      :product="selectedProduct"
      :phoneNumber="phoneNumber"
      @close="closeProduct"
    />

    <Footer />
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from "vue";
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import ProductModal from "@/components/ProductModal.vue";
import { products as productData } from "@/data/products.js";

const phoneNumber = "233591063119";
const categories = ["All Products", "Technology", "Home", "Mobile Phones"];
const activeCategory = ref("All Products");
const products = ref(productData);
const selectedProduct = ref(null);

// Track image rotation per product
const currentImageIndex = ref({});
products.value.forEach((p) => (currentImageIndex.value[p.id] = 0));

// Auto-change images every 3s
let interval;
onMounted(() => {
  interval = setInterval(() => {
    products.value.forEach((p) => {
      if (p.images && p.images.length > 1) {
        currentImageIndex.value[p.id] =
          (currentImageIndex.value[p.id] + 1) % p.images.length;
      }
    });
  }, 3000);
});
onBeforeUnmount(() => clearInterval(interval));

// Get current image for each product
const getCurrentImage = (product) => {
  if (product.images && product.images.length > 0)
    return product.images[currentImageIndex.value[product.id]];
  return product.image;
};

// Filter logic
const filteredProducts = computed(() => {
  if (activeCategory.value === "All Products") return products.value;
  return products.value.filter((p) => p.category === activeCategory.value);
});
const setActiveCategory = (category) => (activeCategory.value = category);

// Modal controls
const openProduct = (product) => (selectedProduct.value = product);
const closeProduct = () => (selectedProduct.value = null);
</script>

<style scoped>
.font-montserrat {
  font-family: "Montserrat", sans-serif;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fadeIn {
  animation: fadeIn 0.3s ease-in-out;
}
</style>
