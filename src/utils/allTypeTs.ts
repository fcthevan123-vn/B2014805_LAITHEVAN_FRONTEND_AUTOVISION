export type UserTS = {
  _id: string;
  HoTenKH: string;
  email: string;
  type: string;
  SoDienThoai: string;
  DiaChi: string;
  createdAt: string;
  updatedAt: string;
  BiKhoa: Boolean;
  __v: number;
};

export type CartTS = {
  _id?: string;
  MSKH: string;
  MSHH: HangHoaTS;
  SoLuong: string;
  MauSac: string;
  Size: number;
};

export type StaffTS = {
  _id: string;
  HoTenNV: string;
  email: string;
  ChucVu: string;
  SoDienThoai: string;
  DiaChi: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export type HangHoaTS = {
  _id?: string;
  TenHH: string;
  MoTaHH: string;
  Gia: number;
  SoLuongHang: number;
  TrongLuong: number;
  ChatLieu: string;
  PhuHopVoi: string;
  CongNgheDem: string;
  DeNgoai: string;
  GhiChu: string;
  HinhHH?: HinhHH[];
  HinhXoa?: string[];
  HinhUpload?: File[];
  NoiBat?: string;
};

export type DatHangTS = {
  _id?: string;
  MSKH: string | UserTS;
  MSNV: string | StaffTS;
  SodonDH: ChiTietDatHangTS[];
  NgayGH: string;
  NgayDH: string;
  DiaChi: string;
  HoTenNguoiNhan: string;
  SoDienThoai: string;
};

export type ChiTietDatHangTS = {
  _id?: string;
  MSKH: string;
  MSHH: HangHoaTS;
  Size: string;
  MauSac: string;
  SoLuong: string;
  GiaDatHang: number;
};

export type HinhHH = {
  _id: string;
  TenHinh: string;
  UrlHinh: string;
};
