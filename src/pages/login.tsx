import { Button } from '@material-ui/core';
import { Mnemonic } from '@/utils/constants';
import React from 'react';
import SchemaForm from '@/components/SchemaForm';
import cosmosState from '@/store/comos';
import { router } from 'umi';

const schema = {
  title: 'Mnemonic',
  type: 'string',
};

export default class Login extends React.Component {
  submit = ({ formData }) => {
    cosmosState.setMnemonic(formData);
    router.push('/lottery');
  };

  render() {
    return (
      <div style={{ textAlign: 'center', padding: 300 }}>
        <div style={{ width: 700 }}>
          <SchemaForm onSubmit={this.submit} schema={schema} formData={Mnemonic}>
            <Button style={{ marginTop: 20 }} variant="contained" type="submit" color="primary">
              Login
            </Button>
          </SchemaForm>
        </div>
      </div>
    );
  }
}
