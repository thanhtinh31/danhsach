import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import { Table } from 'antd';
import axios from 'axios'

function App() {
  const [list,setList]=useState();
  const columns = [
    {
      title: 'Mã số',
      dataIndex: 'maTranh',
      key: 'stt',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Họ Tên Tác Giả',
      dataIndex: 'hoTenTacGia',
      key: 'tacgia',
    },
    {
      title: 'Người Giám Hộ',
      dataIndex: 'nguoiGiamHo',
      key: 'nguoigiamho',
    },
    {
      title: 'Đơn vị',
      dataIndex: 'donVi',
      key: 'donvi',
    },
    {
      title: 'Thời điểm',
      render: ( record) => {
        const a=new Date(record.ngayTao)
        console.log(a)
        return (
          <>
          {record.ngayTao?<>{a.getHours()}h{a.getMinutes()}p--{a.getDate()}/{a.getMonth()+1}/{a.getFullYear()}</>:"--"}
          </>
        )},
      key: 'time',
    },
    {
      title: 'Hình Ảnh',
      render: ( record) => (
        <><img src={record.hinhAnh}  height={"200px"}></img></>
      ),
      key: 'image',
    },
    {
      title: 'Giá cao nhất',
      render: ( record) => (
        <>{new Intl.NumberFormat("vi-VN", {
          style: "currency",
          currency: "VND",
        }).format(record.soTien)}</>
      ),
      key: 'giacaonhat',
    },
   
  ];
  const data = [
    {
      maso: 1,
      tacgia: 'Nguyễn Mai Thúy Dung',
      nguoigiamho: 'Nguyễn thái cường',
      donvi: 'Don vi',
      time: '',
      image: 'https://tranhtreotuonghanoi.com/wp-content/uploads/2020/03/top-tranh-ve-phong-canh-cua-hoc-sinh-dep-nhat.jpg',
      giacaonhat: 10000,
    },
    {
      maso: 1,
      tacgia: 'Nguyễn Mai Thúy Dung',
      nguoigiamho: 'Nguyễn thái cường',
      donvi: 'Don vi',
      time: '',
      image: 'https://tranhtreotuonghanoi.com/wp-content/uploads/2020/03/top-tranh-ve-phong-canh-cua-hoc-sinh-dep-nhat.jpg',
      giacaonhat: 10000,
    },
    {
      maso: 1,
      tacgia: 'Nguyễn Mai Thúy Dung',
      nguoigiamho: 'Nguyễn thái cường',
      donvi: 'Don vi',
      time: '',
      image: 'https://tranhtreotuonghanoi.com/wp-content/uploads/2020/03/top-tranh-ve-phong-canh-cua-hoc-sinh-dep-nhat.jpg',
      giacaonhat: 10000,
    },
  ]
  const getData=async()=>{
      const req= await axios.post('https://thianh.cpc.vn/api/v1/dynamic',{
        "dataQuery": "spDauGiaTranh",
        "parameters": {
        "Param": 1
            }
        },
        {
          headers: {
            'content-type': 'text/json',
            'Authorization': '12C1F7EF9AC8E288FBC2177B7F54D 12C1F7EF9AC8E288FBC2177B7F54D'
          }
        })
        setList(req?.data.results)
        console.log(req?.data);
  }
  useEffect(() => {
    getData();
    
  }, []);
  return (
    <div className="App">
    <Table columns={columns} dataSource={list} />
    </div>
  );
}

export default App;
