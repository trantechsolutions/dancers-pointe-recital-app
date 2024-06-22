<template>
  <v-footer height="40" app>
    <a
      v-for="item in items"
      :key="item.title"
      :href="item.href"
      :title="item.title"
      class="d-inline-block mx-2 social-link"
      rel="noopener noreferrer"
      target="_blank"
    >
      <v-icon
        :icon="item.icon"
        :size="16"
      />
    </a>
    <div
      class="text-caption text-disabled"     
    >Build prod.{{ build }}</div>

    <div
      class="text-caption text-disabled"
      style="position: absolute; right: 16px;"
    >
    &copy; {{ (new Date()).getFullYear() }} <span class="d-none d-sm-inline-block">Dancer's Pointe, LLC</span>
    </div>
  </v-footer>
</template>

<script>
export default {
  data: () => ({
    build: import.meta.env.VITE_APP_GIT_REVISION,
    items: [
      {
        title: 'Dancer\'s Pointe Website',
        icon: 'mdi-earth',
        href: 'https://dancers-pointe.com/',
      },
      {
        title: 'Facebook - Dancer\'s Pointe',
        icon: 'mdi-facebook',
        href: 'https://www.facebook.com/DancersPointeDP/',
      },
    ]
  })
}
</script>

<style scoped lang="sass">
  .social-link :deep(.v-icon)
    color: rgba(var(--v-theme-on-background), var(--v-disabled-opacity))
    text-decoration: none
    transition: .2s ease-in-out

    &:hover
      color: rgba(25, 118, 210, 1)
</style>
