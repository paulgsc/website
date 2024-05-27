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
const mockMessages = [
  {
    id: 1,
    text: "Hello!",
    isUserMessage: true,
    createdAt: new Date().toString(),
  },
  {
    id: 2,
    text: "Hi there! How can I assist you today?",
    isUserMessage: false,
    createdAt: new Date().toString(),
  },
  {
    id: 3,
    text: markdownContent,
    isUserMessage: true,
    createdAt: new Date().toString(),
  },
  {
    id: 4,
    text: "Sure, go ahead and ask your question.",
    isUserMessage: false,
    createdAt: new Date().toString(),
  },
] as const

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
