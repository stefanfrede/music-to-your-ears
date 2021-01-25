<template>
  <Header class="pt-10" />
  <div class="py-10">
    <Home />
  </div>
</template>

<script>
import { computed, reactive } from 'vue';
import { useHead } from '@vueuse/head';

import { siteData } from '@/store';

import Header from '@/components/Header.vue';
import Home from '@/layouts/Home.vue';

export default {
  name: 'App',
  components: {
    Header,
    Home,
  },
  setup() {
    const data = reactive(siteData);

    useHead({
      link: [
        {
          rel: 'canonical',
          href: computed(() => data.url),
        },
      ],
      meta: [
        {
          property: 'og:site_name',
          content: computed(() => data.title),
        },
        {
          property: 'og:title',
          content: computed(() => data.title),
        },
        {
          property: 'og:type',
          content: 'website',
        },
        {
          property: 'og:url',
          content: computed(() => data.url),
        },
        {
          name: 'twitter:card',
          content: 'summary_large_image',
        },
        {
          property: 'og:image',
          content: computed(() => `${data.url}social-share.png`),
        },
        {
          name: 'twitter:image',
          content: computed(() => `${data.url}social-share.png`),
        },
        {
          property: 'og:image:alt',
          content: computed(() => `Page image for ${data.title}`),
        },
        {
          name: 'twitter:image:alt',
          content: computed(() => `Page image for ${data.title}`),
        },
        {
          name: 'description',
          content: computed(() => data.description),
        },
        {
          name: 'twitter:description',
          content: computed(() => data.description),
        },
        {
          property: 'og:description',
          content: computed(() => data.description),
        },
      ],
      title: computed(() => data.title),
    });
  },
};
</script>
