import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import CustomText from "./CustomText";
import { commonStyles } from "../../styles/commonStyles";

const Misc = () => {
    return (
        <View style={styles.container}>
            <CustomText fontSize={13} fontFamily="Okra-Bold">Explore</CustomText>
            <Image source={require("../../assets/icons/wild_robot.jpg")} style={styles.adBanner}  />
            <View style={commonStyles.flexRowBetween}>
                <CustomText fontFamily="Okra-Bold" style={styles.text} fontSize={22}>#1 World's Best File Sharing App!</CustomText>
                <Image source={require("../../assets/icons/share_logo.jpg")} style={styles.image} />
            </View>
            <CustomText fontFamily="Okra-Bold" style={styles.text2}>
                Made With ❤️ - Ashar
            </CustomText>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingVertical: 20
    },
    adBanner: {
        width: "100%",
        height: 120,
        resizeMode: "cover",
        borderRadius: 10,
        marginVertical: 25
    },
    text: {
        opacity: 0.5,
        width: "60%",
    },
    image: {
        resizeMode: "contain",
        height: 120,
        width: "35%"
    },
    text2: {
        marginTop: 10,
        opacity: 0.5,
        width: "60%",
    }
});

export default Misc;