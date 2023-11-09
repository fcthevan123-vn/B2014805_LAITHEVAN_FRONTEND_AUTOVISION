// import App from "../App.vue";

import ToastService from "primevue/toastservice";
import Dialog from "primevue/dialog";
import Button from "primevue/button";
import ConfirmationService from "primevue/confirmationservice";
import DialogService from "primevue/dialogservice";

export function ImportComponent(app) {
  app.component("Button", Button);
  app.use(ToastService);
  app.use(DialogService);
  app.component("Dialog", Dialog);
  app.use(ConfirmationService);
}

interface CustomError {
  response?: {
    data?: {
      message?: string;
    };
  };
}

export const ConvertErrorMessage = (error: Error) => {
  const { response } = error as CustomError;
  const errorMessage =
    response?.data?.message || "Đã xảy ra lỗi không xác định";

  return errorMessage;
};
