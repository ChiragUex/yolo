import {
  addDoc, setDoc, deleteDoc, getDocs, limit,
  startAfter, onSnapshot, query, orderBy
} from 'firebase/firestore';
import {ref, uploadBytes, getDownloadURL} from 'firebase/storage';
import {getDecryptedChatMessage, getEncryptedChatMessage} from "./crypto";
import {useEffect, useState} from "react";
import moment from "moment";
import {storage} from "../../pages/LeadManagementDetails/Components/firebase";

function useMessagesForQuoteChat(chatRef) {
  const [messages, setMessages] = useState([]);
  const [lastMessage, setLastMessage] = useState(null);
  const [allFetched, setAllFetched] = useState(false);

console.log("chatref in service : ",chatRef)

  useEffect(() => {
    let unsubscribe
    (async () => {
      unsubscribe = getFirst50MessagesForQuoteChat(chatRef, messages, setMessages, setLastMessage, setAllFetched)
    })()
    return () => unsubscribe
  }, [chatRef]);

  const loadMoreMessages = () => {
    getMoreMessagesForQuoteChat(chatRef, messages, lastMessage, setMessages, setLastMessage, setAllFetched)
  }

  return {
    messages,
    allFetched,
    lastMessage,
    loadMoreMessages
  };
}

export {useMessagesForQuoteChat};

const formatDate = (timestamp) => {
  if (moment().diff(moment(new Date(timestamp)), 'days') > 7) {
    return moment(new Date(timestamp)).format("DD/MM/YYYY LT")
  } else {
    return moment(new Date(timestamp)).fromNow().replace(/\b[a-z]/, match => match.toUpperCase())
  }
}

export async function getFirst50MessagesForQuoteChat(chatRef, oldMessages, setMessageCallback, setLastMessageCallback, setAllFetchedCallback) {
  const q = query(chatRef, orderBy("timestamp", "desc"), limit(50));
  return onSnapshot(q, (querySnapshot) => {
      // console.log("Fetch first 50 and continue listen...")
      const messages = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        ...{
          message: doc.data().message ? getDecryptedChatMessage(localStorage.getItem('authCognitoId'), doc.data().message) : "",
          attachment_url: doc.data().attachment_url ? getDecryptedChatMessage(localStorage.getItem('authCognitoId'), doc.data().attachment_url) : "",
          fromNow: formatDate(doc.data().timestamp)
        }
      }))
      console.log("messages in serv",messages);
      if (messages.length) {
        // console.log('messages', messages)
        setMessageCallback([...oldMessages, ...messages,]);
        setLastMessageCallback(messages[messages.length - 1]);
        setAllFetchedCallback(false)
      } else {
        setAllFetchedCallback(true)
      }
    }
  );
}

export async function getMoreMessagesForQuoteChat(chatRef, oldMessages, lastMessage, setMessageCallback, setLastMessageCallback, setAllFetchedCallback) {
  // console.log("Fetch via load more...", lastMessage)
  if (lastMessage) {
    const q = query(chatRef, orderBy("timestamp", "desc"), startAfter(lastMessage ? lastMessage.timestamp : null), limit(50));
    const documentSnapshots = await getDocs(q);
    if (documentSnapshots.docs.length) {
      const messagesLocal = []
      documentSnapshots.forEach((doc) => {
        messagesLocal.push({
          id: doc.id,
          ...doc.data(),
          ...{
            message: doc.data().message ? getDecryptedChatMessage(localStorage.getItem('authCognitoId'), doc.data().message) : "",
            attachment_url: doc.data().attachment_url ? getDecryptedChatMessage(localStorage.getItem('authCognitoId'), doc.data().attachment_url) : "",
            fromNow: formatDate(doc.data().timestamp)
          }
        });
      });
      setMessageCallback([...oldMessages, ...messagesLocal]);
      setLastMessageCallback(messagesLocal[messagesLocal.length - 1]);
    } else {
      setLastMessageCallback(null)
      setAllFetchedCallback(true)
    }
  }
}


export async function sendMessageForQuoteChat(chatRef , textOrFile, extraDataForNewMessage, isAttachment = false, storageFolder = null) {
  try {
    let textOrUrl;
    if (isAttachment) {
      // public URL of document / image will be sent in attachment_url field
      textOrUrl = await storeAttachment(storageFolder, textOrFile)
    } else {
      // plain text message will be sent in message field
      textOrUrl = textOrFile
    }

    const payload = {
      timestamp: Math.floor(new Date().getTime()),
      from: "agent",
      to: "user",
      message: !isAttachment ? getEncryptedChatMessage(localStorage.getItem('authCognitoId'), textOrUrl) : "",
      user_read: true,
      agent_read: false,
      attachment_url: isAttachment ? getEncryptedChatMessage(localStorage.getItem('authCognitoId'), textOrUrl) : "",
      mime_type: isAttachment ? textOrFile.type : "",
      // below field will be overridden by extraData
      user_name: "",
      user_id: 0,
      agent_name: "",
      agent_id: 0,
      ...extraDataForNewMessage
    }
    console.log(payload)
    await addDoc(chatRef, payload);
    return payload;
  } catch (error) {
    console.error(error);
  }
}

export async function sendLastMessageAtRootLevelForQuoteChat(docRef, extraDataRootLevelLastMessage) {
  try {
    let data = await setDoc(docRef, {
      device_type: "agent",
      id: 5,
      last_message: "Hello i am agent 3",
      last_message_timestamp: Math.floor(new Date().getTime()),
      user_name: "",
      timestamp: Math.floor(new Date().getTime()),
      ...extraDataRootLevelLastMessage
    });
    // console.log("data", data)
  } catch (error) {
    console.error(error);
  }
}

export async function storeAttachment(storageFolder, attachment) {
  try {
    const refPath = attachment.type.includes("image") ? "image" : "document"
    const storageRef = ref(storage, `${9999}_${9999}/${refPath}_${Math.floor(new Date().getTime()) / 1000}`)
    console.log("attachment", attachment)
    const snap = await uploadBytes(storageRef, attachment);
    // console.log("snap", snap)
    const publicUrl = await getDownloadURL(ref(storage, snap.ref.fullPath));
    return publicUrl
  } catch (error) {
    console.error(error);
  }
}


// testing functions

export async function sendAgentMessage(chatRef, text, extraDataForNewMessage) {
  try {
    await addDoc(chatRef, {
      timestamp: Math.floor(new Date().getTime()),
      from: "agent",
      to: "user",
      message: getEncryptedChatMessage(localStorage.getItem('authCognitoId'), text),
      user_read: false,
      agent_read: true,
      attachment_url: "",
      mime_type: "",
      // below field will be overridden by extraData
      user_name: "",
      user_id: "",
      agent_name: "",
      agent_id: 0,
      ...extraDataForNewMessage
    });
  } catch (error) {
    console.error(error);
  }
}

export async function deleteMessage(chatRef) {
  try {
    // let docRef = await doc(chatRef, "4Uat3ISpsuAsz3mMZMiQ").
    const q = query(
      chatRef
    );
    onSnapshot(q, (querySnapshot) => {
      querySnapshot.forEach(async (doc) => {
        if (doc.data()) {
          await deleteDoc(doc.ref)
          // console.log("data", doc.data())
        }
      });
    })
  } catch (error) {
    console.error(error);
  }
}
