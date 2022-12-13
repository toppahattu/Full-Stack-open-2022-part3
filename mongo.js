const mongoose = require('mongoose')
const args = process.argv
if (args.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = args[2]

const url =
  `mongodb+srv://toppis:${password}@toppacluster.dwe383a.mongodb.net/luetteloApp?retryWrites=true&w=majority`

mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

if (arguments.length > 4) {
  const person = new Person({
    name: args[3],
    number: args[4],
  })

  person.save().then( () => {
    console.log(`added ${args[3]} number ${args[4]} to phonebook`)
    mongoose.connection.close()
  })
}
else {
  Person.find({}).then(persons => {
    console.log('phonebook:')
    persons.forEach(person => {
      console.log(`${person.name} ${person.number}`)
    })
    mongoose.connection.close()
  })
}
