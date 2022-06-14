import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router';
import adminAPI from '../../api/admin'
import budayaAPI from '../../api/budayaAPI';
import { routes } from '../../configs/routes';

export default function Admin() {
  const navigate = useNavigate();
  const [dataBudaya, setDataBudaya] = useState([]);

  const handleLogout = async () => {
    try {
      const res = await adminAPI.logout();
      if (res.data.success) {
        navigate(routes.LOGIN());
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchData = async () => {
    const res = await budayaAPI.getAllBudaya();
    setDataBudaya(res.data.data);
  };

  useEffect(() => {
    fetchData();
  }, [])

  return (
    <div onClick={handleLogout}>
      Logout
    </div>
  )
}
