import { nanoid } from "nanoid"

import type { MessageType } from "@/types/chat-bot" // Adjust the path as necessary

import Message from "./message"

const markdownContent = `
# Sample Code

\`\`\`javascript {1,4-6}
const greet = () => {
  console.log("Hello, world!");
  // This is a highlighted line
  if (true) {
    console.log("This is also highlighted");
  }
};
\`\`\`
`

// Mock static data
const mockMessages: Array<MessageType> = [
  {
    id: nanoid(),
    contentType: "text",
    content: "Hello!",
    createdBy: "anonymousPlatypus",
    createdAt: new Date(),
  },
  {
    id: nanoid(),
    contentType: "text",
    content: "Hi there! How can I assist you today?",
    createdBy: "chatbot",
    createdAt: new Date(),
  },
  {
    id: nanoid(),
    contentType: "text",
    content: markdownContent,
    createdBy: "anonymousPlatypus",
    createdAt: new Date(),
  },
  {
    id: nanoid(),
    contentType: "text",
    content: "Sure, go ahead and ask your question.",
    createdBy: "chatbot",
    createdAt: new Date(),
  },
]

const Messages = () => {
  return (
    <ul className="scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch flex h-[calc(100vh-3.5rem-12rem)] flex-col">
      {mockMessages.map((message) => (
        <li key={message.id} className="even:bg-accent mb-6 p-0.5 py-2.5">
          <Message message={message} isNextMessageSamePerson={true} />
        </li>
      ))}
    </ul>
  )
}

export default Messages
