<template>
  <div class="max-w-2xl p-8 mx-auto my-20 overflow-x-hidden bg-white shadow-lg rounded-2xl">
    <h2 class="mb-6 text-2xl font-bold text-center">Add New Product</h2>

    <form @submit.prevent="addProduct" class="space-y-5">
      <!-- Product Name -->
      <div>
        <label class="block mb-1 font-medium text-gray-700">Product Name</label>
        <input
          v-model="name"
          type="text"
          placeholder="Enter product name"
          class="w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-black"
          required
        />
      </div>

      <!-- Description -->
      <div>
        <label class="block mb-1 font-medium text-gray-700">Description</label>
        <textarea
          v-model="description"
          placeholder="Memory: 1TB, Graphics Card: 8GB, Display: 14 inch"
          class="w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-black"
          required
        ></textarea>
      </div>

      <!-- Condition -->
      <div>
        <label class="block mb-1 font-medium text-gray-700">Condition</label>
        <select
          v-model="condition"
          class="w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-black"
          required
        >
          <option value="">Select Condition</option>
          <option>New</option>
          <option>Used</option>
          <option>Refurbished</option>
        </select>
      </div>

      <!-- Category -->
      <div>
        <label class="block mb-1 font-medium text-gray-700">Category</label>
        <select
          v-model="category"
          class="w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-black"
          required
        >
          <option value="">Select Category</option>
          <option>Technology</option>
          <option>Home</option>
          <option>Mobile Phones</option>
        </select>
      </div>

      <!-- Price -->
      <div>
        <label class="block mb-1 font-medium text-gray-700">Price</label>
        <input
          v-model="price"
          type="text"
          placeholder="GHS 100"
          class="w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-black"
          required
        />
      </div>

      <!-- Images -->
      <div>
        <label class="block mb-1 font-medium text-gray-700"
          >Upload Images (Multiple allowed)</label
        >
        <input
          type="file"
          multiple
          accept="image/*"
          @change="handleFileChange"
          class="w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-black"
        />
      </div>

      <div v-if="imagePreviews.length" class="flex flex-wrap gap-2 mt-2">
        <img
          v-for="(img, index) in imagePreviews"
          :key="index"
          :src="img"
          class="object-cover w-20 h-20 border rounded-lg"
        />
      </div>

      <!-- Submit Button -->
      <button
        type="submit"
        class="w-full py-3 text-white transition bg-black rounded-lg hover:bg-gray-800"
      >
        {{ loading ? "Adding Product..." : "Add Product" }}
      </button>
    </form>

    <!-- Live Preview -->
    <div
      v-if="name || description || category || price || imagePreviews.length"
      class="p-6 mt-10 border rounded-xl bg-gray-50"
    >
      <h3 class="mb-4 text-xl font-semibold text-gray-900">Preview</h3>
      <p><strong>Name:</strong> {{ name }}</p>
      <p><strong>Description:</strong> {{ description }}</p>
      <p><strong>Condition:</strong> {{ condition }}</p>
      <p><strong>Category:</strong> {{ category }}</p>
      <p><strong>Price:</strong> {{ price }}</p>
      <div class="flex flex-wrap gap-2 mt-2">
        <img
          v-for="(img, index) in imagePreviews"
          :key="index"
          :src="img"
          class="object-cover w-20 h-20 border rounded-lg"
        />
      </div>
    </div>

    <!-- Success Message -->
    <p v-if="message" class="mt-4 font-medium text-center text-green-600">
      {{ message }}
    </p>

    <p class="mt-6 text-center">
      <a href="./products.html" class="text-indigo-600 hover:underline">
        View all products
      </a>
    </p>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { db } from "@/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

const CLOUD_NAME = "dw8olqtqi";
const UPLOAD_PRESET = "exclusave_upload";

const name = ref("");
const description = ref("");
const category = ref("");
const price = ref("");
const condition = ref("");
const images = ref([]);
const imagePreviews = ref([]);
const loading = ref(false);
const message = ref("");

const handleFileChange = (e) => {
  images.value = Array.from(e.target.files);
  imagePreviews.value = images.value.map((file) => URL.createObjectURL(file));
};

const uploadImagesToCloudinary = async (files) => {
  const uploadedUrls = [];
  for (const file of files) {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", UPLOAD_PRESET);

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await response.json();
    uploadedUrls.push(data.secure_url);
  }
  return uploadedUrls;
};

const addProduct = async () => {
  if (
    !name.value ||
    !description.value ||
    !category.value ||
    !price.value ||
    !condition.value ||
    images.value.length === 0
  ) {
    alert("Please fill all fields and select at least one image!");
    return;
  }

  loading.value = true;

  try {
    const uploadedUrls = await uploadImagesToCloudinary(images.value);
    await addDoc(collection(db, "products"), {
      name: name.value,
      description: description.value,
      category: category.value,
      price: price.value,
      condition: condition.value,
      images: uploadedUrls,
      createdAt: serverTimestamp(),
    });

    message.value = "✅ Product added successfully!";
    name.value = "";
    description.value = "";
    category.value = "";
    price.value = "";
    condition.value = "";
    images.value = [];
    imagePreviews.value = [];
  } catch (error) {
    console.error("Error adding product:", error);
    alert("❌ Error adding product. Check console for details.");
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
body {
  font-family: "Inter", sans-serif;
}
</style>
