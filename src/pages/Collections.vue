<template>
  <div>
    <Header />

    <!--Shop-banner-->
    <section
      class="bg-[#eeeaf3] py-24 rounded-3xl text-center font-montserrat max-w-[1440px] mx-auto mt-25 px-6"
    >
      <!-- Tag -->
      <span
        class="bg-gray-100 text-gray-700 text-sm font-medium px-4 py-1.5 rounded-full shadow-sm"
      >
        Collections
      </span>

      <!-- Heading -->
      <h1
        class="mt-6 text-4xl font-semibold leading-tight text-gray-900 md:text-5xl"
      >
        Discover Exclusive Collections<br />
        Tailored for You.
      </h1>

      <!-- Description -->
      <p class="max-w-2xl mx-auto mt-6 text-lg text-gray-600">
        Explore handpicked product collections curated by ExcluSave — making it
        effortless for you to find premium essentials that match your lifestyle.
      </p>
    </section>

    <!-- Show collection cards when no category is active -->
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

        <!-- Image container with flex centering -->
        <div class="flex items-center justify-center h-[300px]">
          <img
            :src="collection.image"
            :alt="collection.name"
            :class="[
              'object-contain transition-all duration-300 w-full h-[220px] rounded-xl ',
              collection.name === 'Home'
                ? 'w-[380px] h-[580px] mb-28'
                : 'w-[300px] h-[300px]',
            ]"
          />
        </div>

        <!-- Arrow -->
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

    <!-- Show products when a category is selected -->
    <div v-else>
      <div
        class="flex items-center justify-between mb-8 max-w-[1440px] mx-auto mt-20 px-6"
      >
        <button
          @click="clearCategory"
          class="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-full hover:bg-gray-200"
        >
          ← Back to Collections
        </button>
        <h3 class="text-2xl font-semibold text-gray-900">
          {{ activeCategory }}
        </h3>
      </div>

      <div
        class="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 max-w-[1440px] mx-auto mt-25 px-6 mb-25"
      >
        <div
          v-for="(product, index) in filteredProducts"
          :key="product.id"
          class="relative flex flex-col p-6 transition shadow cursor-pointer group bg-gray-50 rounded-2xl hover:shadow-lg"
        >
<!-- Image container with flex centering -->
<div class="relative flex items-center justify-center h-[250px]">
  <!-- Product Image -->
  <img
    :src="product.images[imageIndexes[index]]"
    :alt="product.name"
    class="h-[250px] object-contain rounded-xl mb-4 transition-all duration-700 ease-in-out group-hover:scale-105"
  />

  <!-- Image Indicator Dots (Overlay) -->
  <div
    class="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 bg-white/50 backdrop-blur-sm px-2 py-1 rounded-full"
  >
    <span
      v-for="(img, i) in product.images"
      :key="i"
      :class="[
        'w-2.5 h-2.5 rounded-full transition-all duration-300',
        imageIndexes[index] === i
          ? 'bg-red-600 scale-110 shadow-[0_0_6px_2px_rgba(34,197,94,0.5)]'
          : 'bg-gray-300',
      ]"
    ></span>
  </div>
</div>


          <h3 class="text-lg font-semibold text-gray-900">
            {{ product.name }}
          </h3>
          <p class="text-sm text-gray-600">{{ product.category }}</p>
          <p class="font-medium text-gray-800">{{ product.price }}</p>

          <!-- Tooltip -->
          <div
            class="absolute bottom-[110%] left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 bg-gray-900 text-white text-sm px-4 py-2 rounded-lg whitespace-nowrap transition-opacity duration-300"
          >
            💬 Order via WhatsApp
            <div
              class="absolute w-3 h-3 rotate-45 -translate-x-1/2 bg-gray-900 left-1/2 top-full"
            ></div>
          </div>

          <a
            :href="`https://wa.me/${phoneNumber}?text=Hi! I’d like to order the ${product.name} for ${product.price}`"
            target="_blank"
            class="block w-full py-2 mt-4 text-center text-white bg-black rounded-full hover:bg-gray-800"
          >
            Order via WhatsApp
          </a>
        </div>
      </div>
    </div>

    <Footer />
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from "vue";
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";

