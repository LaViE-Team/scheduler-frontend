<template>
  <div class="d-flex align-items-center justify-content-center">
    <CSpinner color="primary" class="me-2" />
    <span>{{ $t('common.loading') }}</span>
  </div>
</template>

<script>
export default {
  name: 'Loading',
}
</script>
