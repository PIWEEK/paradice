function modValidator (value) {
  return (value && !!value.match(/[+-]*[0-9]{1,3}/)) || '(+ / -) MOD'
}

export {
  modValidator
}
