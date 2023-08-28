import back from "../../../../assets/images/back.svg";
import user from "../../../../assets/images/user.png";
import {useNavigate} from "react-router";

export const ChatHeader = ({ agentName, agentData}) => {

  console.log(".charAt(0).toLowerCase() : ",agentName?.charAt(0).toLowerCase());

  return (
    <div className="chat-header">
  
      <div className="d-flex gap-10 align-items-center">
        <div className="chat-icon-info">
          <div className="user-logo">
            {
              agentData?.profile_picture ?
              <img
              width="52px"
              height="52px"
              className="userImg"
              alt="Angular Logo"
              src={(agentData && agentData?.profile_picture) ? agentData?.profile_picture : agentName[0]}
            />
            : 
              <p className="userProfileName">{agentName[0]}</p>
            }
            <div className="primary-bg online-status"></div>
          </div>
          <div>
            <h4>{agentName}</h4>
            <span className="span-primary ">Online</span>
          </div>
        </div>
      </div>
      {/*</Container>*/}
    </div>
  )
}
