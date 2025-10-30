<template>
  <div class="overflow-x-hidden">
    <Header />
    <Hero />
    <Product />
    <TestimonialSection />
    <Collections />
    <SampleCollection />

<!--What-makes-us-stand-out-->
<section class="max-w-[1440px] mx-auto px-6 py-20">
  <!--Flex-heading-->
  <div class="flex items-center justify-center">
    <h1 class="text-2xl font-semibold text-gray-900 sm:text-3xl lg:text-4xl">
      Why ExcluSave Stands Out
    </h1>
  </div>

  <div class="grid grid-cols-1 gap-8 mt-20 md:grid-cols-3">
    <!-- Card 1 -->
    <div
      class="relative p-8 transition duration-300 shadow-sm bg-gray-50 rounded-2xl hover:bg-gray-100"
    >
      <!-- Icon -->
      <div
        class="absolute -top-6 left-8 flex items-center justify-center w-12 h-12 bg-[#F2EBFF] rounded-full shadow-sm"
      >
        <i class="text-xl text-orange-500 fa-solid fa-bolt"></i>
      </div>
      <!-- Text -->
      <h3 class="mt-6 mb-3 text-lg font-semibold text-gray-900">
        Seamless Shopping Experience
      </h3>
      <p class="text-sm leading-relaxed text-gray-500">
        At ExcluSave, we make your shopping journey smooth, fast, and enjoyable — from browsing to checkout.
      </p>
    </div>

    <!-- Card 2 -->
    <div
      class="relative p-8 transition duration-300 shadow-sm bg-gray-50 rounded-2xl hover:bg-gray-100"
    >
      <div
        class="absolute -top-6 left-8 flex items-center justify-center w-12 h-12 bg-[#F2EBFF] rounded-full shadow-sm"
      >
        <i class="text-xl text-blue-500 fa-solid fa-gem"></i>
      </div>
      <h3 class="mt-6 mb-3 text-lg font-semibold text-gray-900">
        Exclusive Quality & Designs
      </h3>
      <p class="text-sm leading-relaxed text-gray-500">
        Every item on ExcluSave is carefully selected for style, durability, and authenticity — made to stand out.
      </p>
    </div>

    <!-- Card 3 -->
    <div
      class="relative p-8 transition duration-300 shadow-sm bg-gray-50 rounded-2xl hover:bg-gray-100"
    >
      <div
        class="absolute -top-6 left-8 flex items-center justify-center w-12 h-12 bg-[#F2EBFF] rounded-full shadow-sm"
      >
        <i class="text-xl text-red-500 fa-solid fa-truck-fast"></i>
      </div>
      <h3 class="mt-6 mb-3 text-lg font-semibold text-gray-900">
        Fast & Reliable Delivery
      </h3>
      <p class="text-sm leading-relaxed text-gray-500">
        Get your orders quickly and safely, with complete tracking and trusted delivery partners.
      </p>
    </div>
  </div>
</section>


    <Footer />
  </div>
</template>

<script setup>
import Header from "@/components/Header.vue"
import Hero from "@/components/Hero.vue"
import Product from "@/components/Product.vue"
import TestimonialSection from "@/components/TestimonialSection.vue"
import Collections from "@/components/Collections.vue"
import SampleCollection from "@/components/SampleCollection.vue"
import Footer from "@/components/Footer.vue"
</script>
