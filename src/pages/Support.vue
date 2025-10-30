<template>
  <div >
    <Header />

       <!-- Support Banner -->
       <section
      class="bg-[#eeeaf3] mx-3 py-16 sm:py-24 rounded-3xl text-center font-montserrat max-w-[1440px] lg:mx-auto mt-20 px-4 sm:px-6"
    >
      <span
        class="px-3 py-1 text-xs font-medium text-gray-700 bg-gray-100 rounded-full shadow-sm sm:text-sm sm:px-4"
      >
        Support
      </span>

      <h1
        class="mt-4 text-3xl font-semibold leading-tight text-gray-900 sm:mt-6 sm:text-4xl md:text-5xl"
      >
        Need our <br />
        Assistance?
      </h1>

      <p
        class="max-w-xl mx-auto mt-4 text-base text-gray-600 sm:max-w-2xl sm:mt-6 sm:text-lg"
      >
        Shop smarter with ExcluSave — where quality meets affordability. Explore
        all categories and enjoy premium shopping experiences designed just for
        you.
      </p>
    </section>

    <div class="max-w-3xl mx-auto mb-16 text-center">
      <h1 class="text-3xl font-bold text-gray-900 sm:text-4xl mt-15">
        Frequently asked questions
      </h1>
      <p class="mx-3 mt-3 text-sm text-gray-600 sm:text-base">
        Shop smarter with ExcluSave — where quality meets affordability. Explore all categories and enjoy premium shopping experiences designed just for you.
      </p>
    </div>

    <!-- FAQ Section -->
    <div class="mx-3">
      <div class="max-w-2xl mx-auto space-y-4">
      <div
        v-for="(faq, index) in faqs"
        :key="index"
        class="overflow-hidden transition-all bg-white border border-gray-200 shadow-sm rounded-2xl"
      >
        <button
          @click="toggleFAQ(index)"
          class="flex items-center justify-between w-full px-6 py-4 text-left focus:outline-none hover:bg-gray-50"
        >
          <span class="font-semibold text-gray-900">{{ faq.question }}</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-5 h-5 text-gray-500 transition-transform duration-200 cursor-pointer"
            :class="{ 'rotate-180': activeIndex === index }"
          >
            <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
          </svg>
        </button>

        <div
          v-show="activeIndex === index"
          class="px-6 pb-4 text-sm text-gray-600 transition-all duration-300 sm:text-base bg-purple-50"
        >
          {{ faq.answer }}
        </div>
      </div>
    </div>
    </div>

    <section class="max-w-3xl px-6 py-20 mx-auto">
    <h2 class="mb-4 text-3xl font-bold text-center">Still got questions?</h2>
    <p class="mb-10 text-center text-gray-500">
      Send us a message below and we’ll get back to you in 1 business day.
    </p>

    <!-- Contact Form -->
    <form @submit.prevent="handleSubmit" class="space-y-6">
      <div>
        <label class="block mb-1 font-medium text-gray-700">Name</label>
        <input
          type="text"
          v-model="form.name"
          placeholder="Hebron Blay"
          class="w-full px-4 py-3 border border-gray-300 outline-none rounded-xl focus:ring-2 focus:ring-purple-500"
          required
        />
      </div>

      <div>
        <label class="block mb-1 font-medium text-gray-700">Email</label>
        <input
          type="email"
          v-model="form.email"
          placeholder="exclu@gmail.com"
          class="w-full px-4 py-3 border border-gray-300 outline-none rounded-xl focus:ring-2 focus:ring-purple-500"
          required
        />
      </div>

      <div>
        <label class="block mb-1 font-medium text-gray-700">Message</label>
        <textarea
          v-model="form.message"
          placeholder="Hey, I need help with..."
          class="w-full h-32 px-4 py-3 border border-gray-300 outline-none resize-none rounded-xl focus:ring-2 focus:ring-purple-500"
          required
        ></textarea>
      </div>

      <button
        type="submit"
        :disabled="loading"
        class="w-full py-3 font-semibold text-white transition-all cursor-pointer rounded-xl bg-gradient-to-r from-purple-600 to-indigo-500 hover:opacity-90 disabled:opacity-60"
      >
        {{ loading ? 'Sending...' : 'Submit' }}
      </button>
    </form>

    <!-- Success Message -->
    <transition name="fade">
      <div
        v-if="success"
        class="flex items-center justify-between p-5 mt-8 text-green-800 border border-green-200 bg-green-50 rounded-2xl"
      >
        <span>✅ Message sent successfully! We’ll get back to you soon.</span>
        <button @click="success = false" class="font-bold text-green-700 cursor-pointer">
          ✕
        </button>
      </div>
    </transition>
  </section>

    <Footer />
  </div>
</template>

<script setup>
  import Header from '@/components/Header.vue'
  import Footer from '@/components/Footer.vue'

  import { ref } from "vue";

const activeIndex = ref(null);

const faqs = [
  {
    question: "How long does shipping take for physical products?",
    answer:
      "Shipping usually takes 3–5 business days depending on your location.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept major credit/debit cards and mobile money.",
  },
  {
    question: "What's your return policy?",
    answer:
      "We accept returns within 14 days for unused products in their original packaging.",
  },
  {
    question: "Do you offer international shipping?",
    answer:
      "No, currently we only ship within the country.",
  },
  {
    question: "How do I contact customer support?",
    answer:
      "We're here to assist you every step of the way. If you have any questions, concerns, or need assistance with your order, our dedicated customer support team is readily available to help.",
  },
];

const form = ref({
  name: "",
  email: "",
  message: "",
});

const loading = ref(false);
const success = ref(false);

const toggleFAQ = (index) => {
  activeIndex.value = activeIndex.value === index ? null : index;
};

const handleSubmit = () => {
  loading.value = true;

  // Simulate sending
  setTimeout(() => {
    loading.value = false;
    success.value = true;
    form.value = { name: "", email: "", message: "" };
  }, 1500);
};
</script>

<style scoped>
.font-montserrat {
  font-family: "Montserrat", sans-serif;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
