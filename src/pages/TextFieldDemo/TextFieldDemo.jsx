import React from 'react';
import { TextField, Slider } from '../../components';

function TextFieldDemo(props) {
  return (
    <>
      <Slider
        banner={
          [
            'load-balancer.png',
            'full-stack-web-development.jpg',
            'js.jpg',
            'dns-server.png',
            'cloud.jpg',
          ]
        }
        height={150}
        duration={1000}
        random={false}
      />
      <br />
      <TextField disabled value="Disabled Input" onChange={() => {}} />
      <br />
      <TextField textVal value="Accessible" onChange={() => {}} />
      <br />
      <TextField textVal value="" error="101" onChange={() => {}} />
      <br />
    </>
  );
}

export default TextFieldDemo;
