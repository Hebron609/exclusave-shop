<template>
  <section class="max-w-[1440px] mx-auto px-6 py-16 font-inter overflow-x-hidden">
    <!-- Header -->
    <div class="flex flex-col items-start justify-between mb-10 md:flex-row">
      <div>
        <h2 class="text-2xl font-bold text-gray-900">Most Popular</h2>
        <p class="mt-1 text-sm text-gray-500">
          Showcase your most popular products, front and center.
        </p>
      </div>

      <a
        href="/shop.html"
        class="flex items-center gap-1 p-2 mt-4 font-medium text-gray-900 transition md:mt-0 rounded-xl hover:bg-gray-100"
      >
        View All
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-5 h-5"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
          />
        </svg>
      </a>
    </div>

    <!-- Skeleton Loader -->
    <div
      v-if="loading"
      class="grid grid-cols-1 gap-6 sm:gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
    >
      <div
        v-for="n in 4"
        :key="n"
        class="p-4 transition bg-gray-100 sm:p-6 rounded-2xl animate-pulse"
      >
        <div class="w-full h-48 bg-gray-300 rounded-2xl sm:h-60"></div>
        <div class="mt-3 space-y-2 sm:mt-4">
          <div class="w-3/4 h-4 bg-gray-300 rounded"></div>
          <div class="w-1/2 h-3 bg-gray-200 rounded"></div>
          <div class="w-1/3 h-3 bg-gray-200 rounded"></div>
        </div>
      </div>
    </div>

    <!-- Product Grid -->
    <div
      v-else
      class="grid grid-cols-1 gap-6 sm:gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
    >
      <div
        v-for="product in products"
        :key="product.id"
        class="p-4 transition sm:p-6 group bg-gray-50 rounded-2xl hover:shadow-lg"
      >
        <div class="relative overflow-hidden rounded-2xl">
          <img
            :src="product.images?.[0] || '/fallback.jpg'"
            :alt="product.name"
            class="object-contain w-full h-48 transition-transform duration-300 sm:h-60 group-hover:scale-105"
          />
          <a
            :href="`https://wa.me/${phoneNumber}?text=Hi! I’d like to order the ${product.name} for ${product.price}`"
            target="_blank"
            class="absolute p-2 text-gray-900 transition bg-white rounded-full shadow-md sm:p-3 bottom-3 sm:bottom-4 right-3 sm:right-4 hover:bg-gray-100"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-4 h-4 sm:w-5 sm:h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </a>
        </div>

        <div class="mt-3 space-y-1 sm:mt-4">
          <h3 class="text-lg font-semibold text-gray-900 sm:text-xl">
            {{ product.name }}
          </h3>
          <p class="text-sm font-semibold text-gray-600 sm:text-md">
            {{ product.category }}
          </p>
          <p class="text-sm font-medium text-gray-800 sm:text-md">
            {{ product.price }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { db } from "@/firebase";
import { collection, query, orderBy, limit, onSnapshot } from "firebase/firestore";

const phoneNumber = "233591063119";

const products = ref([]);
const loading = ref(true);

onMounted(() => {
  const productsRef = collection(db, "products");
  const q = query(productsRef, orderBy("createdAt", "desc"), limit(4));

  onSnapshot(q, (snapshot) => {
    products.value = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    loading.value = false;
  });
});
</script>

<style scoped>


@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

.animate-pulse {
  animation: pulse 1.5s ease-in-out infinite;
}
</style>
