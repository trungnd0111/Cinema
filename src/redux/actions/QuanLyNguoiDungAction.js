import { quanLyNguoiDungService } from "../../services/QuanLyNguoiDung"
import { DANG_NHAP_ACTION, GET_DANH_SACH_NGUOI_DUNG, SET_THONG_TIN_NGUOI_DUNG, SET_THONG_TIN_TAI_KHOAN } from "./types/QuanLyNguoiDungType";
import { history } from '../../App'



export const dangNhapAction = (thongTinDangNhap) => {



    return async (dispatch) => {

        try {
            const result = await quanLyNguoiDungService.dangNhap(thongTinDangNhap);


            if (result.data.statusCode === 200) {
                dispatch({
                    type: DANG_NHAP_ACTION,
                    thongTinDangNhap: result.data.content
                });
                //Chuyển hướng đăng nhập về trang trước đó
                history.push(`/home`);
            }

            console.log('result', result);

        } catch (error) {
            console.log('error', error.response.data);
        }

    }

}

export const dangKyAction = (thongTinDangKy) => {

    return async (dispatch) => {

        try {
            const result = await quanLyNguoiDungService.dangKy(thongTinDangKy);
            if (result.data.statusCode === 200) {
                history.push('/login');
            }
            console.log('result', result);

        } catch (error) {
            console.log('error', error.response.data);
        }

    }

}

export const layThongTinNguoiDungAction = (thongTinDangNhap) => {

    return async (dispatch) => {

        try {
            const result = await quanLyNguoiDungService.layThongTinNguoiDung();


            if (result.data.statusCode === 200) {
                dispatch({
                    type: SET_THONG_TIN_NGUOI_DUNG,
                    thongTinNguoiDung: result.data.content
                });

            }

            console.log('result', result);

        } catch (error) {
            console.log('error', error.response.data);
        }

    }

}

export const layDanhSachNguoiDungAction = (taiKhoan = '') => {

    return async (dispatch) => {

        try {
            const result = await quanLyNguoiDungService.layDanhSachNguoiDung(taiKhoan);

            if (result.data.statusCode === 200) {
                dispatch({
                    type: GET_DANH_SACH_NGUOI_DUNG,
                    danhSachNguoiDung: result.data.content
                });

            }

            console.log('result', result);

        } catch (error) {
            console.log('error', error.response.data);
        }

    }

}

export const xoaNguoiDung = (taiKhoan) => {
    return async (dispatch) => {
        try {
            const result = await quanLyNguoiDungService.xoaNguoiDung(taiKhoan);
            if (result.data.statusCode === 200) {
                alert('Xóa tài khoản thành công !!!');
                dispatch(layDanhSachNguoiDungAction())
            }
        } catch (error) {
            console.log('error', error.response.data)
        }
    }
}

export const layThongTinTaiKhoanAction = (taiKhoan) => {
    return async (dispatch) => {
        try {
            const result = await quanLyNguoiDungService.layThongTinTaiKhoan(taiKhoan);
            if (result.data.statusCode === 200) {
                dispatch({
                    type: SET_THONG_TIN_TAI_KHOAN,
                    taiKhoan: result.data.content
                })
            }
        } catch (error) {
            console.log(error.response?.data);
        }
    }
}

export const capNhatThongTinTaiKhoanAction = (thongTinTaiKhoan) => {
    return async (dispatch) => {
        try {
            const result = await quanLyNguoiDungService.capNhatThongTinTaiKhoan(thongTinTaiKhoan);
            if (result.data.statusCode === 200) {
                alert('Cập nhật thông tin tài khoản thành công');
                dispatch(layDanhSachNguoiDungAction())
                history.push('/admin/users');
            }
        } catch (error) {
            console.log(error.response?.data)
        }
    }
}

export const capNhatThongTinCaNhanAction = (thongTinCaNhan) => {
    return async (dispatch) => {
        try {
            const result = await quanLyNguoiDungService.capNhatThongTinCaNhan(thongTinCaNhan);
            if (result.data.statusCode === 200) {
                alert('Cập nhật thông tin tài khoản thành công');
                history.push('/profile');
            }
        } catch (error) {
            console.log(error.response?.data)
        }
    }
}