const phoneNumber = "233501234567";

const collections = ref([
  {
    name: "Home",
    image: "/src/assets/img/home-icon-exclu-save-removebg-preview.png",
  },
  {
    name: "Technology",
    image: "/src/assets/img/headphone-removebg-preview.png",
  },
  {
    name: "Mobile Phones",
    image: "/src/assets/img/mobilephones-removebg-preview.png",
  },
]);

const products = ref([
  {
    id: 1,
    name: "Portable Handheld Fan",
    category: "Technology",
    price: "GH₵ 59.99",
    images: [
      "/src/assets/img/white-portable-handheld-fan.png",
      "/src/assets/img/white-portable-handheld-fan-2.png",
      "/src/assets/img/white-portable-handheld-fan-3.png",
    ],
  },
  {
    id: 2,
    name: "Study Led Lamp",
    category: "Technology",
    price: "GH₵ 129.99",
    images: [
      "/src/assets/img/stylish-table-lamp.png",
      "/src/assets/img/stylish-table-lamp-2.png",
      "/src/assets/img/stylish-table-lamp-3.png",
    ],
  },
  {
    id: 3,
    name: "Portable Blender",
    category: "Home",
    price: "GH₵ 39.99",
    images: [
      "/src/assets/img/portable-personal-blender.png",
      "/src/assets/img/portable-personal-blender-2.png",
      "/src/assets/img/portable-personal-blender-3.png",
    ],
  },
  {
    id: 4,
    name: "iPhone 15 Pro Max",
    category: "Mobile Phones",
    price: "GH₵ 4599.99",
    images: [
      "/src/assets/img/Iphone 15promax.jpg",
      "/src/assets/img/Iphone15promax-side.jpg",
      "/src/assets/img/Iphone15promax-back.jpg",
    ],
  },
  {
    id: 5,
    name: "Samsung Galaxy S22",
    category: "Mobile Phones",
    price: "GH₵ 4899.99",
    images: [
      "/src/assets/img/samsung-phone.jpg",
      "/src/assets/img/samsung-phone-2.jpg",
      "/src/assets/img/samsung-phone-3.jpg",
    ],
  },
  {
    id: 6,
    name: "Wireless Earbuds",
    category: "Technology",
    price: "GH₵ 49.99",
    images: [
      "/src/assets/img/wireless-headphones-case-white-isolated-background.png",
      "/src/assets/img/wireless-headphones-side.png",
      "/src/assets/img/wireless-headphones-box.png",
    ],
  },
]);

// --- Image rotation setup ---
const imageIndexes = ref(products.value.map(() => 0));
let intervalId;

onMounted(() => {
  intervalId = setInterval(() => {
    imageIndexes.value = imageIndexes.value.map((index, i) => {
      const total = products.value[i].images.length;
      return (index + 1) % total;
    });
  }, 3000); // change every 3s
});

onBeforeUnmount(() => {
  clearInterval(intervalId);
});

// --- Category logic ---
const activeCategory = ref(null);

const filteredProducts = computed(() =>
  products.value.filter((p) => p.category === activeCategory.value)
);

const selectCategory = (category) => {
  activeCategory.value = category;
  window.scrollTo({ top: 0, behavior: "smooth" });
};

const clearCategory = () => {
  activeCategory.value = null;
};

const bannerDescription = computed(() => {
  if (!activeCategory.value) {
    return "Use this page to group your products into simple collections, making it easy for customers to explore.";
  }

  switch (activeCategory.value) {
    case "Technology":
      return "Discover cutting-edge tech gadgets designed to simplify your life.";
    case "Home":
      return "Enhance your home experience with stylish, practical accessories.";
    case "Mobile Phones":
      return "Shop premium mobile devices at unbeatable prices.";
    default:
      return "Explore products handpicked for your lifestyle.";
  }
});
</script>
