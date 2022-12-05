<template>
  <!-- Search and Filter -->
  <TableFilter
    v-if="!hideFilters"
    @submit="onSubmit"
    @resetFilters="onResetFilters"
  >
    <CRow>
      <CCol v-for="field in filters" :key="field.data" xs="12" class="mb-3">
        <CInputGroup>
          <Field
            :as="field.type"
            :name="field.data"
            :placeholder="field.type === 'CFormInput' ? field.label : ''"
            v-model="selectedFilters[field.data]"
            class="shadow-none"
          >
            <template v-if="field.type === 'CFormSelect'">
              <option value="">
                {{ field.label }}
              </option>
              <option
                v-for="option in field.options"
                :key="option.id"
                :value="option.id"
              >
                {{ option.name }}
              </option>
            </template>
          </Field>

          <template
            v-if="field.type === 'CFormInput' && !!selectedFilters[field.data]"
          >
            <CButton
              @click="selectedFilters[field.data] = ''"
              type="button"
              color="secondary"
              variant="outline"
            >
              <font-awesome-icon icon="fa-solid fa-xmark" />
            </CButton>
          </template>
        </CInputGroup>
      </CCol>
    </CRow>
  </TableFilter>

  <!-- Table -->
  <div class="mt-3 shadow-sm" id="datatable">
    <CTable responsive :hover="!isLoading && datas.length > 0" class="m-0">
      <CTableHead color="light" v-if="!hideHeader">
        <CTableRow>
          <CTableHeaderCell
            v-if="!hideIndex"
            scope="col"
            class="text-nowrap position-sticky"
          >
            Index
          </CTableHeaderCell>

          <CTableHeaderCell
            scope="col"
            v-for="column in columns"
            :key="column.data"
            :role="column.sortable && !isLoading ? 'button' : ''"
            @click="
              handleSort(
                column,
                sort[0] === column.data && sort[1] === 'asc' ? 'desc' : 'asc',
              )
            "
            class="text-nowrap position-sticky"
          >
            {{ column.title }}
            <template v-if="column.sortable">
              <font-awesome-icon
                v-if="
                  sort[0] === column.data && ['asc', 'desc'].includes(sort[1])
                "
                :icon="`fa-solid ${
                  sort[1] === 'asc' ? 'fa-sort-up' : 'fa-sort-down'
                }`"
              />
              <font-awesome-icon
                v-else
                icon="fa-solid fa-sort"
                class="text-secondary"
              />
            </template>
          </CTableHeaderCell>

          <CTableHeaderCell
            v-if="!hideActions"
            scope="col"
            class="text-nowrap position-sticky"
          >
            Actions
          </CTableHeaderCell>
        </CTableRow>
      </CTableHead>

      <CTableBody>
        <template v-if="!isLoading && datas.length > 0">
          <CTableRow
            v-for="(data, index) in datas"
            :key="data.id"
            class="align-middle"
          >
            <CTableHeaderCell v-if="!hideIndex" scope="row">
              <slot
                name="index"
                :value="(currentPage - 1) * itemsPerPage + (index + 1)"
                :data="data"
              >
                {{ (currentPage - 1) * itemsPerPage + (index + 1) }}
              </slot>
            </CTableHeaderCell>

            <CTableDataCell
              v-for="column in columns"
              :key="column.data"
              :role="clickable ? 'button' : ''"
              @click="handleCellClick(data)"
            >
              <slot
                :name="`column(${column.data})`"
                :value="data[column.data]"
                :data="data"
              >
                {{ data[column.data] }}
              </slot>
            </CTableDataCell>

            <CTableDataCell v-if="!hideActions">
              <slot name="actions" :data="data">
                <div class="d-flex align-items-center">
                  <slot name="actions(view)" :data="data">
                    <CButton
                      v-if="hasView"
                      color="light"
                      shape="rounded-pill"
                      @click="handleCellClick(data)"
                    >
                      <font-awesome-icon icon="fa-solid fa-eye" />
                    </CButton>
                  </slot>

                  <slot name="actions(edit)" :data="data">
                    <CButton
                      v-if="hasEdit"
                      color="warning"
                      shape="rounded-pill"
                      class="ms-2 text-dark"
                      @click="handleEditClick(data)"
                    >
                      <font-awesome-icon icon="fa-solid fa-pencil" />
                    </CButton>
                  </slot>

                  <slot name="actions(delete)" :data="data">
                    <CButton
                      v-if="hasDelete"
                      color="danger"
                      shape="rounded-pill"
                      class="ms-2 text-light"
                      @click="handleDeleteClick(data)"
                    >
                      <font-awesome-icon icon="fa-solid fa-trash" />
                    </CButton>
                  </slot>
                </div>
              </slot>
            </CTableDataCell>
          </CTableRow>
          <CTableRow v-if="hasAdd">
            <CTableDataCell
              class="text-center"
              :colspan="columns.length + (hideActions ? 0 : 1)"
            >
              <CButton
                @click="handleAddClick"
                type="button"
                color="success"
                shape="rounded-pill"
                class="ms-2 text-light"
              >
                <font-awesome-icon icon="fa-solid fa-plus" />
              </CButton>
            </CTableDataCell>
          </CTableRow>
        </template>

        <template v-else>
          <CTableRow>
            <CTableHeaderCell scope="row" :colspan="columns.length + 2">
              <template v-if="isLoading">
                <Loading />
              </template>
              <template v-if="!isLoading && datas.length < 1">
                <div class="text-center">No Data</div>
              </template>
            </CTableHeaderCell>
          </CTableRow>
        </template>
      </CTableBody>
    </CTable>
  </div>

  <!-- PerPage and Pagination -->
  <div
    v-if="!hideItemPerPageSelector || !hidePagination"
    class="d-flex flex-column flex-sm-row justify-content-between"
  >
    <div class="mt-3 d-flex justify-content-center align-items-center">
      <template v-if="!hideItemPerPageSelector">
        <slot name="itemPerPage">
          <ItemsPerPageSelect
            :selected="itemsPerPage"
            @itemSelect="onUpdateItemsPerPage"
          />
        </slot>
      </template>
    </div>

    <div class="mt-3 d-flex justify-content-center align-items-center ml-auto">
      <template v-if="!hidePagination">
        <slot name="pagination">
          <Pagination
            :pages="pages"
            @pageChange="handlePageChange"
            :currentPage="currentPage"
          />
        </slot>
      </template>
    </div>
  </div>
</template>

<script>
import { Field } from 'vee-validate'
import TableFilter from '@/components/Common/Filters.vue'
import Pagination from '@/components/Common/Pagination.vue'
import ItemsPerPageSelect from '@/components/Common/ItemsPerPageSelect.vue'
import { ref } from '@vue/reactivity'

export default {
  name: 'DataTable',
  components: {
    Field,
    TableFilter,
    Pagination,
    ItemsPerPageSelect,
  },
  emits: ['viewClick', 'editClick', 'deleteClick'],
  props: {
    columns: {
      type: Array,
      required: true,
    },
    datas: {
      type: Array,
      required: true,
    },
    queries: {
      type: Object,
      required: false,
      default: () => {},
    },
    filters: {
      type: Array,
      required: false,
      default: () => [],
    },
    pages: {
      type: Number,
      required: false,
      default: 1,
    },
    isLoading: {
      type: Boolean,
      required: false,
      default: false,
    },
    defaultSort: {
      type: Array,
      required: false,
    },
    hasView: {
      type: Boolean,
      required: false,
      default: false,
    },
    hasEdit: {
      type: Boolean,
      required: false,
      default: false,
    },
    hasDelete: {
      type: Boolean,
      required: false,
      default: false,
    },
    hasAdd: {
      type: Boolean,
      required: false,
      default: false,
    },
    clickable: {
      type: Boolean,
      required: false,
      default: false,
    },
    hideHeader: {
      type: Boolean,
      required: false,
      default: false,
    },
    hideIndex: {
      type: Boolean,
      required: false,
      default: false,
    },
    hideFilters: {
      type: Boolean,
      required: false,
      default: false,
    },
    hideItemPerPageSelector: {
      type: Boolean,
      required: false,
      default: false,
    },
    hidePagination: {
      type: Boolean,
      required: false,
      default: false,
    },
    hideActions: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  setup() {
    const currentPage = ref(1)
    const itemsPerPage = ref(10)
    const selectedFilters = ref({})
    const sort = ref([])

    return {
      selectedFilters,
      currentPage,
      itemsPerPage,
      sort,
    }
  },
  watch: {
    queries(queries) {
      this.setQueriesData(queries)
    },
  },
  methods: {
    setQueriesData(queries) {
      if (!this.hidePagination) {
        this.currentPage = parseInt(queries?.['page']) || 1
      }

      if (!this.hideItemPerPageSelector) {
        this.itemsPerPage = parseInt(queries?.['itemsPerPage']) || 10
      }

      if (!this.hideFilters) {
        this.filters.map((filter) => {
          this.selectedFilters[filter.data] = queries?.[filter.data] || ''
        })
      }

      // TODO: add regex for 'sortElement-sortType' here
      this.sort =
        queries?.['sort']?.split('-') ||
        this.defaultSort ||
        (this.columns[0] ? [this.columns[0]?.data, 'asc'] : ['', ''])
    },
    handleCellClick(cell) {
      if (this.clickable) {
        this.$emit('viewClick', cell)
      }
    },
    handleViewClick(cell) {
      if (this.hasView) {
        this.$emit('viewClick', cell)
      }
    },
    handleEditClick(cell) {
      if (this.hasEdit) {
        this.$emit('editClick', cell)
      }
    },
    handleDeleteClick(cell) {
      if (this.hasDelete) {
        this.$emit('deleteClick', cell)
      }
    },
    handleAddClick() {
      if (this.hasAdd) {
        this.$emit('addClick')
      }
    },
    onSubmit(values) {
      if (!this.hideFilters) {
        this.$router.push({
          query: { ...this.queries, page: undefined, ...values },
        })
      }
    },
    onResetFilters() {
      if (!this.hideFilters) {
        this.$router.push({
          query: {},
        })
      }
    },
    handleSort(column, sort) {
      if (column.sortable && !this.isLoading) {
        this.$router.push({
          query: { ...this.queries, sort: `${column.data}-${sort}` },
        })
      }
    },
    onUpdateItemsPerPage(number) {
      if (!this.hideItemPerPageSelector) {
        this.$router.push({
          query: { ...this.queries, page: undefined, itemsPerPage: number },
        })
      }
    },
    handlePageChange(number) {
      if (!this.hidePagination) {
        this.$router.push({ query: { ...this.queries, page: number } })
      }
    },
  },
  created() {
    this.setQueriesData(this.queries)
  },
}
</script>

<style scoped>
thead > tr > th {
  top: 0;
}

td {
  padding: 8px 4px 8px 4px;
}
</style>
