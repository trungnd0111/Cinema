import React from 'react'
import { useEffect } from 'react';
import { Form, Input, Button, Checkbox, Select } from 'antd';
import { useState } from 'react'
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { Tabs } from 'antd';
import _ from 'lodash';
import './Profile.css'
import { quanLyNguoiDungService } from '../../services/QuanLyNguoiDung';
import { GROUPID, USER_LOGIN } from '../../util/settings/config';
import { capNhatThongTinCaNhanAction, layThongTinNguoiDungAction, layThongTinTaiKhoanAction } from '../../redux/actions/QuanLyNguoiDungAction';
import moment from 'moment/moment';

const Profile = (props) => {

    const [state, setState] = useState({
        loaiNguoiDung: [],
    });
    const dispatch = useDispatch();

    const thongTinCaNhan = useSelector(state => state.QuanLyNguoiDungReducer.taiKhoan);

    const [passwordShown, setPasswordShown] = useState(false);
    const togglePassword = () => {
        // When the handler is invoked
        // inverse the boolean state of passwordShown
        setPasswordShown(!passwordShown);
    };
    const convertSelectLND = () => {
        return state.loaiNguoiDung?.map((lnd, index) => {
            return { label: lnd.maLoaiNguoiDung, value: lnd.maLoaiNguoiDung }
        })
    }
    const handleCMaLoaiNguoiDung = (value) => {
        formik.setFieldValue('maLoaiNguoiDung', value)
    }
    useEffect(async () => {
        let userLogin = JSON.parse(localStorage.getItem(USER_LOGIN));
        dispatch(layThongTinTaiKhoanAction(userLogin.taiKhoan));
        try {
            let result = await quanLyNguoiDungService.layDanhSachLoaiNguoiDung();
            setState({
                ...state,
                loaiNguoiDung: result.data.content
            })
        } catch (error) {
        }
    }, [])

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            taiKhoan: thongTinCaNhan[0]?.taiKhoan,
            matKhau: thongTinCaNhan[0]?.matKhau,
            email: thongTinCaNhan[0]?.email,
            soDt: thongTinCaNhan[0]?.soDt,
            maNhom: GROUPID,
            maLoaiNguoiDung: thongTinCaNhan[0]?.maLoaiNguoiDung,
            hoTen: thongTinCaNhan[0]?.hoTen
        },
        onSubmit: (values) => {
            console.log(values)
            dispatch(capNhatThongTinCaNhanAction(values))
        }
    })
    return (
        <div className='container-fluid'>
            <h3 className="text-2xl">Thông tin tài khoản</h3>
            <Form
                name="basic"
                labelCol={{ span: 6 }}
                wrapperCol={{ span: 14 }}
                onSubmitCapture={formik.handleSubmit}
            >
                <Form.Item label="Tài khoản">
                    <Input name='taiKhoan' value={formik.values.taiKhoan} disabled />
                </Form.Item>
                <Form.Item label="Mật khẩu">
                    <Input name='matKhau' type={passwordShown ? "text" : "password"} onChange={formik.handleChange} value={formik.values.matKhau} placeholder='Nhập mật khẩu' />
                    <Button onClick={() => {
                        togglePassword()
                    }}>Show Password</Button>
                </Form.Item>
                <Form.Item label="Email">
                    <Input name='email' type='email' onChange={formik.handleChange} value={formik.values.email} placeholder='Nhập Email liên hệ' />
                </Form.Item>
                <Form.Item label="Số điện thoại">
                    <Input
                        name="soDt"
                        type="text" // Thay đổi kiểu thành 'text'
                        onChange={(e) => {
                            const value = e.target.value;
                            const onlyDigits = /^\d*$/; // Biểu thức chính quy để kiểm tra giá trị chỉ chứa số
                            if (onlyDigits.test(value)) {
                                formik.handleChange(e);
                            }
                        }}
                        value={formik.values.soDt}
                        placeholder="Nhập số điện thoại liên hệ"
                    />
                </Form.Item>
                <Form.Item label="Họ tên người dùng">
                    <Input name='hoTen' onChange={formik.handleChange} value={formik.values.hoTen} placeholder='Nhập họ tên người dùng' />
                </Form.Item>
                <Form.Item label="Mã loại người dùng">
                    <Select disabled options={convertSelectLND()} onChange={handleCMaLoaiNguoiDung} value={formik.values.maLoaiNguoiDung} placeholder="Chọn loại người dùng" />
                </Form.Item>
                <Form.Item label="Tác vụ">
                    <button type="submit" className="bg-blue-300 text-white p-2">Cập nhật tài khoản</button>
                </Form.Item>
            </Form>
        </div>
    )
}

