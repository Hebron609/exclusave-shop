<template>
  <div
    v-if="showPopup"
    class="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/60 backdrop-blur-sm"
  >
    <div
      class="flex flex-col w-full max-w-md overflow-hidden shadow-2xl sm:max-w-lg md:max-w-4xl bg-gradient-to-r from-red-600 via-pink-500 to-purple-600 rounded-3xl animate-slideUp md:flex-row"
    >
      <!-- Image Section -->
      <div class="w-full h-48 md:w-1/2 md:h-auto">
        <img
          src="/images/promo-image.webp"
          alt="Exclusive Data Offer"
          class="object-cover w-full h-full rounded-t-3xl md:rounded-l-3xl md:rounded-tr-none"
        />
      </div>

      <!-- Content Section -->
      <div class="flex flex-col justify-center p-6 text-center bg-white md:w-1/2 md:text-left md:p-8">
        <h2 class="mb-3 text-2xl font-extrabold text-gray-900 sm:text-3xl md:text-4xl">
          Stay <span class="text-red-600">Connected</span>, Spend Less
        </h2>
        <p class="mb-4 text-sm text-gray-600 sm:text-base">
          ExcluSave, in <strong>partnership with Best Deals GH</strong>, brings you the best 
          <strong>Data & Airtime bundles</strong> at unbeatable rates. Shop smarter, stay connected, 
          and enjoy exclusive deals today!
        </p>

        <div class="flex flex-col justify-center gap-3 mt-4 sm:flex-row md:justify-start">
          <button
            @click="goToPage"
            class="px-6 py-3 text-sm font-bold text-white transition-transform duration-300 rounded-full shadow-lg cursor-pointer sm:text-base bg-gradient-to-r from-red-600 to-pink-500 hover:scale-105"
          >
            Explore Offers
          </button>
          <button
            @click="closePopup"
            class="px-6 py-3 text-sm font-semibold text-gray-700 transition-colors bg-gray-100 rounded-full cursor-pointer sm:text-base hover:bg-gray-200"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, defineEmits } from "vue";

const showPopup = ref(false);
const emit = defineEmits(["close"]);

const closePopup = () => {
  showPopup.value = false;
  emit("close");
};

const goToPage = () => {
  window.location.href = "exclusive-services.html";
};

onMounted(() => {
  setTimeout(() => {
    showPopup.value = true;
  }, 4000);
});
</script>

<style scoped>
@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.animate-slideUp {
  animation: slideUp 0.7s ease-out forwards;
}
</style>
