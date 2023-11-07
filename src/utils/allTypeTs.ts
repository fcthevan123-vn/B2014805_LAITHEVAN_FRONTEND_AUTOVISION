export type UserTS = {
  _id: string;
  HoTenKH: string;
  email: string;
  type: string;
  SoDienThoai: string;
  DiaChi: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
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
  _id: string;
  TenHH: string;
  MoTaHH: string;
  Gia: number | string;
  SoLuongHang: number;
  TrongLuong: number;
  ChatLieu: string;
  PhuHopVoi: string;
  CongNgheDem: string;
  DeNgoai: string;
  GhiChu: string;
  HinhHH?: [HinhHH];
  HinhUpload?: File[];
  NoiBat?: String;
};

export type HinhHH = {
  _id: string;
  TenHinh: string;
  URLHinh: string;
  MSHH?: string;
};
