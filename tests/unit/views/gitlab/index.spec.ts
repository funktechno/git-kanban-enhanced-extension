// import { shallowMount } from "@vue/test-utils";
// import App from "@/popup/App.vue";
// import { chrome } from "jest-chrome";
import gitlab from "@/views/gitlab";

// import { optionsKey } from "@/utils/constants";

describe("views/gitlab", () => {
  it("renders gitlab.renders", () => {
    const msg = "{}";

    // const listenerSpy = jest.fn()
    // const sendResponseSpy = jest.fn();
    gitlab.render();

    const result = gitlab;

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
