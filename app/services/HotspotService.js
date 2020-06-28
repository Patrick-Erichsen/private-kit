import Hotspot from 'react-native-wifi-hotspot';
import PushNotification from 'react-native-push-notification';

export const enableHotspot = async () => {
  await Hotspot.enable(
    () => {
      PushNotification.localNotification({
        title: 'Enabled Hotspot - now creating',
      });

      // createHotspot();
    },
    err => console.error(err),
  );
};

export const createHotspot = () => {
  const hotspot = {
    SSID: 'privatekit',
    password: 'helloworld',
  };

  Hotspot.create(
    hotspot,
    () => {
      PushNotification.localNotification({
        title: 'Created Hotspot!',
        message: `SSID: ${hotspot.SSID}`,
      });
    },
    err => console.error(err),
  );
};

export const disableHotspot = () => {
  Hotspot.disable(
    () => {
      PushNotification.localNotification({
        title: 'Disabled Hotspot!',
      });
    },
    err => console.error(err),
  );
};
