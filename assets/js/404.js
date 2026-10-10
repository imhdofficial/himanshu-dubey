(() => {
  const routeMap = new Map([
    ['/case-study/ai-product-chatbot', '/case-study/ai-product-chatbot.html'],
    ['/case-study/loyalty-program', '/case-study/loyalty-program.html'],
    ['/case-study/mewaram', '/case-study/mewaram.html'],
    ['/case-study/e-idea-box', '/case-study/e-idea-box.html'],
    ['/expertise/product-design', '/expertise/product-design.html'],
    ['/expertise/frontend-engineering', '/expertise/frontend-engineering.html'],
    ['/expertise/shopify-commerce', '/expertise/shopify-commerce.html'],
    ['/expertise/platforms-integration', '/expertise/platforms-integration.html'],
    ['/expertise/ai-assisted-execution', '/expertise/ai-assisted-execution.html'],
    ['/expertise/testing-qa', '/expertise/design-systems-qa.html'],
    ['/process/understand', '/process/understand.html'],
    ['/process/design', '/process/design.html'],
    ['/process/build', '/process/build.html'],
    ['/process/verify', '/process/verify.html']
  ]);

  const normalized = location.pathname.length > 1
    ? location.pathname.replace(/\/+$/, '')
    : location.pathname;
  const target = routeMap.get(normalized);

  if(target){
    location.replace(`${target}${location.search}${location.hash}`);
    return;
  }

  document.documentElement.classList.add('is-real-404');
  addEventListener('DOMContentLoaded', () => {
    const pathEl = document.querySelector('[data-bad-path]');
    if(pathEl) pathEl.textContent = decodeURIComponent(location.pathname);
  }, {once:true});
})();
