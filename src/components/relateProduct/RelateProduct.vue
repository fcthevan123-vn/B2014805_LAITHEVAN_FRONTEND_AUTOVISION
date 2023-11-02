<template>
  <div class="bg-white">
    <div class="max-w-2xl mx-auto py-4 sm:px-6 lg:max-w-7xl lg:px-8 px-6">
      <h2 class="text-xl font-bold tracking-tight text-gray-700">
        Có thể bạn sẽ thích
      </h2>

      <div
        class="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8"
      >
        <div
          v-for="product in products"
          :key="product.id"
          class="group relative"
        >
          <div
            class="w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 group-hover:scale-105 duration-200 lg:h-80 lg:aspect-none"
          >
            <img
              :src="product.imageSrc"
              :alt="product.imageAlt"
              class="w-full h-full object-center object-cover lg:w-full lg:h-full"
            />
          </div>
          <div class="mt-4 flex justify-between">
            <div>
              <h3 class="text-sm text-gray-700">
                <a :href="product.href">
                  <span aria-hidden="true" class="absolute inset-0" />
                  {{ product.name }}
                </a>
              </h3>
              <p class="mt-1 text-sm text-gray-500">{{ product.color }}</p>
            </div>
            <p class="text-sm font-medium text-gray-900">{{ product.price }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const products = [
  {
    id: 1,
    name: "Nike Air Force 1",
    href: "#",
    imageSrc:
      "https://images.unsplash.com/photo-1579338559194-a162d19bf842?auto=format&fit=crop&q=80&w=1887&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    imageAlt: "Front of men's Nike Air Force 1 in white.",
    price: "$120",
    color: "White",
  },
  {
    id: 2,
    name: "Adidas Superstar",
    href: "#",
    imageSrc:
      "https://images.unsplash.com/photo-1628253747716-0c4f5c90fdda?auto=format&fit=crop&q=80&w=1887&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    imageAlt: "Front of men's Adidas Superstar in black and white.",
    price: "$90",
    color: "Black/White",
  },
  {
    id: 3,
    name: "Puma RS-X",
    href: "#",
    imageSrc:
      "https://images.unsplash.com/photo-1512374382149-233c42b6a83b?auto=format&fit=crop&q=80&w=1935&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    imageAlt: "Front of men's Puma RS-X in red and black.",
    price: "$110",
    color: "Red/Black",
  },
  {
    id: 4,
    name: "Reebok Classic Leather",
    href: "#",
    imageSrc:
      "https://images.unsplash.com/photo-1597045566677-8cf032ed6634?auto=format&fit=crop&q=80&w=1887&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    imageAlt: "Front of men's Reebok Classic Leather in white and gum sole.",
    price: "$80",
    color: "White/Gum",
  },
];

export default {
  setup() {
    return {
      products,
    };
  },
};
</script>
