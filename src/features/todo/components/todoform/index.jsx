import React from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import InputField from '../../../../components/form/inputFeild';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

DotoForm.propTypes = {
  onSubmit: PropTypes.func,
};

function DotoForm(props) {
  const schema = yup.object().shape({
    title: yup.string().required('plaese enter title'),
  });
  const form = useForm({
    defaultValues: {
      title: '',
    },
    resolver: yupResolver(schema),
  });

  const myHandleSubmit = (value) => {
    const { onSubmit } = props;
    if (onSubmit) {
      onSubmit(value);
    }

    form.reset();
  };

  return (
    <form onSubmit={form.handleSubmit(myHandleSubmit)}>
      <div>
        <InputField name="title" label="Doto" form={form} />
      </div>
    </form>
  );
}

export default DotoForm;
