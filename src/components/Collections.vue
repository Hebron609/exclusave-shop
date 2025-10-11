<template>
  <section class="max-w-[1440px] mx-auto px-6 py-16 font-montserrat">
    <!-- Header -->
    <div class="flex items-center justify-between mb-10">
      <div>
        <h2 class="text-2xl font-semibold text-gray-900">Our Collections</h2>
        <p class="text-gray-500">
          Showcase all of the different collections you have to offer.
        </p>
      </div>
      <a
        href="/collections.html"
        class="flex items-center gap-1 p-2 font-medium text-gray-900 transition rounded-xl hover:bg-gray-100"
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

    <!-- Cards -->
    <div class="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
      <div
        v-for="(collection, index) in collections"
        :key="index"
        class="relative p-8 transition shadow-sm bg-gray-50 hover:bg-gray-100 rounded-3xl hover:shadow-lg"
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
              'object-contain transition-all duration-300',
              collection.name === 'Home'
                ? 'w-[380px] h-[580px] mb-28'
                : 'w-[300px] h-[300px]',
            ]"
          />
        </div>

        <!-- Arrow -->
        <button
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
              d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
            />
          </svg>
        </button>
      </div>
    </div>
  </section>
</template>

<script setup>
const collections = [
  {
    name: "Home",
    image: "/src/assets/img/home-icon-exclu-save-removebg-preview.png", // Home decor image
  },
  {
    name: "Technology",
    image: "/src/assets/img/headphone-removebg-preview.png", // Headphones
  },
  {
    name: "Mobile Phones",
    image: "/src/assets/img/mobilephones-removebg-preview.png", // Smartphone
  },
];
</script>
