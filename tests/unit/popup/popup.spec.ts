import { shallowMount } from "@vue/test-utils";
import App from "@/popup/App.vue";
import { chrome } from 'jest-chrome'
import { optionsKey } from "@/utils/constants";

describe("popup/popup", () => {
  it("renders popup/App.vue", () => {
    const msg = "Git Kanban Options";

    // const listenerSpy = jest.fn()
    const sendResponseSpy = jest.fn()

    chrome.tabs.create(
      {},
      sendResponseSpy // SendResponse function
    )
    const wrapper = shallowMount(App, {
      // propsData: { msg },
    }); 
    expect(wrapper.text()).toMatch(msg);
    expect(sendResponseSpy).not.toBeCalled()
  });
});
