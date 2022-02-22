const registerValidation = (
    phone_number,
    fullname,
    city,
    district,
    sub_district,
    street
  ) => {
      if(!phone_number || phone_number.length !== 10) {
        return {success: false, message: "Phone number must have 10 number"}
      }
      if(!fullname || fullname.length < 5 || fullname > 50) {
        return {success: false, message: "Fullname must have 5 - 50 characters"}
      }
      if(!city || city.length < 2 || city > 100) {
        return {success: false, message: "City must have 5 - 100 characters"}
      }
      if(!district || district.length < 5 || district > 100) {
        return {success: false, message: "District must have 5 - 100 characters"}
      }
      if(!sub_district || sub_district.length < 5 || sub_district > 100) {
        return {success: false, message: "Sub district must have 5 - 100 characters"}
      }
      if(!street || street.length < 5 || street > 100) {
        return {success: false, message: "Street must have 5 - 100 characters"}
      }
      return {success: true, message: "Validated"}
  }

  module.exports = {
      registerValidation
  }