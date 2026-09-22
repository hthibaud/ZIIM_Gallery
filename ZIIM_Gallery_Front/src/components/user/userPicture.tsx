import defaultUserPicture from '../../assets/default_userPicture.jpg';

type UserPictureProps = {
    profilePicture?: string | null;
    size?: number;
};

const MINIO_URL = import.meta.env.VITE_MINIO_URL ?? "http://localhost:9000";

export default function UserPicture({ 
    profilePicture, 
    size = 64,
}: UserPictureProps) {
    
    const pictureUrl = profilePicture
        ? `${MINIO_URL}/avatars/${profilePicture}`
        : defaultUserPicture;
    
    return (
        <img
            src={pictureUrl}
            alt="Photo de profil"
            width={size}
            height={size}
            loading="lazy"
            style={{ width: size, height: size }} 
            className={`
                shrink-0 rounded-full object-cover 
                bg-zinc-800 shadow-sm ring-1 ring-zinc-800/60
            `}
            onError={(event) => {
                if (event.currentTarget.src !== defaultUserPicture) {
                    event.currentTarget.src = defaultUserPicture;
                }
            }}
        />
    );
}