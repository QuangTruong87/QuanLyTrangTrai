import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
  ActivityIndicator,
} from 'react-native';

export default function ThongKeChiPhiKhamBenh({ route, navigation }) {
  const { itemCK } = route.params;
  const ip ="192.168.24.1";
  const [data, setData] = useState([]);
  const [maxTienKham, setMaxTienKham] = useState(0);
  const [tongTienKham, setTongTienKham] = useState(0);

  const [maxTienThuoc, setMaxTienThuoc] = useState(0);
  const [tongTienThuoc, setTongTienThuoc] = useState(0);

  const [loading, setLoading] = useState(true);

  const getAPI = (search = '') => {
    fetch(`http://${ip}/API_QuanLyNongTrai/XemBenh/getData.php?search=${search}`)
      .then(response => response.json())
      .then(data => {
        setData(data);
        // Calculate the maximum feeding cost
        const maxCost = data.reduce((max, item) => {
          return parseFloat(item.tienKhamBenh) > parseFloat(max) ? (parseFloat(item.tienKhamBenh)) : parseFloat(max);
        }, 0);
        setMaxTienKham(maxCost);

        // Calculate the total feeding cost
        const totalCost = data.reduce((sum, item) => {
          return parseFloat(sum) + parseFloat(item.tienKhamBenh);
        }, 0);
        setTongTienKham(totalCost);

        const maxThuoc = data.reduce((max, item) => {
                  return parseFloat(item.tienThuoc) > parseFloat(max) ? (parseFloat(item.tienThuoc)) : parseFloat(max);
         }, 0);
        setMaxTienThuoc(maxThuoc);

         const totalThuoc = data.reduce((sum, item) => {
              return parseFloat(sum) + parseFloat(item.tienThuoc);
          }, 0);
         setTongTienThuoc(totalThuoc);

        setLoading(false);
      })
      .catch(err => {
        console.log(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    getAPI(itemCK.maCK);
  }, []);

  const hienThiLaiDuLieu = () => {
    getAPI(itemCK.maCK);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
//      onPress={() =>
//        navigation.navigate('Sửa ghi chép chu kỳ chăn nuôi', {
//          item: item,
//          hienThiLaiDuLieu: hienThiLaiDuLieu,
//        })
//      }
    >
    <View style={styles.item}>
     <View style={styles.Item_DS_ChuKy}>
            <Text style={styles.view_TieuDe_nghieng}>
              Ngày ghi chép: {item.ngayKham}
            </Text>
            <Text style={styles.view_TieuDe_nghieng}>
             Tiền khám: {(parseFloat(item.tienKhamBenh)).toLocaleString('en-US')} VND
            </Text>
      </View>
      <View style={styles.Item_DS_ChuKy}>
            <Text style={styles.view_TieuDe_nghieng}>
              Tên bệnh: {item.tenBenh}
            </Text>
            <Text style={styles.view_TieuDe_nghieng}>
             Tiền thuốc: {(parseFloat(item.tienThuoc)).toLocaleString('en-US')} VND
            </Text>
      </View>
        <View style={styles.Item_DS_ChuKy}>
          <View>
            <Text style={styles.thongTin_Item_ChuKy2}>Người khám: {item.nguoiKhamBenh}</Text>
            <Text style={styles.thongTin_Item_ChuKy2}>Tình trạng sức khỏe: {item.tinhTrangSucKhoe}</Text>
            <Text style={styles.thongTin_Item_ChuKy2}>Phương pháp điều trị: {item.phuongPhap} </Text>
             <Text style={styles.thongTin_Item_ChuKy2}>Nguyên nhân bệnh: {item.nguyenNhanBenh} </Text>
          </View>

        </View>

        <View style={styles.progressBarContainer}>
          <View style={{ ...styles.progressBar, width: `${((item.tienKhamBenh) / maxTienKham) * 100}%` }}>
            <Text style={styles.progressText}>
              {(((item.tienKhamBenh) / maxTienKham) * 100).toFixed(2)}%
            </Text>
          </View>
        </View>

        <View style={styles.progressBarContainer}>
             <View style={{ ...styles.progressBar2, width: `${((item.tienThuoc) / maxTienThuoc) * 100}%` }}>
                    <Text style={styles.progressText}>
                      {(((item.tienThuoc) / maxTienThuoc) * 100).toFixed(2)}%
                    </Text>
             </View>
         </View>
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#00ff00" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView>
      <Text style={styles.view_TieuDe}>Thông tin chu kỳ</Text>
      <View style={styles.view_TT_DV}>
        <Image
          style={styles.img_TT_DV}
          source={{ uri: itemCK.hinh }}
          resizeMode="contain"
        />
        <View>
          <Text style={styles.data_TT_DV}> Mã chu kỳ: {itemCK.maCK}</Text>
          <Text style={styles.data_TT_DV}> Tên động vật: {itemCK.tenDV}</Text>
          <Text style={styles.data_TT_DV}> Số lượng giống: {itemCK.soLuongNuoi} con</Text>
        </View>
      </View>
      <Text style={styles.data_TT_DV}>
        Ngày bắt đầu: {itemCK.ngayBatDau} - Ngày kết thúc: {itemCK.ngayKetThuc}
      </Text>
      <Text style={styles.data_TT_DV}>
        Nhân viên: Mã: {itemCK.tenDangNhap} - Tên tài khoản: {itemCK.tenDangNhap}
      </Text>

      <Text style={styles.view_TieuDe}>Thông số thống kê:</Text>
      <Text style={styles.chuThichTitle}>Chú thích:</Text>
      <View style={styles.chuThichContainer}>
        <View style={styles.chuThichBox}></View>
        <Text style={styles.chuThichText}>
          tỷ lệ phần trăm tiền khám {'\n'}
          (tiền khám / max tiền khám)
        </Text>
      </View>

      <View style={styles.chuThichContainer}>
              <View style={styles.chuThichBox2}></View>
              <Text style={styles.chuThichText}>
                tỷ lệ phần trăm tiền thuốc {'\n'}
                (tiền thuốc / max tiền thuốc)
              </Text>
      </View>

       <View style={styles.chuThichContainer}>
          <View>
               <Text style={styles.data_TT_DV}>Max tiền khám: {parseFloat(maxTienKham).toLocaleString('en-US')} VND</Text>
               <Text style={styles.data_TT_DV}>Tổng tiền khám: {tongTienKham.toLocaleString('en-US')} VND</Text>
          </View>
          <View>
                 <Text style={styles.data_TT_DV}>Max tiền thuốc: {parseFloat(maxTienThuoc).toLocaleString('en-US')} VND</Text>
                 <Text style={styles.data_TT_DV}>Tổng tiền khám: {tongTienThuoc.toLocaleString('en-US')} VND</Text>
           </View>
      </View>

      <Text style={styles.thongTinTitle}>Thông tin:</Text>

      <FlatList
        style={styles.flatList}
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.maXemBenh.toString()}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  header_top: {
    flexDirection: 'row',
    height: 72,
    backgroundColor: '#067E2F',
    fontWeight: 'bold',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btn_quaylai: {
    height: 30,
    width: 30,
    position: 'absolute',
    left: 10,
    textAlign: 'left',
  },
  title_header_top: {
    width: 'auto',
    color: 'white',
    textAlign: 'center',
  },
  img_quaylai: {
    height: 30,
    width: 30,
  },
  btn_ThemChuKyChanNuoi: {
    marginTop: 10,
    marginBottom: 10,
    justifyContent: 'center',
    height: 35,
    backgroundColor: '#D9D9D9',
    marginLeft: 12,
    marginRight: 12,
    borderColor: 'black',
    borderWidth: 0.5,
  },
  txt_ChuKyChanNuoi: {
    width: 'auto',
    fontSize: 13,
    color: 'black',
    textAlign: 'center',
  },
  img_TT_DV: {
    borderWidth: 1,
    borderColor: 'black',
    marginTop: 3,
    height: 60,
    width: 85,
    marginLeft: 7,
  },
  data_TT_DV: {
    color: 'black',
    fontSize: 12,
    marginLeft: 10,
  },
  view_TT_DV: {
    marginTop: 5,
    flexDirection: 'row',
  },
  view_TieuDe: {
    marginLeft: 10,
    marginTop: 10,
    color: 'black',
    fontWeight: 'bold',
  },
  item: {
    marginTop: 0,
    marginLeft: 10,
  },
  title: {
    fontSize: 12,
  },
  view_TieuDe_nghieng: {
    marginTop: 10,
    color: 'black',
    fontWeight: 'bold',
    fontStyle: 'italic',
  },
  Item_DS_ChuKy: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginTop: 1,
    color: 'black',
    fontWeight: 'bold',
  },
  thongTin_Item_ChuKy: {
    marginTop: 10,
    color: 'black',
    fontWeight: 'bold',
  },
  thongTin_Item_ChuKy2: {
    marginTop: 10,
    color: 'black',
  },
  progressBarContainer: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: 'black',
    marginTop: 10,
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#50C076',
    justifyContent: 'center',
  },

   progressBar2: {
      height: '100%',
      backgroundColor: '#E66161',
      justifyContent: 'center',
   },

  progressText: {
    color: 'black',
    marginLeft: 10,
  },
  chuThichTitle: {
    color: '#365640',
    fontWeight: 'bold',
    marginLeft: 10,
    marginTop: 5,
  },
  chuThichContainer: {
    marginTop: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  chuThichBox: {
    height: 28,
    width: 28,
    backgroundColor: '#50C076',
    marginLeft: 10,
    borderWidth: 0.5,
    borderColor: 'black',
  },

  chuThichBox2: {
      height: 28,
      width: 28,
      backgroundColor: 'red',
      marginLeft: 10,
      borderWidth: 0.5,
      borderColor: 'black',
    },
  chuThichText: {
    marginLeft: 10,
    color: 'black',
  },
  thongTinTitle: {
    color: '#365640',
    fontWeight: 'bold',
    marginLeft: 10,
    marginTop: 5,
  },
  flatList: {
    backgroundColor: '#FFF',
    paddingRight: 10,
    height: '55%',
  },
});
