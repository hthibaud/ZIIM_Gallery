import { useParams } from "react-router-dom";
import UserBannerCard from "../components/user/userBannerCard";

export default function User(){
    const { id } = useParams<{ id: string }>();

    return (
        <>
            <UserBannerCard id={id ?? ""} />
            <h1>User ID : {id}</h1>
        </>
    );
}