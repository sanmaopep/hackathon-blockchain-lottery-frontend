import { Button, Tooltip } from '@material-ui/core';

import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import React from 'react';
import SchemaForm from '@/components/SchemaForm';
import { createLottery } from '@/services/lottery';

const schema = {
  type: 'object',
  title: 'New Lottery',
  required: ['title', 'description'],
  properties: {
    title: { type: 'string', title: 'Title' },
    description: { type: 'string', title: 'Description' },
    hashed: {
      type: 'boolean',
      title: 'Anonymous',
      description: "If clicked all candidate's information will be hidden",
      default: false,
    },
    rounds: {
      title: 'Lottery Rounds',
      type: 'array',
      minItems: 1,
      items: {
        title: 'The Quota of Current Round',
        type: 'integer',
        default: 1,
      },
    },
  },
};

const uiSchema = {
  hashed: {
    'ui:widget': 'checkbox',
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
          uiSchema={uiSchema}
        >
          <Button variant="contained" fullWidth={true} type="submit" color="primary">
            Submit
          </Button>
        </SchemaForm>
      </div>
    );
  }
}
