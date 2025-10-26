<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
  >
    <div
      class="relative w-[90%] max-w-md bg-white rounded-3xl shadow-xl p-6 animate-fadeIn"
    >
      <!-- Close Button -->
      <button
        @click="closeModal"
        class="absolute text-2xl text-gray-500 top-3 right-3 hover:text-black"
      >
        ✕
      </button>

      <!-- Product Image Carousel -->
      <div class="relative flex items-center justify-center h-64 bg-gray-50 rounded-xl">
        <img
          :src="currentImage"
          :alt="product.name"
          class="object-contain h-full rounded-xl"
        />
        <div
          v-if="product.images && product.images.length > 1"
          class="absolute flex gap-1 transform -translate-x-1/2 bottom-3 left-1/2"
        >
          <span
            v-for="(img, i) in product.images"
            :key="i"
            :class="[
              'w-2 h-2 rounded-full',
              i === currentIndex ? 'bg-black' : 'bg-gray-300'
            ]"
          ></span>
        </div>
      </div>

      <!-- Product Details -->
      <div class="p-4 space-y-2 text-left">
        <h2 class="text-2xl font-semibold text-gray-900">{{ product.name }}</h2>
        <p class="text-sm text-gray-500">
          Condition: {{ product.condition || 'New' }}
        </p>
        <p class="text-lg font-medium text-gray-800">{{ product.price }}</p>
        <p class="text-sm leading-relaxed text-gray-600">{{ product.description }}</p>

        <!-- WhatsApp Button -->
        <a
          :href="`https://wa.me/${phoneNumber}?text=Hi! I’d like to order the ${product.name} for ${product.price}`"
          target="_blank"
          class="block w-full py-3 mt-4 text-center text-white transition bg-green-600 rounded-full hover:bg-green-700"
        >
          Order via WhatsApp
        </a>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted, onBeforeUnmount, computed } from "vue";

const props = defineProps({
  isOpen: Boolean,
  product: Object,
  phoneNumber: String,
});

const emit = defineEmits(["close"]);

const currentIndex = ref(0);
const currentImage = computed(() => {
  if (!props.product?.images || props.product.images.length === 0) return props.product?.image;
  return props.product.images[currentIndex.value];
});

let interval;
watch(
  () => props.isOpen,
  (isOpen) => {
    if (isOpen && props.product?.images?.length > 1) {
      interval = setInterval(() => {
        currentIndex.value =
          (currentIndex.value + 1) % props.product.images.length;
      }, 3000);
    } else {
      clearInterval(interval);
    }
  }
);

onBeforeUnmount(() => clearInterval(interval));

const closeModal = () => emit("close");
</script>

<style scoped>
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-fadeIn { animation: fadeIn 0.3s ease-in-out; }
</style>
