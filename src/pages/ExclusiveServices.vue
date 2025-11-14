<template>
  <div class="relative pb-9">
    <!-- Gradient Homepage Navbar -->
    <nav
      :class="[
        'fixed w-full z-50 transition-all duration-500',
        isScrolled
          ? 'bg-white shadow-md'
          : 'bg-gradient-to-r from-red-600 to-black text-white',
      ]"
    >
      <div
        class="max-w-[1440px] mx-auto flex items-center justify-between px-6 py-4 font-montserrat"
      >
        <!-- Logo -->
        <div class="text-2xl font-bold cursor-pointer" @click="goHome">
          <span :class="isScrolled ? 'text-red-600' : 'text-white'">Exclu</span>
          <span :class="isScrolled ? 'text-black' : 'text-white'">Save</span>
        </div>

        <!-- Links: visible on wide screens, hidden on <=1127px via custom-hide-nav -->
        <ul class="items-center hidden space-x-6 md:flex custom-hide-nav">
          <li v-for="link in navLinks" :key="link.name">
            <a
              :href="link.href"
              class="relative px-1 transition-all hover:text-red-600"
              :class="
                activeLink === link.name
                  ? 'after:absolute after:bottom-[-5px] after:left-0 after:w-full after:h-0.5 after:bg-red-600 after:rounded-full'
                  : ''
              "
            >
              {{ link.name }}
            </a>
          </li>
          <li>
            <button
              class="px-5 py-2 font-semibold text-white rounded-full cursor-pointer bg-gradient-to-r from-red-600 to-black hover:opacity-90 animate-fadeInUp"
            >
              Get Started
            </button>
          </li>
        </ul>

        <!-- Hamburger button: hidden by default, shown on <=1127px via custom-show-nav -->
        <button
          class="hidden cursor-pointer md:hidden custom-show-nav"
          @click="mobileMenuOpen = !mobileMenuOpen"
          aria-label="Open menu"
        >
          <span v-if="!mobileMenuOpen">&#9776;</span>
          <span v-else>&#10005;</span>
        </button>
      </div>

      <!-- Mobile Slide-down Menu -->
      <transition name="slide-fade">
        <div
          v-if="mobileMenuOpen"
          class="absolute left-0 w-full p-6 space-y-4 bg-white shadow-lg md:hidden top-full custom-mobile-menu"
        >
          <ul class="flex flex-col space-y-4">
            <li v-for="link in navLinks" :key="'mobile-' + link.name">
              <a
                :href="link.href"
                class="block font-semibold text-gray-900 hover:text-red-600"
              >
                {{ link.name }}
              </a>
            </li>
            <li>
              <button
                class="px-5 py-2 font-semibold text-white rounded-full bg-gradient-to-r from-red-600 to-black hover:opacity-90"
              >
                Get Started
              </button>
            </li>
          </ul>
        </div>
      </transition>
    </nav>

    <!-- Spacer for Navbar -->
    <div class="h-[100px]"></div>

    <!-- Hero Carousel -->
    <section
      class="carousel-responsive relative overflow-hidden rounded-3xl font-montserrat h-[500px] sm:h-[530px] max-w-[1440px] mt-4"
    >
      <div
        v-for="(slide, index) in slides"
        :key="index"
        class="absolute inset-0 transition-opacity duration-1000 ease-in-out"
        :class="{
          'opacity-100 z-10 animate-kenBurn': currentSlide === index,
          'opacity-0 z-0': currentSlide !== index,
        }"
      >
        <img
          :src="slide.image"
          alt="banner"
          class="object-cover w-full h-full rounded-3xl brightness-85"
        />
        <div class="absolute inset-0 bg-black/40 rounded-3xl"></div>

        <!-- Text Overlay (re-animates each slide change) -->
        <div
          v-if="currentSlide === index"
          :key="currentSlide"
          class="absolute inset-0 flex flex-col items-center justify-center px-6 text-center text-white animate-fadeInUp"
        >
          <h1 class="mb-4 text-3xl font-semibold sm:text-4xl drop-shadow-lg">
            {{ slide.title }}
          </h1>
          <p
            class="max-w-2xl mx-auto mb-6 text-base delay-100 sm:text-lg drop-shadow-md"
          >
            {{ slide.subtitle }}
          </p>
          <button
            class="px-10 py-3 font-semibold text-white transition-all duration-300 border-2 border-white cursor-pointer hover:bg-white hover:text-black"
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
          :class="[
            'w-3 h-3 rounded-full transition-all',
            currentSlide === index ? 'bg-white scale-110' : 'bg-white/50',
          ]"
        ></button>
      </div>
    </section>

    <!-- Categories Section -->
    <section class="px-4 py-16 mx-auto max-w-[1440px] font-montserrat">
      <div class="space-y-20">
        <div v-for="category in categories" :key="category.title">
          <h2
            class="pb-2 text-2xl font-semibold text-gray-900 border-b border-gray-200"
          >
            {{ category.title }}
          </h2>

          <div class="flex gap-6 pb-4 mt-8 overflow-x-auto scrollbar-hide">
            <div
              v-for="item in category.items"
              :key="item.id"
              class="relative min-w-[250px] overflow-hidden transition-all duration-300 bg-white border border-gray-100 shadow-sm group rounded-2xl hover:shadow-xl hover:-translate-y-1"
            >
              <div class="relative overflow-hidden">
                <img
                  :src="item.image"
                  :alt="item.name"
                  class="object-cover w-full h-[255px] transition-transform duration-500 rounded-t-2xl group-hover:scale-105 cursor-pointer"
                />
                <span
                  v-if="item.badge"
                  class="absolute px-3 py-1 text-xs font-semibold text-white bg-red-600 rounded-full top-3 left-3"
                >
                  {{ item.badge }}
                </span>
                <button
                  class="absolute px-4 py-2 text-white transition-all duration-300 -translate-x-1/2 bg-black rounded-full opacity-0 bottom-3 left-1/2 group-hover:opacity-100"
                >
                  Quick View
                </button>
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

    <!-- Floating Support Chat Box -->
    <div class="fixed z-50 bottom-6 right-6">
      <div>
        <button
          @click="chatOpen = !chatOpen"
          class="px-4 py-3 font-bold text-white transition-all bg-red-600 rounded-full shadow-lg hover:bg-black"
        >
          Chat
        </button>
      </div>
      <transition name="fade">
        <div
          v-if="chatOpen"
          class="p-4 mt-2 bg-white shadow-xl w-80 rounded-2xl"
        >
          <div v-for="(msg, index) in chatMessages" :key="index" class="mb-2">
            <div
              :class="[
                'p-2 rounded-xl',
                msg.type === 'user'
                  ? 'bg-red-600 text-white self-end'
                  : 'bg-gray-100 text-gray-900',
              ]"
            >
              {{ msg.text }}
            </div>
          </div>
          <input
            v-model="chatInput"
            @keyup.enter="sendMessage"
            type="text"
            placeholder="Type a message..."
            class="w-full px-3 py-2 mt-2 border rounded-lg"
          />
        </div>
      </transition>
    </div>
  </div>
  <Footer />
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import PromoModal from "../components/PromoModal.vue";
import Footer from "../components/Footer.vue";

