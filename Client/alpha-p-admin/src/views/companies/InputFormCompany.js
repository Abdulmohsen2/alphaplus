import React, { useState, useEffect } from 'react'
import {
  CModalHeader,
  CModalBody,
  CModalFooter,
  CButton,
  CModal,
  CContainer,
  CCol,
  CForm,
  CFormGroup,
  CLabel,
  CInput,
  CRow,
  CSelect,
  CSpinner,
} from "@coreui/react";
  import { gql, useQuery } from "@apollo/client";
  import { useMutation } from "@apollo/client";
  import { useForm } from "../../../../alpha-p-admin/src/util/hooks";

  const CREATE_COMPANY = gql`

  mutation createCompany($CompanyInput: CompanyInput!  ) {
    createCompany(CompanyInput:$CompanyInput) {
    
      market
      sectorId
      id
      comname
      symbol
    }
  }
`;
const EDIT_COMPANY = gql`

mutation editCompany($CompanyInput: CompanyInput!) {
  editCompany(CompanyInput:$CompanyInput){
  
    market
    id
  }
}
`;


  const InputFormCompany = (props) => {
    const [modal, setModal] = useState(false);
    const toggle = () => {
      setModal(!modal);
      console.log(values);
    };
    const { onChange, onSubmit, values } = useForm(CreateCompanyInfoCallBack, {
      CompanyID: props.CompanyID,
      Comname: props.Comname,
      SectorID: props.SectorID,
      Market:props.Market,
      Symbol:null
    });
    const [CreateCompanyInfo, { loading }] = useMutation(EDIT_COMPANY, {
      onError(error) {
        console.log(`Error Happend Updating user info ${error}`);
      },
      onCompleted(data){
        console.log("here");
      },
    });
    function CreateCompanyInfoCallBack() {
      console.log(`Called `);
      CreateCompanyInfo();
    }
  return (
    <>
      <CButton name=""
        onClick={toggle}
         size="sm" color="primary"
      >{props.buttonName} </CButton>
      <CModal
        show={modal}
        onClose={toggle}
      >
        <CModalHeader closeButton>
                </CModalHeader>

                {loading ? (
          <CSpinner></CSpinner>
        ) : (
        <CModalBody>  
    <CContainer>
      <CRow>
        <CCol sm="12">
          <CForm onSubmit={(event)=>{
            event.preventDefault();
            var CompanyInput={
              CompanyID: values.CompanyID,
              Comname: values.Comname,
              SectorID: values.SectorID,
              Market:values.Market,
              Symbol:null

            };
            CreateCompanyInfo({ variables: {CompanyInput  } });
          }}>

            <CFormGroup>
              <CLabel htmlFor="Comname">old company name:  {values.Comname}	</CLabel>
              <CInput
                id="Comname"
                name="Comname"
                placeholder="Enter Company Name"
                autoComplete="Comname"
                onChange={onChange}
                
              />
            </CFormGroup>

            <CFormGroup>
              <CLabel htmlFor="Market">old market:  {values.Market}	</CLabel>
              <CInput
                name="Market"
                id="Market"
                placeholder="Enter Company market"
                autoComplete="Market"
                onChange={onChange}
              />
            </CFormGroup>

            {
            /* <CFormGroup>
              <CLabel htmlFor="symbol	">Company symbol	</CLabel>
              <CInput
                 name="symbol"
                placeholder="Enter User symbol"
                autoComplete="symbol"
                onChange={onChange}
              />
            </CFormGroup> */}
            <CFormGroup>
              <CLabel htmlFor="SectorID">old sector:  {values.SectorID}</CLabel>
              <CInput
                id="SectorID"
                name="SectorID"
                placeholder="Enter SectorID"
                autoComplete="SectorID"
                onChange={onChange}
                
              />
            </CFormGroup>
            <CButton color="primary" type="submit">
                      Submit
                    </CButton>{" "}
                    <CButton color="secondary" onClick={toggle}>
                      Cancel
                    </CButton>
          </CForm>
        </CCol>
      </CRow>
    </CContainer>
        </CModalBody>

        )}
        <CModalFooter>

        </CModalFooter>
      </CModal>
    </>
  )

  } 

  export default InputFormCompany