const { TabPane } = Tabs;

export default function ProfileTabs(props) {
    const { tabActive } = useSelector(state => state.QuanLyDatVeReducer);
    const dispatch = useDispatch();

    useEffect(() => {
        return () => {
            dispatch({
                type: 'CHANGE_TAB_ACTIVE',
                number: '1'
            })
        }
    }, [])

    return <div className="p-5">
        <Tabs defaultActiveKey="1" activeKey={tabActive} onChange={(key) => {

            // console.log('key',  key)
            dispatch({
                type: 'CHANGE_TAB_ACTIVE',
                number: key.toString()
            })
        }}>
            <TabPane tab="01 THÔNG TIN TÀI KHOẢN" key="1" >
                <Profile {...props} />
            </TabPane>
            <TabPane tab="02 KẾT QUẢ ĐẶT VÉ" key="2">
                <KetQuaDatVe {...props} />
            </TabPane>
        </Tabs>

    </div>
}

function KetQuaDatVe(props) {

    const dispatch = useDispatch();
    const { thongTinNguoiDung } = useSelector(state => state.QuanLyNguoiDungReducer);

    const { userLogin } = useSelector(state => state.QuanLyNguoiDungReducer);


    useEffect(() => {
        const action = layThongTinNguoiDungAction();
        dispatch(action)
    }, [])

    console.log('thongTinNguoiDung', thongTinNguoiDung);

    const renderTicketItem = function () {
        return thongTinNguoiDung.thongTinDatVe?.map((ticket, index) => {
            const seats = _.first(ticket.danhSachGhe);

            return <div className="p-2 lg:w-1/3 md:w-1/2 w-full" key={index}>
                <div className="h-full flex items-center border-gray-200 border p-4 rounded-lg">
                    <img alt="team" className="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4" src={ticket.hinhAnh} />
                    <div className="flex-grow">
                        <h2 className="text-pink-500 title-font font-medium text-2xl">{ticket.tenPhim}</h2>
                        <p className="text-gray-500"><span className="font-bold">Giờ chiếu:</span> {moment(ticket.ngayDat).format('hh:mm A')} - <span className="font-bold">Ngày chiếu:</span>  {moment(ticket.ngayDat).format('DD-MM-YYYY')} .</p>
                        <p><span className="font-bold">Địa điểm:</span> {seats.tenHeThongRap}   </p>
                        <p>
                            <span className="font-bold">Tên rạp:</span>  {seats.tenCumRap} - <span className="font-bold">Ghế:</span>  {ticket.danhSachGhe.map((ghe, index) => { return <span className="text-green-500 text-xl" key={index}> [ {ghe.tenGhe} ] </span> })}
                        </p>
                    </div>
                </div>
            </div>
        })
    }

    return <div className="p-5">

        <section className="text-gray-600 body-font">
            <div className="container px-5 py-24 mx-auto">
                <div className="flex flex-col text-center w-full mb-20">
                    <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4  text-purple-600 ">Lịch sử đặt vé khách hàng</h1>
                    <p className="lg:w-2/3 mx-auto leading-relaxed text-base">Hãy xem thông tin địa và thời gian để xem phim vui vẻ bạn nhé !</p>
                </div>
                <div className="flex flex-wrap -m-2">
                    {renderTicketItem()}
                    {/* <div className="p-2 lg:w-1/3 md:w-1/2 w-full">
                        <div className="h-full flex items-center border-gray-200 border p-4 rounded-lg">
                            <img alt="team" className="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4" src="https://picsum.photos/200/200" />
                            <div className="flex-grow">
                                <h2 className="text-gray-900 title-font font-medium">Lật mặt 48h</h2>
                                <p className="text-gray-500">10:20 Rạp 5, Hệ thống rạp cinestar bhd </p>
                            </div>
                        </div>
                    </div> */}

                </div>
            </div>
        </section>

    </div>
}

