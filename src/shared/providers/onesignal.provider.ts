import OneSignal from "react-onesignal";
import { AllAppConfig } from "../../core/config/all-config";
import {decodeToString} from "../utils/utils-functions";

export function oneSignalProviders() {
  return new Promise((resolve, reject) => {
    try {
      // Init OneSignal Platform
      OneSignal.init({
        appId: decodeToString(AllAppConfig.APP_ID_ONESIGNAL),
      }).then(() => {
        // console.log("OneSignal init succefully");

        OneSignal.isPushNotificationsEnabled((result: boolean) => {
          if (result) {
            OneSignal.getUserId((userId: string | null | undefined) => {

              OneSignal.on('notificationDisplay', () => {
                console.log("notificationDisplay");
              });

              OneSignal.on('notificationDismiss', () => {
                console.log("notificationDismiss");
              });

              OneSignal.on('notificationPermissionChange', () => {
                console.log("notificationPermissionChange");
              });
              resolve(userId);
            });
          } else {
            // alert('Please check your setting browser and accept notif');
            reject(result);
          }
        });
      });
    } catch (e) {
      console.error("Exception ", e);
      reject(e);
    }
  });
}
