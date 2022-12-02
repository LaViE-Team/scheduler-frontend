<template>
  <CContainer>
    <CRow class="justify-content-between">
      <CCol xs="4">
        <div style="padding: 20px">
          <CButton color="primary">New Schedule</CButton>
        </div>
      </CCol>
      <CCol xs="4">
        <div style="padding: 20px">
          <CDropdown
            :color="'secondary'"
            :togglerText="'secondary'"
            variant="btn-group"
          >
            <CDropdownToggle :color="'secondary'">{{
              'Type of schedule'
            }}</CDropdownToggle>
            <CDropdownMenu>
              <CDropdownItem href="#">Action</CDropdownItem>
              <CDropdownItem href="#">Another action</CDropdownItem>
              <CDropdownItem href="#">Something else here</CDropdownItem>
            </CDropdownMenu>
          </CDropdown>
        </div>
      </CCol>
    </CRow>
    <CTable>
      <CTableHead>
        <CTableRow color="primary">
          <CTableHeaderCell scope="col">Time</CTableHeaderCell>
          <CTableHeaderCell scope="col">Mon</CTableHeaderCell>
          <CTableHeaderCell scope="col">Tue</CTableHeaderCell>
          <CTableHeaderCell scope="col">Wed</CTableHeaderCell>
          <CTableHeaderCell scope="col">Thu</CTableHeaderCell>
          <CTableHeaderCell scope="col">Fri</CTableHeaderCell>
          <CTableHeaderCell scope="col">Sat</CTableHeaderCell>
          <CTableHeaderCell scope="col">Sun</CTableHeaderCell>
        </CTableRow>
      </CTableHead>
      <CTableBody>
        <CTableRow>
          <CTableHeaderCell scope="row">6h45 - 7h45</CTableHeaderCell>
          <CTableDataCell></CTableDataCell>
          <CTableDataCell></CTableDataCell>
          <CTableDataCell></CTableDataCell>
          <CTableDataCell></CTableDataCell>
          <CTableDataCell></CTableDataCell>
          <CTableDataCell></CTableDataCell>
          <CTableDataCell></CTableDataCell>
        </CTableRow>
        <CTableRow>
          <CTableHeaderCell scope="row">Primary</CTableHeaderCell>
          <CTableDataCell></CTableDataCell>
          <CTableDataCell></CTableDataCell>
          <CTableDataCell></CTableDataCell>
          <CTableDataCell></CTableDataCell>
          <CTableDataCell></CTableDataCell>
          <CTableDataCell></CTableDataCell>
          <CTableDataCell></CTableDataCell>
        </CTableRow>
        <CTableRow>
          <CTableHeaderCell scope="row">Secondary</CTableHeaderCell>
          <CTableDataCell></CTableDataCell>
          <CTableDataCell></CTableDataCell>
          <CTableDataCell></CTableDataCell>
          <CTableDataCell></CTableDataCell>
          <CTableDataCell></CTableDataCell>
          <CTableDataCell></CTableDataCell>
          <CTableDataCell></CTableDataCell>
        </CTableRow>
        <CTableRow>
          <CTableHeaderCell scope="row">Success</CTableHeaderCell>
          <CTableDataCell></CTableDataCell>
          <CTableDataCell></CTableDataCell>
          <CTableDataCell></CTableDataCell>
          <CTableDataCell></CTableDataCell>
          <CTableDataCell></CTableDataCell>
          <CTableDataCell></CTableDataCell>
          <CTableDataCell></CTableDataCell>
        </CTableRow>
        <CTableRow>
          <CTableHeaderCell scope="row">Danger</CTableHeaderCell>
          <CTableDataCell></CTableDataCell>
          <CTableDataCell></CTableDataCell>
          <CTableDataCell></CTableDataCell>
          <CTableDataCell></CTableDataCell>
          <CTableDataCell></CTableDataCell>
          <CTableDataCell></CTableDataCell>
          <CTableDataCell></CTableDataCell>
        </CTableRow>
        <CTableRow>
          <CTableHeaderCell scope="row">Warning</CTableHeaderCell>
          <CTableDataCell></CTableDataCell>
          <CTableDataCell></CTableDataCell>
          <CTableDataCell></CTableDataCell>
          <CTableDataCell></CTableDataCell>
          <CTableDataCell></CTableDataCell>
          <CTableDataCell></CTableDataCell>
          <CTableDataCell></CTableDataCell>
        </CTableRow>
        <CTableRow>
          <CTableHeaderCell scope="row">Info</CTableHeaderCell>
          <CTableDataCell></CTableDataCell>
          <CTableDataCell></CTableDataCell>
          <CTableDataCell></CTableDataCell>
          <CTableDataCell></CTableDataCell>
          <CTableDataCell></CTableDataCell>
          <CTableDataCell></CTableDataCell>
          <CTableDataCell></CTableDataCell>
        </CTableRow>
      </CTableBody>
    </CTable>
    <CRow class="justify-content-between">
      <CCol xs="6">
        <CPagination aria-label="Page navigation example">
          <CPaginationItem aria-label="Previous" href="#" disabled
            ><span aria-hidden="true">&laquo;</span>
          </CPaginationItem>
          <CPaginationItem href="#" active>1</CPaginationItem>
          <CPaginationItem href="#">2</CPaginationItem>
          <CPaginationItem href="#">3</CPaginationItem>
          <CPaginationItem aria-label="Next" href="#"
            ><span aria-hidden="true">&raquo;</span>
          </CPaginationItem>
        </CPagination>
      </CCol>
      <CCol xs="6">
        <CButton color="success">Export</CButton>
      </CCol>
    </CRow>
  </CContainer>
</template>

<script>
export default {
  name: 'Schedule',
}
</script>
