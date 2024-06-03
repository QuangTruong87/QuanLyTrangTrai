import React, {useState, useEffect} from 'react';
import { View, Text, Button, TextInput, Image, FlatList,StyleSheet,TouchableOpacity,Alert,SafeAreaView } from 'react-native';

export default  ChonAnhDongVat = ({ route, navigation }) => {
    const { pickImage } = route.params;
  const [data, setData] = React.useState([
  {
      id:1,
      hinh1: 'https://tse4.mm.bing.net/th?id=OIP.vVXcTC9EMRO90LKhe1rn_QHaEK&pid=Api&P=0&h=180',
      hinh2: 'https://tse3.mm.bing.net/th?id=OIP.7PQmdgekPMxG8AFidlNKggHaFj&pid=Api&P=0&h=180',
      hinh3: 'https://tse4.mm.bing.net/th?id=OIP.F8gONbwilIi5q5yCB6tl3wHaE4&pid=Api&P=0&h=180',
  },

  {
      id:2,
      hinh1: 'https://tse3.mm.bing.net/th?id=OIP.QlCXOu2G17DsihsX4h_ZOgHaE7&pid=Api&P=0&h=180',
      hinh2: 'https://tse3.mm.bing.net/th?id=OIP.8kyQdd-Phrg2gDrzSq-kFgHaEK&pid=Api&P=0&h=180',
      hinh3: 'https://tse4.mm.bing.net/th?id=OIP.-DFrAhYKySWDudRlQrWsCQHaFO&pid=Api&P=0&h=180',
  },

  {
       id:3,
       hinh1: 'https://tse2.mm.bing.net/th?id=OIP.1WBL2sINUPqiI28GPuwoqQHaEo&pid=Api&P=0&h=180',
       hinh2: 'https://tse1.explicit.bing.net/th?id=OIP.sfEMX6FYKKBNJbadNRCEagHaE7&pid=Api&P=0&h=180',
       hinh3: 'https://tse2.mm.bing.net/th?id=OIP.USP1duAb0QTsATW98Cey_QHaE8&pid=Api&P=0&h=180',
  },

   {
       id:4,
       hinh1: 'https://tse1.mm.bing.net/th?id=OIP.eBo5M0EUqc_cM7kQtBYCRwHaFF&pid=Api&P=0&h=180',
       hinh2: 'https://tse4.mm.bing.net/th?id=OIP.mbBC8hBedpzdtPLaSbw2wQHaE7&pid=Api&P=0&h=180',
       hinh3: 'https://tse3.mm.bing.net/th?id=OIP.1yrihQJwym39P_eRK2F3-wHaEK&pid=Api&P=0&h=180',
    },

    {
        id:5,
        hinh1: 'https://tse2.mm.bing.net/th?id=OIP.Y9MaxiVxV-8HnzG7MuNC3wHaE8&pid=Api&P=0&h=180',
        hinh2: 'https://tse1.mm.bing.net/th?id=OIP.RvvU3lLXbQlDS90hCtJnpAHaEo&pid=Api&P=0&h=180',
        hinh3: 'https://tse4.mm.bing.net/th?id=OIP.4YhIMulH-8D4jjHMVmoefAHaEK&pid=Api&P=0&h=180',
    },


     {
        id:6,
        hinh1: 'https://tse3.mm.bing.net/th?id=OIP.VAe_JaGYKfNb_d9czTTQRwHaE8&pid=Api&P=0&h=180',
        hinh2: 'https://tse1.mm.bing.net/th?id=OIP.dyzwShSqleufk1wquHSfcQHaEK&pid=Api&P=0&h=180',
        hinh3: 'https://tse4.mm.bing.net/th?id=OIP.csH2x692sFJ9HW8wgAzgnAHaFI&pid=Api&P=0&h=180',
     },

  ]);

  const handleChonAnh = (hinh) => {
        pickImage(hinh);
        navigation.goBack();
  };


  const Item = ({ item }) => (
      <View style={styles.view_ds}>
        <View style={styles.item_view_ds}>
          <View>
              <Image
                style={styles.image_ds}
                source={{ uri: item.hinh1 }}
                resizeMode="contain"></Image>
              <TouchableOpacity
                style={styles.btn_ThuHoach}
                onPress={() => handleChonAnh(item.hinh1)}>
                <Text style={styles.txt_ThuHoach}>Chọn hình</Text>
              </TouchableOpacity>
           </View>
          <View>
              <Image
                style={styles.image_ds}
                source={{ uri: item.hinh2 }}
                resizeMode="contain"></Image>
              <TouchableOpacity
                style={styles.btn_ThuHoach}
                onPress={() => handleChonAnh(item.hinh2)}>
                <Text style={styles.txt_ThuHoach}>Chọn hình</Text>
              </TouchableOpacity>
           </View>

            <View>
               <Image
                 style={styles.image_ds}
                 source={{ uri: item.hinh3 }}
                 resizeMode="contain"></Image>
               <TouchableOpacity
                 style={styles.btn_ThuHoach}
                 onPress={() => handleChonAnh(item.hinh3)}>
                 <Text style={styles.txt_ThuHoach}>Chọn hình</Text>
               </TouchableOpacity>
            </View>
        </View>

        <View>

        </View>
      </View>
    );

  return (
    <SafeAreaView style={{ backgroundColor: '#fff'}}>
          <FlatList
            data={data}
            renderItem={Item}
            keyExtractor={item => item.id}

          />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  ds: {},
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

  tieude_tb: {
    marginTop: 15,
    fontWeight: 'bold',
    marginLeft: 15,
    color: 'black',
    fontSize: 15,
  },

  img_search: {
    height: 25,
    width: 25,
    position: 'absolute',
    right: 40,
  },
  view_search: {
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },

  search: {
    borderColor: 'black',
    paddingLeft: 10,
    borderWidth: 0.5,
    fontSize: 11,
    alignItems: 'center',
    justifyContent: 'center',
    width: '95%',
    height: 38,
    borderRadius: 100,
  },

  view_ds: {
    borderColor: 'black',

    marginTop: 10,
    paddingTop: 10,
    paddingBottom: 15,
    paddingLeft: 10,
    paddingRight: 10,

  },
  item_view_ds: {
    flexDirection: 'row',
    paddingBottom: 10,
    justifyContent:'space-between',
  },
  image_ds: {
    marginRight: 10,
    height: 80,
    width: 110,
  },
  duLieuDS: {
    fontSize: 11,
    color: 'black',
  },
  btn_GhiChepCK: {
    justifyContent: 'center',
    height: 26,
    backgroundColor: '#D9D9D9',
  },
  btn_GhiChepChuKy: {
    width: 'auto',
    fontSize: 11,
    color: 'black',
    textAlign: 'center',
  },
  btn_ThuHoach: {
    marginTop: 10,
    justifyContent: 'center',
    height: 26,
    backgroundColor: '#067E2F',
  },
  txt_ThuHoach: {
    width: 'auto',
    fontSize: 11,
    color: 'white',
    textAlign: 'center',
  },

  btn_ThemChuKyChanNuoi: {
    marginTop: 10,
    justifyContent: 'center',
    height: 30,
    backgroundColor: '#D9D9D9',
    marginLeft: 15,
    marginRight: 15,
    borderColor: 'black',
    borderWidth: 0.3,
  },
  txt_ChuKyChanNuoi: {
    width: 'auto',
    fontSize: 12,
    color: 'black',
    textAlign: 'center',
  },
});



