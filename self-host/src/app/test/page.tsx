import Markdown from "@/components/shared-components/markdown/markdown"

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

const App = () => {
  return (
    <div>
      <Markdown markdown={markdownContent} />
    </div>
  )
}

export default App
