import React, { FC, useEffect, useMemo, useState } from "react";
import { View, Modal, TouchableOpacity, Image } from "react-native";
import { modalStyles } from "../../styles/modalStyles";
import Icon from "../global/Icon";
import CustomText from "../global/CustomText";
import { ActivityIndicator } from "react-native";
import { Camera, CodeScanner, useCameraDevice } from "react-native-vision-camera";
import Animated, { Easing, useSharedValue, useAnimatedStyle, withRepeat, withTiming } from "react-native-reanimated";
import { LinearGradient } from "react-native-linear-gradient"
import QRCode from "react-native-qrcode-svg";
import { multiColor } from "../../utils/Constants";
import DeviceInfo from "react-native-device-info";

interface QRScannerModalProps {
    visible: boolean;
    onClose: () => void;
};

const QRGenerateModal: FC<QRScannerModalProps> = ({ visible, onClose }) => {

    const [loading, setLoading] = useState<boolean>(false);
    const [qrValue, setQrValue] = useState<string>("");
    const shimmerTranslateX = useSharedValue(-300);

    const shimmerStyle = useAnimatedStyle(() => ({
        transform: [{ translateX: shimmerTranslateX?.value }]
    }));

    const setUpServer = async () => {
        const deviceName = await DeviceInfo.getDeviceName();
        setLoading(false);

    };

    useEffect(() => {
        shimmerTranslateX.value = withRepeat(
            withTiming(300, { duration: 1500, easing: Easing.linear }),
            -1,
            false
        );

        if(visible){
            setLoading(true);
            setUpServer();
        }
    }, [visible]);

    return (
        <Modal animationType="slide" visible={visible} presentationStyle="formSheet" onRequestClose={onClose} onDismiss={onClose}>
            <View style={modalStyles.modalContainer}>
                <View style={modalStyles.qrContainer}>
                    {
                        loading || !qrValue ? (
                            <View style={modalStyles.skeleton}>
                                <Animated.View style={[modalStyles.shimmerOverlay, shimmerStyle]}>
                                    <LinearGradient colors={["#f3f3f3", "#fff", "f3f3f3"]} start={{ x:0, y:0 }} end={{ x:1, y:0 }} style={modalStyles.shimmerGradient} />
                                </Animated.View>
                            </View>
                        ) : (
                            <QRCode value={qrValue} size={250} logoSize={60} logoBackgroundColor="#fff" logoMargin={2} logoBorderRadius={10} logo={require("../../assets/images/profile2.jpg")} linearGradient={multiColor} enableLinearGradient />
                        )
                    }
                </View>

                <View style={modalStyles.info}>
                    <CustomText style={modalStyles.infoText1}>
                        Ensure you're on the same Wi-Fi network as the device you're trying to connect.
                    </CustomText>
                    <CustomText style={modalStyles.infoText2}>
                        Ask the reciever to show QR code to connect and transfer files.
                    </CustomText>
                </View>

                <ActivityIndicator size="small" color="#000" style={{ alignSelf: "center"}} />

                <TouchableOpacity onPress={() => onClose()} style={modalStyles.closeButton}>
                    <Icon name="close" iconFamily="Ionicons" size={24} color="#000" />
                </TouchableOpacity>
            </View>
        </Modal>
    );
};

export default QRGenerateModal;
