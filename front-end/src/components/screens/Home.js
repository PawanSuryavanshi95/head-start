import React,{ Component } from 'react';
import {withRouter,Link} from 'react-router-dom';

class Home extends Component{

    constructor(props){
        super(props);

        this.state = {
            loggedIn: true
        }
    }

    componentDidMount(){
        if(localStorage.getItem("userToken")!==null){
            this.setState({
                loggedIn:true
            })
        }
        else{
            this.setState({
                loggedIn:false
            })
        }
    }

    getStarted = () => {
        return (
            <div className="get-started">
                <Link to="/signin"><h2>Get Started</h2></Link>
            </div>
        )
    }

    render(){
        return(
            <main className="main">
            <div className="content">
                <div className="content welcome">
                    <ul className="box-area">
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                    </ul>
                    <h1 className="h11">Welcome</h1>
                    <h2>to the</h2>
                    <h1 className="h12">Gateway of Employment</h1>
                    {this.state.loggedIn ? 
                    <div></div> : 
                    <div>
                        {this.getStarted()}
                    </div>}
                </div>

                <div className="content about">
                    <h1>Who are we?</h1>
                    <p>
                    Gateway of Employment is an HR service provider, aiming to eradicate unemployment from the country by the end of the decade. Here at "GOE", we look forward to creating a positive recruiter-employee bond where the recruiter can post job opportunities to which an aspirant can apply. The entire world has been under a severe lockdown since long. There is an endless list of people who went jobless and are impuissant to earn even a meal. They have lost all hopes of procuring jobs for feeding their family and need to get a job and start again. To produce employment, we lead to establishing a bridge between the workers and people who need them.
                    </p>
                </div>

                <div className="content services">
                    <h1>"The two most powerful warriors are patience and time".</h1> 
        			<h3>– Leo Tolstoy, War and Peace</h3>
                    <p>We understand the importance of time, and hence we care for yours. GOE pledges to find a gate thereby paving the way towards an Atmanirbhar India. We bridge the gap between enthusiastic, talented individuals and the destination expecting them, taking them to their target and kissing the glorifying success. Connecting these individuals with the organization will ultimately help it to grow and reach the sky. We identify the best talents to work for you in highly professional and organized establishments sector of India through our services.  
                    </p>
                    <h4>A recruiter can post job opportunities in the following categories:</h4>
                    <div className="list">
                        <div className="block">Full Time Job</div>
                        <div className="block">Part Time Job</div>
                        <div className="block">Work from home</div>
                        <div className="block">Temporary Jobs</div>
                        <div className="block">Internships</div>
                        <div className="block">Campus placements</div>
                        <div className="block">One time service</div>
                    </div>
                </div>
            </div>                
            </main>
        )
    }
}

export default withRouter(Home);