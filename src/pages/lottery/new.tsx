import { Button } from '@material-ui/core';
import React from 'react';
import SchemaForm from '@/components/SchemaForm';
import { createLottery } from '@/services/lottery';

const schema = {
  type: 'object',
  title: 'New Lottery',
  required: ['name'],
  properties: {
    name: { type: 'string', title: 'Name' },
    description: { type: 'string', title: 'Description' },
    hash: { type: 'boolean', title: 'Hash' },
    rounds: {
      title: 'Lottery Rounds',
      type: 'array',
      items: {
        type: 'object',
        required: ['quota'],
        properties: {
          quota: {
            title: 'The Quota Number of Current Round',
            type: 'integer',
          },
        },
      },
    },
  },
};

export default class New extends React.Component {
  render() {
    return (
      <div>
        <SchemaForm
          onSubmit={({ formData }) => {
            createLottery(formData);
          }}
          schema={schema}
        >
          <Button variant="contained" fullWidth={true} type="submit" color="primary">
            Submit
          </Button>
        </SchemaForm>
      </div>
    );
  }
}
