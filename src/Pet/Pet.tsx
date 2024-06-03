export default class Pet {
    maDV: string;
    tenDV: string;
    ngayNhan: string;
    loaiDV: string;
    hinh: string;
    ghiChu:string;
    constructor(maDV: string, tenDV: string, ngayNhan: string, loaiDV: string, hinh: string,ghiChu:string) {
        this.maDV = maDV;
        this.tenDV = tenDV;
        this.ngayNhan = ngayNhan;
        this.loaiDV = loaiDV;
        this.hinh = hinh;
        this.ghiChu = ghiChu;
    }

    // Getter cho mã đối vật
    getMaDV(): string {
        return this.maDV;
    }

    // Setter cho mã đối vật
    setMaDV(maDV: string): void {
        this.maDV = maDV;
    }

    // Getter cho tên đối vật
    getTenDV(): string {
        return this.tenDV;
    }

    // Setter cho tên đối vật
    setTenDV(tenDV: string): void {
        this.tenDV = tenDV;
    }

    // Getter cho ngày nhận đối vật
    getNgayNhan(): string {
        return this.ngayNhan;
    }

    // Setter cho ngày nhận đối vật
    setNgayNhan(ngayNhan: string): void {
        this.ngayNhan = ngayNhan;
    }

    // Getter cho loại đối vật
    getLoaiDV(): string {
        return this.loaiDV;
    }

    // Setter cho loại đối vật
    setLoaiDV(loaiDV: string): void {
        this.loaiDV = loaiDV;
    }

    // Getter cho hình ảnh đối vật
    getHinh(): string {
        return this.hinh;
    }

    // Setter cho hình ảnh đối vật
    setHinh(hinh: string): void {
        this.hinh = hinh;
    }

    // Getter cho ghi chú đối vật
    getGhiChu(): string {
        return this.ghiChu;
    }

    // Setter cho ghi chú đối vật
    setGhiChu(ghiChu: string): void {
        this.ghiChu = ghiChu;
    }

    // Chuyển đối vật sang chuỗi
    toString(): string {
        return `Mã: ${this.maDV}, Tên: ${this.tenDV}, Ngày nhận: ${this.ngayNhan}, Loại: ${this.loaiDV}, Ghi Chú: ${this.ghiChu}`;
    }
}
