<script>
  import Sidebar from "~c/UIShell/Sidebar/Sidebar.svelte";
  import SidebarNav from "~c/UIShell/Sidebar/SidebarNav.svelte";
  import SidebarNavLink from "~c/UIShell/Sidebar/SidebarNavLink.svelte";
  // import SidebarNavMenu from "~c/UIShell/Sidebar/SidebarNavMenu.svelte";
  import Content from "~c/UIShell/Content.svelte";
  //import Table20 from "carbon-icons-svelte/lib/Table20";
  import Star20 from "carbon-icons-svelte/lib/Star20";
  import Blog20 from "carbon-icons-svelte/lib/Blog20";
  import Link20 from "carbon-icons-svelte/lib/Link20";
  import ParentChild20 from "carbon-icons-svelte/lib/ParentChild20";
  import UserMultiple20 from "carbon-icons-svelte/lib/UserMultiple20";
  import License20 from "carbon-icons-svelte/lib/License20";
  import Settings20 from "carbon-icons-svelte/lib/Settings20";
  import ShoppingBag20 from "carbon-icons-svelte/lib/ShoppingBag20";
  import MailAll20 from "carbon-icons-svelte/lib/MailAll20";
  import Restaurant20 from "carbon-icons-svelte/lib/Restaurant20";
  import Export20 from "carbon-icons-svelte/lib/Export20";
  import CopyLink20 from "carbon-icons-svelte/lib/CopyLink20";
  import Tag20 from "carbon-icons-svelte/lib/Tag20";
  import { SIDEBAR_MENU } from "~/cms-config";
  import { location } from "svelte-spa-router";

  const icons = [
    Blog20,
    Restaurant20,
    ParentChild20,
    Tag20,
    ShoppingBag20,
    License20,
    UserMultiple20,
    Settings20,
    Star20,
    Link20,
    Export20,
    CopyLink20,
    MailAll20,
  ];

  const SIDEBAR_MENU_WITH_ICONS = SIDEBAR_MENU.map((item, i) => {
    return {
      ...item,
      icon: icons[i],
    };
  });
</script>

<Sidebar>
  <SidebarNav>
    {#each SIDEBAR_MENU_WITH_ICONS as { text, href, icon }, i}
      <SidebarNavLink
        text={text}
        icon={icon}
        href={"/#" + href}
        selected={$location === href || ($location === "/" && i === 0)} />
    {/each}
  </SidebarNav>
</Sidebar>
<Content>
  <slot />
</Content>
