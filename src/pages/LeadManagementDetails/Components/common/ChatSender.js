import user from "../../../../assets/images/user.png";
import pdfIcon from "../../../../assets/images/pdf.png";

export const ChatSender = (props) => {
  return (
    <div className="sender">
      <div className="">
        <img
          width="40px"
          className="userImg"
          alt="Angular Logo"
          src={(props.agentData && props.agentData.profile_img) ? props.agentData.profile_img : user}
        />
      </div>
      <div>
        <div className="sender-message">
          {props.msgData.attachment_url ? (
            props.msgData.mime_type.includes("image") ?
              <img className="image" src={props.msgData.attachment_url}/> :
              <a href={props.msgData.attachment_url} target="_blank"><img className="document" src={pdfIcon} /></a>
          ): props.msgData.message}
        </div>
        <p>{props.msgData.fromNow}</p>
      </div>
    </div>
  )
}
