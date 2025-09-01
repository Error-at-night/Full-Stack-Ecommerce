import { Toaster } from "react-hot-toast";

function AppToaster() {
  return (
    <Toaster
      position="top-center"
      gutter={12}
      containerStyle={{ margin: "8px" }}
      toastOptions={{
        success: {
          duration: 5000,
        },
        error: {
          duration: 5000,
        },
        style: {
          fontSize: "16px",
          maxWidth: "350px",
          padding: "16px 15px",
          backgroundColor: "white",
          color: "black",
        },
      }}
    />
  );
}

export default AppToaster
