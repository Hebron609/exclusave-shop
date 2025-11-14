<template>
  <div
    v-if="visible"
    @click="goToPage"
    class="fixed bottom-8 right-6 z-[60] cursor-pointer select-none"
  >
    <!-- Glow + Bounce Wrapper -->
    <div
      class="relative flex items-center gap-3 px-5 py-3 rounded-full shadow-2xl 
             bg-gradient-to-r from-red-600 via-pink-500 to-purple-600
             text-white backdrop-blur-md
             hover:scale-[1.05] active:scale-[0.97] 
             transition-all duration-300 animate-buttonBounce"
    >
      <!-- NEW badge -->
      <div
        class="absolute -top-2 -right-2 bg-yellow-400 text-black text-[10px] font-bold px-2 py-[2px] rounded-full shadow-md animate-popIn"
      >
        NEW
      </div>

      <!-- Icon -->
      <div
        class="flex items-center justify-center w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm"
      >
        <i class="text-lg fa-solid fa-wifi"></i>
      </div>

      <!-- Text -->
      <div class="flex flex-col pr-2 leading-tight">
        <span class="text-sm font-semibold">Airtime & Data Deals</span>
        <span class="text-[11px] opacity-80">Tap to explore</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const visible = ref(false);

onMounted(() => {
  setTimeout(() => {
    visible.value = true;
  }, 6000);
});

const goToPage = () => {
  window.location.href = "exclusive-services.html";
};
</script>

<style scoped>
/* Glow animation */
@keyframes pulseGlow {
  0% {
    box-shadow: 0 0 0px rgba(255, 74, 110, 0.4);
  }
  50% {
    box-shadow: 0 0 15px rgba(255, 74, 110, 0.7);
  }
  100% {
    box-shadow: 0 0 0px rgba(255, 74, 110, 0.4);
  }
}

/* Premium bounce motion (smooth, not annoying) */
@keyframes buttonBounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-9px);
  }
}

.animate-buttonBounce {
  animation: buttonBounce 1.8s ease-in-out infinite, pulseGlow 2.3s infinite ease-in-out;
}

/* NEW badge pop animation */
@keyframes popIn {
  0% {
    transform: scale(0) translateY(-5px);
    opacity: 0;
  }
  100% {
    transform: scale(1) translateY(0);
    opacity: 1;
  }
}

.animate-popIn {
  animation: popIn 0.4s ease-out forwards;
}
</style>
