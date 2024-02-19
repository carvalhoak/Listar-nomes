const mongoose = require('mongoose')

const Info_ = mongoose.model('Info', {
  nome: String,
  idade: Number,
  motivo: String,
})

module.exports = Person