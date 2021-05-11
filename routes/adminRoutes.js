const AdminBro = require('admin-bro');
const AdminBroExpress = require('@admin-bro/express');
const AdminBroMongoose = require('@admin-bro/mongoose');
const User = require("../models/User");
const Topic = require("../models/topic");
const Question = require("../models/question");
AdminBro.registerAdapter(AdminBroMongoose);
const AdminBroOptions = {
  resources: [User,Topic,Question],
  rootPath: "/admin",
};
const adminBro = new AdminBro(AdminBroOptions);

const router = AdminBroExpress.buildRouter(adminBro);

module.exports= router;
//const express = require('express')
//const app = express()
/*
const adminBro = new AdminBro({
  databases: [],
  rootPath: '/admin',
})

const router = AdminBroExpress.buildRouter(adminBro);*/
