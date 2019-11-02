import { Button } from '@material-ui/core';
import React from 'react';
import SchemaForm from '@/components/SchemaForm';

const schema = {
  type: 'object',
  title: 'New Lottery',
  required: ['name'],
  properties: {
    name: { type: 'string' },
    description: { type: 'string' },
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
            console.log('submit', formData);
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
