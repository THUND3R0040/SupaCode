import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./pages/Dashboard";
import RoomConfig from "./pages/RoomConfig";
import Room from "./pages/Room";
import Homepage from "./pages/Homepage";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/RoomConfig" element={<RoomConfig />} />
          <Route path="/Room/:id" element={<Room />} />
          <Route path="/" element={<Homepage />} />
        </Routes>
      </BrowserRouter>
      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{ margin: "8px" }}
        toastOptions={{
          success: {
            duration: 3000,
          },
          error: {
            duration: 5000,
          },
          style: {
            fontSize: "1rem",
            padding: "1rem",
            maxWidth: "500px ",
            fontFamily: "Space Grotesk",
          },
        }}
      />
    </QueryClientProvider>
  );
}

export default App;
