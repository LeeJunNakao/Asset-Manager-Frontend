import { v4 as uuidv4 } from 'uuid';
import './PageContent.scss';

type MenuItem = {
  icon: (props: any) => JSX.Element;
  text: string;
  onClick?: (args: any) => any;
};

interface PropsType {
  children: any;
  menu?: MenuItem[];
  text: string;
}

function PageContent(props: PropsType) {
  const menu = props.menu?.map((menuItem: any) => (
    <div className="item" onClick={menuItem.onClick} key={uuidv4()}>
      <menuItem.icon />
      <span>{menuItem.text}</span>
    </div>
  ));

  return (
    <div className="page-content">
      <div className="logo">
        <span>{props.text}</span>
      </div>
      <div className="menu">{menu}</div>
      <main>{props.children}</main>
    </div>
  );
}

export default PageContent;
