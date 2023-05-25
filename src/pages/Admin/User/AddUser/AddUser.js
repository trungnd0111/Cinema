import React from 'react'
import { useEffect } from 'react';
import { Form, Input, Button, Checkbox, Select } from 'antd';
import { useState } from 'react'
import { quanLyNguoiDungService } from '../../../../services/QuanLyNguoiDung';
import { useFormik } from 'formik';
import { GROUPID } from '../../../../util/settings/config';

const AddUser = (props) => {

    const [state, setState] = useState({
        loaiNguoiDung: [],
    })
    console.log('loaiNguoiDung', state.loaiNguoiDung)
    useEffect(async () => {
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
        initialValues: {
            taiKhoan: '',
            matKhau: '',
            email: '',
            soDt: '',
            maNhom: GROUPID,
            maLoaiNguoiDung: '',
            hoTen: ''
        },
        onSubmit: async (values) => {
            console.log('values', values);
            try {
                const result = await quanLyNguoiDungService.themNguoiDung(values);

                alert('Them nguoi dùng thành công');

            } catch (error) {
                console.log('error', error.response?.data)
            }
        }
    })
    return (
        <div className='container-fluid'>
            <h3 className="text-2xl">Thêm người dùng</h3>
            <Form
                name="basic"
                labelCol={{ span: 6 }}
                wrapperCol={{ span: 14 }}
                onSubmitCapture={formik.handleSubmit}
            >
                <Form.Item label="Tài khoản">
                    <Input name='taiKhoan' onChange={formik.handleChange} placeholder='Nhập tài khoản người dùng' />
                </Form.Item>
                <Form.Item label="Mật khẩu">
                    <Input name='matKhau' type='password' onChange={formik.handleChange} placeholder='Nhập mật khẩu' />
                </Form.Item>
                <Form.Item label="Email">
                    <Input name='email' type='email' onChange={formik.handleChange} placeholder='Nhập Email liên hệ' />
                </Form.Item>
                <Form.Item label="Số điện thoại">
                    <Input name='soDt' type='number' onChange={formik.handleChange} placeholder='Nhập số điện thoại liên hệ' />
                </Form.Item>
                <Form.Item label="Họ tên người dùng">
                    <Input name='hoTen' onChange={formik.handleChange} placeholder='Nhập họ tên người dùng' />
                </Form.Item>
                <Form.Item label="Mã loại người dùng">
                    <Select options={convertSelectLND()} onChange={handleCMaLoaiNguoiDung} placeholder="Chọn loại người dùng" />
                </Form.Item>
                <Form.Item label="Tác vụ">
                    <button type="submit" className="bg-blue-300 text-white p-2">Thêm người dùng</button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default AddUser;