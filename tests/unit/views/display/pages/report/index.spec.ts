import { shallowMount } from "@vue/test-utils";
import report from "@/views/display/pages/report/root.vue";
// import Board from "./pages/board/root.vue";
// import Burndown from "./pages/burndown/root.vue";
// import Settings from "./pages/settings/root.vue";
// import report from "./pages/report/root.vue";
// import velocity from "./pages/velocity/root.vue";
import { chrome } from "jest-chrome";
import { optionsKey } from "@/utils/constants";

describe("views/display/pages/report", () => {
  it("renders views/display/pages/report/root.vue", async () => {
    const msg =
      "Burndown Report";
    const responseDefault = Promise.resolve({
      status: 200,
      data: {},
      body: {
        name: "Self Hosted Kanban",
      },
    });

    // const listenerSpy = jest.fn()
    const sendResponseSpy = jest.fn();

    chrome.storage.sync.get(
      [optionsKey],
      sendResponseSpy // SendResponse function
    );
    const wrapper = shallowMount(report, {
      stubs: ["v-style", "kanban-board"],
      mocks: {
        $http: {
          get: (url: string) => {
            if (url) return responseDefault;
            // if (url == "/api/accounts/asset") return responseAccounts;
          },
        },
      },
      // propsData: { msg },
    });
    await wrapper.vm.$nextTick();
    await responseDefault.then();
    await wrapper.vm.$nextTick();
    expect(wrapper.find("h2").text()).toMatch(msg);
    expect(sendResponseSpy).not.toBeCalled();
  });
});
