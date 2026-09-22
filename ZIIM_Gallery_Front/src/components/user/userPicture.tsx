import defaultUserPicture from '../../assets/default_userPicture.jpg';

type UserPictureProps = {
    profilePicture?: string | null;
    size?: number;
};

const MINIO_URL = import.meta.env.VITE_MINIO_URL ?? "http://localhost:9000";

export default function UserPicture({ profilePicture, size = 64 }: UserPictureProps) {
    const pictureUrl = profilePicture
        ? `${MINIO_URL}/avatars/${profilePicture}`
        : defaultUserPicture;
    
    return (
        <img
            src={pictureUrl}
            alt="Photo de profile"
            width={size}
            height={size}
            loading="lazy"
            className="rounded-full object-cover"
            onError={(event) => {
                event.currentTarget.src = defaultUserPicture;
            }}
        />
    );
}