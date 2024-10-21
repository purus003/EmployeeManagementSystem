import React, { useState } from "react";
import axios from "axios";
import * as Yup from "yup";

const AddEmployeeForm = ({ closeOverlay, loadEmployee }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [errors, setErrors] = useState({}); 
  const [formData, setFormData] = useState({
    personalDetails: {
      fullName: '',
      dateOfBirth: '',
      age: '',
      currentAddressLine1: '',
      currentAddressLine2: '',
      currentCity: '',
      currentPincode: '',
      permanentAddressLine1: '',
      permanentAddressLine2: '',
      permanentCity: '',
      permanentPincode: '',
      mobile: '',
      personalEmail: '',
      emergencyContactName: '',
      emergencyContactMobile: '',
      sameAsCurrentAddress: false,
    },
    professionalDetails: {
      employmentCode: "",
      companyEmail: "",
      officePhone: "",
      officeCity: "",
      officeAddress: "",
      reportingManager: "",
      hrName: "",
      dateOfJoining: "",
      employmentHistory: "",
    },
    financeDetails: {
      panCard: "",
      aadharCard: "",
      bankName: "",
      branch: "",
      ifscCode: "",
      ctc: "",
    },
  });

  const validationSchema = Yup.object().shape({
    personalDetails: Yup.object().shape({
      fullName: Yup.string().required("Full Name is required"),
      dateOfBirth: Yup.date().required("Date of Birth is required"),
      mobile: Yup.string()
        .matches(/^[6-9]\d{9}$/, "Invalid Mobile Number")
        .required("Mobile number is required"),
      personalEmail: Yup.string().email("Invalid email").required("Email is required"),
      emergencyContactName: Yup.string().required("Emergency contact name is required"),
      emergencyContactMobile: Yup.string()
        .matches(/^[6-9]\d{9}$/, "Invalid Emergency Contact Mobile")
        .required("Emergency contact mobile is required"),
      currentAddressLine1: Yup.string().required("Current Address Line 1 is required"),
      currentCity: Yup.string().required("Current City is required"),
      currentPincode: Yup.string()
        .matches(/^\d{6}$/, "Invalid Pincode")
        .required("Current Pincode is required"),
      permanentAddressLine1: Yup.string().when("sameAsCurrentAddress", {
        is: false,
        then: Yup.string().required("Permanent Address Line 1 is required"),
      }),
      permanentCity: Yup.string().when("sameAsCurrentAddress", {
        is: false,
        then: Yup.string().required("Permanent City is required"),
      }),
      permanentPincode: Yup.string()
        .matches(/^\d{6}$/, "Invalid Pincode")
        .when("sameAsCurrentAddress", {
          is: false,
          then: Yup.string().required("Permanent Pincode is required"),
        }),
    }),
    professionalDetails: Yup.object().shape({
      employmentCode: Yup.string().required("Employment Code is required"),
      companyEmail: Yup.string().email("Invalid Company Email").required("Company Email is required"),
      officePhone: Yup.string().required("Office Phone is required"),
      reportingManager: Yup.string().required("Reporting Manager is required"),
      hrName: Yup.string().required("HR Name is required"),
      dateOfJoining: Yup.date().required("Date of Joining is required"),
    }),
    financeDetails: Yup.object().shape({
      panCard: Yup.string().required("PAN Card is required"),
      aadharCard: Yup.string()
        .matches(/^\d{12}$/, "Aadhar number should be 12 digits")
        .required("Aadhar Card is required"),
      bankName: Yup.string().required("Bank Name is required"),
      ifscCode: Yup.string()
        .matches(/^[A-Z]{4}0[A-Z0-9]{6}$/, "Invalid IFSC Code")
        .required("IFSC Code is required"),
      ctc: Yup.number().required("CTC is required"),
    }),
  });


  // Handling input changes
  const handleInputChange = (e, section) => {
    const { name, value } = e.target;

    if (name === 'dateOfBirth') {
      const dob = new Date(value);
      const today = new Date();
      let age = today.getFullYear() - dob.getFullYear();
      const monthDiff = today.getMonth() - dob.getMonth();
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
        age--;
      }

      // Update the form data with calculated age
      setFormData((prevData) => ({
        ...prevData,
        personalDetails: {
          ...prevData.personalDetails,
          dateOfBirth: value,
          age: age, // Set calculated age
        },
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [section]: {
          ...prevData[section],
          [name]: value,
        },
      }));
    }
  };

  // Handle same address checkbox
  const handleSameAddressCheckbox = (e) => {
    const isChecked = e.target.checked;
    setFormData((prevData) => ({
      ...prevData,
      personalDetails: {
        ...prevData.personalDetails,
        sameAsCurrentAddress: isChecked,
        permanentAddressLine1: isChecked ? prevData.personalDetails.currentAddressLine1 : "",
        permanentAddressLine2: isChecked ? prevData.personalDetails.currentAddressLine2 : "",
        permanentCity: isChecked ? prevData.personalDetails.currentCity : "",
        permanentPincode: isChecked ? prevData.personalDetails.currentPincode : "",
      },
    }));
  };

  const nextStep = () => setCurrentStep(currentStep + 1);
  const prevStep = () => setCurrentStep(currentStep - 1);

  //   const handleSubmit = (e) => {
  //     e.preventDefault();
  //     console.log("Form submitted:", formData);

  //   };
  const resetFormdata = () => {
    setFormData({
      personalDetails: {
        fullName: '',
        dateOfBirth: '',
        age: '',
        currentAddressLine1: '',
        currentAddressLine2: '',
        currentCity: '',
        currentPincode: '',
        permanentAddressLine1: '',
        permanentAddressLine2: '',
        permanentCity: '',
        permanentPincode: '',
        mobile: '',
        personalEmail: '',
        emergencyContactName: '',
        emergencyContactMobile: '',
        sameAsCurrentAddress: false,
      },
      professionalDetails: {
        employmentCode: "",
        companyEmail: "",
        officePhone: "",
        officeCity: "",
        officeAddress: "",
        reportingManager: "",
        hrName: "",
        dateOfJoining: "",
        employmentHistory: "",
      },
      financeDetails: {
        panCard: "",
        aadharCard: "",
        bankName: "",
        branch: "",
        ifscCode: "",
        ctc: "",
      },
    });
    setErrors({});
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    try {
      await validationSchema.validate(formData, { abortEarly: false });
      try {
        const response = await axios.post('http://localhost:8080/admin/employee', formData);
        console.log(response);
        alert('Employee added successfully');
        resetFormdata(); 
        closeOverlay();
        loadEmployee();
      } catch (error) {
        console.error('Error adding employee', error);
        alert('Failed to add employee');
      }
    } catch (validationErrors) {
      console.log("Validation Failed",validationErrors)
      const formattedErrors = {};
      validationErrors.inner.forEach((error) => {
        const path = error.path.split('.');
        const [section, field] = path;
        if (!formattedErrors[section]) formattedErrors[section] = {};
        formattedErrors[section][field] = error.message;
      });
      console.log(formattedErrors)
      setErrors(formattedErrors);
      console.log(errors);
    }
  };



  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white w-1/2 max-w-lg h-3/4 max-h-screen overflow-y-auto p-8 relative rounded-lg">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold">Add Employee</h2>
          <button className="text-gray-500 hover:text-gray-700" onClick={closeOverlay}>X</button>
        </div>

        <form onSubmit={handleSubmit}>
          {currentStep === 1 && (
            <PersonalDetails
              formData={formData.personalDetails}
              handleInputChange={(e) => handleInputChange(e, "personalDetails")}
              handleSameAddressCheckbox={handleSameAddressCheckbox}
              errors={errors.personalDetails}
            />
          )}

          {currentStep === 2 && (
            <ProfessionalDetails
              formData={formData.professionalDetails}
              handleInputChange={(e) => handleInputChange(e, "professionalDetails")}
              errors={errors.professionalDetails}
            />
          )}

          {currentStep === 3 && (
            <FinanceDetails
              formData={formData.financeDetails}
              handleInputChange={(e) => handleInputChange(e, "financeDetails")}
              errors={errors.financeDetails}
            />
          )}

          <div className="flex justify-between mt-4">
            {currentStep > 1 && (
              <button type="button" onClick={prevStep} className="bg-gray-300 text-gray-700 py-2 px-4 rounded hover:bg-gray-400">
                Previous
              </button>
            )}
            {currentStep < 3 && (
              <button type="button" onClick={nextStep} className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
                Next
              </button>
            )}
            {currentStep === 3 && (
              <button type="submit" className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600">
                Submit
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

// Sub-components for each section of the form

const PersonalDetails = ({ formData, handleInputChange, handleSameAddressCheckbox,errors}) => (
  <div className="">
    <h3 className="text-lg font-semibold mb-4">Personal Details</h3>
    <div className="grid grid-cols-2 gap-4">
      <div>
        <label className="block mb-2">Full Name:</label>
        <input type="text" name="fullName" value={formData.fullName} onChange={handleInputChange}  className="border p-2 w-full" />
        {errors?.fullName && <div className="text-red-500">{errors.fullName}</div>}
      </div>
      <div>
        <label className="block mb-2">Date of Birth:</label>
        <input type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleInputChange}  className="border p-2 w-full" />
        {errors?.dateOfBirth && <div className="text-red-500">{errors.dateOfBirth}</div>}
      </div>
      <div>
        <label className="block mb-2">Age:</label>
        <input type="text" name="age" value={formData.age} onChange={handleInputChange} disabled={true}  className="border p-2 w-full" />
        {errors?.age && <div className="text-red-500">{errors.age}</div>}
      </div>
      <div>
        <label className="block mb-2">Mobile:</label>
        <input type="text" name="mobile" value={formData.mobile} onChange={handleInputChange}  className="border p-2 w-full" />
        {errors?.mobile && <div className="text-red-500">{errors.mobile}</div>}

      </div>
      <div>
        <label className="block mb-2">Personal Email:</label>
        <input type="email" name="personalEmail" value={formData.personalEmail} onChange={handleInputChange} className="border p-2 w-full" />
        {errors?.personalEmail && <div className="text-red-500">{errors.personalEmail}</div>}
      </div>
      <div>
        <label className="block mb-2">Emergency Contact Name:</label>
        <input type="text" name="emergencyContactName" value={formData.emergencyContactName} onChange={handleInputChange}  className="border p-2 w-full" />
        {errors?.emergencyContactName && <div className="text-red-500">{errors.emergencyContactName}</div>}
      </div>
      <div>
        <label className="block mb-2">Emergency Contact Mobile:</label>
        <input type="text" name="emergencyContactMobile" value={formData.emergencyContactMobile} onChange={handleInputChange}  className="border p-2 w-full" />
        {errors?.emergencyContactMobile && <div className="text-red-500">{errors.emergencyContactMobile}</div>}
      </div>
    </div>
    <h4 className="mt-4 font-semibold">Current Address</h4>
    <div className="grid grid-cols-2 gap-4">
      <div>
        <label className="block mb-2">Current Address Line 1:</label>
        <input type="text" name="currentAddressLine1" value={formData.currentAddressLine1} onChange={handleInputChange}  className="border p-2 w-full" />
        {errors?.currentAddressLine1 && <div className="text-red-500">{errors.currentAddressLine1}</div>}
      </div>
      <div>
        <label className="block mb-2">Current Address Line 2:</label>
        <input type="text" name="currentAddressLine2" value={formData.currentAddressLine2} onChange={handleInputChange}  className="border p-2 w-full" />
        {errors?.currentAddressLine2 && <div className="text-red-500">{errors.currentAddressLine2}</div>}
      </div>
      <div>
        <label className="block mb-2">Current City:</label>
        <input type="text" name="currentCity" value={formData.currentCity} onChange={handleInputChange}  className="border p-2 w-full" />
        {errors?.currentCity && <div className="text-red-500">{errors.currentCity}</div>}
      </div>
      <div>
        <label className="block mb-2">Current Pincode:</label>
        <input type="text" name="currentPincode" value={formData.currentPincode} onChange={handleInputChange}  className="border p-2 w-full" />
        {errors?.currentPincode && <div className="text-red-500">{errors.currentPincode}</div>}
      </div>
    </div>
    <label className="inline-flex items-center mt-4">
      <input type="checkbox" checked={formData.sameAsCurrentAddress} onChange={handleSameAddressCheckbox} className="mr-2" />
      Same as Current Address
    </label>
    <h4 className="mt-4 font-semibold">Permanent  Address</h4>
    <div className="grid grid-cols-2 gap-4">
      <div>
        <label className="block mb-2">Permanent Address Line 1:</label>
        <input type="text" name="permanentAddressLine1" value={formData.permanentAddressLine1} onChange={handleInputChange} disabled={formData.sameAsCurrentAddress}  className="border p-2 w-full" />
        {errors?.permanentAddressLine1 && <div className="text-red-500">{errors.permanentAddressLine1}</div>}
      </div>
      <div>
        <label className="block mb-2">Permanent Address Line 2:</label>
        <input type="text" name="permanentAddressLine2" value={formData.permanentAddressLine2} onChange={handleInputChange} disabled={formData.sameAsCurrentAddress}  className="border p-2 w-full" />
        {errors?.permanentAddressLine2 && <div className="text-red-500">{errors.permanentAddressLine2}</div>}
      </div>
      <div>
        <label className="block mb-2">Permanent City:</label>
        <input type="text" name="permanentCity" value={formData.permanentCity} onChange={handleInputChange} disabled={formData.sameAsCurrentAddress}  className="border p-2 w-full" />
        {errors?.permanentCity && <div className="text-red-500">{errors.permanentCity}</div>}
      </div>
      <div>
        <label className="block mb-2">Permanent Pincode:</label>
        <input type="text" name="permanentPincode" value={formData.permanentPincode} onChange={handleInputChange} disabled={formData.sameAsCurrentAddress}  className="border p-2 w-full" />
        {errors?.permanentPincode && <div className="text-red-500">{errors.permanentPincode}</div>}
      </div>
    </div>
  </div>
);

const ProfessionalDetails = ({ formData, handleInputChange,errors }) => (
  <div>
    <h3 className="text-lg font-semibold mb-4">Professional Details</h3>
    <div className="grid grid-cols-2 gap-4">

      <div>
        <label className="block mb-2">Employee Code:</label>
        <input type="text" name="employmentCode" value={formData.employmentCode} onChange={handleInputChange}  className="border p-2 w-full" />
        {errors?.employmentCode && <div className="text-red-500">{errors.employmentCode}</div>}
      </div>
      <div>
        <label className="block mb-2">Company Email:</label>
        <input type="email" name="companyEmail" value={formData.companyEmail} onChange={handleInputChange}  className="border p-2 w-full" />
      </div>
      <div>
        <label className="block mb-2">Office Phone:</label>
        <input type="text" name="officePhone" value={formData.officePhone} onChange={handleInputChange}  className="border p-2 w-full" />
      </div>
      <div>
        <label className="block mb-2">Office Address:</label>
        <input type="text" name="officeAddress" value={formData.officeAddress} onChange={handleInputChange}  className="border p-2 w-full" />
      </div>
      <div>
        <label className="block mb-2">Office City:</label>
        <input type="text" name="officeCity" value={formData.officeCity} onChange={handleInputChange}  className="border p-2 w-full" />
      </div>
      <div>
        <label className="block mb-2">Reporting Manager:</label>
        <input type="text" name="reportingManager" value={formData.reportingManager} onChange={handleInputChange}  className="border p-2 w-full" />
      </div>
      <div>
        <label className="block mb-2">HR Name:</label>
        <input type="text" name="hrName" value={formData.hrName} onChange={handleInputChange}  className="border p-2 w-full" />
      </div>
      <div>
        <label className="block mb-2">Date of Joining:</label>
        <input type="date" name="dateOfJoining" value={formData.dateOfJoining} onChange={handleInputChange}  className="border p-2 w-full" />
      </div>
      <div>
        <label className="block mb-2">Employment History:</label>
        <textarea name="employmentHistory" value={formData.employmentHistory} onChange={handleInputChange} className="border p-2 w-full"></textarea>
      </div>
    </div>
  </div>
);

const FinanceDetails = ({ formData, handleInputChange,errors }) => (
  <div>
    <h3 className="text-lg font-semibold mb-4">Finance Details</h3>
    <div className="grid grid-cols-2 gap-4">
      <div>
        <label className="block mb-2">Pancard:</label>
        <input type="text" name="panCard" value={formData.panCard} onChange={handleInputChange}  className="border p-2 w-full" />
        {errors?.panCard && <div className="text-red-500">{errors.panCard}</div>}
      </div>
      <div>
        <label className="block mb-2">Aadhar Number:</label>
        <input type="text" name="aadharCard" value={formData.aadharCard} onChange={handleInputChange}  className="border p-2 w-full" />
        {errors?.aadharCard && <div className="text-red-500">{errors.aadharCard}</div>}
      </div>
      <div>
        <label className="block mb-2">Bank Name:</label>
        <input type="text" name="bankName" value={formData.bankName} onChange={handleInputChange}  className="border p-2 w-full" />
        {errors?.bankName && <div className="text-red-500">{errors.bankName}</div>}
      </div>
      <div>
        <label className="block mb-2">Branch:</label>
        <input type="text" name="branch" value={formData.branch} onChange={handleInputChange}  className="border p-2 w-full" />
        {errors?.branch && <div className="text-red-500">{errors.branch}</div>}
      </div>
      <div>
        <label className="block mb-2">IFSC Code:</label>
        <input type="text" name="ifscCode" value={formData.ifscCode} onChange={handleInputChange}  className="border p-2 w-full" />
        {errors?.ifscCode && <div className="text-red-500">{errors.ifscCode}</div>}
      </div>
      <div>
        <label className="block mb-2">CTC:</label>
        <input type="number" name="ctc" value={formData.ctc} onChange={handleInputChange}  className="border p-2 w-full" />
        {errors?.ctc && <div className="text-red-500">{errors.ctc}</div>}
      </div>
    </div>
  </div>
);

export default AddEmployeeForm;
