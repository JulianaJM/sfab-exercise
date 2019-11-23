export const getAvatar = (avatars, width) =>
  avatars.find(avatar => avatar.width === width) ||
  avatars.images[avatars.length];

export const isBottom = () => {
  const windowHeight =
    "innerHeight" in window
      ? window.innerHeight
      : document.documentElement.offsetHeight;
  const body = document.body;
  const html = document.documentElement;
  const docHeight = Math.max(
    body.scrollHeight,
    body.offsetHeight,
    html.clientHeight,
    html.scrollHeight,
    html.offsetHeight
  );
  const windowBottom = windowHeight + window.pageYOffset;
  return windowBottom >= docHeight;
};

export const isMobile = () => {
  const width = window.innerWidth > 0 ? window.innerWidth : window.screen.width;
  return width <= 1024;
};
