require("core-js/stable");
require("regenerator-runtime/runtime");

const debug = (error) => {
  console.error(error);
  console.error("Something went wrong!");
};

/**
 * get file contents
 */
const fileGetContents = (filePath) => {
  return new Promise(function (resolve) {
    chrome.runtime.getPackageDirectoryEntry(function (root) {
      root.getFile(filePath, {}, function (fileEntry) {
        fileEntry.file(function (file) {
          let reader = new FileReader();

          reader.onloadend = function () {
            resolve(this.result);
          };

          reader.readAsText(file);
        });
      });
    });
  });
};

const init = async () => {
  try {
    // tailwind color lists
    const colors = {
      blueGray50: "#F8FAFC",
      blueGray100: "#F1F5F9",
      blueGray200: "#E2E8F0",
      blueGray300: "#CBD5E1",
      blueGray400: "#94A3B8",
      blueGray500: "#64748B",
      blueGray600: "#475569",
      blueGray700: "#334155",
      blueGray800: "#1E293B",
      blueGray900: "#0F172A",

      coolGray50: "#F9FAFB",
      coolGray100: "#F3F4F6",
      coolGray200: "#E5E7EB",
      coolGray300: "#D1D5DB",
      coolGray400: "#9CA3AF",
      coolGray500: "#6B7280",
      coolGray600: "#4B5563",
      coolGray700: "#374151",
      coolGray800: "#1F2937",
      coolGray900: "#111827",

      gray50: "#FAFAFA",
      gray100: "#F4F4F5",
      gray200: "#E4E4E7",
      gray300: "#D4D4D8",
      gray400: "#A1A1AA",
      gray500: "#71717A",
      gray600: "#52525B",
      gray700: "#3F3F46",
      gray800: "#27272A",
      gray900: "#18181B",

      trueGray50: "#FAFAFA",
      trueGray100: "#F5F5F5",
      trueGray200: "#E5E5E5",
      trueGray300: "#D4D4D4",
      trueGray400: "#A3A3A3",
      trueGray500: "#737373",
      trueGray600: "#525252",
      trueGray700: "#404040",
      trueGray800: "#262626",
      trueGray900: "#171717",

      warmGray50: "#FAFAF9",
      warmGray100: "#F5F5F4",
      warmGray200: "#E7E5E4",
      warmGray300: "#D6D3D1",
      warmGray400: "#A8A29E",
      warmGray500: "#78716C",
      warmGray600: "#57534E",
      warmGray700: "#44403C",
      warmGray800: "#292524",
      warmGray900: "#1C1917",

      red50: "#FEF2F2",
      red100: "#FEE2E2",
      red200: "#FECACA",
      red300: "#FCA5A5",
      red400: "#F87171",
      red500: "#EF4444",
      red600: "#DC2626",
      red700: "#B91C1C",
      red800: "#991B1B",
      red900: "#7F1D1D",

      orange50: "#FFF7ED",
      orange100: "#FFEDD5",
      orange200: "#FED7AA",
      orange300: "#FDBA74",
      orange400: "#FB923C",
      orange500: "#F97316",
      orange600: "#EA580C",
      orange700: "#C2410C",
      orange800: "#9A3412",
      orange900: "#7C2D12",

      amber50: "#FFFBEB",
      amber100: "#FEF3C7",
      amber200: "#FDE68A",
      amber300: "#FCD34D",
      amber400: "#FBBF24",
      amber500: "#F59E0B",
      amber600: "#D97706",
      amber700: "#B45309",
      amber800: "#92400E",
      amber900: "#78350F",

      yellow50: "#FEFCE8",
      yellow100: "#FEF9C3",
      yellow200: "#FEF08A",
      yellow300: "#FDE047",
      yellow400: "#FACC15",
      yellow500: "#EAB308",
      yellow600: "#CA8A04",
      yellow700: "#A16207",
      yellow800: "#854D0E",
      yellow900: "#713F12",

      lime50: "#F7FEE7",
      lime100: "#ECFCCB",
      lime200: "#D9F99D",
      lime300: "#BEF264",
      lime400: "#A3E635",
      lime500: "#84CC16",
      lime600: "#65A30D",
      lime700: "#4D7C0F",
      lime800: "#3F6212",
      lime900: "#365314",

      green50: "#F0FDF4",
      green100: "#DCFCE7",
      green200: "#BBF7D0",
      green300: "#86EFAC",
      green400: "#4ADE80",
      green500: "#22C55E",
      green600: "#16A34A",
      green700: "#15803D",
      green800: "#166534",
      green900: "#14532D",

      emerald50: "#ECFDF5",
      emerald100: "#D1FAE5",
      emerald200: "#A7F3D0",
      emerald300: "#6EE7B7",
      emerald400: "#34D399",
      emerald500: "#10B981",
      emerald600: "#059669",
      emerald700: "#047857",
      emerald800: "#065F46",
      emerald900: "#064E3B",

      teal50: "#F0FDFA",
      teal100: "#CCFBF1",
      teal200: "#99F6E4",
      teal300: "#5EEAD4",
      teal400: "#2DD4BF",
      teal500: "#14B8A6",
      teal600: "#0D9488",
      teal700: "#0F766E",
      teal800: "#115E59",
      teal900: "#134E4A",

      cyan50: "#ECFEFF",
      cyan100: "#CFFAFE",
      cyan200: "#A5F3FC",
      cyan300: "#67E8F9",
      cyan400: "#22D3EE",
      cyan500: "#06B6D4",
      cyan600: "#0891B2",
      cyan700: "#0E7490",
      cyan800: "#155E75",
      cyan900: "#164E63",

      lightBlue50: "#F0F9FF",
      lightBlue100: "#E0F2FE",
      lightBlue200: "#BAE6FD",
      lightBlue300: "#7DD3FC",
      lightBlue400: "#38BDF8",
      lightBlue500: "#0EA5E9",
      lightBlue600: "#0284C7",
      lightBlue700: "#0369A1",
      lightBlue800: "#075985",
      lightBlue900: "#0C4A6E",

      blue50: "#EFF6FF",
      blue100: "#DBEAFE",
      blue200: "#BFDBFE",
      blue300: "#93C5FD",
      blue400: "#60A5FA",
      blue500: "#3B82F6",
      blue600: "#2563EB",
      blue700: "#1D4ED8",
      blue800: "#1E40AF",
      blue900: "#1E3A8A",

      indigo50: "#EEF2FF",
      indigo100: "#E0E7FF",
      indigo200: "#C7D2FE",
      indigo300: "#A5B4FC",
      indigo400: "#818CF8",
      indigo500: "#6366F1",
      indigo600: "#4F46E5",
      indigo700: "#4338CA",
      indigo800: "#3730A3",
      indigo900: "#312E81",

      violet50: "#F5F3FF",
      violet100: "#EDE9FE",
      violet200: "#DDD6FE",
      violet300: "#C4B5FD",
      violet400: "#A78BFA",
      violet500: "#8B5CF6",
      violet600: "#7C3AED",
      violet700: "#6D28D9",
      violet800: "#5B21B6",
      violet900: "#4C1D95",

      purple50: "#FAF5FF",
      purple100: "#F3E8FF",
      purple200: "#E9D5FF",
      purple300: "#D8B4FE",
      purple400: "#C084FC",
      purple500: "#A855F7",
      purple600: "#9333EA",
      purple700: "#7E22CE",
      purple800: "#6B21A8",
      purple900: "#581C87",

      fuchsia50: "#FDF4FF",
      fuchsia100: "#FAE8FF",
      fuchsia200: "#F5D0FE",
      fuchsia300: "#F0ABFC",
      fuchsia400: "#E879F9",
      fuchsia500: "#D946EF",
      fuchsia600: "#C026D3",
      fuchsia700: "#A21CAF",
      fuchsia800: "#86198F",
      fuchsia900: "#701A75",

      pink50: "#FDF2F8",
      pink100: "#FCE7F3",
      pink200: "#FBCFE8",
      pink300: "#F9A8D4",
      pink400: "#F472B6",
      pink500: "#EC4899",
      pink600: "#DB2777",
      pink700: "#BE185D",
      pink800: "#9D174D",
      pink900: "#831843",

      rose50: "#FFF1F2",
      rose100: "#FFE4E6",
      rose200: "#FECDD3",
      rose300: "#FDA4AF",
      rose400: "#FB7185",
      rose500: "#F43F5E",
      rose600: "#E11D48",
      rose700: "#BE123C",
      rose800: "#9F1239",
      rose900: "#881337",
    };

    // foreground color lists
    const foreground = {
      Amber: colors.amber400,
      Blue: colors.blue500,
      Cyan: colors.cyan500,
      Emerald: colors.emerald500,
      Fuchsia: colors.fuchsia500,
      Green: colors.green500,
      Indigo: colors.indigo500,
      "Light Blue": colors.lightBlue400,
      Lime: colors.lime500,
      Orange: colors.orange400,
      Pink: colors.pink500,
      Purple: colors.purple500,
      Red: colors.red400,
      Rose: colors.rose500,
      Teal: colors.teal400,
      Violet: colors.violet500,
      Yellow: colors.yellow500,
    };

    // dom selector
    const body = document.body;
    const darkToogle = document.querySelector(".dark-toggle-container");
    const clockElement = document.querySelector(".clock");
    const dateElement = document.querySelector(".date");
    const greetingElement = document.querySelector(".greeting");
    const linksContainer = document.querySelector(".links-container");

    // icons
    const icons = {
      sun: await fileGetContents("./img/uil_sun.svg"),
      moon: await fileGetContents("./img/uil_moon.svg"),
    };

    // theme switcher
    const theme = {
      light: () => {
        const linkElements = document.querySelectorAll("div.links");
        const bgColor = colors.blueGray200;
        const patternColor = colors.blueGray300.split("").splice(1, 6).join("");

        const bg = `${bgColor} url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23${patternColor}' fill-opacity='0.4' fill-rule='evenodd'%3E%3Cpath d='M0 40L40 0H20L0 20M40 40V20L20 40'/%3E%3C/g%3E%3C/svg%3E")`;

        darkToogle.innerHTML = icons.moon;
        darkToogle.style.background = "white";
        body.style.background = bg;

        for (const each of linkElements) {
          each.style.background = "white";
        }
      },
      dark: () => {
        const linkElements = document.querySelectorAll("div.links");
        const bgColor = colors.gray900;
        const patternColor = colors.gray800.split("").splice(1, 6).join("");

        const bg = `${bgColor} url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23${patternColor}' fill-opacity='0.4' fill-rule='evenodd'%3E%3Cpath d='M0 40L40 0H20L0 20M40 40V20L20 40'/%3E%3C/g%3E%3C/svg%3E")`;

        darkToogle.innerHTML = icons.sun;
        darkToogle.style.background = colors.gray800;
        body.style.background = bg;

        for (const each of linkElements) {
          each.style.background = colors.gray800;
        }
      },
    };

    /**
     * formatted date
     */
    const date = () => {
      const dateObj = new Date();
      return dateObj.toLocaleString(navigator.language, {
        month: "long",
        day: "numeric",
        year: "numeric",
        weekday: "long",
      });
    };

    /**
     * formatted time
     */
    const time = () => {
      const dateObj = new Date();
      return dateObj.toLocaleString(navigator.language, {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      });
    };

    /**
     * greeting message
     */
    const greeting = () => {
      const dateObj = new Date();
      const currentHour = dateObj.getHours();

      if (currentHour >= 0 && currentHour < 11) {
        return "Good Morning";
      } else if (currentHour >= 11 && currentHour < 14) {
        return "Good Noon";
      } else if (currentHour >= 14 && currentHour < 18) {
        return "Good Afternoon";
      } else {
        return "Good Evening";
      }
    };

    /**
     * favorite lists
     */
    const getFavorites = () => {
      return new Promise(function (resolve) {
        chrome.bookmarks.getTree(function (bookmarks) {
          resolve(bookmarks[0].children[0].children);
        });
      });
    };

    /**
     * load favorites
     */
    const loadLinks = async () => {
      const favorites = await getFavorites();

      for (const link of favorites) {
        let title = link.title;
        let url = link.url;
        let color =
          foreground[
            Object.keys(foreground)[
              (Object.keys(foreground).length * Math.random()) << 0
            ]
          ];

        let element = `<div class="links"><a href="${url}" style="color: ${color}">${title}</a></div>`;
        linksContainer.insertAdjacentHTML("beforeend", element);
      }

      document.querySelector(".links.loading").remove();
    };

    /**
     * load current time
     */
    const loadTime = () => {
      clockElement.innerHTML = time();
      dateElement.innerHTML = date();
      greetingElement.innerHTML = greeting();
    };

    /**
     * load latest theme
     */
    const loadTheme = () => {
      const dateObj = new Date();
      const currentHour = dateObj.getHours();

      chrome.storage.local.get({ theme: "" }, function (storage) {
        if (storage.theme === "" || storage.theme === undefined) {
          if (currentHour >= 6 && currentHour < 18) {
            theme.light();
            chrome.storage.local.set({ theme: "light" });
          } else {
            theme.dark();
            chrome.storage.local.set({ theme: "dark" });
          }
        } else if (storage.theme === "dark") {
          theme.dark();
          chrome.storage.local.set({ theme: "dark" });
        } else {
          theme.light();
          chrome.storage.local.set({ theme: "light" });
        }
      });
    };

    // toogle dark mode
    darkToogle.addEventListener("click", () => {
      chrome.storage.local.get({ theme: "" }, function (storage) {
        if (storage.theme === "dark") {
          theme.light();
          chrome.storage.local.set({ theme: "light" });
        } else {
          theme.dark();
          chrome.storage.local.set({ theme: "dark" });
        }
      });
    });

    // call load function
    loadTime();
    loadLinks();
    loadTheme();

    // realtime clock
    setInterval(loadTime, 500);
  } catch (error) {
    debug(error);
  }
};

// disable text selection
document.addEventListener("dragstart", (event) => event.preventDefault());
document.addEventListener("selectstart", (event) => event.preventDefault());

// initiation
document.addEventListener("DOMContentLoaded", init);
