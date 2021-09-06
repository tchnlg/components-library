<div class="hidden lg:ml-4 lg:flex lg:items-center">
  <button
    class="flex-shrink-0 bg-white p-1 text-gray-400 rounded-full hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
    <span class="sr-only">View notifications</span>
    <!-- Heroicon name: bell -->
    <svg
      class="h-6 w-6"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      aria-hidden="true">
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
    </svg>
  </button>

  <!-- Profile dropdown -->
  <div class="ml-4 relative flex-shrink-0">
    <div>
      <button
        class="bg-white rounded-full flex text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        id="user-menu"
        aria-haspopup="true">
        <span class="sr-only">Open user menu</span>
        <img
          class="h-8 w-8 rounded-full"
          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
          alt="" />
      </button>
    </div>
    <!--
      Profile dropdown panel, show/hide based on dropdown state.

      Entering: "transition ease-out duration-100"
        From: "transform opacity-0 scale-95"
        To: "transform opacity-100 scale-100"
      Leaving: "transition ease-in duration-75"
        From: "transform opacity-100 scale-100"
        To: "transform opacity-0 scale-95"
    -->
    <div
      class="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5"
      role="menu"
      aria-orientation="vertical"
      aria-labelledby="user-menu">
      <!-- svelte-ignore a11y-invalid-attribute -->
      <a
        href="#"
        class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
        role="menuitem">Your Profile</a>
      <!-- svelte-ignore a11y-invalid-attribute -->
      <a
        href="#"
        class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
        role="menuitem">Settings</a>
      <!-- svelte-ignore a11y-invalid-attribute -->
      <a
        href="#"
        class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
        role="menuitem">Sign out</a>
    </div>
  </div>
</div>
