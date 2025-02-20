import { Redirect, Stack } from "expo-router";
import { StatusBar } from "expor-status-bar";

import { Loader } from "@/components";
import { useGlobalContext } from "@/context/GlobalProvider";

const Authen = () => {
    const { loading, isLogged } = useGlobalContext();

    //if (!loading && isLogged) return <Redirect href = "/home" />; uncomment once we have user db

    return (
        <>
            <Stack>
                <Stack.Screen
                    name = "sign-in"
                />

                <Stack.Screen
                    name = "sign-up"
                />
            </Stack>

            <Loader isLoading = {loading} />
        </>
    );
};

export default Authen;