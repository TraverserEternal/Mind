declare module "react-native-simple-markdown" {
  import { Component } from "react";
  type Props = {
    styles?: StyleSheet;
    children?: string;
    rules?: Object;
    whitelist?: Array<string>;
    blacklist?: Array<string>;
  };
  class Markdown extends Component<Props> {
    new();
  }
  export default Markdown;
}
