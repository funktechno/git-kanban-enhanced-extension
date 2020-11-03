// import { shallowMount } from "@vue/test-utils";
// import App from "@/popup/App.vue";
// import { chrome } from "jest-chrome";
import github from "@/views/github";

// import { optionsKey } from "@/utils/constants";

describe("views/github", () => {
  it("renders github.renders", () => {
    const msg = "{}";

    // const listenerSpy = jest.fn()
    // const sendResponseSpy = jest.fn();
    github.render();

    const result = github;

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
