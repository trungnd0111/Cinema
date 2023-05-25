import React from 'react'
import { useEffect } from 'react';
import { Form, Input, Button, Checkbox, Select } from 'antd';
import { useState } from 'react'
import { quanLyNguoiDungService } from '../../../../services/QuanLyNguoiDung';
import { useFormik } from 'formik';
import { GROUPID } from '../../../../util/settings/config';
import { useDispatch, useSelector } from 'react-redux';
import { capNhatThongTinTaiKhoanAction, layDanhSachNguoiDungAction, layThongTinTaiKhoanAction } from '../../../../redux/actions/QuanLyNguoiDungAction';

const EditUser = (props) => {

    const [state, setState] = useState({
        loaiNguoiDung: [],
    });

    const [passwordShown, setPasswordShown] = useState(false);
    const togglePassword = () => {
        // When the handler is invoked
        // inverse the boolean state of passwordShown
        setPasswordShown(!passwordShown);
    };

    const thongTinTaiKhoan = useSelector(state => state.QuanLyNguoiDungReducer.taiKhoan);
    // console.log('thongTinTaiKhoan',thongTinTaiKhoan[0])
    const dispatch = useDispatch();


    useEffect(async () => {
        let { taiKhoan } = props.match.params;
        //   console.log('taiKhoan', taiKhoan)
        dispatch(layThongTinTaiKhoanAction(taiKhoan));
        try {
            let result = await quanLyNguoiDungService.layDanhSachLoaiNguoiDung();
            setState({
                ...state,
                loaiNguoiDung: result.data.content
            })
        } catch (error) {
        }
    }, [])

    const convertSelectLND = () => {
        return state.loaiNguoiDung?.map((lnd, index) => {
            return { label: lnd.maLoaiNguoiDung, value: lnd.maLoaiNguoiDung }
        })
    }
    const handleCMaLoaiNguoiDung = (value) => {
        formik.setFieldValue('maLoaiNguoiDung', value)
    }

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            taiKhoan: thongTinTaiKhoan[0]?.taiKhoan,
            matKhau: thongTinTaiKhoan[0]?.matKhau,
            email: thongTinTaiKhoan[0]?.email,
            soDt: thongTinTaiKhoan[0]?.soDt,
            maNhom: GROUPID,
            maLoaiNguoiDung: thongTinTaiKhoan[0]?.maLoaiNguoiDung,
            hoTen: thongTinTaiKhoan[0]?.hoTen
        },
        onSubmit: (values) => {
            console.log(values)
            dispatch(capNhatThongTinTaiKhoanAction(values))
        }
    })
    return (
        <div className='container-fluid'>
            <h3 className="text-2xl">Cập nhật tài khoản người dùng</h3>
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
                    <Input name='soDt' type='text' onChange={(e) => {
                        const value = e.target.value;
                        const onlyDigits = /^\d*$/; // Biểu thức chính quy để kiểm tra giá trị chỉ chứa số
                        if (onlyDigits.test(value)) {
                            formik.handleChange(e);
                        }
                    }} value={formik.values.soDt} placeholder='Nhập số điện thoại liên hệ' />
                </Form.Item>
                <Form.Item label="Họ tên người dùng">
                    <Input name='hoTen' onChange={formik.handleChange} value={formik.values.hoTen} placeholder='Nhập họ tên người dùng' />
                </Form.Item>
                <Form.Item label="Mã loại người dùng">
                    <Select options={convertSelectLND()} onChange={handleCMaLoaiNguoiDung} value={formik.values.maLoaiNguoiDung} placeholder="Chọn loại người dùng" />
                </Form.Item>
                <Form.Item label="Tác vụ">
                    <button type="submit" className="bg-blue-300 text-white p-2">Cập nhật tài khoản</button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default EditUser;