import defaultUserPicture from '../../assets/default_userPicture.jpg';

type UserPictureProps = {
    id: string;
    size?: number;
};

export default function UserPicture({ id, size = 64 }: UserPictureProps) {
    // API à brancher lorsque l'endpoint backend sera défini :
    // const imageUrl = `${import.meta.env.VITE_API_URL}/users/${id}/picture`;
    // const response = await fetch(imageUrl, { method: 'GET' });
    // const imageBlob = await response.blob();
    // const imageUrl = URL.createObjectURL(imageBlob);

    return (
        <img
            src={defaultUserPicture}
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