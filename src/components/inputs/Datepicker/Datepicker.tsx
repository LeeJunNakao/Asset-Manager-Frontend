import { useEffect, useState } from 'react';
import ReactDatepicker from 'react-datepicker';
import { InputProp } from 'components/form/FormBuilder/protocols';
import 'react-datepicker/dist/react-datepicker.css';
import './style.scss';

function Datepicker(props: InputProp) {
  const [content, setContent] = useState<Date | null>(null);

  useEffect(() => {
    props.setContent(content?.toISOString() || '');
    if (props.data) {
      setContent(new Date(props.data));
    }
  }, []);

  useEffect(() => {
    props.setContent(content?.toISOString() || '');
  }, [content]);

  const onChange = (value: any) => {
    setContent(value);
  };

  return (
    <div className="input-component-wrapper">
      <span> {props.label} </span>
      <ReactDatepicker
        selected={content}
        onChange={onChange}
        showYearDropdown
      />
      <span className="message-error">{props.errorMessage}</span>
    </div>
  );
}

export default Datepicker;
