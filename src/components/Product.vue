<template>
  <section class="max-w-[1440px] mx-auto px-6 py-16 font-inter">
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

    <!-- Product Grid -->
    <div
      class="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
    >
      <div
        v-for="product in products"
        :key="product.id"
        class="p-6 transition group bg-gray-50 rounded-2xl hover:shadow-lg"
      >
        <div class="relative overflow-hidden rounded-2xl">
          <img
            :src="product.image"
            :alt="product.name"
            class="object-contain w-full transition-transform duration-300 h-60 group-hover:scale-105"
          />
          <a
            :href="`https://wa.me/${phoneNumber}?text=Hi! I’d like to order the ${product.name} for ${product.price}`"
            target="_blank"
            class="absolute p-3 text-gray-900 transition bg-white rounded-full shadow-md bottom-4 right-4 hover:bg-gray-100"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-4 h-4"
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

        <div class="mt-4 space-y-1">
          <h3 class="text-xl font-semibold text-gray-900">
            {{ product.name }}
          </h3>
          <p class="font-semibold text-gray-600 text-md">
            {{ product.category }}
          </p>
          <p class="font-medium text-gray-800">{{ product.price }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const phoneNumber = "233591063119"; // Replace with your WhatsApp business number

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
</script>

<style scoped>
.font-inter {
  font-family: "Inter", sans-serif;
}
</style>
