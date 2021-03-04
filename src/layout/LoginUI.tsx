import React from 'react';
import { formTypes } from '../containers/Login/useForm';
import { Form, Button, Grid, Header as SemanticHeader, Segment, Message } from 'semantic-ui-react';

const LoginUI = ({ form: { onChange, form, loginFormValid, error, onSubmit, loading } }: { form: formTypes }) => {
  return (
    <div>
      <Grid centered>
        <Grid.Column style={{ maxWidth: 550, marginTop: 20 }}>
          <SemanticHeader>Wildlife Hotspots</SemanticHeader>

          <Segment>
            <Form>
              {error && <Message content={'Error: ' + error} negative />}
              <Form.Field>
                <Form.Input value={form.username || ''} onChange={onChange} name='username' placeholder='Username' label='Username' />
              </Form.Field>

              <Form.Field>
                <Form.Input
                  value={form.password || ''}
                  onChange={onChange}
                  type='password'
                  name='password'
                  placeholder='Password'
                  label='Password'
                />
              </Form.Field>

              <Button onClick={onSubmit} disabled={loginFormValid || loading} fluid loading={loading} primary type='submit'>
                Submit
              </Button>
            </Form>
          </Segment>
        </Grid.Column>
      </Grid>
    </div>
  );
};

export default LoginUI;
