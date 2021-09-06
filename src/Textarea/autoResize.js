function resize({ target }) {
  const targetHeight = Number(target.style.height.slice(0, -2)); // remove "px"
  if (target.scrollHeight < targetHeight) {
    return;
  }
  target.style.height = +target.scrollHeight + "px";
}

export function autoRezise(el) {
  // resize({ target: el });
  el.style.overflow = "hidden";
  el.addEventListener("input", resize);

  return {
    destroy: () => el.removeEventListener("input", resize),
  };
}