const showPromo = ref(false);
const currentSlide = ref(0);
const interval = ref(null);

const mobileMenuOpen = ref(false);
const isScrolled = ref(false);
const activeLink = ref("Home");
const goHome = () => {
  window.location.href = "index.html";
};

const chatOpen = ref(false);
const chatInput = ref("");

const slides = [
  {
    title: "AFFORDABLE DATA",
    subtitle: "Fast delivery data at affordable prices",
    buttonText: "SHOP NOW",
    image: "/images/bundle-banner.jpg",
  },
  {
    title: "UNLIMITED STREAMING",
    subtitle: "Enjoy all your favorite shows and movies",
    buttonText: "SHOP NOW",
    image: "/images/front.jpg",
  },
  {
    title: "MUSIC SUBCRIPTION",
    subtitle: "Never get bothered, listen to your favorite tunes",
    buttonText: "SHOP NOW",
    image: "/images/front2.jpg",
  },
  {
    title: "UNLIMITED STREAMING",
    subtitle: "Enjoy all your favorite shows and movies",
    buttonText: "SHOP NOW",
    image: "/images/front3.jpg",
  },
];

const categories = [
  {
    title: "Data Bundle",
    items: [
      {
        id: 1,
        name: "MTN Bundle",
        price: "4.30 - 350.00",
        image: "/images/mtn.jpeg",
        badge: "Hot",
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
        image: "/images/telecel.png",
      },
      {
        id: 4,
        name: "Airtime",
        price: "5 - 100",
        image: "/images/airtime.jpg",
      },
    ],
  },
  {
    title: "Streaming",
    items: [
      { id: 1, name: "Netflix", price: "33.00", image: "/images/netflix.jpg" },
      { id: 2, name: "Showmax", price: "40.00", image: "/images/showmax.jpg" },
      { id: 3, name: "Spotify", price: "20.00", image: "/images/spotify.jpg" },
      {
        id: 4,
        name: "DSTV Stream",
        price: "110.00 - 155.00",
        image: "/images/dstv.png",
      },
    ],
  },
  {
    title: "Others",
    items: [
      {
        id: 1,
        name: "WAEC Checker",
        price: "17.00",
        image: "/images/waec.webp",
      },
      { id: 2, name: "Router", price: "435.00", image: "/images/router.webp" },
    ],
  },
];

