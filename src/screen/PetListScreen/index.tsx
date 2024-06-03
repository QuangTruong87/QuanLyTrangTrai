import React, { useState,useContext, useEffect } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { View, Text, TextInput, TouchableOpacity, FlatList, Image, StyleSheet } from 'react-native';
import Pet from '../../Pet/Pet';
import { useNavigation, useFocusEffect  } from '@react-navigation/native';
import { AuthContext } from '../../Pet/PetContext';

const PetListScreen = () => {
    const navigation = useNavigation();
    const [searchQuery, setSearchQuery] = useState('');
    const [pets, setPets] = useState([]);
    const ip ="192.168.24.1";

    const getAPI = (search = '') => {
      fetch(`http://${ip}/API_QuanLyNongTrai/APIDongVat/getDongVat.php?search=${search}`)
      .then(response => response.json())
      .then(data => setPets(data))
      .catch(err => console.log(err));
    };

    const AddPet =  () => {
      navigation.navigate('AddPetScreen',{hienThiLaiDuLieu:hienThiLaiDuLieu});
    };
    
    useEffect(() => {
      fetch(`http://${ip}/API_QuanLyNongTrai/APIDongVat/getDongVat.php`)
      .then(response => response.json())
      .then(data => setPets(data))
      .catch(err => console.log(err));
    },[]);

    useEffect(() => {
      getAPI(searchQuery);
    },[searchQuery]);

    const hienThiLaiDuLieu = () => {
       getAPI();
    };

    const handleItemPress = (maDV) => {
      const pet = pets.find(pet => pet.maDV === maDV);
      console.log(pet)
      navigation.navigate('PetDetailScreen', {pet: pet,hienThiLaiDuLieu:hienThiLaiDuLieu});
    };

    const renderPetItem = ({ item }: { item: Pet }) => (
    <TouchableOpacity onPress={() => handleItemPress(item.maDV)} style={styles.petItem}>
      <View style={styles.petContent}>
      <Image source={{ uri: item.hinh }} style={styles.petImage} />
      <View style={styles.petInfo}>
        <Text style={styles.petText}>Mã Vật Nuôi: {item.maDV}</Text>
        <Text style={styles.petText}>Tên Vật Nuôi: {item.tenDV}</Text>
        <Text style={styles.petText}>Ngày Nhận Nuôi: {item.ngayNhan}</Text>
        <Text style={styles.petText}>Loại Vật Nuôi: {item.loaiDV}</Text>
      </View>
      </View>
      
      <View style={styles.ghiChuContent}>
        <Text style={{fontSize:13,fontWeight:'bold',color:'#000',paddingLeft:5,}}>Ghi Chú</Text>
        <Text style= {styles.petGhiChu}>{item.ghiChu}</Text>
      </View>
    </TouchableOpacity>
    );

    return (
      <View style={styles.container}>
        <LinearGradient colors={['#A2D582', '#067E2F']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.topHeader}>
          <TouchableOpacity onPress={() => {}} style={styles.backButton}>

          </TouchableOpacity>
          <Text style={styles.headerTitle}>Quản lý vật nuôi</Text>
        </LinearGradient>
        <Text style={styles.listTitle}>Danh sách vật nuôi</Text>
        <TextInput
          style={styles.searchInput}
          placeholder="Tìm kiếm vật nuôi..."
          placeholderTextColor="#000"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <TouchableOpacity style={{width:'100%',padding:5,
        backgroundColor: '#E5EEDF',marginTop:7,marginBottom:7,
        borderWidth:0.7,borderColor:'black',borderRadius:3,
        }}
         onPress={hienThiLaiDuLieu}
        >
            <Text style={{color:'black',textAlign: 'center',fontSize:15,}}>Load data</Text>
        </TouchableOpacity>
        <FlatList
          data={pets}
          renderItem={renderPetItem}
          keyExtractor={(item) => item.maDV.toString()}
        />
        <TouchableOpacity onPress={AddPet} style={styles.addButton}>
          <Text style={styles.addButtonLabel}>Thêm vật nuôi </Text> 
        </TouchableOpacity>

      </View>
    );
};


const styles = StyleSheet.create({
  container: {
    backgroundColor: '#EDF9ED',
    flex: 1,
    paddingBottom:60,
    paddingHorizontal:20,
  },
  topHeader: {
    flexDirection: 'row',
    marginHorizontal:-20,
    paddingTop:30,
    paddingBottom:10,
    alignItems: 'center',
    justifyContent: 'center', // Đưa nút "Quay lại" và tiêu đề "Quản lý vật nuôi" vào giữa
  },
  backButton: {
    paddingTop:30,
    paddingBottom:10,
    position: 'absolute',
    left: 20,
  },
  backButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  headerTitle: {
    fontSize: 25,
    fontWeight: 'bold',
    alignSelf: 'center', // Đưa tiêu đề vào giữa
    marginBottom: 5,
    color: '#fff', // Thêm màu cho tiêu đề
  },
  listTitle: {
    fontSize: 20,
    color: '#181a1b',
    fontWeight: 'bold',
  },
  searchInput: {
    borderWidth: 2,
    borderColor: '#ccc',
    color:'#000',
    borderRadius: 30,
    paddingVertical: 5,
    paddingHorizontal:20,
    backgroundColor:'#fff',
  },
  petItem: {
    flexDirection: 'column',
    marginBottom: 10,
    padding:10,
    borderRadius: 5,
    backgroundColor:'#B7E0B6',
    shadowColor: '#181a1b',
    shadowOffset: { width: 2, height: 4 },
    shadowOpacity: 0,
    shadowRadius: 5,
    elevation:4,
  },
  petContent:{
    flexDirection: 'row',
  },
  petImage: {
    width: 130,
    height: 100,
    borderRadius: 5,
    marginRight: 15,
  },
  petInfo: {
    justifyContent:'center',
    padding:2,
  },
  addButton: {
    position: 'absolute',
    bottom: 10,
    alignSelf:'center',
    width: 300,
    height: 40,
    borderRadius: 5,
    backgroundColor: '#E5EEDF',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#181a1b',
    shadowColor: '#181a1b',
    shadowOffset: { width: 0, height: 4 }, // Điều chỉnh vị trí bóng đổ (độ cao)
    shadowOpacity: 0.5, // Điều chỉnh độ mờ của bóng đổ
    shadowRadius: 6, // Điều chỉnh độ rộng của bóng đổ
    elevation: 8, // Chỉ áp dụng cho Android
    transform: [{ translateY: 2 }] // Tạo hiệu ứng xéo (điều chỉnh độ cao)
  },
  addButtonLabel: {
    fontSize: 20,
    color: '#181a1b',
    fontWeight: 'bold',
  },
  petGhiChu:{
    backgroundColor:'#fff',
    paddingHorizontal:10,
    paddingVertical:5,
    width:'100%',
    height:70,
    color:'#181a1b',
    fontSize:15,
    borderRadius:10,
    borderWidth:2,
    borderColor:'#ccc'
  },
  ghiChuContent:{
    marginTop:5,
  },
  petText:{
    fontWeight:'bold',
    fontSize:13.5,
    color:'#000',
  },
});

export default PetListScreen;