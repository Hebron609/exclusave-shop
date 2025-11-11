<template>
  <div
    v-if="showPopup"
    class="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/60"
  >
    <div
      class="w-full max-w-lg p-8 text-center bg-white border border-gray-200 shadow-2xl rounded-2xl animate-fadeIn"
    >
      <img
        src="/images/promo-image.webp"
        alt="Exclusive Data Offer"
        class="object-cover w-full mb-6 rounded-xl h-52"
      />
      <h2 class="text-2xl font-bold text-gray-900">
        Stay <span class="text-red-600">Connected</span>, Spend Less 
      </h2>
      <p class="mt-3 text-base text-gray-600">
        ExcluSave now offers <strong>Data & Airtime bundles</strong> at lower rates — enjoy exclusive deals while shopping smarter.
      </p>

      <div class="flex justify-center mt-6 space-x-3">
        <button
          @click="goToPage"
          class="px-6 py-3 font-semibold text-white transition-all bg-black rounded-full cursor-pointer hover:bg-gray-800"
        >
          Explore Offers
        </button>
        <button
          @click="closePopup"
          class="px-6 py-3 font-semibold text-gray-700 transition-all border border-gray-300 rounded-full cursor-pointer hover:bg-gray-100"
        >
          Close
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, defineEmits } from "vue";

const showPopup = ref(false); // start as false
const emit = defineEmits(["close"]);

const closePopup = () => {
  showPopup.value = false;
  emit("close");
};

// Redirect to Exclusive Services page
const goToPage = () => {
  window.location.href = "exclusive-services.html";
};

// Show the popup after 4 seconds
onMounted(() => {
  setTimeout(() => {
    showPopup.value = true;
  }, 4000);
});
</script>

<style scoped>
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fadeIn {
  animation: fadeIn 0.6s ease-in-out;
}
</style>
