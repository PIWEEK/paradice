function modValidator (value) {
      return (value && !!value.match(/[+-]*[0-9]{1,3}/)) || 'Please enter a valid mod'
  }
  
  export {
    modValidator
  }
  