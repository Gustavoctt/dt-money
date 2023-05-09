import { ThemeProvider } from "styled-components";
import { defaultTheme } from "./styles/themes/default";
import { GlobalStyle } from "./styles/global";
import { Transactions } from "./pages";
import { TransactionsProvider } from "./contexts/TransactionsContext";

function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <TransactionsProvider>
        <GlobalStyle />

        <Transactions />
      </TransactionsProvider>
    </ThemeProvider>
  );
}

export default App;
