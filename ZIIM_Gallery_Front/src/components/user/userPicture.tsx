import defaultUserPicture from '../../assets/default_userPicture.jpg';

type UserPictureProps = {
    id: string;
    size?: number;
};

export default function UserPicture({ id, size = 64 }: UserPictureProps) {

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