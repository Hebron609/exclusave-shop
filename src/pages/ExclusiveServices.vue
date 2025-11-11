<template>
  <Header />
  <div class="relative mx-3 mt-6">
    <!-- Promo Modal -->
    <PromoModal v-if="showPromo" @close="closePromo" />

    <!-- Hero Carousel -->
    <section
      class="relative overflow-hidden rounded-3xl max-w-[1440px] mx-auto font-montserrat h-[500px] sm:h-[530px] mt-23"
    >
      <!-- Slides -->
      <div
        v-for="(slide, index) in slides"
        :key="index"
        class="absolute inset-0 transition-opacity duration-700 ease-in-out"
        :class="{
          'opacity-100 z-10 animate-slideIn': currentSlide === index,
          'opacity-0 z-0': currentSlide !== index
        }"
      >
        <img
          :src="slide.image"
          alt="banner"
          class="object-cover w-full h-full rounded-3xl"
        />
        <div class="absolute inset-0 bg-black/40 rounded-3xl"></div>

        <!-- Text Overlay -->
        <div
          class="absolute inset-0 flex flex-col items-center justify-center px-6 text-center text-white"
        >
          <h1
            class="mb-4 text-4xl font-extrabold sm:text-5xl drop-shadow-lg animate-fadeInUp"
          >
            {{ slide.title }}
          </h1>
          <p
            class="max-w-2xl mx-auto mb-6 text-base delay-100 sm:text-lg drop-shadow-md animate-fadeInUp"
          >
            {{ slide.subtitle }}
          </p>
          <button
            class="px-10 py-3 font-semibold transition-all delay-200 rounded-full cursor-pointer bg-gradient-to-r from-red-600 to-black hover:opacity-90 animate-fadeInUp"
          >
            {{ slide.buttonText }}
          </button>
        </div>
      </div>

      <!-- Left/Right Arrows -->
      <button
        @click="prevSlide"
        class="absolute z-20 p-3 text-white transform -translate-y-1/2 rounded-full cursor-pointer left-4 top-1/2 bg-black/40 hover:bg-black/60"
      >
        &#10094;
      </button>
      <button
        @click="nextSlide"
        class="absolute z-20 p-3 text-white transform -translate-y-1/2 rounded-full cursor-pointer right-4 top-1/2 bg-black/40 hover:bg-black/60"
      >
        &#10095;
      </button>

      <!-- Dots -->
      <div
        class="absolute left-0 right-0 z-20 flex justify-center space-x-3 bottom-6"
      >
        <button
          v-for="(slide, index) in slides"
          :key="'dot-' + index"
          @click="goToSlide(index)"
          :class="[ 'w-3 h-3 rounded-full transition-all', currentSlide === index ? 'bg-white scale-110' : 'bg-white/50' ]"
        ></button>
      </div>
    </section>

    <!-- Categories -->
    <section class="px-4 py-16 mx-auto max-w-[1440px] font-montserrat">
      <div class="mt-20 space-y-20">
        <div v-for="category in categories" :key="category.title">
          <h2
            class="pb-2 text-2xl font-semibold text-gray-900 border-b border-gray-200"
          >
            {{ category.title }}
          </h2>

          <div
            class="grid grid-cols-1 gap-6 mt-8 sm:grid-cols-2 lg:grid-cols-4"
          >
            <div
              v-for="item in category.items"
              :key="item.id"
              class="overflow-hidden transition-all duration-300 bg-white border border-gray-100 shadow-sm group rounded-2xl hover:shadow-lg"
            >
              <div class="overflow-hidden">
                <img
                  :src="item.image"
                  :alt="item.name"
                  class="object-cover w-full transition-transform duration-500 h-[255px] rounded-t-2xl group-hover:scale-105 cursor-pointer"
                />
              </div>
              <div class="p-4">
                <h3
                  class="text-lg font-semibold text-gray-900 transition-colors group-hover:text-red-600"
                >
                  {{ item.name }}
                </h3>
                <p class="mt-1 text-sm font-semibold text-gray-500">
                  GHS {{ item.price }}
                </p>
                <p
                  v-if="item.stock === 'out'"
                  class="inline-block px-3 py-1 mt-2 text-xs text-white bg-red-600 rounded-full"
                >
                  Out of stock
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
  <Footer />
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import PromoModal from "../components/PromoModal.vue";
import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";

