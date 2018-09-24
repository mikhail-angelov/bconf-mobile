import React from "react";
import { TextInput, Text, View } from "react-native";
import styled from "styled-components";
import _ from "lodash";
import { IValidationResult } from "../../helpers/validator";

interface IProps {
  value: string;
  rule: (value) => IValidationResult;
  placeholder: string;
  onChangeText: (value) => void;
}
interface IState {
  error: string;
  valid: boolean;
}

type RuleFunction = (text) => { result: boolean; errorText: string };

class ValidatedInput extends React.Component<IProps, IState> {
  private debouncedValidation: (text: string) => void = _.debounce(
    text => this.validateField(text, this.props.rule),
    2000
  );

  constructor(props) {
    super(props);
    this.state = {
      error: "",
      valid: true
    };
  }
  public render() {
    const { value, rule, onChangeText, ...otherProps } = this.props;

    return (
      <View>
        <CustomInput
          value={value}
          onChangeText={this.handleTextChange}
          valid={this.state.valid}
          {...otherProps}
        />
        {this.state.error.length > 1 && (
          <ErrorNotification>{this.state.error}</ErrorNotification>
        )}
      </View>
    );
  }

  private validateField = (value: string, rule: RuleFunction) => {
    const validationResult = rule(value);

    if (!validationResult.result) {
      this.setState({ error: validationResult.errorText, valid: false });
    } else {
      this.setState({ error: "", valid: true });
    }
  };

  private handleTextChange = text => {
    this.props.onChangeText(text);
    this.debouncedValidation(text);
  };
}

export default ValidatedInput;

const CustomInput = styled(TextInput)`
  font-size: 24px;
  border: 1px solid;
  border-color: ${props => (props.valid ? "#bbb" : "red")};
  border-radius: 5px;
  margin: 13px 0;
  width: 200px;
  height: 35px;
  text-align: center;
`;

const ErrorNotification = styled(Text)`
  font-size: 12px;
  color: red;
  text-align: center;
  width: 200px;
`;
