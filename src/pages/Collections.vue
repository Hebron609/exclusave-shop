<template>
  <div>
    <Header />

    <!-- Collection Banner -->
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

    <!-- Collections Grid -->
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

    <!-- Products in Selected Category -->
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
          <!-- Image container with dots overlay -->
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
                :class="[ 'w-2.5 h-2.5 rounded-full transition-all duration-300',
                  imageIndexes[index] === i
                    ? 'bg-red-600 scale-110 shadow-[0_0_6px_2px_rgba(34,197,94,0.5)]'
                    : 'bg-gray-300'
                ]"
              ></span>
            </div>
          </div>

          <h3 class="text-lg font-semibold text-gray-900">{{ product.name }}</h3>
          <p class="text-sm text-gray-600">{{ product.category }}</p>
          <p class="font-medium text-gray-800">{{ product.price }}</p>

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

// ✅ Importing images directly ensures they load on Vercel
import homeIcon from "@/assets/img/home-icon-exclu-save-removebg-preview.png";
import techIcon from "@/assets/img/headphone-removebg-preview.png";
import mobileIcon from "@/assets/img/mobilephones-removebg-preview.png";

import fan1 from "@/assets/img/white-portable-handheld-fan.png";
import lamp1 from "@/assets/img/stylish-table-lamp.png";
import blender1 from "@/assets/img/portable-personal-blender.png";
import iphoneFront from "@/assets/img/Iphone 15promax.jpg";
import iphoneSide from "@/assets/img/Iphone15promax-side.jpg";
import iphoneBack from "@/assets/img/Iphone15promax-back.jpg";
import samsung1 from "@/assets/img/samsung-phone.jpg";
import samsung2 from "@/assets/img/samsung-phone-2.jpg";
import samsung3 from "@/assets/img/samsung-phone-3.jpg";
import earbuds from "@/assets/img/wireless-headphones-case-white-isolated-background.png";

const phoneNumber = "233501234567";

const collections = ref([
  { name: "Home", image: homeIcon },
  { name: "Technology", image: techIcon },
  { name: "Mobile Phones", image: mobileIcon },
]);

const products = ref([
  {
    id: 1,
    name: "Portable Handheld Fan",
    category: "Technology",
    price: "GH₵ 59.99",
    images: [fan1, fan1, fan1],
  },
  {
    id: 2,
    name: "Study Led Lamp",
    category: "Technology",
    price: "GH₵ 129.99",
    images: [lamp1, lamp1, lamp1],
  },
  {
    id: 3,
    name: "Portable Blender",
    category: "Home",
    price: "GH₵ 39.99",
    images: [blender1, blender1, blender1],
  },
  {
    id: 4,
    name: "iPhone 15 Pro Max",
    category: "Mobile Phones",
    price: "GH₵ 4599.99",
    images: [iphoneFront, iphoneSide, iphoneBack],
  },
  {
    id: 5,
    name: "Samsung Galaxy S22",
    category: "Mobile Phones",
    price: "GH₵ 4899.99",
    images: [samsung1, samsung2, samsung3],
  },
  {
    id: 6,
    name: "Wireless Earbuds",
    category: "Technology",
    price: "GH₵ 49.99",
    images: [earbuds, earbuds, earbuds],
  },
]);

// Image auto-rotation
const imageIndexes = ref(products.value.map(() => 0));
let intervalId;

onMounted(() => {
  intervalId = setInterval(() => {
    imageIndexes.value = imageIndexes.value.map((index, i) => {
      const total = products.value[i].images.length;
      return (index + 1) % total;
    });
  }, 3000);
});

onBeforeUnmount(() => clearInterval(intervalId));

// Category filtering logic
const activeCategory = ref(null);
const filteredProducts = computed(() =>
  products.value.filter((p) => p.category === activeCategory.value)
);

const selectCategory = (category) => {
  activeCategory.value = category;
  window.scrollTo({ top: 0, behavior: "smooth" });
};

const clearCategory = () => (activeCategory.value = null);
</script>

<style scoped>
.font-montserrat {
  font-family: "Montserrat", sans-serif;
}
</style>
