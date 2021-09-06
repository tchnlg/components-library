//import Upload from "./Upload.svelte";
import Upload from "./UploadView.svelte";
import { action } from "@storybook/addon-actions";

export default {
  title: "Uploader",
  component: Upload,
  argTypes: {
    accept: {
      control: {
        type: "array",
      },
    },
  },
  args: {
    title: "Upload files",
    description: "Only JPEG files are accepted",
    labelText: "Upload",
    disabled: false,
    error: false,
    errorText: "No allowed file type",
    accept: [".jpg", ".jpeg"],
    multiple: false,
    showUploads: true,
  },
};

export const Default = ({ ...args }) => ({
  Component: Upload,
  props: args,
  on: {
    change: action("onChange"),
    click: action("onClick"),
    add: action("onAdd"),
    delete: action("onDelete"),
  },
});

// status: {
//   control: {
//     type: "select",
//     options: ["complete", "uploading", "edit"]
//   }
// }
