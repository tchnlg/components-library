<script>
  import Header from "./Header/Header.svelte";
  import HeaderLogo from "./Header/HeaderLogo.svelte";
  import Search from "../Search/Search.svelte";
  import Button from "../Button/Button.svelte";
  import Sidebar from "./Sidebar/Sidebar.svelte";
  import SidebarNav from "./Sidebar/SidebarNav.svelte";
  import SidebarNavLink from "./Sidebar/SidebarNavLink.svelte";
  import SidebarNavMenu from "./Sidebar/SidebarNavMenu.svelte";
  import Container from "./Container.svelte";
  import Content from "./Content.svelte";
  import Layout from "./Layout.svelte";
  import Home16 from "carbon-icons-svelte/lib/Home16";
  import Events16 from "carbon-icons-svelte/lib/Events16";
  import DataCheck16 from "carbon-icons-svelte/lib/DataCheck16";
  export let story = null;

  const selectProps = {
    items: [
      { value: "white", text: "White" },
      { value: "g10", text: "Gray 10" },
      { value: "g50", text: "Gray 50" },
      { value: "g90", text: "Gray 90" },
    ],
    placeholder: "Select option",
    labelText: "Colors",
  };

  const results = [
    {
      id: 1,
      type: "POST",
      title: "Result 1",
    },
    {
      id: 2,
      type: "POST",
      title: "Result 2",
    },
    {
      id: 3,
      type: "CATEGORY",
      title: "Result 3",
    },
  ];
</script>

{#if story === "with-sidebar"}
  <Layout>
    <Header>
      <HeaderLogo
        href="/"
        company="Company"
        src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg" />
      <Search
        autocomplete
        placeholder="Search"
        searchResults={results}
        let:item>
        <p class="text-xs font-medium">{item.type}</p>
        <p>{item.title}</p>
      </Search>
    </Header>
    <Container>
      <Sidebar class="border-r border-gray-200">
        <SidebarNav>
          <SidebarNavLink text="Link 1" href="/" icon={Home16} selected />
          <SidebarNavLink text="Link 2" href="/" />
          <SidebarNavLink text="Link 3" href="/" />
          <SidebarNavLink text="Link 4" href="/" icon={Events16} />
          <SidebarNavLink text="Link 5" href="/" icon={DataCheck16} />
          <SidebarNavMenu text="Menu" icon={Events16}>
            <SidebarNavLink text="Menu Item 1" />
            <SidebarNavLink text="Menu Item 2" />
          </SidebarNavMenu>
        </SidebarNav>
      </Sidebar>
      <Content>
        <div class="text-xl leading-5 font-bold py-2 lg:pb-6 lg:px-4">
          Home page
        </div>
      </Content>
    </Container>
  </Layout>
{:else if story === "with-sidebar-and-expanding-panel"}
  <Layout>
    <Header>
      <HeaderLogo
        href="/"
        company="Company"
        src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg" />
      <Search autocompete placeholder="Search" expandable expandedSide="left" />
    </Header>
    <Container>
      <Sidebar class="border-r border-gray-200">
        <SidebarNav>
          <SidebarNavLink text="Link 1" href="/" icon={Home16} selected />
          <SidebarNavLink text="Link 2" href="/" />
          <SidebarNavLink text="Link 3" href="/" />
          <SidebarNavLink text="Link 4" href="/" icon={Events16} />
          <SidebarNavLink text="Link 5" href="/" icon={DataCheck16} />
          <SidebarNavMenu text="Menu" icon={Events16}>
            <SidebarNavLink text="Menu Item 1" />
            <SidebarNavLink text="Menu Item 2" />
          </SidebarNavMenu>
        </SidebarNav>
      </Sidebar>
      <Content>
        <div class="text-xl leading-5 font-bold py-2 lg:pb-6 lg:px-4">
          Home page
        </div>
      </Content>
      <Sidebar class="border-l border-gray-200 pl-2">
        <div class="flex space-x-2">
          <Button text="Save" kind="primary" />
          <Button text="Settings" kind="secondary" />
        </div>
      </Sidebar>
    </Container>
  </Layout>
{/if}
