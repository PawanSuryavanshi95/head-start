import React,{ Component } from 'react';
import { getJobList } from '../../api/Offer';
import Modal from 'react-modal';
import JobDetails from './JobDetails';
import MessageBox from '../MessageBox';

Modal.setAppElement("#root");

class JobOffers extends Component{
    
    constructor(props){
        super(props);
        this.state = {
            jobs:"",
            modal:false,
            loading:true,
        }
        this.job = {};
        this.messages = [];
        this.msgType = "neutral";
    }

    componentDidMount(){
        this.fetchJobs();
    }

    fetchJobs = async () => {
        const result = await getJobList();
        this.setState({
            jobs:result.jobs,
            loading:false,
        });
    }

    setMsgBox = (msg,type) => {
        this.setState({ msgBox: true});
        this.messages = [msg];
        this.msgType = type;
    }

    handleApply = (job) => {
        if(localStorage.getItem("userToken")!==null){
            this.props.history.push(`/jobs/${job.title}`);
            this.setState({ modal:true });
            this.job=job;
        }
        else{
            this.setMsgBox(["You need to login with an employee's account to apply."], "negative");
        }
    }

    render(){
        var bool = false;
        const path = this.props.history.location.pathname;
        if(path.length>6){
            if(path.substr(0,6)==="/jobs/"){
                bool=true;
            }
        }
        const loadingBlock = <div className="offer loading"><div className="item 1"></div></div>;
        const loadingList = [loadingBlock, loadingBlock, loadingBlock,];
        const jobs = this.state.jobs;
        const jobList = jobs.length ? (
            jobs.map(job => {
                return (
                    <div key={job._id} className="offer" onClick={()=>{this.handleApply(job)}}>
                        <h2>{job.title}</h2>
                        <h3><span>from</span>{" "+job.employerName}</h3>
                        <div className="offer-info">
                            <div><p className="title">Requirement : </p>{job.reqs}</div>
                            <div><p className="title">Salary : </p>{job.salary} Rs.</div>
                            <div><span>This is a {job.fullTime?"Full Time":"Part Time"} job.</span></div>
                            <div><span>{job.fromHome?"You can work from home.":"You will have to come to the office"}</span></div>
                        </div>
                        <div className="offer-apply">
                            {this.state.msgBox?<MessageBox messages={this.messages} type="negative" />:null}
                            <button className="button" onClick={() => { this.handleApply(job); }}><span>More Details</span></button>
                        </div>
                    </div>
                )
            })
        ):(
            <div>There are no jobs to show.</div>
        )
        return(
            <main className="main">
            <div className="content offers">
                {this.state.loading?loadingList:jobList}
                <Modal className="modal offer" isOpen={this.state.modal || bool} onRequestClose={() => {this.setState({ modal:false }); this.props.history.push('/jobs'); }}>
                    <JobDetails job={this.job} />
                </Modal>
            </div>
            </main>
        )
    }
}

export default JobOffers;