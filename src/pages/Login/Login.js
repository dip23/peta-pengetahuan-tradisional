import React, { useState } from 'react';
import styles from './styles.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import Text from '../../components/fields/Text';
import Button from '../../components/elements/Button';
import { useNavigate } from 'react-router';
import { routes } from '../../configs/routes';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Alert from '../../components/elements/Alert';
import adminAPI from '../../api/admin';
import { loginSchema } from './validation';

export default function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(loginSchema)
  });
  const [alert, setAlert] = useState(false);
  const [message, setMessage] = useState('');

  const navigate = useNavigate();
  const inputProps = [
    { type: "text", placeholder: "test@mail.com" },
    { type: "password" }
  ];

  const submitForm = async (data) => {
    try {
      const res = await adminAPI.login(data);
      console.log(res.data.data);
      setAlert(false);
      navigate(routes.ADMIN());
    } catch (error) {
      setMessage(error.response.data.message)
      setAlert(true)
    }
  };

  return (
    <div className={styles.root}>
      <div onClick={() => navigate(routes.LANDING_PAGE())}>
        <span><FontAwesomeIcon icon={faArrowLeft} /></span>
        <p>Kembali ke Peta</p>
      </div>
      <div className={styles.boxLogin}>
        <div className={styles.header}>
          <FontAwesomeIcon icon={faUser} />
          <p>Admin Sign In</p>
        </div>
        {alert && (
          <Alert className={styles.alert} message={message} />
        )}
        <form onSubmit={handleSubmit(submitForm)}>
          <Text
            className={styles.text}
            error={errors?.email?.message}
            label="Email"
            name="email"
            inputProps={inputProps[0]}
            register={register}
          />
          <Text
            className={styles.text}
            error={errors?.password?.message}
            label="Password"
            name="password"
            inputProps={inputProps[1]}
            register={register}
          />
          <Button className={styles.submitButton} type="submit">Sign In</Button>
        </form>
      </div>
    </div>
  )
}
