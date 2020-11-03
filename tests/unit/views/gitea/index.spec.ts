// import { shallowMount } from "@vue/test-utils";
// import App from "@/popup/App.vue";
// import { chrome } from "jest-chrome";
import gitea from "@/views/gitea";

// import { optionsKey } from "@/utils/constants";

describe("views/gitea", () => {
  it("renders gitea.renders", () => {
    const msg = "{}";

    // const listenerSpy = jest.fn()
    // const sendResponseSpy = jest.fn();
    gitea.render();

    const result = gitea;

    // chrome.tabs.create(
    //   {},
    //   sendResponseSpy // SendResponse function
    // );
    // const wrapper = shallowMount(App, {
    //   // propsData: { msg },
    // });
    expect(JSON.stringify(result)).toMatch(msg);
    // expect(sendResponseSpy).not.toBeCalled();
  });
});
