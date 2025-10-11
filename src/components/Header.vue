<template>
  <header
    class="fixed top-0 left-0 z-50 w-full shadow-sm bg-white/90 backdrop-blur-md"
  >
    <nav
      class="max-w-[1440px] mx-auto px-6 py-4 flex items-center justify-between"
    >
      <!-- Logo -->
      <a href="index.html" class="text-3xl font-bold text-red-600">
        Exclu<span class="text-black">Save</span>
      </a>

      <!-- Nav Links -->
      <ul
        class="items-center hidden gap-8 font-medium text-gray-700 md:flex"
      >
        <li>
          <a
            href="index.html"
            :class="linkClass('index.html')"
          >Home</a>
        </li>
        <li>
          <a
            href="shop.html"
            :class="linkClass('shop.html')"
          >Shop</a>
        </li>
        <li>
          <a
            href="collections.html"
            :class="linkClass('collections.html')"
          >Collections</a>
        </li>
        <li>
          <a
            href="support.html"
            :class="linkClass('support.html')"
          >Support</a>
        </li>
      </ul>

      <!-- CTA Button -->
      <a
        href="shop.html"
        class="hidden px-5 py-2 text-white transition bg-black rounded-full md:inline-block hover:bg-red-700"
      >
        Shop Now
      </a>

      <!-- Mobile Menu Button -->
      <button @click="toggleMenu" class="text-gray-800 md:hidden">
        <svg
          v-if="!menuOpen"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-6 h-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M3.75 5.75h16.5M3.75 12h16.5m-16.5 6.25h16.5"
          />
        </svg>
        <svg
          v-else
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-6 h-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>

      <!-- Mobile Menu -->
      <transition name="fade">
        <ul
          v-if="menuOpen"
          class="absolute top-16 right-4 bg-white rounded-lg shadow-lg p-6 flex flex-col gap-4 w-[200px] text-gray-700"
        >
          <li>
            <a
              href="index.html"
              :class="linkClass('index.html')"
              >Home</a
            >
          </li>
          <li>
            <a
              href="shop.html"
              :class="linkClass('shop.html')"
              >Shop</a
            >
          </li>
          <li>
            <a
              href="collections.html"
              :class="linkClass('collections.html')"
              >Collections</a
            >
          </li>
          <li>
            <a
              href="support.html"
              :class="linkClass('support.html')"
              >Support</a
            >
          </li>
          <a
            href="shop.html"
            class="px-5 py-2 text-center text-white transition bg-blue-600 rounded-full hover:bg-blue-700"
          >
            Shop Now
          </a>
        </ul>
      </transition>
    </nav>
  </header>
</template>

<script setup>
import { ref } from "vue";

const menuOpen = ref(false);
const toggleMenu = () => (menuOpen.value = !menuOpen.value);

// Detect current page
const currentPage = window.location.pathname.split("/").pop();

// Function for link style
const linkClass = (page) => {
  const base =
    "transition hover:text-red-600";
  const active =
    "text-red-600 font-semibold border-b-2 border-red-600 pb-1";
  return currentPage === page ? `${base} ${active}` : base;
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
