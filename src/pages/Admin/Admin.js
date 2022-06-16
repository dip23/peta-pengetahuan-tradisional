import React, { useContext, useEffect, useState } from 'react'
import style from './styles.module.css';
import { useNavigate } from 'react-router';
import adminAPI from '../../api/admin'
import budayaAPI from '../../api/budayaAPI';
import { routes } from '../../configs/routes';
import { UserContext } from '../../context/UserContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEdit, faTrash, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import Table from '../../components/fragments/Table';
import Button from '../../components/elements/Button';
import ModalDelete from '../../components/fragments/ModalDelete/ModalDelete';
import Pagination from '../../components/elements/Pagination';

export default function Admin() {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);
  const [openDelete, setOpenDelete] = useState(false);
  const [deletedData, setDeletedData] = useState(null);
  const [pageData, setPageData] = useState({
    isLoading: false,
    rowData: []
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [navigation, setNavigation] = useState({
    hasNext: false,
    hasPrev: false,
    totalPages: 0,
    totalRows: 0
  });

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

  const fetchData = async () => {
    const res = await budayaAPI.getBudayaPage(10, currentPage);
    setPageData({
      isLoading: false,
      rowData: res.data.data,
      size: res.data.cursor.size
    });
    setNavigation({
      hasNext: res.data.cursor.hasNext,
      hasPrev: res.data.cursor.hasPrev,
      totalPages: res.data.cursor.totalPages,
      totalRows: res.data.cursor.totalRows
    })
  };

  useEffect(() => {
    setPageData({
      isLoading: true,
      rowData: []
    })
    fetchData();
  }, [currentPage]);

  const handleClick = (id) => {
    console.log(id);
  };

  const handleDelete = (id) => {
    setDeletedData(id);
    setOpenDelete(true);
    console.log(id);
  };

  const editColumn = (e) => {
    return (
      <div className={style.clickable} onClick={() => handleClick(e)}>
        <FontAwesomeIcon icon={faEdit} />
      </div>
    );
  };

  const deleteColumn = (e) => {
    return (
      <div className={style.clickable} onClick={() => handleDelete(e)}>
        <FontAwesomeIcon icon={faTrash} />
      </div>
    )
  };

  const deleteFunction = async () => {
    try {
      const res = await budayaAPI.deleteBudaya(deletedData);
      if (res.data.success) {
        setOpenDelete(false);
        fetchData();
      }
    } catch (error) {
      console.log(error.response)
    }
  }

  const COLUMNS = [
    {
      Header: 'No.',
      accessor: 'id'
    },
    {
      Header: 'Nama Budaya',
      accessor: 'nama_budaya'
    },
    {
      Header: 'Tahun',
      accessor: 'tahun'
    },
    {
      Header: 'No. Registrasi',
      accessor: 'registNum'
    },
    {
      Header: 'Edit',
      accessor: ({ id }) => editColumn(id)
    },
    {
      Header: 'Delete',
      accessor: ({ id }) => deleteColumn(id)
    },
  ];

  return (
    <section className={style.root}>
      <div className={style.header}>
        <div><FontAwesomeIcon icon={faUser} /> Hi, {user?.nama}!</div>
        <div onClick={handleLogout}><FontAwesomeIcon icon={faRightFromBracket} /></div>
      </div>
      <div className={style.content}>
        <div>
          <p>Manajemen Kebudayaan Pengetahuan Tradisional</p>
          <Button className={style.buttonAdd} type="button" onClick={() => navigate(routes.ADD_BUDAYA())}>
            Tambah Budaya
          </Button>
        </div>
        <Table columnTable={COLUMNS} dataTable={pageData.rowData} />
        <Pagination
          currentPage={currentPage}
          hasNext={navigation.hasNext}
          hasPrev={navigation.hasPrev}
          setCurrentPage={setCurrentPage}
          totalPages={navigation.totalPages}
          show={true}
        />
        <ModalDelete
          show={openDelete}
          onClose={() => setOpenDelete(false)}
          deleteClick={deleteFunction}
        />
      </div>
    </section>
  )
}
