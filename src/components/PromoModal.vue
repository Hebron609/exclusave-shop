<template>
  <div
    v-if="showPopup"
    class="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/60 backdrop-blur-sm"
  >
    <div
      class="flex flex-col w-full max-w-4xl overflow-hidden shadow-2xl bg-gradient-to-r from-red-600 via-pink-500 to-purple-600 rounded-3xl animate-slideUp md:flex-row"
    >
      <!-- Image Section -->
      <div class="md:w-1/2">
        <img
          src="/images/promo-image.webp"
          alt="Exclusive Data Offer"
          class="object-cover w-full h-full"
        />
      </div>

      <!-- Content Section -->
      <div class="flex flex-col justify-center p-8 text-center bg-white md:w-1/2 md:text-left">
        <h2 class="mb-4 text-3xl font-extrabold text-gray-900 md:text-4xl">
          Stay <span class="text-red-600">Connected</span>, Spend Less
        </h2>
        <p class="mb-4 text-lg text-gray-600">
          ExcluSave, in <strong>partnership with Best Deals GH</strong>, brings you the best 
          <strong>Data & Airtime bundles</strong> at unbeatable rates. Shop smarter, stay connected, 
          and enjoy exclusive deals today!
        </p>

        <div class="flex flex-col justify-center gap-4 mt-6 sm:flex-row md:justify-start">
          <button
            @click="goToPage"
            class="px-8 py-4 font-bold text-white transition-transform duration-300 rounded-full shadow-lg cursor-pointer bg-gradient-to-r from-red-600 to-pink-500 hover:scale-105"
          >
            Explore Offers
          </button>
          <button
            @click="closePopup"
            class="px-8 py-4 font-semibold text-gray-700 transition-colors bg-gray-100 rounded-full cursor-pointer hover:bg-gray-200"
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
