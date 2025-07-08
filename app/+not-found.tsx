import { Link, Stack } from "expo-router";
import { StyleSheet, View } from "react-native";

export default function NotFoundScreen() {
    return (
        <>
            <Stack.Screen options={{ title: "哈，访问了错误界面～" }} />
            <View style={styles.container}>
                <Link href="/" style={styles.button}>
                    点击此处返回主页
                </Link>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#25292e',
        justifyContent: 'center',
        alignItems: 'center'
    },
    button: {
        fontSize: 25,
        textDecorationLine: 'underline',
        color: '#fff',
    }
})