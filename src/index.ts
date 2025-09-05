import { v4 } from "uuid";
import { otherFileFunctionUpdateH } from "./some-other-file-h";
import { PostHog } from "posthog-node";

const client = new PostHog("phc_p23SIiHyepbet1p4ufrPISJSjNndMxJR5kxlmpnW9OI", {
  host: "http://localhost:8010",
  enableExceptionAutocapture: true,
});
client.debug(true);

function main() {
  throwInOtherFileH();
}

function throwInOtherFileH() {
  otherFileFunctionUpdateH();
}

function throwInThisFile() {
  console.log("indexFunction");

  const someTypescriptVariable: string = "this is a typescript variable";

  throw new WebTransportError("this is brand new error updated");
}

main();
