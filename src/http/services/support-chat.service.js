import {
  addDoc, setDoc, deleteDoc, getDocs, limit,
  startAfter, onSnapshot, query, orderBy
} from 'firebase/firestore';
import {ref, uploadBytes, getDownloadURL} from 'firebase/storage';
import {getDecryptedChatMessage, getEncryptedChatMessage} from "./crypto";
import {useEffect, useState} from "react";
import moment from "moment";
import {storage} from "../../pages/Chats/firebase";

function useMessagesForSupportChat(chatRef, docRef) {
  // 2 are beign used for chat message and last message for pagination
  const [messages, setMessages] = useState([]);
  const [lastMessage, setLastMessage] = useState(null);

  // root last message is being used for changing the chat status &
  // get the name of support person
  const [rootLastMessage, setRootLastMessage] = useState(null);

  const [allFetched, setAllFetched] = useState(false);
  useEffect(() => {
    let unsubscribe
    (async () => {
      unsubscribe = await getFirst50MessagesForSupportChat(chatRef, messages, setMessages, setLastMessage, setAllFetched)
    })()
    return () => unsubscribe
  }, []);

  useEffect(() => {
    let unsubscribe
    (async () => {
      unsubscribe = await listenToLastMessage(docRef, setRootLastMessage)
    })()
    return () => unsubscribe
  }, []);

  const loadMoreMessages = () => {
    getMoreMessagesForSupportChat(chatRef, messages, lastMessage, setMessages, setLastMessage, setAllFetched)
  }

  return {
    messages,
    allFetched,
    lastMessage,
    rootLastMessage,
    loadMoreMessages
  };
}

export {useMessagesForSupportChat};

const formatDate = (timestamp) => {
  if (moment().diff(moment(new Date(timestamp)), 'days') > 7) {
    return moment(new Date(timestamp)).format("DD/MM/YYYY LT")
  } else {
    return moment(new Date(timestamp)).fromNow().replace(/\b[a-z]/, match => match.toUpperCase())
  }
}

export async function listenToLastMessage(docRef , setRootLastMessageCallback) {
  const q = query(docRef);
  return onSnapshot(q, (querySnapshot) => {
      // console.log("Fetch Root Level last message and continue listen...")
      if (querySnapshot.data()) {
        const lastRootMessage = {
          id: querySnapshot.id,
          ...querySnapshot.data(),
          ...{
            last_message: querySnapshot.data().last_message ? getDecryptedChatMessage(localStorage.getItem('authCognitoId'), querySnapshot.data().last_message) : "",
          }
        }
        // console.log("lastRootMessage", lastRootMessage)
        setRootLastMessageCallback(lastRootMessage)
      }
    }
  );
}

export async function getFirst50MessagesForSupportChat(chatRef, oldMessages, setMessageCallback, setLastMessageCallback, setAllFetchedCallback) {
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

export async function getMoreMessagesForSupportChat(chatRef, oldMessages, lastMessage, setMessageCallback, setLastMessageCallback, setAllFetchedCallback) {
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


export async function sendMessageForSupportChat(chatRef , textOrFile, extraDataForNewMessage, isAttachment = false, storageFolder = null) {
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
      from: "user",
      to: "support",
      message: !isAttachment ? getEncryptedChatMessage(localStorage.getItem('authCognitoId'), textOrUrl) : "",
      user_read: true,
      support_read: false,
      attachment_url: isAttachment ? getEncryptedChatMessage(localStorage.getItem('authCognitoId'), textOrUrl) : "",
      mime_type: isAttachment ? textOrFile.type : "",
      // below field will be overridden by extraData
      id: 0,
      user_name: "",
      user_id: 0,
      current_support_id: 0,
      support_id: 0,
      support_name: "",
      status: "",
      ...extraDataForNewMessage
    }
    console.log(payload)
    await addDoc(chatRef, payload);
    return payload;
  } catch (error) {
    console.error(error);
  }
}

export async function sendLastMessageAtRootLevelForSupportChat(docRef, extraDataRootLevelLastMessage) {
  try {
    let data = await setDoc(docRef, {
      last_message: "",
      last_message_timestamp: "",
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
