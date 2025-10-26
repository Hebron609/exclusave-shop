<template>
  <div>
    <Header />

    <!-- Banner -->
    <section
      class="bg-[#eeeaf3] mx-3 py-16 sm:py-24 rounded-3xl text-center font-montserrat max-w-[1440px] lg:mx-auto mt-20 px-4 sm:px-6"
    >
      <span
        class="px-3 py-1 text-xs font-medium text-gray-700 bg-gray-100 rounded-full shadow-sm sm:text-sm sm:px-4"
      >
        Collections
      </span>

      <h1
        class="mt-4 text-3xl font-semibold leading-tight text-gray-900 sm:mt-6 sm:text-4xl md:text-5xl"
      >
        Discover Exclusive Collections<br />
        Tailored for You.
      </h1>

      <p
        class="max-w-xl mx-auto mt-4 text-base text-gray-600 sm:max-w-2xl sm:mt-6 sm:text-lg"
      >
        Explore handpicked product collections curated by ExcluSave — making it
        effortless for you to find premium essentials that match your lifestyle.
      </p>
    </section>

    <!-- Collection Grid -->
    <div
      v-if="!activeCategory"
      class="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 max-w-[1440px] mx-auto py-25 px-6"
    >
      <div
        v-for="(collection, index) in collections"
        :key="index"
        class="relative p-8 transition shadow-sm cursor-pointer bg-gray-50 hover:bg-gray-100 rounded-3xl hover:shadow-lg"
        @click="selectCategory(collection.name)"
      >
        <h3 class="mb-6 text-3xl font-semibold text-gray-900">
          {{ collection.name }}
        </h3>

        <div class="flex items-center justify-center h-[300px]">
          <img
            :src="collection.image"
            :alt="collection.name"
            class="object-contain transition-all duration-300 w-full h-[250px] rounded-xl"
          />
        </div>

        <button
          @click.stop="selectCategory(collection.name)"
          class="absolute p-2 transition bg-white rounded-full shadow bottom-6 right-6 hover:bg-gray-100"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-5 h-5 text-gray-700"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M8.25 4.5l7.5 7.5-7.5 7.5"
            />
          </svg>
        </button>
      </div>
    </div>

    <!-- Filtered Products -->
    <div v-else>
      <div
        class="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 max-w-[1440px] mx-auto mt-10 px-4 sm:px-6"
      >
        <button
          @click="clearCategory"
          class="px-3 py-2 text-xs font-medium text-gray-700 bg-gray-100 rounded-full sm:px-4 sm:text-sm hover:bg-gray-200"
        >
          ← Back to Collections
        </button>
        <h3 class="mt-4 text-xl font-semibold text-gray-900 sm:mt-0 sm:text-2xl">
          {{ activeCategory }}
        </h3>
      </div>

      <!-- Product Grid -->
      <div
        class="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 max-w-[1440px] mx-auto mt-25 px-6 mb-25"
      >
        <div
          v-for="(product, index) in filteredProducts"
          :key="product.id"
          class="relative flex flex-col p-6 transition shadow cursor-pointer group bg-gray-50 rounded-2xl hover:shadow-lg"
          @click="openProduct(product)"
        >
          <!-- Image Slider with Dots -->
          <div class="relative flex items-center justify-center h-[250px]">
            <img
              :src="product.images[imageIndexes[index]]"
              :alt="product.name"
              class="h-[250px] object-contain rounded-xl mb-4 transition-all duration-700 ease-in-out group-hover:scale-105"
            />
            <div
              class="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 bg-white/50 backdrop-blur-sm px-2 py-1 rounded-full"
            >
              <span
                v-for="(img, i) in product.images"
                :key="i"
                :class="[
                  'w-2.5 h-2.5 rounded-full transition-all duration-300',
                  imageIndexes[index] === i
                    ? 'bg-green-600 scale-110 shadow-[0_0_6px_2px_rgba(34,197,94,0.5)]'
                    : 'bg-gray-300',
                ]"
              ></span>
            </div>
          </div>

          <h3 class="text-lg font-semibold text-gray-900">{{ product.name }}</h3>
          <p class="text-sm text-gray-600">{{ product.category }}</p>
          <p class="font-medium text-gray-800">{{ product.price }}</p>
        </div>
      </div>
    </div>

    <!-- Product Modal -->
    <div
      v-if="selectedProduct"
      class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
    >
      <div
        class="relative w-full max-w-md p-6 bg-white shadow-2xl rounded-3xl animate-fadeIn"
      >
        <button
          @click="closeProduct"
          class="absolute text-gray-600 top-3 right-3 hover:text-black"
        >
          ✕
        </button>

        <img
          :src="selectedProduct.images[0]"
          :alt="selectedProduct.name"
          class="object-contain w-full h-56 mb-4 rounded-2xl"
        />
        <h2 class="mb-2 text-2xl font-semibold text-gray-900">
          {{ selectedProduct.name }}
        </h2>
        <p class="mb-2 text-sm text-gray-700">
          Category: {{ selectedProduct.category }}
        </p>
        <p class="mb-4 text-lg font-semibold text-gray-900">
          {{ selectedProduct.price }}
        </p>

        <!-- WhatsApp Order Button -->
        <a
          :href="`https://wa.me/${phoneNumber}?text=Hi! I’d like to order the ${selectedProduct.name} for ${selectedProduct.price}`"
          target="_blank"
          class="block w-full py-3 mt-4 text-center text-white transition bg-green-600 rounded-full hover:bg-green-700"
        >
          Order via WhatsApp
        </a>
      </div>
    </div>

    <Footer />
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from "vue";
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import { products } from "@/data/products.js"; // ✅ Unified source

// ✅ Category collections
import homeIcon from "@/assets/img/home-icon-exclu-save-removebg-preview.png";
import techIcon from "@/assets/img/headphone-removebg-preview.png";
import mobileIcon from "@/assets/img/mobilephones-removebg-preview.png";

const phoneNumber = "233591063119";

const collections = ref([
  { name: "Home", image: homeIcon },
  { name: "Technology", image: techIcon },
  { name: "Mobile Phones", image: mobileIcon },
]);

// ✅ Image rotation
const imageIndexes = ref(products.map(() => 0));
let intervalId;

onMounted(() => {
  intervalId = setInterval(() => {
    imageIndexes.value = imageIndexes.value.map((index, i) => {
      const total = products[i].images.length;
      return (index + 1) % total;
    });
  }, 3000);
});

onBeforeUnmount(() => clearInterval(intervalId));

// ✅ Category filtering
const activeCategory = ref(null);
const filteredProducts = computed(() =>
  products.filter((p) => p.category === activeCategory.value)
);
const selectCategory = (category) => {
  activeCategory.value = category;
  window.scrollTo({ top: 0, behavior: "smooth" });
};
const clearCategory = () => (activeCategory.value = null);

// ✅ Modal logic
const selectedProduct = ref(null);
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
    transform: translateY(10px);
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
