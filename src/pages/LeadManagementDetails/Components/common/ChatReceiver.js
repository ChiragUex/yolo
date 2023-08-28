import user from "../../../../assets/images/user.png";
import pdfIcon from "../../../../assets/images/pdf.png";

export const ChatReceiver = (props) => {
  return (
    <div className="receiver">
      <div>
        <div className="receiver-message">
          {props.msgData.attachment_url ? (
            props.msgData.mime_type.includes("image") ?
              <img className="image" src={props.msgData.attachment_url}/> :
              <a href={props.msgData.attachment_url} target="_blank"><img className="document" src={pdfIcon} /></a>
          ): props.msgData.message}
        </div>
        <p>{props.msgData.fromNow}</p>
      </div>
      <div className="">
      {
              props?.agentProfile?.profile_picture ?
              <img
              width="50px"
              height="50px"
              className="userImg"
              alt="Angular Logo"
              src={(props?.agentProfile && props?.agentProfile?.profile_picture) ? props?.agentProfile?.profile_picture : props?.agentProfile?.first_name[0]}
            />
            : 
              <p className="userProfileName">{props?.agentProfile?.first_name[0]}</p>
            }
        {/* <img
          width="40px"
          className="userImg"
          alt="Angular Logo"
          src={user}
        /> */}
      </div>
    </div>
  )
}
