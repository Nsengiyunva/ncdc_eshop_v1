import { useEffect, useState } from "react";
import { UAParser } from "ua-parser-js";

export function useDeviceInfo() {
  const [deviceInfo, setDeviceInfo] = useState({
    deviceType: "desktop",
    os: "unknown",
    browser: "unknown",
    screen: {
      width: window.innerWidth,
      height: window.innerHeight,
      pixelRatio: window.devicePixelRatio,
    },
  });

  useEffect(() => {
    const parser = new UAParser();
    const result = parser.getResult();

    const width = window.innerWidth;

    let deviceType = "desktop";
    if (width < 768) {
      deviceType = "mobile";
    } else if (width < 1024) {
      deviceType = "tablet";
    }

    setDeviceInfo({
      deviceType,
      os: result.os.name || "unknown",
      browser: result.browser.name || "unknown",
      screen: {
        width,
        height: window.innerHeight,
        pixelRatio: window.devicePixelRatio,
      },
    });
  }, []);

  return deviceInfo;
}
