import "./scss/global.scss";
import App from "./components/App.svelte";
const app = new App({ target: document.body });
window.app = app;
export default app;