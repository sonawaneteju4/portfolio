import "./App.css";
import CodeEditorLayout from "./component/layout/CodeEditorLayout";
import { ThemeProvider } from "./context/ThemeContext";
import Button from "./component/ui/Button";

function App() {
  return (
    <ThemeProvider>
      <CodeEditorLayout>
        {/* You can render your About, Projects, etc. here as editor content */}
        <div className="text-2xl font-bold">
          Welcome to your VS Code style portfolio!
        </div>
      </CodeEditorLayout>
    </ThemeProvider>
  );
}

export default App;