const navLinks = [
  { name: "Home", href: "#" },
  { name: "Shop", href: "#" },
  { name: "Cart", href: "#" },
  { name: "Checkout", href: "#" },
  { name: "Register", href: "#" },
  { name: "Login", href: "#" },
  { name: "₵0.00", href: "#" },
  { name: "🛒 0 items – ₵0.00", href: "#" },
];

onMounted(() => {
  interval.value = setInterval(() => nextSlide(), 4000);
  window.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
  clearInterval(interval.value);
  window.removeEventListener("scroll", handleScroll);
});

const handleScroll = () => (isScrolled.value = window.scrollY > 50);
const goToSlide = (index) => (currentSlide.value = index);
const prevSlide = () =>
  (currentSlide.value =
    (currentSlide.value - 1 + slides.length) % slides.length);
const nextSlide = () =>
  (currentSlide.value = (currentSlide.value + 1) % slides.length);
const sendMessage = () => {
  if (!chatInput.value.trim()) return;

  const message = encodeURIComponent(chatInput.value);
  const phone = "233591063119"; // your WhatsApp number (example)

  const url = `https://wa.me/${phone}?text=${message}`;

  // open WhatsApp
  window.open(url, "_blank");

  // Clear the input
  chatInput.value = "";
};
</script>

<style scoped>
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(200px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.animate-fadeInUp {
  animation: fadeInUp 0.8s ease-out forwards;
}

@keyframes kenBurn {
  0% {
    transform: scale(1) translate(0, 0);
  }
  100% {
    transform: scale(1.05) translate(5px, 5px);
  }
}
.animate-kenBurn {
  animation: kenBurn 20s ease-in-out infinite;
}

.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.5s ease;
}
.slide-fade-enter-from,
.slide-fade-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

/* Toggle nav state at <= 1127px:
     - hide regular nav links (.custom-hide-nav)
     - show hamburger (.custom-show-nav)
     - ensure mobile menu (.custom-mobile-menu) is usable for those sizes
  */
@media (max-width: 1127px) {
  .custom-hide-nav {
    display: none !important;
  }
  .custom-show-nav {
    display: inline-flex !important;
  }
  .custom-mobile-menu {
    display: block !important;
  }
}

/* On wider screens (>1127px), hide the custom mobile menu just in case */
@media (min-width: 1128px) {
  .custom-mobile-menu {
    display: none !important;
  }
}

/* Responsive outer margins for carousel:
   - small screens: 1rem (like mx-4)
   - medium screens (>=768px): 2rem (like md:mx-8)
   - large screens (>=1128px): centered (margin auto)
*/
.carousel-responsive {
  margin-left: 1rem;
  margin-right: 1rem;
}

@media (min-width: 768px) {
  .carousel-responsive {
    margin-left: 2rem;
    margin-right: 2rem;
  }
}

/* This is the important breakpoint you asked for (1127px -> switch at 1128px) */
@media (min-width: 1128px) {
  .carousel-responsive {
    margin-left: auto;
    margin-right: auto;
  }
}

/* (optional) keep rounded corners clipping children cleanly */
.carousel-responsive > .absolute > img {
  border-radius: 1rem; /* aligns with rounded-3xl */
  overflow: hidden;
}
</style>
