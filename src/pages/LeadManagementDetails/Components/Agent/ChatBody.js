import pin from "../../../../assets/images/pin.png";
import removeIcon from "../../../../assets/images/remove-icon.png";
import pdfIcon from "../../../../assets/images/pdf.png";
import sendIcon from "../../../../assets/images/send.png";
import downIcon from "../../../../assets/images/down.png";
import {ChatSender} from "../common/ChatSender";
import {ChatReceiver} from "../common/ChatReceiver";
import {sendLastMessageAtRootLevelForQuoteChat, sendMessageForQuoteChat, useMessagesForQuoteChat} from "../../../../http/services/quote-chat.service";
import {useEffect, useRef, useState} from "react";
import * as _ from "lodash";
import {enqueueSnackbar} from "notistack";

export const ChatBody = (props) => {

  const chatBodyRef = useRef()
  const dummy = useRef()
  const [inputText, setInputText] = useState("");
  const [downArrow, showDownArrow] = useState(false);
  const [attachment, setAttachment] = useState(null);
  const [shadowType, setShadowType] = useState("");
  const [noMore, setNoMore] = useState(false);
  const {messages, allFetched, loadMoreMessages} = useMessagesForQuoteChat(props.chatRef);

  console.log("props : ",props);

  const scrollToTop = () => {
    // chatBodyRef.current.scrollTo({behavior: "smooth", top: chatBodyRef.current.scrollHeight})
    // dummy.current.scrollIntoView({behavior: "smooth"})
  }

 
  const scrollToBottom = () => {
    chatBodyRef.current.scrollTo({behavior: "smooth", top: 0})
  }

  const scrollVisibleOnLoad = () => {
    if (chatBodyRef.current && chatBodyRef.current.scrollHeight > chatBodyRef.current.clientHeight) {
      setShadowType("shadowTop")
    }
  }

  const send = async () => {
    const attachmentValue = attachment
    const inputTextValue = inputText
    if (!attachment && !inputText) {
      enqueueSnackbar("Please type something or attach document first.!", {
        variant: "warning",
        anchorOrigin: { vertical: "bottom", horizontal: "left"}
      })
      return;
    }
    setInputText("")
    setAttachment(null)
    let newMessage;
    if (attachment) {
      newMessage = await sendMessageForQuoteChat(props.chatRef, attachmentValue, props.extraDataForNewMessage, true, props.storageFolder)
    } else {
      newMessage = await sendMessageForQuoteChat(props.chatRef, inputTextValue, props.extraDataForNewMessage)
    }

    const lastMessagePayload = {
      id : newMessage.user_id,
      last_message : newMessage.attachment_url ? (newMessage.mime_type.includes("image") ? "image" : "document") : newMessage.message,
      last_message_timestamp: newMessage.timestamp,
      user_name: newMessage.user_name
    }

    await sendLastMessageAtRootLevelForQuoteChat(props.docRef, lastMessagePayload)
    setTimeout(() => {
      scrollToBottom();
    }, 500)
    // await deleteMessage(props.chatRef)
  }

  const isAtBottom = _.debounce((event) => {
    let currentPosition = Math.round(event.target.scrollHeight + event.target.scrollTop) === Math.round(event.target.clientHeight) ||
      Math.round(event.target.scrollHeight + event.target.scrollTop) - 1 === Math.round(event.target.clientHeight) ||
      Math.round(event.target.scrollHeight + event.target.scrollTop) + 1 === Math.round(event.target.clientHeight);
    // console.log("currentPosition reached at top : ", currentPosition)
    // console.log("currentPosition event.target.scrollTop : ", event.target.scrollTop)
    setNoMore(false)
    if (event.target.scrollTop < 0) {
      setShadowType("shadowBottom shadowTop")
      if (currentPosition && allFetched) {
        setShadowType("shadowBottom")
      }
    } else {
      setShadowType("shadowTop")
    }

    // show arrow down
    if (event.target.scrollTop < 0) {
      showDownArrow(true)
    } else {
      showDownArrow(false)
    }

    if (currentPosition && !allFetched) {
      loadMoreMessages()
    } else if (currentPosition && allFetched) {
      setNoMore(true)
    }
    return currentPosition
  }, 250)


  const handleScroll = (event) => {
    event.preventDefault()
    isAtBottom(event);
  }

  const handleAttachement = (file) => {
    if (file) {
      const allowedTypes = ["image/png", "image/jpg", "image/jpeg", "application/pdf"]
      console.log("file", file)
      if (allowedTypes.indexOf(file.type) > -1) {
        setAttachment(file)
        setInputText("")
      } else {
        enqueueSnackbar("File type is not supported.!", {
          variant: 'warning'
        })
      }
    } else {
      setAttachment(null)
    }
  }

  const handleInput = (event) => {
    setInputText(event.target.value)
    setAttachment(null)
  }

  const handleEnterKey = (event) => {
    if (event.key === 'Enter' && inputText) {
      send();
    }
  }

  useEffect(() => {
    scrollVisibleOnLoad();
  }, [messages])

  return (
    <div className="chat-body">
      {/*<Container>*/}
      <div className={shadowType +' chat-body-inner'}
           ref={chatBodyRef} onScrollCapture={handleScroll}>

        {downArrow ? (
          <img
            src={downIcon}
            alt=""
            height="60"
            onClick={scrollToBottom}
            className="bottom-icon"
          />
        ) : (
          "" 
        )}

        {/*{!messages && (<p className="please-wait-for-messages">Please wait...</p>)}*/}

        {noMore && (<p className="no-more-messages">No more messages.</p>)}

        {messages.map((msgData, index) =>
          msgData.from === "user" ? ( <ChatSender agentData={props.agentData} agentProfile={props.agentProfile} key={msgData.timestamp} msgData={msgData}/>) : (<ChatReceiver key={msgData.timestamp} msgData={msgData} agentProfile={props.agentProfile}/>)
        )}
        <div ref={dummy}/>
      </div>
      <div className="chat-type">
        {attachment ? (
            <>
              <p className="send-warning">You can't sent text message & Attachment at the same time.!</p>
              <div className="attachement-preview">
                {attachment.type.includes("image") ? (
                  <img  alt="Attachment" className="attachment" src={URL.createObjectURL(attachment)}/>
                ) : (
                  <img  alt="Attachment" className="attachment" src={pdfIcon}/>
                )}

                <span className="removeAttachment" onClick={() => {setAttachment(null)}}>
                <img className="removeAttachment-icon"  src={removeIcon} />
              </span>
              </div>
            </>
        ): (<input type="text" value={inputText} onKeyDown={handleEnterKey} disabled={props?.agentData?.quote_list?.length == 0 ? true : false} onChange={ event => handleInput(event)} placeholder="Type a message"/>)}
        {/*{!props.quoteAccepted ? (*/}
        {/*): <p className="send-warning">Quote is accepted.! Chat is disabled.</p> }*/}
        <div>
          <label htmlFor="imgArea" className="imgArea">
            <img alt="Angular Logo" src={pin}/>
          </label>
          <input
            type="file"
            id="imgArea"
            className="attachmentPin"
            accept="image/png,image/jpg,image/jpeg,application/pdf"
            onChange={(e) => handleAttachement(e.target.files[0])}
            style={{ display: "none" }}
            disabled={props?.agentData?.quote_list?.length == 0 ? true : false}
          />
        </div>
        <div className="d-block">
          <div className={(!attachment && !inputText) ? "primary-bg send-btn disabled" : "primary-bg send-btn active"} onClick={props?.agentData?.quote_list?.length == 0 ? null : send}>
            <img alt="Angular Logo" src={sendIcon}/>
          </div>
        </div>
      </div>
      {/*</Container>*/}
    </div>
  )
}
