const jwt = require('jsonwebtoken');
const authConfig = require('../configs/auth');

const database = require('../models/model');

const User = database.User;
const Job = database.Job;

exports.createJob = async (req, res) => {
    const token = req.body.headers['X-access-token'];
    var newJob = req.body.info;
    var success=false,message;
    jwt.verify(token, authConfig.secret, async (e,decoded) => {
        if(e){
            return res.status(403).send({success:false, error:e})
        }
        if(decoded){
            User.findById(decoded._id).then(async user => {
                if(user.category==="Employer"){
                    newJob.employer = decoded._id;
                    Job.create(newJob).then(async (job) => {
                        User.updateOne({ _id:decoded._id }, { $push: { 'userEmployerInfo.jobs' : job._id } }).then(async user=>{
                            success = true;
                            message = `${job.title} has been created by ${decoded._id}.`;
                            return res.send({ success:success,message:message })
                        }).catch(e =>{
                            message = e;
                        });
                      }).catch(error => {
                        console.log(newJob,error)
                        if(Object.keys({}).length){
                            return res.send({ success:success, message:`${newJob.title} could not be created.`, error:error});
                        }
                      });
                }
            })
        }
    })
}

exports.applyJob = (req,res) => {
    const token = req.body.headers['X-access-token'];
    const employer = req.body.employer;
    const jobTitle = req.body.jobTitle;
    const proposal = req.body.proposal;
    if(token){
        jwt.verify(token, authConfig.secret, (e,decoded) => {
            if(e){
                return res.status(403).send({error:e});
            }
            if(decoded){
                User.findById(employer).then(user => {
                    user.notifications.push({msg: `${decoded.userName} has applied for ${jobTitle}.`, proposal: proposal, candidate:decoded.userName});
                    user.save();
                    return res.send("Success");
                });
            }
        });
    }
}

exports.jobList = (req,res) => {
    if(req.query.employer!==null && req.query.employer!==undefined){
        Job.find({ employer:req.query.employer }).then(jobs => {
            res.json({"jobs":jobs})
        });
    }
    else{
        Job.find({}).then(jobs => {
            res.json({"jobs":jobs})
        });
    }
}