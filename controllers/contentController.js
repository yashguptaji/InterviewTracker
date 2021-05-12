const Questions = require('../models/question');
const mongoose = require("mongoose");
const Topics = require('../models/topic');



module.exports.topic = (req,res) =>{
Topics.find().
then( (result) => {
    // console.log('aaaaaaaaaaaa');
    res.render('topics',{title: "Topics",topic: result});
});
// .catch( (err)=>{ 
//     // console.log('bbbbbbbbb');
//     res.status(404).render('404',{title:"Page does not exist!"});
// });
};

module.exports.question =(req,res) => {
const name=req.params.name;
var admin=false;
Topics.findOne({name:name})
.then((result_temp)=>{
    if(result_temp){
    Questions.find({topic:result_temp._id})
    .then((result)=>{
        res.render('questions',{questions:result,title:name});
    })
    .catch((err)=>{
        res.status(404).render('404',{title:"Page does not exist!"});
    });
}
else  res.status(404).render('404',{title:"Page does not exist!"});
});

};


module.exports.addQuestion_GET = (req,res)=>{
    Topics.find().then((result)=>{
        res.render('addQuestion', { title: 'Create a new Question',topics:result });
    });
 

};


module.exports.addQuestion_POST = (req, res) => {
    const ques = new Questions(req.body);
    var topic;
    Topics.findById(req.body.topic)
    .then((result)=>{
        topic=result.name;
    });

    ques.save()
      .then((result) => {
        res.redirect('/topics/'+topic);
      })
      .catch((err) => {
        console.log(err);
      });
  };


  module.exports.question_delete = (req, res) => {
    var topic;
    const id = req.params.id;
    Questions.findById(id)
      .populate("topic")
      .then((question) => {
        //console.log(question, question.topic.name);
        topic = question.topic.name;
        Questions.findByIdAndDelete(id)
          .then((result) => {
            res.json({ redirect: "/topics" });
          })
          .then((result) => console.log(result))
          .catch((err) => console.log(err));
      });
  };




// const find_question = (req, res) => {
//     const id = req.params._id;
//     question.findById(id)
//       .then(result1 => {
//         const topic_name=result1.topic;
//         topic.findOne(topic_name)
//         .then(result =>
//             {
//                 res.render('topics', { blog: result, title: 'Blog Details' });
//             })
//       })
//       .catch(err => {
//         console.log(err);
//         res.render('404', { title: 'Blog not found' });
//       });
//   }