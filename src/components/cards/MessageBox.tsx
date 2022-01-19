import react from 'react';
import './MessageBox.scss';

interface Props {
  message: string;
}

function MessageBox(props: Props) {
  return <div className="message-box">{props.message}</div>;
}

export default MessageBox;
