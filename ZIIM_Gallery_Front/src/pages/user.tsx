import { useParams } from "react-router-dom";
import UserBannerCard from "../components/user/userBannerCard";
import UserGallery from "../components/user/userGallery";

export default function User(){
    const { id } = useParams<{ id: string }>();

    return (
        <>
            <UserBannerCard id={id ?? ""} />
            <UserGallery
                userId={id ?? ""}
                title="Ma Gallery d'art"
                description="Voicie une description de la gallery d'art"
            />
        </>
    );
}