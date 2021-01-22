<template>
  <header>
    <div class="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 class="text-3xl font-bold leading-tight text-gray-900">
        {{ msg }}
      </h1>
    </div>
  </header>
  <main>
    <div class="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="py-8 text-gray-600 leading-8">
        <p class="text-xl">
          For a guide and recipes on how to configure / customize this project,
          check out the
          <a
            href="https://vitejs.dev/"
            class="text-green-700 hover:text-green-900 font-medium underline"
            >Vite documentation</a
          >
        </p>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: {
      type: String,
      default: '',
    },
  },
};
</script>
