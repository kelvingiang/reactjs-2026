import React from 'react';
import PropTypes from 'prop-types';
import InputField from '../../../../components/form/inputFeild';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

RegisterForm.propTypes = {
  onSubmit: PropTypes.func,
};

function RegisterForm(props) {
  const schema = yup.object().shape({
    title: yup.string().required(' hay nhap thong tin vao day').min(3, 'khong dc nho hon 3 ky tu'),
  });

  const form = useForm({
    defaultValues: {
      fullname: '',
      email: '',
      password: '',
      retypepassword: '',
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
    <div>
      <form onSubmit={form.handleSubmit(myHandleSubmit)}>
        <div>
          <InputField form={form} name="fullname" label="Full Name" />
        </div>
        <div>
          <InputField form={form} name="email" label="E-mail" />
        </div>
        <div>
          <InputField form={form} name="password" label="Password" />
        </div>
        <div>
          <InputField form={form} name="retypepassword" label="Retype Password" />
        </div>
      </form>
    </div>
  );
}

export default RegisterForm;