const showPromo = ref(false);
const currentSlide = ref(0);
let interval = null;

// Auto-rotate carousel
onMounted(() => {
  const promoShown = localStorage.getItem("promoShown");
  if (!promoShown) {
    showPromo.value = true;
    localStorage.setItem("promoShown", "true");
  }

  interval = setInterval(() => {
    nextSlide();
  }, 4000);
});

onUnmounted(() => {
  clearInterval(interval);
});

const closePromo = () => {
  showPromo.value = false;
};

const goToSlide = (index) => {
  currentSlide.value = index;
};

const prevSlide = () => {
  currentSlide.value =
    (currentSlide.value - 1 + slides.length) % slides.length;
};

const nextSlide = () => {
  currentSlide.value = (currentSlide.value + 1) % slides.length;
};

// Hero slides
const slides = [
  {
    title: "Affordable Data Bundles",
    subtitle:
      "Stay online with our discounted MTN, Telecel, and AirtelTigo bundles.",
    buttonText: "Order Now",
    image: "/images/banner1.webp",
  },
  {
    title: "Seamless Streaming Access",
    subtitle: "Enjoy Netflix, Spotify, and Showmax at low prices anytime.",
    buttonText: "Subscribe Now",
    image: "/images/banner2.webp",
  },
  {
    title: "Exclusive Airtime Deals",
    subtitle: "Top-up instantly and get extra bonus for every purchase.",
    buttonText: "Buy Airtime",
    image: "/images/banner3.webp",
  },
  {
    title: "Instant WAEC & Router Offers",
    subtitle: "Fast WAEC checkers and routers for home or office.",
    buttonText: "Shop Now",
    image: "/images/banner4.webp",
  },
];

// Categories section
const categories = [
  {
    title: "Data Bundle",
    items: [
      {
        id: 1,
        name: "MTN Bundle",
        price: "4.30 - 350.00",
        image: "/images/Mtn.webp",
      },
      {
        id: 2,
        name: "AirtelTigo",
        price: "3.80 - 111.00",
        image: "/images/AIrtelTigo.webp",
      },
      {
        id: 3,
        name: "Telecel Non-Expiry",
        price: "41.00 - 362.00",
        image: "/images/telecel.webp",
      },
      {
        id: 4,
        name: "Airtime",
        price: "5 - 100",
        image: "/images/airtime.webp",
      },
    ],
  },
  {
    title: "Streaming",
    items: [
      {
        id: 1,
        name: "Netflix (Shared Account)",
        price: "33.00",
        image: "/images/Netflix.webp",
      },
      { id: 2, name: "Showmax", price: "40.00", image: "/images/showmax.webp" },
      { id: 3, name: "Spotify", price: "20.00", image: "/images/spotify.webp" },
      {
        id: 4,
        name: "DSTV Stream",
        price: "110.00 - 155.00",
        image: "/images/dstv.webp",
      },
    ],
  },
  {
    title: "Others",
    items: [
      { id: 1, name: "WAEC Checker", price: "17.00", image: "/images/waec.webp" },
      { id: 2, name: "Router", price: "435.00", image: "/images/router.webp" },
    ],
  },
];
</script>

<style scoped>
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fadeInUp {
  animation: fadeInUp 0.8s ease-out forwards;
}

/* Slide-in animation from left */
@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateX(-50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.animate-slideIn {
  animation: slideIn 0.8s ease-out forwards;
}

section {
  animation: fadeInUp 0.6s ease-out;
}
</style>
