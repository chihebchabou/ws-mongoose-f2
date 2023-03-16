const mongoose = require('mongoose')
const path = require('path')
// require('dotenv').config(); .env should be difined in root folder
require('dotenv').config({path: path.join(__dirname, 'config', '.env')});

// Connect to data base
console.log(process.env.MONGO_URI);
mongoose.connect(process.env.MONGO_URI, {family: 4})
  .then(() => console.log('Connected To MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB', err.message));

  // Schema
  const contactSchema = new mongoose.Schema({
    fullName: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique:true
    },
    phone: {
      type: Number,
    },
    age: {
      type: Number,
      required: true
    },
    addedAt: {
      type: Date,
      default: Date.now
    }
  })

  // Model
  const Contact = mongoose.model('contact', contactSchema);

  // Create Contact (create document)
  const createContact = async () => {
    const contact = new Contact({
      fullName: 'Jane Doe',
      email: "jane@gmail.com",
      age: 25
    })

    try {
      const result = await contact.save();
      console.log(result)
    } catch (err) {
      console.error("Error:", err.message);
    }
  }


// Create many contacts
const createManyContacts = async contacts => {
  try {
    const result = await Contact.create(contacts);
    console.log(result)
  } catch (err) {
    console.error("Error:", err.message);
  }
}

// Get contacts
const getContacts = async () => {
  /*
  Comparison Query Operators
  - eq
  - ne (not equal)
  - gt
  - gte
  - lt
  - lte
  - in 
  - nin (not in)
  */
  try {
    // const contacts = await Contact.find();
    // const contacts = await Contact.find().sort('-age').limit(2);
    // const contacts = await Contact.find({age:{$gte:25}}, {fullName:1, email:1});
    // const contacts = await Contact.find({age:{$gte:25}}).select('-fullName -email');
    const contacts = await Contact.find({_id: "64132a38c48574e5df3f8242"});
    console.log(contacts);
  } catch (err) {
    console.error("Error:", err.message);
  }
}

// Update Contact
const updateContact = async (id, newAge) => {
  try {
    // Query First
    // const contact = await Contact.findById(id);
    // contact.age = newAge;
    // const result = await contact.save()
    // console.log(result)

    // Update first
    // const result = await Contact.updateOne({_id:id}, {$set:{age: newAge}});
    // console.log(result)
    const contact = await Contact.findByIdAndUpdate(id, {$set: {age: newAge}},{new:true});
    console.log(contact);
  } catch (err) {
    console.error("Error:", err.message);
  }
}

// Remove Contact
const removeContact = async id => {
  try {
    // const result = await Contact.deleteOne({_id:id});
    // console.log(result);
    const contact = await Contact.findByIdAndRemove(id);
    console.log(contact)
  } catch (err) {
    console.error("Error:", err.message);
  }
}

// removeContact("64132a38c48574e5df3f8243");
// updateContact("64132a38c48574e5df3f8242", 30);
// getContacts();
// createManyContacts([
//   {
//     fullName: 'John Doe',
//     email: 'john@gmail.com',
//     phone: 5555555555,
//     age: 30
//   },
//   {
//     fullName: 'Jane Doe',
//     email: 'jane@gmail.com',
//     phone: 4444444444,
//     age: 25
//   },
//   {
//     fullName: 'Sam Smith',
//     email: 'sam@gmail.com',
//     phone: 3333333333,
//     age: 18
//   },
// ])
// createContact()