import { NavigationScreenProp, NavigationAction } from "react-navigation";

declare module "react-navigation" {
  type InjectedProps = {
    navigation: NavigationScreenProp<any, NavigationAction>;
  }
  export function withNavigation<P>(component: React.SFC<P & InjectedProps> | React.ComponentClass<P & InjectedProps> | React.ClassType<P & InjectedProps, any, any>): React.ComponentClass<P>;
}
