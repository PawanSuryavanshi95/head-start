import React,{ Component } from 'react';
import api from '../../../api/index';
import { getNotifications } from "../../../api/User";

class NotificationTab extends Component{
    constructor(props){
        super(props);

        this.state = {
            notifications:[],
            selectedID:null,
        }
    }

    componentDidMount(){
        this.notifications();
    }

    notifications = async () => {
        const result = await getNotifications();
        console.log(result);
        if(result.success){
            this.setState({
                notifications: result.notifications,
            });
        }
    }

    handleClick = (ntf) => {
        return(
            <div className="proposal">
                {ntf.proposal}
                <br/>
                <button onClick={()=>{ window.open(`http://findpathway.com/profile/${ntf.candidate}`,"_blank") }}>Open Profile</button>
                <button onClick={ () => { this.handleSelect(ntf) }}>Select</button>
                <button>Reject</button>
            </div>
        )
    }

    handleSelect = (ntf) => {
        const headers = {
            'X-access-token': localStorage.getItem('userToken')
        };
        api.post('/user/select-user', { headers: headers, ntfData:ntf }).then(res => {
            console.log(res);
        }).catch(e => {
            console.log(e);
        });
    }

    render(){
        const notifications = this.state.notifications;
        const content = notifications? notifications.length ? 
            notifications.map(ntf => { // ntf = Notification
                return(
                    <div id={ntf.new ? 1 : 2} className="notification"  key={ntf._id}
                        onClick={() => { this.setState({ selectedID: ntf._id }) }} >
                        {ntf.msg}
                        {this.state.selectedID===ntf._id && this.props.category==="Employer"? this.handleClick(ntf) : null}
                    </div>
                )
            }) :
            <div className="no-content" >
                There are no notifications to show
            </div> :
            <div className="no-content" >
                There are no notifications to show
            </div>
        return(
            <div className="tab">
                {content}
            </div>
        )
    }
}

export default NotificationTab;