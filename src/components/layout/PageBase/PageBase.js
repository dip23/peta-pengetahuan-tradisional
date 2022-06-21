import React, { useContext } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router';
import style from './styles.module.css';
import logo from '../../../assets/logo-kemendikbud.png';
import { routes } from '../../../configs/routes';
import { faHome, faListCheck, faSignOut, faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import adminAPI from '../../../api/admin';
import { UserContext } from '../../../context/UserContext';

export default function PageBase() {
  const { setUser } = useContext(UserContext);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const navData = [
    // {name: 'Dashboard', to: routes.ADMIN(), icon: faHome},
    {name: 'Manajemen Budaya', to: routes.ADMIN(), icon: faListCheck, active: true},
    {name: 'Tambah Budaya', to: routes.ADD_BUDAYA(), icon: faCirclePlus}
  ];

  const handleLogout = async () => {
    try {
      const res = await adminAPI.logout();
      if (res.data.success) {
        setUser(null);
        navigate(routes.LOGIN());
      }
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <>
      <aside className={style.aside}>
        <section>
          <div className={style.header}>
            <div>
              <img alt="logo-kemendikbud" src={logo}/>
            </div>
            <div>
              <p>WARISAN BUDAYA TAKBENDA</p>
              <p>PENGETAHUAN TRADISIONAL INDONESIA</p>
            </div>
          </div>
          <nav className={style.navItem}>
            {navData.map((i,idx)=>(
              <NavItem data={i} key={idx} pathname={pathname}/>
            ))}
          </nav>
          <div className={style.signOut} onClick={handleLogout}>
            <FontAwesomeIcon icon={faSignOut}/>
            <p>Sign Out</p>
          </div>
        </section>
      </aside>
      <main className={style.content}><Outlet/></main>
    </>
  )
}

function NavItem(props){
  const {
    data,
    pathname
  } = props;

  let isActive = data.to === pathname;

  return (
    <Link to={data.to} >
      <div className={isActive && style.isActive}>
        <FontAwesomeIcon icon={data.icon}/>
        <p>{data.name}</p>
      </div>
    </Link>
  )
}