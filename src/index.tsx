/* @refresh reload */
import { render } from "solid-js/web";

import App from "./App";

import "open-props/style";
import "open-props/normalize";
import "open-props/buttons";

const root = document.getElementById("root");

render(() => <App />, root!);
