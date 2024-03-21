const Note = require('../models/Notes');
const mongoose = require('mongoose'); 
const { findOneAndUpdate } = require('../models/User');

exports.dashboard = async (req, res, next) => {

    let perPage = 12;
    let page = req.query.page || 1 

    const locals ={
    title: 'NodeJs Notes',
    description : 'Free NodeJS Notes Application'
    }
    try {
        // Mongoose "^7.0.0 Update
        const notes = await Note.aggregate([
          { $sort: { createdAt: -1 } },
        //   { $match: { user: mongoose.Types.ObjectId(req.user.id) } },
          {
            $project: {
              title: { $substr: ["$title", 0, 30] },
              body: { $substr: ["$body", 0, 100] },
            },
          }
          ])
        .skip(perPage * page - perPage)
        .limit(perPage)
        .exec(); 
    
        const count = await Note.countDocuments();
        res.render('dashboard/index', {
          
          locals,
          notes,
          layout: "../views/layouts/dashboard",
          current: page,
          pages: Math.ceil(count / perPage)
        });
    } catch (err) {
        console.log(err);
    }
};


exports.dashboardViewNote = async (req, res) => {
    const note = await Note.findById({_id:req.params.id}).lean();

    if (note){
        res.render('dashboard/view-notes',{
            noteID : req.params.id,
            note,
            layout: '../views/layouts/dashboard'
        });
    } else {
        res.send("something went wrong.")
    }
};

exports.dashboardUpdateNote = async (req, res) => {
    try {

        await Note.findOneAndUpdate(
            {_id: req.params.id},
            {title: req.body.title, body: req.body.body, updatedAt: Date.now()}
            );
            res.redirect('/dashboard');

    } catch (err) {
        console.log(err);
    }
};


exports.dashboarddeleteNote = async (req, res) => {
    try {

        await Note.deleteOne(
            {_id: req.params.id});
            res.redirect('/dashboard');

    } catch (err) {
        console.log(err);
    }
};

exports.dashboardAddNote = async (req, res) => {
    res.render('dashboard/add',{
        layout: '../views/layouts/dashboard',
    });
};

exports.dashboardAddNoteSubmit = async (req, res) => {
    try {
        await Note.create(req.body);
        res.redirect('/dashboard');
    }catch (err) {
        console.log(err);
    }
};

exports.dashboardSearch = async (req, res) => {
    try {
        res.render('dashboard/search', {
            searchResults: '',
            layout : '../view/layouts/dashboard'
        });
    } catch (err) {

    }
};

exports.dashboardSearchSubmit = async (req, res) => {
    try {
      let searchTerm  = req.body.searchTerm;
    //   const searchNoSpecialChars = searchTerm.replace(/[^a-zA-Z0-9 ]/g, "");
  
      const searchResults = await Note.find({
        $or: [
          { title: { $regex: new RegExp(searchTerm, "i") } },
          { body: { $regex: new RegExp(searchTerm, "i") } },
        ],
      });
  
      res.render("dashboard/search", {
        searchResults,
        layout: "../views/layouts/dashboard",
      });
    } catch (error) {
      console.log(error);
    }
  };