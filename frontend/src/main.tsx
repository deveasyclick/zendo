import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { ThemeProvider } from "./contexts/theme/provider.tsx";
import AppRoutes from "./routes/index.tsx";
import { ClerkProvider } from "@clerk/react-router";
import { config } from "./config/index.ts";
import { PRIMARY_COLOR } from "./constants/colors.ts";
import { BrowserRouter } from "react-router";
import QueryProvider from "./providers/QueryProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <BrowserRouter>
        <ClerkProvider
          publishableKey={config.clerkPublishableKey}
          appearance={{
            signIn: { variables: { colorPrimary: PRIMARY_COLOR } },
            signUp: { variables: { colorPrimary: PRIMARY_COLOR } },
          }}
        >
          <QueryProvider>
            <AppRoutes />
          </QueryProvider>
        </ClerkProvider>
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>
);
