const mongoose= require('mongoose');
const Schema = mongoose.Schema;

const questionSchema = new Schema({
    name: {
      type: String,
      required: true,
    },
    linkTo: {
      type: String,
      required: true,
    },
    topic: [{
      type: Schema.Types.ObjectId,
      ref:'topic',
      required: true
    }],
  });

  const question = mongoose.model('question', questionSchema);
module.exports = question;