<template>
<section class="px-6 py-20 bg-gray-100">
  <div class="max-w-[1000px] mx-auto bg-[#ebebeb9c] rounded-3xl p-6 sm:p-10 text-center relative shadow-sm transition-all duration-500 ease-in-out px-6">
    <!-- Navigation Arrows -->
    <div class="absolute flex gap-3 top-4 sm:top-6 right-4 sm:right-6">
      <button
        @click="prevTestimonial"
        class="flex items-center justify-center w-8 h-8 transition bg-white rounded-full shadow sm:w-10 sm:h-10 hover:bg-gray-100"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4 sm:w-5 sm:h-5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
        </svg>
      </button>
      <button
        @click="nextTestimonial"
        class="flex items-center justify-center w-8 h-8 transition bg-white rounded-full shadow sm:w-10 sm:h-10 hover:bg-gray-100"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4 sm:w-5 sm:h-5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
        </svg>
      </button>
    </div>

    <!-- User Image -->
    <div class="flex justify-center mb-4 sm:mb-6">
      <img
        :src="current.image"
        :alt="current.name"
        class="object-cover w-12 h-12 transition-all duration-500 rounded-full shadow-md sm:w-16 sm:h-16"
      />
    </div>

    <!-- Testimonial Text -->
    <p class="mb-4 text-xl font-semibold leading-snug text-gray-900 transition-all duration-500 sm:text-2xl sm:text-3xl">
      “{{ current.text }}”
    </p>

    <!-- Rating -->
    <div class="flex justify-center gap-1 mb-2 text-yellow-500 sm:mb-1">
      <span v-for="star in current.rating" :key="star">★</span>
    </div>
    <p class="text-xs text-gray-500 sm:text-sm">{{ current.name }} — {{ current.role }}</p>

    <!-- Client Logos -->
    <div class="mt-6 sm:mt-10">
      <p class="mb-4 text-xs text-gray-400 sm:text-sm">
        Feature client logos to build trust and credibility for your brand:
      </p>
      <div class="flex flex-wrap justify-center gap-4 sm:gap-6 opacity-70">
        <img v-for="(logo, i) in clientLogos" :key="i" :src="logo" alt="Client logo" class="h-4 sm:h-6" />
      </div>
    </div>
  </div>
</section>
</template>

<script>
export default {
  name: "TestimonialSection",
  data() {
    return {
      testimonials: [
        {
          text: "This platform helped me find quality gadgets quickly. I love the convenience and reliability!",
          name: "Samuel Ofori",
          role: "Student, KNUST",
          image: "/src/assets/img/exclu-save-hero-section.jpg",
          rating: 5,
        },
        {
          text: "A trustworthy platform with excellent customer service. I always find what I need!",
          name: "Ama Boateng",
          role: "Entrepreneur",
          image: "/src/assets/img/exclu-save-hero-section.jpg",
          rating: 4,
        },
        {
          text: "Buying and selling tech gadgets has never been this smooth. Highly recommended!",
          name: "Kwesi Mensah",
          role: "Tech Enthusiast",
          image: "/src/assets/img/exclu-save-hero-section.jpg",
          rating: 5,
        },
        {
          text: "I managed to get affordable deals for my classmates. The platform is student-friendly!",
          name: "Abigail Owusu",
          role: "University Student",
          image: "/src/assets/img/exclu-save-hero-section.jpg",
          rating: 4,
        },
        {
          text: "Super easy to use and secure. I’ve sold multiple gadgets here without issues.",
          name: "Daniel Nyarko",
          role: "Freelancer",
          image: "/src/assets/img/exclu-save-hero-section.jpg",
          rating: 5,
        },
      ],
      currentIndex: 0,
      clientLogos: [
        "/src/assets/img/exclu-save-hero-section.jpg",
        "/src/assets/img/exclu-save-hero-section.jpg",
        "/src/assets/img/exclu-save-hero-section.jpg",
        "/src/assets/img/exclu-save-hero-section.jpg",
        "/src/assets/img/exclu-save-hero-section.jpg",
      ],
    };
  },
  computed: {
    current() {
      return this.testimonials[this.currentIndex];
    },
  },
  methods: {
    nextTestimonial() {
      this.currentIndex = (this.currentIndex + 1) % this.testimonials.length;
    },
    prevTestimonial() {
      this.currentIndex =
        (this.currentIndex - 1 + this.testimonials.length) %
        this.testimonials.length;
    },
  },
};
</script>
