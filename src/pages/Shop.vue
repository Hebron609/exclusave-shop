<template>
  <div>
    <Header />

    <!--Shop-banner-->
    <section class="bg-[#eeeaf3] py-24 rounded-3xl text-center font-montserrat max-w-[1440px] mx-auto mt-30 px-6">
    <!-- Tag -->
    <span class="bg-gray-100 text-gray-700 text-sm font-medium px-4 py-1.5 rounded-full shadow-sm">
      Shop
    </span>

    <!-- Heading -->
    <h1 class="mt-6 text-4xl font-semibold leading-tight text-gray-900 md:text-5xl">
      Discover exclusive deals<br />
      and top products in one place.
    </h1>

    <!-- Description -->
    <p class="max-w-2xl mx-auto mt-6 text-lg text-gray-600">
      Shop smarter with ExcluSave — where quality meets affordability. 
      Explore all categories and enjoy premium shopping experiences designed just for you.
    </p>
  </section>

  
 <!-- Product Section -->
 <section
    class="max-w-[1440px] mx-auto px-6 py-16 font-inter grid grid-cols-1 md:grid-cols-4 gap-8"
  >
    <!-- Category Sidebar -->
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

    <!-- Product Grid -->
    <div
      class="grid grid-cols-1 gap-8 md:col-span-3 sm:grid-cols-2 lg:grid-cols-3"
    >
      <div
        v-for="product in filteredProducts"
        :key="product.id"
        class="p-6 transition bg-gray-50 rounded-2xl hover:shadow-lg"
      >
        <img
          :src="product.image"
          :alt="product.name"
          class="object-contain w-full h-56 mb-4 rounded-2xl"
        />
        <h3 class="text-lg font-semibold text-gray-900">{{ product.name }}</h3>
        <p class="text-sm text-gray-600">{{ product.category }}</p>
        <p class="font-medium text-gray-800">{{ product.price }}</p>
        <a
          :href="`https://wa.me/${phoneNumber}?text=Hi! I’d like to order the ${product.name} for ${product.price}`"
          target="_blank"
          class="block w-full py-2 mt-4 text-center text-white bg-black rounded-full hover:bg-gray-800"
        >
          Order via WhatsApp
        </a>
      </div>
    </div>
  </section>
  </div>

    <Footer />
</template>

<script setup>
import { ref, computed } from "vue";
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";

const phoneNumber = "233591063119"; // <-- replace with your WhatsApp number
const categories = ["All Products", "Technology", "Home", "Mobile Phones"];
const activeCategory = ref("All Products");

const products = [
  {
    id: 1,
    name: "Portable Handheld Fan",
    category: "Technology",
    price: "GH₵ 59.99",
    image: "/src/assets/img/white-portable-handheld-fan.png",
  },
  {
    id: 2,
    name: "Study Led Lamp",
    category: "Technology",
    price: "GH₵ 129.99",
    image: "/src/assets/img/stylish-table-lamp.png",
  },
  {
    id: 3,
    name: "Portable personal blender",
    category: "Home",
    price: "GH₵ 39.99",
    image: "/src/assets/img/portable-personal-blender.png",
  },
  {
    id: 4,
    name: "Wireless Earbuds",
    category: "Technology",
    price: "GH₵ 49.99",
    image:
      "/src/assets/img/wireless-headphones-case-white-isolated-background.png",
  },
];

const setActiveCategory = (category) => {
  activeCategory.value = category;
};

const filteredProducts = computed(() => {
  if (activeCategory.value === "All Products") return products;
  return products.filter(
    (product) => product.category === activeCategory.value
  );
});
</script>

<style scoped>
.font-inter {
  font-family: "Inter", sans-serif;
}
</style>
