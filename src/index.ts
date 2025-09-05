import { otherFileFunctionUpdateM } from "./some-other-file-m";
import { PostHog } from "posthog-node";

const client = new PostHog("phc_p23SIiHyepbet1p4ufrPISJSjNndMxJR5kxlmpnW9OI", {
  host: "http://localhost:8010",
  enableExceptionAutocapture: true,
});
client.debug(true);

function main() {
  throwInOtherFileM();
}

function throwInOtherFileM() {
  otherFileFunctionUpdateM();
}

function throwInThisFile() {
  console.log("indexFunction");

  const someTypescriptVariable: string = "this is a typescript variable";

  throw new WebTransportError("this is brand new error updated");
}

main();
