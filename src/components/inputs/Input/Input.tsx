import { useState, useEffect } from 'react';
import './Input.scss';
import { InputProp } from 'components/form/FormBuilder/protocols';

function Input(props: InputProp) {
  const [content, setContent] = useState('');

  useEffect(() => {
    if (props.data) {
      setContent(props.data);
      props.setContent(props.data);
    }
  }, []);

  const onChange = (e: any) => {
    const value = e.target.value;
    props.setContent(value);
    setContent(value);
  };

  return (
    <div className="input-component-wrapper">
      <span> {props.label} </span>
      <input
        className="input-component"
        type={props.type || props.config?.type}
        onChange={onChange}
        value={content}
      />
      <span className="message-error">{props.errorMessage}</span>
    </div>
  );
}

export default Input;
