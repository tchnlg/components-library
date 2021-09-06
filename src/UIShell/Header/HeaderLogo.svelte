<script>
  export let href = undefined;
  export let src = undefined;
  export let company = "";
</script>

<a href={href} class="flex-shrink-0 flex items-center pr-2 sm:pl-2">
  <img class="block h-8 w-auto" src={src} alt={company} />
  <!-- <img class="block lg:hidden h-8 w-auto" src={logoSm} alt={companyName}>
    <img class="hidden lg:block h-8 w-auto" src={logoLg} alt={companyName}> -->
</a>
