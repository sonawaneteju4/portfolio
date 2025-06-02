import "./App.css";
import CodeEditorLayout from "./component/layout/CodeEditorLayout";
import { ThemeProvider } from "./context/ThemeContext";
import Home from "./pages/index";

function App() {
  return (
    <ThemeProvider>
      <CodeEditorLayout>
        <Home />
      </CodeEditorLayout>
    </ThemeProvider>
  );
}

export default App;
