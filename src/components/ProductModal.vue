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
      <div
        class="relative flex items-center justify-center h-72 lg:h-80 bg-gray-50 rounded-xl cursor-zoom-in"
        @click="openImageViewer"
      >
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
        <p class="text-sm text-gray-500">Condition: {{ product?.condition || 'New' }}</p>
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

    <!-- Fullscreen Image Viewer -->
    <transition name="fade">
      <div
        v-if="showViewer"
        class="fixed inset-0 z-[60] flex items-center justify-center bg-black/90"
        @click.self="closeImageViewer"
      >
        <button
          @click="closeImageViewer"
          class="absolute text-3xl font-bold text-white cursor-pointer top-5 right-6 hover:opacity-80"
        >
          ✕
        </button>

        <button
          v-if="images.length > 1"
          @click.stop="prevImage"
          class="absolute text-3xl text-white cursor-pointer left-5 hover:opacity-80" 
        >
          ‹
        </button>

        <img
          :src="currentImage"
          class="max-h-[90%] max-w-[90%] object-contain rounded-lg select-none"
          @touchstart="handleTouchStart"
          @touchmove="handleTouchMove"
        />

        <button
          v-if="images.length > 1"
          @click.stop="nextImage"
          class="absolute text-3xl text-white cursor-pointer right-5 hover:opacity-80"
        >
          ›
        </button>
      </div>
    </transition>
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
const images = ref([]);
let interval = null;

watch(
  () => props.product,
  (newProduct) => {
    if (newProduct) {
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
      document.addEventListener("keydown", handleKeydown);
    } else {
      stopImageRotation();
      document.removeEventListener("keydown", handleKeydown);
    }
  }
);

onMounted(() => {
  if (props.isOpen) startImageRotation();
});
onBeforeUnmount(() => {
  stopImageRotation();
  document.removeEventListener("keydown", handleKeydown);
});

const closeModal = () => emit("close");

/* 🔍 Image Viewer Logic */
const showViewer = ref(false);
const openImageViewer = () => {
  stopImageRotation();
  showViewer.value = true;
};
const closeImageViewer = () => {
  showViewer.value = false;
  startImageRotation();
};

const nextImage = () => {
  currentIndex.value = (currentIndex.value + 1) % images.value.length;
};
const prevImage = () => {
  currentIndex.value =
    (currentIndex.value - 1 + images.value.length) % images.value.length;
};

/* 🧭 Swipe Gestures */
let touchStartX = 0;
const handleTouchStart = (e) => {
  touchStartX = e.touches[0].clientX;
};
const handleTouchMove = (e) => {
  const diff = e.touches[0].clientX - touchStartX;
  if (Math.abs(diff) > 70) {
    diff > 0 ? prevImage() : nextImage();
    touchStartX = e.touches[0].clientX;
  }
};

/* ⌨ Keyboard Events */
const handleKeydown = (e) => {
  if (!props.isOpen) return;
  if (showViewer.value) {
    if (e.key === "ArrowRight") nextImage();
    if (e.key === "ArrowLeft") prevImage();
    if (e.key === "Escape") closeImageViewer();
  } else if (e.key === "Escape") {
    closeModal();
  }
};
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

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.45s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
