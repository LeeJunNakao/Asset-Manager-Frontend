import { useState, useEffect } from 'react';
import './Input.scss';
import { InputConfig } from 'components/form/FormBuilder/protocols';

interface InputProp {
  label: string;
  type?: string;
  setContent: (value: string) => void;
  config?: InputConfig;
  error?: boolean;
  errorMessage?: string;
  data?: string;
}

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
