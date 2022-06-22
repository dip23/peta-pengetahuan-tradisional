import React, { useContext, useEffect, useState } from 'react'
import style from './styles.module.css';
import { useNavigate } from 'react-router';
import budayaAPI from '../../api/budayaAPI';
import { routes } from '../../configs/routes';
import { UserContext } from '../../context/UserContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import Table from '../../components/fragments/Table';
import ModalDelete from '../../components/fragments/ModalDelete/ModalDelete';
import Pagination from '../../components/elements/Pagination';
import EditBudaya from '../../components/fragments/EditBudaya';
import { useSearchParams } from 'react-router-dom';

export default function Admin() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const edit = searchParams.get('editBudaya');
  const { user } = useContext(UserContext);
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
  const [editData, setEditData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await budayaAPI.getBudayaPage(10, currentPage);
      if(res.data.sucess){
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
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    setPageData({
      isLoading: true,
      rowData: []
    })
    fetchData();
  }, [currentPage]);

  const handleClick = (data) => {
    setEditData(data);
    navigate(routes.EDIT_BUDAYA(data.id))
  };

  const handleDelete = (id) => {
    setDeletedData(id);
    setOpenDelete(true);
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
      Header: 'Provinsi',
      accessor: 'Provinsi.nama_provinsi'
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
      accessor: editColumn
    },
    {
      Header: 'Delete',
      accessor: ({ id }) => deleteColumn(id)
    },
  ];

  if(edit){
    return <EditBudaya data={editData}/>
  }

  return (
    <section className={style.root}>
      <div className={style.header}>
        <div><FontAwesomeIcon icon={faUser} /> Hi, {user?.nama}!</div>
      </div>
      <div className={style.content}>
        <div>
          <p>Manajemen Kebudayaan Pengetahuan Tradisional</p>
        </div>
        <Table columnTable={COLUMNS} dataTable={pageData.rowData} isLoading={true} />
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
