import Link from 'next/link';
import {useSession,signOut} from "next-auth/client";
import classes from './main-navigation.module.css';
import {Spin} from "antd";

function MainNavigation() {
  const [session,loading]=useSession()
    function handlelogout(){
      signOut();
    }
  return (
    <header className={classes.header}>
        <title>Xtn's Media</title>
      <Link href='/'>
        <a>
          <div className={classes.logo}>Media Tn's</div>
        </a>
      </Link>
      <nav>
        <ul>


            {!session && (
                <li>
            <Link href='/auth'>Login</Link>
          </li>
            )}

          {session &&(
              <li>
            <Link href='/profile'>Profile</Link>
          </li>
          )}
            {session && (
                <li>
            <button onClick={handlelogout}>Logout</button>
          </li>
            )}

        </ul>

      </nav>
    </header>
  );
}

export default MainNavigation;
