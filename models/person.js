const mongoose = require('mongoose')

const url = process.env.MONGODB_URI

console.log('conneting to', url)
mongoose.connect(url)
  .then( () => {
    console.log('connected to MongoDB')
  })
  .catch((err) => {
    console.log('error connecting to MongoDB:', err.message)
  })

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 3,
    required: [true, 'name is required']
  },
  number: {
    type: String,
    minlength: 8,
    validate: {
      validator: (v) => {
        return /\d{2,3}-\d{5,}/.test(v)
      },
      message: props => `${props.value} is not a valid phone number`
    },
    required: [true, 'phone number is required']
  },
})

personSchema.set('toJSON', {
  transform: (_doc, retObj) => {
    retObj.id = retObj._id.toString()
    delete retObj._id
    delete retObj.__v
  }
})

module.exports = mongoose.model('Person', personSchema)