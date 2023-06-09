import logo from './logo.svg';
import './App.css';
import { useEffect, useRef, useState } from 'react';
import { Button, Col, Image, Input, Row, Space, Table, message } from 'antd';
import axios from 'axios'
import { SearchOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
import logoevn from './assets/evn-cpc.jpg'
function App() {
  const [list,setList]=useState();
  const [loading,setLoading]=useState(true);
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText('');
  };
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: 'block',
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? '#1677ff' : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter 
        style={{fontWeight:600}}
          highlightStyle={{
            backgroundColor: '#ffc069',
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        <div style={{fontWeight:600}}>
        {text}
        </div>
      ),
  });
  const columns = [
    {
      title: 'Mã số',
      render: ( record) => (
        <>{record.stt?record.stt<10?"0"+record.stt:record.stt:""}</>
      ),
      key: 'image',
    },
    {
      title: 'Họ Tên Tác Giả',
      key: 'tacgia',
      dataIndex: 'hoTenTacGia',
      render: ( text) => (
        <div style={{color:'red'}}>{text}</div>
      ),
      ...getColumnSearchProps('hoTenTacGia'),
  
    },
    {
      title: 'Người Giám Hộ',
      dataIndex: 'nguoiGiamHo',
      key: 'nguoigiamho',
      ...getColumnSearchProps('nguoiGiamHo'),
     
    },
    {
      title: 'Đơn vị',
      dataIndex: 'donVi',
      key: 'donvi',
      ...getColumnSearchProps('donVi'),
     
    },
    {
      title: 'Thời điểm',
      render: ( record) => {
        const a=new Date(record.ngayTao)
        return (
          <>
          {record.ngayTao?<>{a.getHours()}h{a.getMinutes()}m{a.getSeconds()}s-{a.getDate()}/{a.getMonth()+1}/{a.getFullYear()}</>:"--"}<br/>
          
          </>
        )},
      key: 'time',
    },
    {
      title: 'Hình Ảnh',
      render: ( record) => (
        <><Image src={record.hinhAnh}  height={"200px"}/></>
      ),
      key: 'image',
    },
    {
      title: 'Giá cao nhất',
      render: ( record) => (
        <div style={{fontWeight:600,color:'red'}}>{new Intl.NumberFormat("vi-VN", {
          style: "currency",
          currency: "VND",
        }).format(record.soTien)}</div>
      ),
      key: 'giacaonhat',
    },
   
  ];
  
  const getData=async()=>{
    try{
      setLoading(true)
      const req= await axios.post('https://daugiatranhve.cpc.vn/api/v1/dynamic',{
        "dataQuery": "spDauGiaTranh",
        "parameters": {
        "Param": 1
            }
        },
        {
          timeout:0,
          headers: {
            'content-type': 'text/json',
            'Authorization': '12C1F7EF9AC8E288FBC2177B7F54D 12C1F7EF9AC8E288FBC2177B7F54D'
          }
        })
        setList(req?.data.results)
        setLoading(false);
      }
      catch{
        setLoading(false);
        message.error('Lỗi kết nối!')
      }
  }
  useEffect(() => {
    getData();
  }, []);
  return (
    <div className="App">
      <Row style={{marginBottom:'10px'}} >
        <Col push={1}><img src={logoevn} width={100}/></Col>
        <Col push={2} style={{color:'blue',fontSize:'25px',fontWeight:'800',marginTop:'10px'}}>Cú pháp đấu giá: <br/> Ví dụ: </Col>
        <Col push={2} style={{color:'red',fontSize:'30px',fontWeight:'800',marginTop:'10px'}}> DG MA_SO_TRANH SO_TIEN <br/>
        <span>DG 01 100000</span></Col>
        <Col push={4} style={{color:'blue',fontSize:'20px',fontWeight:'800'}}>+ DG là cú pháp bắc buộc <br/>+ MA_SO_TRANH là mã số tranh <br/>+ SO_TIEN là số tiền đấu giá <br/></Col>
      </Row>
      
    <Table columns={columns} dataSource={list} loading={loading} pagination={false} />
    </div>
  );
}

export default App;
