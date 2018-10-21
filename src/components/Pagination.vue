<template>
  <nav
    class="pagination is-right"
    role="navigation"
    aria-label="pagination"
  >
    <a
      class="pagination-previous"
      @click="prev()"
      :disabled="page == 1"
    >Previous</a>
    <a
      class="pagination-next"
      @click="next()"
      :disabled="page == pages"
    >Next page</a>
    <ul class="pagination-list">
      <li
        v-for="p in page_list"
      >
        <a
          v-if="p"
          class="pagination-link"
          :class="{'is-current': p == page}"
          @click="setPage(p)"
        >{{ p }}</a>
        <span
          v-if="!p"
          class="pagination-ellipsis"
        >&hellip;</span>
      </li>
    </ul>
  </nav>
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    name: 'Pagination',
    props: ['loading', 'page', 'pageSize', 'setPage'],
    computed: {
      ...mapState({
        total: (state) => state.campaigns.total
      }),
      pages () {
        return Math.ceil(this.total / this.pageSize)
      },
      page_list () {
        // compute a list representing the quick page links to display
        if (this.pages < 6)
          return [1, 2, 3, 4, 5].slice(0, this.pages)
        if (this.page < 3)
          return [1, 2, 3, null, this.pages]
        if (this.page > this.pages - 2) 
          return [1, null, this.pages-2, this.pages-1, this.pages]
        return [1, null, this.page-1, this.page, this.page+1, null, this.pages]
      }
    },
    methods: {
      prev () {
        if (this.page == 1)
          return
        this.setPage(this.page-1)
      },
      next () {
        if (this.page == this.pages)
          return
        this.setPage(this.page+1)
      }
    }
  }
</script>