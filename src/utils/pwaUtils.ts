//@ts-ignore
const navigatorStandAlone: () => boolean = () => ('standalone' in window.navigator) && (window.navigator.standalone);

export const isInStandaloneMode : () => boolean  = () =>
      (window.matchMedia('(display-mode: standalone)').matches) || 
      navigatorStandAlone() || 
      document.referrer.includes('android-app://');