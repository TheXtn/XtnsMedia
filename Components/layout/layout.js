import { Fragment } from 'react';
import 'semantic-ui-css/semantic.min.css'
import MainNavigation from './main-navigation';

function Layout(props) {
  return (
    <Fragment>
      <MainNavigation />
      <main>{props.children}</main>
    </Fragment>
  );
}

export default Layout;
