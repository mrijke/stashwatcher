import * as React from "react";
import { Form, Input, Item as FormItem, Picker, Label, Button, Text } from "native-base";
import { withFormik, InjectedFormikProps } from 'formik';

import { IAddAddressPayload } from "../../common/redux/coins";

const enhancer = withFormik<{}, IAddAddressPayload>({
  handleSubmit: values => console.log(values)
})

type AddAddressFormProps = {} & InjectedFormikProps<{}, IAddAddressPayload>;

class AddAddressInnerForm extends React.Component<AddAddressFormProps> {
  public render() {
    return (
      <Form>
        <FormItem stackedLabel><Label>Username</Label></FormItem>
        <Picker
          mode="dropdown"
          placeholder="Select coin"
        >
          <Picker.Item label="Bitcoin" value="btc" />
          <Picker.Item label="Litecoin" value="ltc" />
        </Picker>
        <FormItem floatingLabel>
          <Label>Address</Label>
          <Input />
        </FormItem>
        <FormItem floatingLabel last>
          <Label>Description</Label>
          <Input />
        </FormItem>
        <Button success><Text>Submit</Text></Button>
      </Form>
    );
  }
}

export const AddAddressForm = enhancer(AddAddressInnerForm);