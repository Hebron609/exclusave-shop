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
        Shop smarter with ExcluSave — where quality meets affordability. Explore
        all categories and enjoy premium shopping experiences designed just for
        you.
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
                  : 'hover:bg-gray-100',
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
          v-if="loading"
          class="py-20 text-center text-gray-500 col-span-full"
        >
          Loading products...
        </div>

        <div
          v-else
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

            <!-- Image Dots -->
            <div
              v-if="product.images && product.images.length > 1"
              class="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 bg-white/50 backdrop-blur-sm px-2 py-1 rounded-full"
            >
              <span
                v-for="(img, i) in product.images"
                :key="i"
                :class="[
                  'w-2.5 h-2.5 rounded-full transition-all duration-300',
                  currentImageIndex[product.id] === i
                    ? 'bg-black scale-110 shadow-[0_0_6px_2px_rgba(34,197,94,0.5)]'
                    : 'bg-gray-300',
                ]"
              ></span>
            </div>
          </div>

          <!-- Product Info -->
          <h3 class="text-lg font-semibold text-gray-900">
            {{ product.name }}
          </h3>
          <p class="text-sm text-gray-600">{{ product.category }}</p>
          <p class="font-medium text-gray-800">
            {{
              typeof product.price === "number"
                ? product.price.toFixed(2)
                : product.price
            }}
          </p>

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
import { ref, computed, onMounted, onBeforeUnmount, reactive } from "vue";
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import ProductModal from "@/components/ProductModal.vue";
import { db } from "@/firebase";
import { collection, getDocs, query, orderBy } from "firebase/firestore";

const testFirestore = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "products"));
    querySnapshot.forEach((doc) => {
      console.log(doc.id, doc.data());
    });
  } catch (error) {
    console.error("Firestore test error:", error);
  }
};

testFirestore();

const phoneNumber = "233591063119";

// Sidebar categories
const categories = ["All Products", "Technology", "Home", "Mobile Phones"];
const activeCategory = ref("All Products");

// Products from Firestore
const products = ref([]);
const loading = ref(true);

// Product modal
const selectedProduct = ref(null);
const openProduct = (product) => (selectedProduct.value = product);
const closeProduct = () => (selectedProduct.value = null);

// Fetch products
const fetchProducts = async () => {
  try {
    const q = query(collection(db, "products"), orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(q);
    products.value = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error("Error fetching products:", error);
  } finally {
    loading.value = false;
  }
};

// Image rotation logic
const currentImageIndex = reactive({});
let interval;
const startImageRotation = () => {
  interval = setInterval(() => {
    products.value.forEach((p) => {
      if (p.images && p.images.length > 1) {
        currentImageIndex[p.id] =
          ((currentImageIndex[p.id] || 0) + 1) % p.images.length;
      }
    });
  }, 3000);
};

const getCurrentImage = (product) => {
  if (product.images && product.images.length > 0) {
    const index = currentImageIndex[product.id] || 0;
    return product.images[index];
  }
  return "";
};

// Filter by category
const filteredProducts = computed(() => {
  if (activeCategory.value === "All Products") return products.value;
  return products.value.filter(
    (p) =>
      p.category &&
      p.category.toLowerCase() === activeCategory.value.toLowerCase()
  );
});
const setActiveCategory = (category) => (activeCategory.value = category);

// Lifecycle
onMounted(async () => {
  await fetchProducts();
  startImageRotation();
});
onBeforeUnmount(() => clearInterval(interval));
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
