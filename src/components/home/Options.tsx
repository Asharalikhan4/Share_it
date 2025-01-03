import React, { FC } from "react";
import { View, Text, Touchable, TouchableOpacity } from "react-native";
import { optionStyles } from "../../styles/optionsStyles";
import Icon from "../global/Icon";
import { Colors } from "../../utils/Constants";
import CustomText from "../global/CustomText";

interface OptionsProps {
    isHome: boolean;
    onMediaPickedUp?: (media: any) => void;
    onFilePickedUp?: (file: any) => void;
};

const Options: FC<OptionsProps> = ({ isHome, onMediaPickedUp, onFilePickedUp}) => {

    const handleUniversalPicker = async (type: string) => {

    };

    return (
        <View style={optionStyles.container}>
            <TouchableOpacity style={optionStyles.subContainer} onPress={() => handleUniversalPicker("images")}>
                <Icon name="images" iconFamily="Ionicons" color={Colors.primary} size={20} />
                <CustomText fontFamily="Okra-Medium" style={{ marginTop: 4, textAlign: "center"}}>Photo</CustomText>
            </TouchableOpacity>
            <TouchableOpacity style={optionStyles.subContainer} onPress={() => handleUniversalPicker("file")}>
                <Icon name="musical-notes-sharp" iconFamily="Ionicons" color={Colors.primary} size={20} />
                <CustomText fontFamily="Okra-Medium" style={{ marginTop: 4, textAlign: "center"}}>Audio</CustomText>
            </TouchableOpacity>
            <TouchableOpacity style={optionStyles.subContainer} onPress={() => handleUniversalPicker("file")}>
                <Icon name="folder-open" iconFamily="Ionicons" color={Colors.primary} size={20} />
                <CustomText fontFamily="Okra-Medium" style={{ marginTop: 4, textAlign: "center"}}>Files</CustomText>
            </TouchableOpacity>
            <TouchableOpacity style={optionStyles.subContainer} onPress={() => handleUniversalPicker("file")}>
                <Icon name="contacts" iconFamily="MaterialCommunityIcons" color={Colors.primary} size={20} />
                <CustomText fontFamily="Okra-Medium" style={{ marginTop: 4, textAlign: "center"}}>Contacts</CustomText>
            </TouchableOpacity>
        </View>
    );
};

export default Options;
