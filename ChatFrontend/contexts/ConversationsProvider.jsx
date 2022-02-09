import React, { useContext, useState } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import { useContacts } from './ContactsProvider';

const ConversationsContext = React.createContext()

export function useConversations() {
  return useContext(ConversationsContext);
}

export function ConversationsProvider({ id, children }) {
  const [conversations, setConversations] = useLocalStorage('conversations', [])
  const [selectedConversationIndex, setSelectedConversationIndex] = useState(0)
  const { contacts } = useContacts();

  function createConversation(recipients) {
    setConversations(prevConversations => {
      return [...prevConversations, {recipients, messages: []}]
    })
  }

  function addMessageToConversation({ recipients, text, sender }) {
    console.group("recipients");
    console.log(recipients);
    console.log(text);
    console.log(sender);
    console.groupEnd();
    setConversations(prevConversations => {
      console.group("prevConversations");
      console.log(prevConversations);
      let madeChange = false
      const newMessage = {sender, text}
      const newConversations = prevConversations.map
      (conversation => {
        console.group("conversation");
        console.log(conversation);
        console.groupEnd();
        if (arrayEquality(conversation.recipients, recipients) )
        {
          madeChange = true
          console.group("Equality Check");
          console.log(conversation);
          console.log(conversation.message);
          console.groupEnd();
          return {
            ...conversation,
            messages: [...conversation.messages, newMessage]
          }
        }

        return conversation
      })

      console.groupEnd();

      if( madeChange) {
        return newConversations;
      }else {
        return [
          ...prevConversations,
          {recipients, messages: [newMessage]}
        ]
      }
    })
  }

  function sendMessage(recipients, text) {
    addMessageToConversation({ recipients, text, sender: id})
  }

  const formattedConversations = conversations.map((conversation, index) => {
    const recipients = conversation.recipients.map(recipient => {
      const contact = contacts.find(contact => {
        return contact.id === recipient
      })
      const name = (contact && contact.name) || recipient
      return { id: recipient, name }
    })



    const messages = conversation.messages.map(message => {
      const contact = contacts.find(contact => {
        return contact.id === message.sender
      })
      const name = (contact && contact.name) || message.sender
      const fromMe = id === message.sender

      return {
        ...message, senderName: name, fromMe
      }
    })

    const selected = index === selectedConversationIndex
    return { ...conversation, recipients, selected, messages }
  })

  const value = {
    conversations: formattedConversations,
    selectedConversation: formattedConversations[selectedConversationIndex],
    selectedConversationIndex: setSelectedConversationIndex,
    createConversation,
    sendMessage
  }
  
  return (
    <ConversationsContext.Provider value={value}>
      {children}
    </ConversationsContext.Provider>
  )
}

function arrayEquality(a , b) {
  if(a.length !== b.length) return false;

  a.sort();
  b.sort();

  return a.every((element, index) => {
    return element === b[index]
  })
}
