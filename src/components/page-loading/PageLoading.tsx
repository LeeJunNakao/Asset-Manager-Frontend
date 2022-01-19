import { ReactComponent as LoadingIcon } from 'assets/images/icons/loading-page.svg';
import './style.scss';

function PageLoading() {
  return (
    <div className="loading">
      <LoadingIcon />
      <span className="loading-message">LOADING</span>
    </div>
  );
}

export default PageLoading;
