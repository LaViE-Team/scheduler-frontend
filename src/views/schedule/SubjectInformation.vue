<template>
  <CRow class="justify-content-left">
    <div class="d-grid gap-2 d-md-flex justify-content-md-start">
      <CDropdown color="primary" :alignment="{ xs: 'end', lg: 'start' }">
        <CDropdownToggle color="primary"
          >Import File Subject Information
        </CDropdownToggle>
        <CDropdownMenu>
          <CDropdownItem href="#"
            >Import File CSV <CIcon icon="cilCloudUpload"
          /></CDropdownItem>
          <CDropdownItem href="#"
            >Download Sample CSV <CIcon icon="cilCloudDownload"
          /></CDropdownItem>
        </CDropdownMenu>
      </CDropdown>
    </div>
    <div class="d-grid gap-2 d-md-flex justify-content-md-end">
      <CDropdown color="secondary" :alignment="{ xs: 'end', lg: 'start' }">
        <CDropdownToggle color="secondary"
          >Add Subject to Table
        </CDropdownToggle>
        <CDropdownMenu>
          <CDropdownItem href="#"
            >Subject1 <CIcon icon="cilLibraryAdd"
          /></CDropdownItem>
          <CDropdownItem href="#"
            >Subject2 <CIcon icon="cilLibraryAdd"
          /></CDropdownItem>
          <CDropdownItem href="#"
            >Subject3 <CIcon icon="cilLibraryAdd"
          /></CDropdownItem>
          <CDropdownItem href="#"
            >Subject4<CIcon icon="cilLibraryAdd"
          /></CDropdownItem>
        </CDropdownMenu>
      </CDropdown>
    </div>
  </CRow>
  <CTable :columns="columnsVariantExample" :items="itemsVariantExample" />
  <CPagination align="center" aria-label="Page navigation example">
    <CPaginationItem aria-label="Previous" href="#" disabled
      ><span aria-hidden="true">&laquo;</span></CPaginationItem
    >
    <CPaginationItem href="#" active>1</CPaginationItem>
    <CPaginationItem href="#">2</CPaginationItem>
    <CPaginationItem href="#">3</CPaginationItem>
    <CPaginationItem aria-label="Next" href="#"
      ><span aria-hidden="true">&raquo;</span></CPaginationItem
    >
  </CPagination>
  <CRow class="justify-content-center">
    <CButton color="success" shape="rounded-pill">DONE</CButton>
  </CRow>
</template>
<script>
export default {
  data: () => {
    return {
      columnsVariantExample: [
        { key: 'class', _props: { scope: 'col' } },
        { key: 'heading_1', label: 'Subject', _props: { scope: 'col' } },
        { key: 'heading_2', label: 'Class Code', _props: { scope: 'col' } },
        { key: 'heading_3', label: 'Time', _props: { scope: 'col' } },
        { key: 'heading_4', label: '', _props: { scope: 'col' } },
        { key: 'heading_5', label: '', _props: { scope: 'col' } },
      ],
      itemsVariantExample: [
        {
          class: '1',
          heading_1: 'Introduction to ICT',
          heading_2: 'IT3377',
          heading_3: 'Tue 8h-10h',
          heading_4: <CIcon icon="cilPencil" />,
          heading_5: <CIcon icon="cilXCircle" />,
          _cellProps: { class: { scope: 'row' } },
        },
        {
          class: '2',
          heading_1: 'Computer Achitecture',
          heading_2: 'IT3388',
          heading_3: 'Cell',
          heading_4: 'Tue 8h-10h',
          heading_5: <CIcon icon="cilPencil" />,
          heading_6: <CIcon icon="cilXCircle" />,
          _cellProps: { class: { scope: 'row' } },
          _props: { color: 'primary' },
        },
        {
          class: '3',
          heading_1: 'Computer Achitecture',
          heading_2: 'IT3388',
          heading_3: 'Cell',
          heading_4: 'Tue 8h-10h',
          heading_5: <CIcon icon="cilPencil" />,
          heading_6: <CIcon icon="cilXCircle" />,
          _cellProps: { class: { scope: 'row' } },
          _props: { color: 'secondary' },
        },
        {
          class: '4',
          heading_1: 'Computer Achitecture',
          heading_2: 'IT3388',
          heading_3: 'Cell',
          heading_4: 'Tue 8h-10h',
          heading_5: <CIcon icon="cilPencil" />,
          heading_6: <CIcon icon="cilXCircle" />,
          _cellProps: { class: { scope: 'row' } },
          _props: { color: 'success' },
        },
        {
          class: '5',
          heading_1: 'Introduction to ICT',
          heading_2: 'IT3377',
          heading_3: 'Tue 8h-10h',
          heading_4: <CIcon icon="cilPencil" />,
          heading_5: <CIcon icon="cilXCircle" />,
          _cellProps: { class: { scope: 'row' } },
          _props: { color: 'danger' },
        },
        {
          class: '6',
          heading_1: 'Introduction to ICT',
          heading_2: 'IT3377',
          heading_3: 'Tue 8h-10h',
          heading_4: <CIcon icon="cilPencil" />,
          heading_5: <CIcon icon="cilXCircle" />,
          _cellProps: { class: { scope: 'row' } },
          _props: { color: 'warning' },
        },
        {
          class: '7',
          heading_1: 'Introduction to ICT',
          heading_2: 'IT3377',
          heading_3: 'Tue 8h-10h',
          heading_4: <CIcon icon="cilPencil" />,
          heading_5: <CIcon icon="cilXCircle" />,
          _cellProps: { class: { scope: 'row' } },
          _props: { color: 'info' },
        },
        {
          class: '8',
          heading_1: 'Introduction to ICT',
          heading_2: 'IT3377',
          heading_3: 'Tue 8h-10h',
          heading_4: <CIcon icon="cilPencil" />,
          heading_5: <CIcon icon="cilXCircle" />,
          _cellProps: { class: { scope: 'row' } },
          _props: { color: 'light' },
        },
      ],
    }
  },
}
</script>
