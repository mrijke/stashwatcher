import * as React from "react";
import { StyleSheet } from "react-native";
import { Form, Button, Input, Item as FormItem, Picker, Label, Text } from "native-base";
import { withFormik, InjectedFormikProps } from "formik";

import { IAddAddressPayload, actions } from "../../common/redux/coins";
import { connect } from "react-redux";
import { IRootState } from "../../common/redux/index";

const styles = StyleSheet.create({
  submitButton: {
    marginTop: 25
  },
  errorText: {
    color: "red"
  }
});

const enhancer = withFormik<IAddressFormOwnProps & IAddAddressFormStateProps & IAddAddressFormDispatchProps, IAddAddressPayload>({
  mapPropsToValues: (props) => ({
    type: "btc",
    address: ""
  }),
  handleSubmit: (values, { setFieldError, resetForm, props }) => {
    resetForm();
    if (!values.address) {
      setFieldError("address", "This field is required");
      return;
    }
    props.addAddress(values);
    props.navigation.goBack();
  }
});

interface IAddressFormOwnProps {
  navigation: any;
}

interface IAddAddressFormStateProps {
  scannedAddress: string;
}

interface IAddAddressFormDispatchProps {
  addAddress: (values: IAddAddressPayload) => void;
  resetAddressScanned: () => void;
}

type AddAddressFormProps = IAddressFormOwnProps & IAddAddressFormStateProps & IAddAddressFormDispatchProps & InjectedFormikProps<{}, IAddAddressPayload>;

class AddAddressInnerForm extends React.Component<AddAddressFormProps> {

  public componentWillReceiveProps(nextProps: AddAddressFormProps) {
    console.log(this.props.scannedAddress, nextProps.scannedAddress);
    if (nextProps.scannedAddress && nextProps.scannedAddress !== this.props.scannedAddress) {
      this.props.setFieldValue("address", nextProps.scannedAddress);
    }
  }

  public componentWillUnmount() {
    this.props.resetAddressScanned();
  }

  public render() {
    console.log(this.props.errors);
    return (
      <Form>
        <Picker
          mode="dropdown"
          placeholder="Select coin"
          onValueChange={value => this.props.setFieldValue("type", value)}
          selectedValue={this.props.values.type}
        >
          <Picker.Item label="Bitcoin" value="btc" />
          <Picker.Item label="Litecoin" value="ltc" />
          <Picker.Item label="Dogecoin" value="doge" />
        </Picker>
        <FormItem stackedLabel>
          <Label>Address</Label>
          <Input onChangeText={text => this.props.setFieldValue("address", text)} value={this.props.values.address} />
          {this.props.errors.address && (<Text style={styles.errorText}>{this.props.errors.address}</Text>)}
        </FormItem>
        <FormItem stackedLabel>
          <Label>Description</Label>
          <Input onChangeText={text => this.props.setFieldValue("description", text)} />
        </FormItem>
        <Button style={styles.submitButton} primary block success onPress={this.props.submitForm}><Text>Add</Text></Button>
      </Form>
    );
  }
}

const mapStateToProps = (state: IRootState) => ({
  scannedAddress: state.coins.scannedAddress
});

const mapDispatchToProps: IAddAddressFormDispatchProps = {
  addAddress: actions.addAddress,
  resetAddressScanned: actions.resetAddressScanned
};

export const AddAddressForm = connect(mapStateToProps, mapDispatchToProps)(enhancer(AddAddressInnerForm));