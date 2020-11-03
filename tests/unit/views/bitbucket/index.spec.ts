// import { shallowMount } from "@vue/test-utils";
// import App from "@/popup/App.vue";
// import { chrome } from "jest-chrome";
import bitbucket from "@/views/bitbucket";

// import { optionsKey } from "@/utils/constants";

describe("views/bitbucket", () => {
  it("renders bitbucket.renders", () => {
    const msg = "{}";

    // const listenerSpy = jest.fn()
    // const sendResponseSpy = jest.fn();
    bitbucket.render();

    const result = bitbucket;

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
