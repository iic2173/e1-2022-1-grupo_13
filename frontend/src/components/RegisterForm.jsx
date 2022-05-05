import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import config from '../config';

const RegisterForm = function RegisterForm() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    nickname: Yup.string()
      .min(2, 'Tu nombre debe ser de 2 caracteres o más')
      .max(15, 'Tu nombre debe ser de 15 caracteres o menos')
      .required('Tu nombre es requerido'),
    email: Yup.string()
      .email('Dirección de correo invalida')
      .required('Tu dirección de correo es requerida.'),
    phone_num: Yup.string('Numero de telefono invalido')
        .required('Tu numero de telefono es requerido.'),
    telegram_user: Yup.string('Usuario de telegram invalido')
        .required('Tu usuario de telegram es requerido.'),
    password: Yup.string()
      .min(6, 'Tu constraseña debe ser de 6 caracteres o más')
      .max(15, 'Tu constraseña debe ser de 15 caracteres o menos')
      .required('Contraseña es requerida'),
    passwordConfirm: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Las contraseñas deben coincidir')
      .required('Confirmación de contraseña es requerida'),
  });

  return (
    <div id="form">
      <Formik
        initialValues={{
          name: '',
          email: '',
          password: '',
          passwordConfirm: '',
        }}
        validationSchema={validationSchema}
        onSubmit={async (values) => {
          setLoading(true);
          const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(values),
          };
          try {
            const response = await fetch(`${config.API_URL}/api/users`, requestOptions);
            if (!response.ok) {
              const error = await response.text();
              throw new Error(error);
            }
            setMessage('Usuario creado con éxito');
            navigate('../login');
          } catch (error) {
            setMessage(error.message);
          } finally {
            setLoading(false);
          }
        }}
      >
        {({ errors, touched }) => (
          <div className="register-box">
            <Form>
              <div className="form-label">
                <label htmlFor="nickname">Nickname</label>
                <Field name="nickname" type="text" placeholder="Nickname" />
                {errors.nickname && touched.nickname && (
                <div className="errors">{errors.nickname}</div>
                )}
              </div>


              <div className="form-label">
                <label htmlFor="email">Email</label>
                <Field name="email" type="email" placeholder="Dirección de correo" />
                {errors.email && touched.email && (
                <div className="errors">{errors.email}</div>
                )}
              </div>

              <div className="form-label">
                <label htmlFor="phone_num">Numero de telefono</label>
                <Field name="phone_num" type="text" placeholder="Numero de telefono" />
                {errors.phone_num && touched.phone_num && (
                <div className="errors">{errors.phone_num}</div>
                )}
              </div>

              <div className="form-label">
                <label htmlFor="">Usuario de telegram</label>
                <Field name="telegram_user" type="text" placeholder="Usuario de telegram" />
                {errors.telegram_user && touched.telegram_user && (
                <div className="errors">{errors.telegram_user}</div>
                )}
              </div>

              <div className="form-label">
                <label htmlFor="password">Constraseña</label>
                <Field name="password" type="password" placeholder="Password" />
                {errors.password && touched.password && (
                <div className="errors">{errors.password}</div>
                )}
              </div>

              <div className="form-label">
                <label htmlFor="passwordConfirm">Confirmar Contraseña</label>
                <Field name="passwordConfirm" type="password" placeholder="Confirmar Contraseña" />
                {errors.passwordConfirm && touched.passwordConfirm && (
                <div className="errors">{errors.passwordConfirm}</div>
                )}
              </div>

              {!loading ? (
                <div className="form-label">
                  <button className="boton" type="submit">Registrarse</button>
                </div>
              ) : (
                <div>
                  <p>Cargando...</p>
                </div>
              )}
            </Form>

          </div>

        )}
      </Formik>
      <p>{message}</p>
    </div>

  );
};

export default RegisterForm;