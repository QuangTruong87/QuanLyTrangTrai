import React, { useState, useEffect, useContext } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { SelectList } from 'react-native-dropdown-select-list';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation,useRoute, useFocusEffect  } from '@react-navigation/native';
import { AuthContext } from '../../Pet/PetContext';

const PetDetailScreen = () => {
    const [PetId, setPetId] = useState('');
    const [PetName, setPetName] = useState('');
    const [PetImage, setPetImage] = useState('');
    const [PetNote, setPetNote] = useState('');
    const [PetKind, setPetKind] = useState("");
    const [date, setDate] = useState(null);
    const [show, setShow] = useState(false);
    const navigation = useNavigation();
    const route = useRoute();
    const { pet,hienThiLaiDuLieu } = route.params;
    const { updatePet,removePet } = useContext(AuthContext);

    const dataDropdown = [
        { key: '1', value: 'Mèo' },
        { key: '2', value: 'Chó' },
        { key: '3', value: 'Heo' },
        { key: '4', value: 'Gà' },
        { key: '5', value: 'Vịt' },
        { key: '6', value: 'Bò' },
    ];

    const xoaPet = () => {
        const deletedSuccessfully = removePet(PetId);
        if (deletedSuccessfully) {
            hienThiLaiDuLieu();
            Alert.alert('Thành công', 'Đã xóa vật nTuuôi thành công.',
                [{ text: 'OK', onPress: () => navigation.navigate('PetListScreen') }]);
            hienThiLaiDuLieu();

        } else {
            Alert.alert('Lỗi', 'Không thể xóa vật nuôi.',
                [{ text: 'OK', onPress: () => console.log('OK Pressed') }]);
        };
    }

    const suaPet = () => {
        const thongTinMoi = {
            maDV:PetId,
            tenDV:PetName,
            ngayNhan:date ? formatDate(date) : pet ? pet.ngayNhan : '',
            loaiDV:PetKind,
            hinh:PetImage,
            ghiChu:PetNote,
        }
        const updatedSuccessfully = updatePet(thongTinMoi);
        if (updatedSuccessfully) {
            hienThiLaiDuLieu();
            Alert.alert('Thành công', 'Đã sửa vật nuôi thành công.',
                [{ text: 'OK', onPress: () => navigation.goBack() }]);
            hienThiLaiDuLieu();
        } else {
            Alert.alert('Lỗi', 'Không thể sửa vật nuôi.',
                [{ text: 'OK', onPress: () => console.log('OK Pressed') }]);
        };
    }

    useEffect(() => {
        setPetId(pet.maDV);
        setPetName(pet.tenDV);
        setPetNote(pet.ghiChu);
        setPetImage(pet.hinh);
    }, [pet]);

    const handleDateChange = (event, selectedDate) => {
        if (event.type === 'set') {
            const currentDate = selectedDate || date;
            setDate(currentDate);
        }
        setShow(false);
    };

    const formatDate = (date) => {
        var options = { day: '2-digit', month: '2-digit', year: 'numeric' };
        var dateString = date.toLocaleDateString('en-GB', options);
        var parts = dateString.split('/');
        var formattedDate = parts[0] + '/' + parts[1] + '/' + parts[2];
        return formattedDate;
    };

     const pickImage = (hinh) => {
            setPetImage(hinh);
     };

    return (
        <View style={styles.container}>
        <LinearGradient colors={['#A2D582', '#067E2F']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.topHeader}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
 <Text style={styles.backButtonText}>{'< Quay lại'}</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Sửa vật nuôi</Text>
        </LinearGradient>
            <View style={styles.itemContainer}>
                <View style={styles.imageContainer}>

                <TouchableOpacity
                onPress={() => navigation.navigate('Chọn ảnh động vật',{pickImage:pickImage})}
                >
                    <Image
                        source={ PetImage ? {uri : PetImage} : require('../../../assets/cat.jpg')}
                        style={styles.image}
                    />
                </TouchableOpacity>

                </View>
                <View style={styles.textContainer}>
                    <Text style={styles.title}>Mã Vật Nuôi</Text>
                    <TextInput
                        style={styles.inputUser}
                        value={PetId}
                        onChangeText={PetId}
                        editable = {false}
                    />
                    
                </View>
            </View>
            
            <View style={styles.bodyContainer}>
                <Text style={styles.title}>Tên Vật Nuôi</Text>
                    <TextInput
                        style={styles.inputUser}
                        value={PetName}
                        onChangeText={setPetName}
                    />
                    
                <Text style={styles.title}>Ngày Nhận</Text>
                <View style={{ flexDirection: 'row' }}>
                    <TextInput
                        style={[styles.inputUser, { flex: 1 }]}
                        value={date ? formatDate(date) : pet ? pet.ngayNhan : ''}
                        editable={false}
                    />
                    <TouchableOpacity onPress={() => setShow(true)}>
                        <Image source={require('../../../assets/clendar.png')} style={styles.icon} />
                        {show && (
                            <DateTimePicker
                                value={date || new Date()}
                                mode={'date'}
                                onChange={handleDateChange}
                                confirmBtnText="Confirm"
                                cancelBtnText="Dismiss"
                            />
                        )}
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.bodyContainer}>
                <Text style={styles.title}>Loại Vật Nuôi</Text>
                <SelectList
                    setSelected={setPetKind}
                    data={dataDropdown}
                    save="value"
                    dropdownStyles={{ backgroundColor: "#fff" }}
                    dropdownTextStyles={{ color: "#000" }}
                    boxStyles={{ backgroundColor: "#fff" }}
                    inputStyles={{ color: "#000" }} 
                />
            </View>
           
            <View style={styles.bodyContainer}>
                <Text style={styles.title}>Ghi Chú</Text>
                <TextInput
                    style={styles.inputUser}
                    value={PetNote}
                    onChangeText={setPetNote}
                />
            </View>
           
        <View style={styles.buttonContainer}>
            <View>
                <TouchableOpacity onPress={suaPet} style={styles.button}>
                    <Text style={styles.addButtonLabel}>Sửa Vật Nuôi</Text>
                </TouchableOpacity>
            </View>
            <View >
                <TouchableOpacity onPress={xoaPet} style={styles.button}>
                    <Text style={styles.addButtonLabel}>Xóa Vật Nuôi</Text>
                </TouchableOpacity>
            </View>
        </View>
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
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 5,
        padding: 5,
        marginVertical:25,
    },
    imageContainer: {
        width: 130,
        height: 100,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
        paddingTop: 10,
    },
    image: {
        width: 140,
        height: 140,
        borderRadius: 5,
    },
    textContainer: {
        flex: 1,
        paddingLeft: 10,
    },
    title: {
        fontSize: 16,
        color:'#000',
        fontWeight: 'bold',
        paddingBottom: 5,
    },
    inputUser: {
      borderWidth: 2,
      borderColor: '#CCC',
      borderRadius: 10,
      paddingVertical: 5,
      paddingHorizontal:20,
      backgroundColor:'#fff',
      marginBottom: 10,
      color:'#000'
    },
    bodyContainer: {
        paddingHorizontal: 5,
        paddingBottom: 10,
    },
    icon: {
        width: 40,
        height: 40,
    },
    buttonContainer:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent:'space-around',
        marginTop:130,
    },
    button: {
        position: 'absolute',
        bottom: 10,
        alignSelf:'center',
        width: 150,
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
      fontSize: 16,
      color: '#181a1b',
      fontWeight: 'bold',
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
});

export default PetDetailScreen;