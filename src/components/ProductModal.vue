<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
    @click.self="closeModal"
  >
    <div
      class="relative w-[90%] max-w-lg lg:max-w-2xl bg-white rounded-3xl shadow-xl p-8 animate-fadeIn"
    >
      <!-- Close Button -->
      <button
        @click="closeModal"
        class="absolute z-10 text-2xl text-gray-500 top-3 right-3 hover:text-black"
      >
        ✕
      </button>

      <!-- Product Image Carousel -->
      <div class="relative flex items-center justify-center h-72 lg:h-80 bg-gray-50 rounded-xl">
        <!-- Use transition + key so Vue replaces the <img> element and triggers a fade -->
        <transition name="fade" mode="out-in">
          <img
            :key="currentIndex"                      
            :src="currentImage"
            :alt="product?.name || 'product image'"
            class="object-contain h-full transition-all duration-700 rounded-xl"
          />
        </transition>

        <div
          v-if="product?.images && product.images.length > 1"
          class="absolute flex gap-1 transform -translate-x-1/2 bottom-3 left-1/2"
        >
          <span
            v-for="(img, i) in product.images"
            :key="i"
            :class="[ 
              'w-2 h-2 rounded-full transition-colors',
              i === currentIndex ? 'bg-black' : 'bg-gray-300'
            ]"
          ></span>
        </div>
      </div>

      <!-- Product Details -->
      <div class="p-4 space-y-2 text-left">
        <h2 class="text-2xl font-semibold text-gray-900">{{ product?.name }}</h2>
        <p class="text-sm text-gray-500">
          Condition: {{ product?.condition || 'New' }}
        </p>
        <p class="text-lg font-medium text-gray-800">{{ product?.price }}</p>
        <p class="text-sm leading-relaxed text-gray-600">{{ product?.description }}</p>

        <!-- WhatsApp Button -->
        <a
          :href="`https://wa.me/${phoneNumber}?text=Hi! I’d like to order the ${product?.name} for ${product?.price}`"
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
import { ref, watch, computed, onBeforeUnmount, onMounted, nextTick } from "vue";

const props = defineProps({
  isOpen: Boolean,
  product: Object,
  phoneNumber: String,
});

const emit = defineEmits(["close"]);

const currentIndex = ref(0);
let interval = null;

// ✅ Use a local reactive copy of the images to ensure Vue reacts properly
const images = ref([]);

watch(
  () => props.product,
  (newProduct) => {
    if (newProduct) {
      // Defensive copy (forces Vue to track changes)
      images.value = newProduct.images?.length
        ? [...newProduct.images]
        : newProduct.image
        ? [newProduct.image]
        : [];
    }
  },
  { immediate: true }
);

const currentImage = computed(() => {
  return images.value.length > 0
    ? images.value[currentIndex.value % images.value.length]
    : "";
});

const startImageRotation = () => {
  stopImageRotation();
  if (images.value.length <= 1) return;

  interval = setInterval(() => {
    currentIndex.value = (currentIndex.value + 1) % images.value.length;
  }, 3000);
};

const stopImageRotation = () => {
  if (interval) clearInterval(interval);
  interval = null;
};

watch(
  () => props.isOpen,
  async (isOpen) => {
    if (isOpen) {
      await nextTick();
      currentIndex.value = 0;
      startImageRotation();
    } else {
      stopImageRotation();
    }
  }
);

onMounted(() => {
  if (props.isOpen) startImageRotation();
});

onBeforeUnmount(stopImageRotation);

const closeModal = () => emit("close");
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
  animation: fadeIn 0.3s ease-in-out;
}

/* fade transition for the image swap */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.45s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0.1;
}
.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}
</style>
