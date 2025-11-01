<template>
  <div class="overflow-x-hidden">
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
        <h3
          class="mt-4 text-xl font-semibold text-gray-900 sm:mt-0 sm:text-2xl"
        >
          {{ activeCategory }}
        </h3>
      </div>

      <!-- Loading -->
      <div v-if="loading" class="mt-12 text-lg text-center text-gray-500">
        Loading products...
      </div>

      <!-- ✅ No Products Message -->
      <div
        v-else-if="filteredProducts.length === 0"
        class="flex flex-col items-center justify-center h-[350px] text-center rounded-2xl max-w-[1440px] mx-auto mt-10 px-6"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="mb-5 text-red-500 w-14 h-14"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M3 3h18M4 7h16l-1.5 9H5.5L4 7zm2.5 12h11M9 11v4m6-4v4"
          />
        </svg>

        <h3 class="text-lg font-semibold text-gray-800">
          No products available yet in
          <span class="font-bold text-red-500">{{ activeCategory }}</span>.
        </h3>
        <p class="mt-2 text-sm text-gray-500">
          Please check back later or explore other collections.
        </p>
        <button
          @click="clearCategory"
          class="px-5 py-2 mt-6 text-sm font-medium text-white transition bg-black rounded-full hover:bg-red-800"
        >
          Browse Collections
        </button>
      </div>

      <!-- ✅ Product Grid (Optimized + Full Image) -->
      <div
        v-else
        class="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 max-w-[1440px] mx-auto mt-25 px-6 mb-25"
      >
        <div
          v-for="product in filteredProducts"
          :key="product.id"
          class="relative flex flex-col p-6 transition duration-300 shadow-sm cursor-pointer group bg-gray-50 rounded-3xl hover:shadow-lg hover:-translate-y-1"
          @click="openProduct(product)"
        >
          <!-- Product Image -->
          <div class="relative w-full h-[260px] overflow-hidden rounded-2xl">
            <img
              :src="getCurrentImage(product)"
              :alt="product.name"
              loading="lazy"
              class="object-cover w-full h-full transition-transform duration-700 ease-in-out group-hover:scale-105"
            />

            <!-- Dots -->
            <div
              v-if="product.images && product.images.length > 1"
              class="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 bg-white/60 backdrop-blur-sm px-2 py-1 rounded-full"
            >
              <span
                v-for="(img, i) in product.images"
                :key="i"
                :class="[
                  'w-2.5 h-2.5 rounded-full transition-all duration-300',
                  currentImageIndex[product.id] === i
                    ? 'bg-black scale-110 shadow-[0_0_6px_2px_rgba(0,0,0,0.4)]'
                    : 'bg-gray-300'
                ]"
              ></span>
            </div>
          </div>

          <div class="mt-4">
            <h3 class="text-lg font-semibold text-gray-900 truncate">
              {{ product.name }}
            </h3>
            <p class="text-sm text-gray-600">{{ product.category }}</p>
            <p class="font-medium text-gray-800">
              {{
                typeof product.price === 'number'
                  ? product.price.toFixed(2)
                  : product.price
              }}
            </p>
            <p class="mt-1 text-xs text-gray-500">Click for details</p>
          </div>
        </div>
      </div>
    </div>

    <!-- ✅ Product Modal -->
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
import { db } from "@/firebase";
import { collection, getDocs, query, orderBy } from "firebase/firestore";

// ✅ Collection category images
import homeIcon from "@/assets/img/home-icon-exclu-save-removebg-preview.png";
import techIcon from "@/assets/img/headphone-removebg-preview.png";
import mobileIcon from "@/assets/img/mobilephones-removebg-preview.png";

const phoneNumber = "233591063119";

const collections = ref([
  { name: "Home", image: homeIcon },
  { name: "Technology", image: techIcon },
  { name: "Mobile Phones", image: mobileIcon },
]);

// ✅ Data
const products = ref([]);
const loading = ref(true);
const activeCategory = ref(null);
const selectedProduct = ref(null);

// ✅ Image carousel logic
const currentImageIndex = ref({});
let interval;
const startImageRotation = () => {
  interval = setInterval(() => {
    products.value.forEach((p) => {
      if (p.images && p.images.length > 1) {
        currentImageIndex.value[p.id] =
          ((currentImageIndex.value[p.id] || 0) + 1) % p.images.length;
      }
    });
  }, 3000);
};
const getCurrentImage = (product) => {
  if (product.images && product.images.length > 0) {
    const index = currentImageIndex.value[product.id] || 0;
    return product.images[index];
  }
  return product.image;
};

// ✅ Fetch products from Firestore
const fetchProducts = async () => {
  try {
    const q = query(collection(db, "products"), orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(q);
    products.value = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (err) {
    console.error("Error loading products:", err);
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchProducts().then(() => startImageRotation());
  const params = new URLSearchParams(window.location.search);
  const categoryFromQuery = params.get("category");
  if (categoryFromQuery) activeCategory.value = categoryFromQuery;
});

onBeforeUnmount(() => {
  clearInterval(interval);
  selectedProduct.value = null;
});

// ✅ Category filter logic
const filteredProducts = computed(() =>
  activeCategory.value
    ? products.value.filter(
        (p) =>
          p.category &&
          p.category.toLowerCase() === activeCategory.value.toLowerCase()
      )
    : []
);

const selectCategory = (category) => {
  activeCategory.value = category;
  window.scrollTo({ top: 0, behavior: "smooth" });
};
const clearCategory = () => (activeCategory.value = null);

// ✅ Product modal
const openProduct = (product) => (selectedProduct.value = product);
const closeProduct = () => (selectedProduct.value = null);
</script>

<style scoped>
.font-montserrat {
  font-family: "Montserrat", sans-serif;
}
</style>
