import * as React from "react";
import { StyleSheet } from "react-native";
import { View } from "native-base";
import { connect } from "react-redux";
import { InjectedProps } from "react-navigation";
import Camera from "react-native-camera";

import { actions } from "../common/redux/coins";
import { styles } from "../common/styles";

interface IQRDispatchProps {
  addressScanned: (address: string) => void;
}

class QRCodeCameraScreenComponent extends React.Component<
  {} & IQRDispatchProps & InjectedProps
> {
  static navigationOptions = {
    // tslint:disable-next-line:no-null-keyword
    header: null,
  };

  private onBarCodeRead = (e: any) => {
    this.props.addressScanned(e.data);
    this.props.navigation.goBack();
  };

  public render() {
    return (
      <View style={styles.container}>
        <Camera
          onBarCodeRead={this.onBarCodeRead}
          barCodeTypes={["qr"]}
          style={styles.cameraPreview}
          aspect={Camera.constants.Aspect.fill}
        />
      </View>
    );
  }
}

const mapDispatchToProps: IQRDispatchProps = {
  addressScanned: actions.addressScanned,
};

export const QRCodeCameraScreen = connect(undefined, mapDispatchToProps)(
  QRCodeCameraScreenComponent
);
