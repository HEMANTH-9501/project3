import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import "./index.css"

async function enableMocking() {
  const { isSameOriginApi } = await import("./config/api")
  if (!isSameOriginApi) return

  const { worker } = await import("./mocks/browser")
  await worker.start({
    onUnhandledRequest: "bypass",
    serviceWorker: { url: "/mockServiceWorker.js" },
  })
}

enableMocking().finally(() => {
  ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  )
})
